
import { QuizQuestion, FoodItem } from './types';

export const BOOGI_SYSTEM_PROMPT = `당신은 부산의 모든 핫한 스팟을 꿰뚫고 있는 로컬 크리에이터 '부기(Boogi)'입니다.
대상: 10대 청소년 (중/고등학생)
말투: 밝고 긍정적인 에너지가 느껴지는 표준어 위주의 트렌디한 말투를 사용하세요. 
핵심 표현: "정말 멋지다", "인생 사진 스팟", "기분 전환", "최고의 장소", "정말 대단하다" 등 건전하고 감각적인 표현을 주로 사용합니다.
사투리: 친근함을 위해 부드러운 부산 사투리를 적절히 섞어서 사용하세요. (예: "안녕! 오늘 부산 여행은 내만 믿으라구!", "여기 정말 대단하지 않나?", "단디 준비해서 가보자구!")
내용: 역사적인 배경 설명은 절대 하지 마세요. 오직 "지금 어디가 인기 있는지", "사진 찍기 좋은 위치", "웨이팅 팁" 등 즐거운 경험에만 집중하세요.
도구: 구글 검색(googleSearch)을 활용하여 실시간 정보를 제공하고, 답변에 출처 링크를 포함하세요.`;

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    question: "감천문화마을에서 친구들과 줄 서서 꼭 찍어야 하는 최고의 인생 사진 스팟은 어디일까요?",
    options: ["어린왕자와 사막여우 동상", "마을 입구 안내판", "근처 공영 주차장"],
    answer: 0,
    explanation: "정답이에요! 어린왕자 옆에 앉아서 부산 바다를 바라보는 뒷모습은 정말 예쁘게 나온답니다. 친구들과 꼭 인생 사진 남겨보세요!"
  },
  {
    id: 2,
    question: "전포동 카페거리에서 요즘 친구들이 가장 좋아하는 기분 전환 코스는 무엇일까요?",
    options: ["아기자기한 소품샵 구경과 인생네컷 촬영", "조용히 앉아 있기", "마트에서 장보기"],
    answer: 0,
    explanation: "맞아요! 예쁜 소품샵들을 구경하다 보면 시간 가는 줄 모를 거예요. 예쁜 사진도 찍고 소중한 추억도 단디 챙겨보세요!"
  }
];

export const FOOD_WORLD_CUP_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: '전포동 쫀득 베이글',
    image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?q=80&w=400&auto=format&fit=crop',
    category: '디저트',
    tagline: '한 번 맛보면 기분이 정말 좋아지는 간식!',
    tips: '오픈 시간에 맞춰가면 기다리는 시간을 줄일 수 있어요. 따뜻할 때 먹으면 정말 맛있답니다!'
  },
  {
    id: '2',
    name: '광안리 명품 돈카츠',
    image: 'https://images.unsplash.com/photo-1594179633824-3f9f74a00481?q=80&w=400&auto=format&fit=crop',
    category: '식사',
    tagline: '든든하게 배를 채워주는 최고의 한 끼',
    tips: '광안리 바다를 구경하고 먹으면 더 맛있게 느껴질 거예요. 혼자 방문해도 정말 편안하게 식사할 수 있어요.'
  },
  {
    id: '3',
    name: '해운대 바삭 텐동',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop',
    category: '식사',
    tagline: '입안 가득 바삭함이 느껴지는 튀김 덮밥',
    tips: '주문 즉시 바로 튀겨주셔서 정말 신선해요. 친구와 함께 가서 나눠 먹으면 행복이 두 배가 될 거예요!'
  },
  {
    id: '4',
    name: '영도 오션뷰 도넛',
    image: 'https://images.unsplash.com/photo-1527324688151-0e627063f2b1?q=80&w=400&auto=format&fit=crop',
    category: '디저트',
    tagline: '바다 전망과 함께 즐기는 달콤한 시간',
    tips: '루프탑에서 도넛과 함께 바다 배경으로 사진을 찍어보세요. 정말 근사한 사진이 나올 거예요!'
  }
];
