export interface Sign {
  id: string; // Global ID format: "SIGN000001", "SIGN000002", etc.
  word: string; // e.g. "Apple", "A", "5", "?"
  slug: string; // e.g. "apple", "a", "5", "question-mark", "at-symbol"
  name: string; // e.g. "Apple", "Letter A", "Number 5", "Question Mark"
  topics: string[]; // e.g. ["Food", "Daily Life"] or ["Alphabet"]
  meaning: string;
  howToSign: {
    summary: string;
    dominantHand: string;
    nonDominantHand?: string;
    movement: string;
    facialExpression?: string;
    location?: string;
  };
  usageExample?: {
    english: string;
    islGloss: string;
    note?: string;
  };
  relatedSigns: string[]; // e.g. ["At", "Water"]
  relatedTopics: string[]; // e.g. ["Food", "Alphabet"]
  handsUsed: 'One-handed' | 'Two-handed';
  videoUrl?: string; // empty if not uploaded yet
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  signCount?: number;
}

export interface RoadmapSection {
  number: number; // 1, 2, 3, 4, 5, 6, 7
  title: string; // Alphabet, Numbers, Greetings, Family, Food, Daily Conversations, Technology
  topicSlug: string;
  description: string;
  estimatedTime?: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  duration?: string;
  views?: string;
  viewCount?: number;
  thumbnail?: string;
  embedId?: string;
  publishedAt?: string;
  url?: string;
}

export interface InstagramReel {
  id: string;
  title: string;
  caption: string;
  likesCount?: number;
  publishedAt?: string;
  thumbnail?: string;
  url?: string;
}
