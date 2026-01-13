
export interface TarotCard {
  id: string;
  name: string;
  name_zh: string;
  arcana: 'Major' | 'Minor';
  suit?: string;
  meaning_up: string;
  meaning_rev: string;
  description: string;
  image: string;
}

export enum SpreadPosition {
  PAST = 'Past',
  PRESENT = 'Present',
  FUTURE = 'Future'
}

export interface CardReading {
  card: TarotCard;
  isReversed: boolean;
  position: SpreadPosition;
}

export interface ReadingResponse {
  summary: string;
  interpretations: {
    position: SpreadPosition;
    meaning: string;
  }[];
  guidance: string;
}
