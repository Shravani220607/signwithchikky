import { Sign, Topic } from '../types/sign';
import { CHIKKY_SIGNS, CHIKKY_TOPICS } from '../data/chikkyContent';

export interface SearchResult {
  type: 'sign' | 'topic';
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
  sign?: Sign;
  topic?: Topic;
}

export function searchAll(query: string, customSigns?: Sign[], customTopics?: Topic[]): SearchResult[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const signs = customSigns || CHIKKY_SIGNS;
  const topics = customTopics || CHIKKY_TOPICS;

  const signResults: SearchResult[] = signs
    .filter((s) => {
      const w = s.word.toLowerCase();
      const n = s.name.toLowerCase();
      const sl = s.slug.toLowerCase();
      const id = s.id.toLowerCase();
      const m = s.meaning.toLowerCase();
      const top = s.topics.some((t) => t.toLowerCase().includes(clean));

      return (
        w === clean ||
        w.startsWith(clean) ||
        w.includes(clean) ||
        n.includes(clean) ||
        sl.includes(clean) ||
        id.includes(clean) ||
        m.includes(clean) ||
        top
      );
    })
    .map((s) => ({
      type: 'sign',
      title: s.name === s.word ? s.word : `${s.word} (${s.name})`,
      subtitle: `${s.id} • Topics: ${s.topics.join(', ')} • ${s.howToSign.summary.slice(0, 60)}...`,
      url: `/dictionary/${s.slug}`,
      badge: s.topics[0] || 'Sign',
      sign: s
    }));

  const topicResults: SearchResult[] = topics
    .filter((t) => {
      return (
        t.title.toLowerCase().includes(clean) ||
        t.slug.toLowerCase().includes(clean) ||
        t.description.toLowerCase().includes(clean)
      );
    })
    .map((t) => ({
      type: 'topic',
      title: t.title,
      subtitle: `${t.signCount || 0} signs • ${t.description.slice(0, 70)}...`,
      url: `/topics/${t.slug}`,
      badge: 'Topic',
      topic: t
    }));

  return [...signResults, ...topicResults];
}

export function getAutocompleteSuggestions(
  query: string,
  limit = 6,
  customSigns?: Sign[],
  customTopics?: Topic[]
): string[] {
  const clean = query.trim().toLowerCase();
  const signs = customSigns || CHIKKY_SIGNS;
  const topics = customTopics || CHIKKY_TOPICS;

  if (signs.length === 0 && topics.length === 0) {
    return [];
  }

  const matched = new Set<string>();

  // Special autocomplete support for words like Apple, Application
  if (clean === 'app' || clean.startsWith('app')) {
    matched.add('Apple');
    matched.add('Application');
  }

  for (const s of signs) {
    const w = s.word;
    const n = s.name;
    if (!clean) {
      matched.add(w);
    } else if (w.toLowerCase().startsWith(clean) || n.toLowerCase().startsWith(clean)) {
      matched.add(w);
    }
  }

  for (const t of topics) {
    if (!clean || t.title.toLowerCase().startsWith(clean)) {
      matched.add(t.title);
    }
  }

  if (clean && matched.size < limit) {
    for (const s of signs) {
      if (
        (s.word.toLowerCase().includes(clean) || s.name.toLowerCase().includes(clean)) &&
        !matched.has(s.word)
      ) {
        matched.add(s.word);
      }
    }
  }

  return Array.from(matched).slice(0, limit);
}
