
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { BOOGI_SYSTEM_PROMPT } from "../constants";
import { GroundingSource, TrendSpot } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBoogiResponse = async (userMessage: string): Promise<{ text: string, sources: GroundingSource[] }> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: BOOGI_SYSTEM_PROMPT,
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "미안타, 지금 부산 바다 보러 가서 답장이 좀 늦네! 다시 말해줄래?";
    
    const sources: GroundingSource[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());
    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Chat error:", error);
    return { text: "어라? 서버가 좀 이상하네. 나중에 다시 함 물어봐라!", sources: [] };
  }
};

export const getTrendingSpots = async (): Promise<TrendSpot[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "지금 유튜브와 인스타그램에서 가장 핫한 부산 맛집/핫플레이스 4곳을 선정해서 JSON 리스트로 줘. 각 아이템은 id, title, thumbnail(관련 고화질 unsplash URL), comment(부기의 힙한 코멘트), url, platform('youtube' 또는 'instagram')을 포함해야 함.",
      config: {
        systemInstruction: BOOGI_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              thumbnail: { type: Type.STRING },
              comment: { type: Type.STRING },
              url: { type: Type.STRING },
              platform: { type: Type.STRING }
            },
            required: ["id", "title", "thumbnail", "comment", "url", "platform"]
          }
        },
        tools: [{ googleSearch: {} }]
      }
    });

    const results = JSON.parse(response.text);
    return results;
  } catch (error) {
    console.error("Trend fetch error:", error);
    // Fallback data if API fails
    return [
      { id: '1', title: '광안리 M 드론 라이트쇼', thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600', comment: '매주 토요일 광안리 밤하늘 폼 미쳤다! 명당 자리 단디 잡아라.', url: 'https://youtube.com', platform: 'youtube' },
      { id: '2', title: '전포동 소품샵 투어', thumbnail: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600', comment: '인생네컷 찍고 소품샵 털면 갓생 완성 아이가?', url: 'https://instagram.com', platform: 'instagram' },
      { id: '3', title: '해리단길 브런치 카페', thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600', comment: '해운대 바다 보고 브런치 먹으면 여기가 바로 핀터레스트다.', url: 'https://instagram.com', platform: 'instagram' },
      { id: '4', title: '영도 피아크(P.ARK)', thumbnail: 'https://images.unsplash.com/photo-1493857671297-66f19bc72927?w=600', comment: '영도 바다 통창뷰 실화냐? 여기서 공부하면 전교 1등 예약이다.', url: 'https://youtube.com', platform: 'youtube' },
    ];
  }
};

export const generateBusanArt = async (prompt: string): Promise<string | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A vibrant, high-aesthetic Busan art: ${prompt}. Cinematic lighting, stylish.` }]
      }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) { return null; }
};
