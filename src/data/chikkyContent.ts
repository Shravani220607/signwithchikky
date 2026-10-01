import { Sign, Topic } from '../types/sign';

// Helper to pad global Sign ID: SIGN000001, SIGN000002, etc.
let signCounter = 1;
const nextId = (): string => {
  const idStr = String(signCounter++).padStart(6, '0');
  return `SIGN${idStr}`;
};

// 1. Letters A to Z
const alphabetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const alphabetDescriptions: Record<string, { dominant: string; nonDominant: string; movement: string; summary: string }> = {
  A: {
    dominant: 'Index finger touches the thumb tip of the base hand',
    nonDominant: 'Open palm facing forward, fingers spread',
    movement: 'Touch the tip of the non-dominant thumb with the dominant index finger',
    summary: 'Touch the tip of your non-dominant thumb with the dominant index finger to indicate vowel A.'
  },
  B: {
    dominant: 'Fingers joined and thumb touching base palm',
    nonDominant: 'Flat open palm held vertically',
    movement: 'Position fingers against the base palm forming two lobes of B',
    summary: 'Form the letter B by positioning dominant fingers against the base vertical palm.'
  },
  C: {
    dominant: 'Curved C-handshape with thumb and fingers forming an arc',
    nonDominant: 'Held at chest level as neutral reference or relaxed',
    movement: 'Hold dominant hand in a clear curved C profile facing the viewer',
    summary: 'Form a curved semi-circle C shape with dominant thumb and fingers.'
  },
  D: {
    dominant: 'Index finger pointing upward, thumb and other fingers forming a loop',
    nonDominant: 'Base index finger touching to form the stem of D',
    movement: 'Touch dominant index and thumb against non-dominant index to outline letter D',
    summary: 'Form the vertical stem and circular back of the letter D using both hands.'
  },
  E: {
    dominant: 'Index finger touches the index fingertip of the base hand',
    nonDominant: 'Open palm facing forward with fingers separated',
    movement: 'Touch the tip of the non-dominant index finger with dominant index finger',
    summary: 'Touch the tip of your non-dominant index finger to denote vowel E.'
  },
  F: {
    dominant: 'Index and middle fingers extended across base fingers',
    nonDominant: 'Two fingers extended horizontally',
    movement: 'Cross dominant index and middle fingers across the horizontal base fingers',
    summary: 'Cross two extended fingers of dominant hand across two fingers of base hand.'
  },
  G: {
    dominant: 'Fist with thumb placed against the knuckles of base fist',
    nonDominant: 'Closed fist held horizontally',
    movement: 'Place dominant closed fist on top of base closed fist',
    summary: 'Stack dominant fist firmly over the base fist to represent G.'
  },
  H: {
    dominant: 'Flat open palm sweeping across base palm',
    nonDominant: 'Flat open palm facing upward or inward',
    movement: 'Sweep the dominant palm across the flat surface of the base palm',
    summary: 'Sweep the dominant palm across the non-dominant palm in an outward motion.'
  },
  I: {
    dominant: 'Index finger touches the middle fingertip of the base hand',
    nonDominant: 'Open palm facing forward with fingers separated',
    movement: 'Touch the tip of the non-dominant middle finger with dominant index finger',
    summary: 'Touch the tip of your non-dominant middle finger to denote vowel I.'
  },
  J: {
    dominant: 'Dominant index finger traces down the middle finger of base palm and curves into palm',
    nonDominant: 'Open palm facing inward',
    movement: 'Trace down from the middle finger tip into the center of the palm making a J hook',
    summary: 'Trace a curved hook shape from the base middle fingertip down into the palm.'
  },
  K: {
    dominant: 'Bent index finger hooked against base index finger',
    nonDominant: 'Index finger pointing upright',
    movement: 'Hook dominant index finger at a 90-degree angle against the upright base index',
    summary: 'Form the angled arm of K by hooking your dominant index finger onto the upright base index.'
  },
  L: {
    dominant: 'Index finger and thumb at right angle placed onto base palm',
    nonDominant: 'Flat open palm facing upward',
    movement: 'Rest dominant L-shape flat onto the surface of the non-dominant palm',
    summary: 'Place an L-shaped hand onto the horizontal palm of the non-dominant hand.'
  },
  M: {
    dominant: 'Three fingers (index, middle, ring) placed onto the base palm',
    nonDominant: 'Flat horizontal palm',
    movement: 'Rest the tips of dominant index, middle, and ring fingers on base palm',
    summary: 'Place three fingertips onto the flat base palm representing the 3 strokes of M.'
  },
  N: {
    dominant: 'Two fingers (index and middle) placed onto the base palm',
    nonDominant: 'Flat horizontal palm',
    movement: 'Rest the tips of dominant index and middle fingers on base palm',
    summary: 'Place two fingertips onto the flat base palm representing the 2 strokes of N.'
  },
  O: {
    dominant: 'Index finger touches the ring fingertip of the base hand',
    nonDominant: 'Open palm facing forward with fingers separated',
    movement: 'Touch the tip of the non-dominant ring finger with dominant index finger',
    summary: 'Touch the tip of your non-dominant ring finger to denote vowel O.'
  },
  P: {
    dominant: 'Index finger and thumb forming a circle, touching base upright index',
    nonDominant: 'Upright index finger pointing up',
    movement: 'Touch the closed loop of dominant thumb and index to the top of the upright base index',
    summary: 'Place a circle at the top of the upright base index finger to depict P.'
  },
  Q: {
    dominant: 'Thumb and index fingers forming a ring hooked into base thumb & index ring',
    nonDominant: 'Thumb and index forming an open circle',
    movement: 'Hook the dominant index finger into the base circle to form the tail of Q',
    summary: 'Hook the dominant index into the base circular loop to create letter Q.'
  },
  R: {
    dominant: 'Curled index finger hooked over the upright base index finger',
    nonDominant: 'Upright index finger pointing up',
    movement: 'Rest the curved dominant index over the top of the base index finger',
    summary: 'Hook the curved dominant index finger over the top of the upright base finger.'
  },
  S: {
    dominant: 'Little finger hooked around the base little finger',
    nonDominant: 'Little finger extended, other fingers folded',
    movement: 'Hook both pinky fingers together linking at the first knuckle',
    summary: 'Interlock both little fingers together to sign the letter S.'
  },
  T: {
    dominant: 'Index finger touching the edge of the base palm near the thumb base',
    nonDominant: 'Flat upright palm edge facing outward',
    movement: 'Touch the dominant index finger perpendicularly against the edge of the base hand',
    summary: 'Touch dominant index finger against the side edge of the vertical base hand.'
  },
  U: {
    dominant: 'Index finger touches the little fingertip of the base hand',
    nonDominant: 'Open palm facing forward with fingers separated',
    movement: 'Touch the tip of the non-dominant little finger with dominant index finger',
    summary: 'Touch the tip of your non-dominant pinky finger to denote vowel U.'
  },
  V: {
    dominant: 'V-shape with index and middle fingers spread',
    nonDominant: 'Flat open palm facing upward',
    movement: 'Rest the tips of the dominant V-fingers on the center of the base palm',
    summary: 'Rest an open V-sign onto the flat surface of the non-dominant palm.'
  },
  W: {
    dominant: 'Spread fingers intertwined with base fingers pointing upright',
    nonDominant: 'Spread fingers pointing upright',
    movement: 'Interlock the fingers of both hands with palms facing inward, pointing upward',
    summary: 'Interlock the extended fingers of both hands facing upward to form W.'
  },
  X: {
    dominant: 'Extended index finger crossed over base index finger',
    nonDominant: 'Extended index finger pointing horizontally or upward',
    movement: 'Cross both index fingers perpendicularly at the center knuckles',
    summary: 'Cross both index fingers to make a crisp X shape.'
  },
  Y: {
    dominant: 'Index finger positioned in the V-crotch between thumb and index of base hand',
    nonDominant: 'Thumb and index finger spread apart forming a wide V',
    movement: 'Place the dominant index finger into the crease between base thumb and index',
    summary: 'Place dominant index finger into the crotch between base thumb and index finger.'
  },
  Z: {
    dominant: 'Bent palm or fingers forming angle against base upright hand',
    nonDominant: 'Flat upright palm held vertically',
    movement: 'Hold dominant fingertips against the base palm forming the zig-zag profile of Z',
    summary: 'Touch dominant fingertips against base vertical palm to create the Z profile.'
  }
};

const alphabetSigns: Sign[] = alphabetLetters.map((letter) => {
  const info = alphabetDescriptions[letter];
  return {
    id: nextId(),
    word: letter,
    slug: letter.toLowerCase(),
    name: `Letter ${letter}`,
    topics: ['Alphabet'],
    meaning: `The letter "${letter}" in Indian Sign Language (ISL) two-handed manual fingerspelling alphabet. Used for fingerspelling proper nouns, names, and vocabulary.`,
    howToSign: {
      summary: info.summary,
      dominantHand: info.dominant,
      nonDominantHand: info.nonDominant,
      movement: info.movement,
      location: 'Chest level'
    },
    usageExample: {
      english: `Fingerspell "${letter}" when spelling names or unfamiliar terms.`,
      islGloss: `[LETTER ${letter}]`
    },
    relatedSigns: ['Apple', 'At', 'Book'],
    relatedTopics: ['Alphabet'],
    handsUsed: 'Two-handed'
  };
});

// 2. Vocabulary words (Apple, At, Book, Computer, Family, Namaste) from traditional index
const vocabularySigns: Sign[] = [
  {
    id: nextId(),
    word: 'Apple',
    slug: 'apple',
    name: 'Apple',
    topics: ['Food'],
    meaning: 'A round fruit with red, green, or yellow skin and crisp white flesh. Common dietary and nutritional vocabulary sign.',
    howToSign: {
      summary: 'Twist the knuckle of the dominant index finger against the cheek twice with a pleasant smile.',
      dominantHand: 'Bent index finger knuckle against cheek',
      movement: 'Twist knuckle gently back and forth on the cheek twice',
      facialExpression: 'Slight pleasant smile',
      location: 'Cheek'
    },
    usageExample: {
      english: 'I like eating sweet red apples for breakfast.',
      islGloss: '[ME APPLE RED SWEET EAT LIKE]'
    },
    relatedSigns: ['Food', 'Fruit', 'Water'],
    relatedTopics: ['Food'],
    handsUsed: 'One-handed'
  },
  {
    id: nextId(),
    word: 'At',
    slug: 'at',
    name: 'At',
    topics: ['Alphabet', 'Special Characters'],
    meaning: 'Preposition indicating location or time; also fingerspelled or used for email address syntax (@).',
    howToSign: {
      summary: 'Fingerspell A-T or trace an enclosing circle in front of chest.',
      dominantHand: 'Index finger traces circular stroke around palm',
      movement: 'Fingerspell A then T smoothly',
      location: 'Chest level'
    },
    usageExample: {
      english: 'Meet me at school tomorrow.',
      islGloss: '[TOMORROW SCHOOL AT MEET]'
    },
    relatedSigns: ['Apple', 'A', 'at-symbol'],
    relatedTopics: ['Alphabet', 'Special Characters'],
    handsUsed: 'Two-handed'
  },
  {
    id: nextId(),
    word: 'Book',
    slug: 'book',
    name: 'Book',
    topics: ['Technology', 'Daily Conversations'],
    meaning: 'A written or printed work consisting of pages glued or sewn together along one side and bound in covers.',
    howToSign: {
      summary: 'Place palms together facing upward, then open hands outward as if opening the pages of a book.',
      dominantHand: 'Flat open palm facing upward',
      nonDominantHand: 'Flat open palm facing upward',
      movement: 'Start with palms together and open them outward twice',
      location: 'Chest level'
    },
    usageExample: {
      english: 'Please open your sign language textbook.',
      islGloss: '[BOOK OPEN READ]'
    },
    relatedSigns: ['Computer', 'Learn', 'Teacher'],
    relatedTopics: ['Technology'],
    handsUsed: 'Two-handed'
  },
  {
    id: nextId(),
    word: 'Computer',
    slug: 'computer',
    name: 'Computer',
    topics: ['Technology'],
    meaning: 'An electronic device for storing and processing data, essential in modern digital Deaf education and video calling.',
    howToSign: {
      summary: 'Move fingers of both hands in a rapid typing motion on an imaginary horizontal keyboard in front of you.',
      dominantHand: 'Curved fingers mimicking keyboard typing',
      nonDominantHand: 'Curved fingers mimicking keyboard typing',
      movement: 'Alternating fluttering fingers moving across an imaginary horizontal plane',
      location: 'Mid-chest'
    },
    usageExample: {
      english: 'We use the computer to practice sign language online.',
      islGloss: '[COMPUTER USE SIGN PRACTICE]'
    },
    relatedSigns: ['Technology', 'Book', 'Internet'],
    relatedTopics: ['Technology'],
    handsUsed: 'Two-handed'
  },
  {
    id: nextId(),
    word: 'Family',
    slug: 'family',
    name: 'Family',
    topics: ['Family'],
    meaning: 'A group of one or more parents and their children living together as a unit, or relatives connected by lineage.',
    howToSign: {
      summary: 'Both hands form circular shapes moving outward and joining little fingers together to represent an enclosed household unit.',
      dominantHand: 'Curved F-shape or open hand sweeping inward',
      nonDominantHand: 'Curved F-shape sweeping inward',
      movement: 'Start with hands apart in front, circle them forward and join palms/pinkies together',
      facialExpression: 'Warm welcoming expression',
      location: 'Chest level'
    },
    usageExample: {
      english: 'My family supports my sign language learning.',
      islGloss: '[MY FAMILY SIGN LEARN SUPPORT]'
    },
    relatedSigns: ['Mother', 'Father', 'Friend'],
    relatedTopics: ['Family'],
    handsUsed: 'Two-handed'
  },
  {
    id: nextId(),
    word: 'Namaste',
    slug: 'namaste',
    name: 'Namaste',
    topics: ['Greetings'],
    meaning: 'Traditional respectful Indian greeting and salutation acknowledging the divine and showing deep cultural courtesy.',
    howToSign: {
      summary: 'Press both flat palms together at center chest level (Anjali Mudra) with a gentle respectful nod.',
      dominantHand: 'Flat palm pressed against base palm',
      nonDominantHand: 'Flat palm pressed against dominant palm',
      movement: 'Bring palms together at mid-chest and bow head gently',
      facialExpression: 'Warm respectful smile and gentle nod',
      location: 'Chest level'
    },
    usageExample: {
      english: 'Namaste, welcome to the sign language class.',
      islGloss: '[NAMASTE CLASS WELCOME]'
    },
    relatedSigns: ['Greetings', 'Thank You', 'Welcome'],
    relatedTopics: ['Greetings'],
    handsUsed: 'Two-handed'
  }
];

// 3. Numbers 0 to 9
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const numberDescriptions: Record<string, { dominant: string; movement: string; summary: string }> = {
  '0': {
    dominant: 'Curved O-shape with fingers touching thumb tip',
    movement: 'Hold upright at chest level with palm facing forward',
    summary: 'Form a closed circle with all fingertips meeting the thumb tip.'
  },
  '1': {
    dominant: 'Index finger extended upright, thumb and remaining fingers folded into palm',
    movement: 'Hold dominant hand upright at chest level with palm facing forward',
    summary: 'Extend index finger upright with other fingers folded.'
  },
  '2': {
    dominant: 'Index and middle fingers extended upright in a V shape',
    movement: 'Hold upright at chest level with palm facing forward',
    summary: 'Extend index and middle fingers upright in a V shape.'
  },
  '3': {
    dominant: 'Index, middle, and ring fingers extended upright',
    movement: 'Hold upright with palm facing forward',
    summary: 'Extend three fingers upright at chest level to indicate number 3.'
  },
  '4': {
    dominant: 'Four fingers extended upright, thumb folded across palm',
    movement: 'Hold upright with palm facing forward',
    summary: 'Extend four fingers upright with the thumb folded across the palm.'
  },
  '5': {
    dominant: 'All five fingers spread open and extended upright',
    movement: 'Hold upright with palm facing forward and fingers separated',
    summary: 'Extend all five fingers upright and spread to indicate number 5.'
  },
  '6': {
    dominant: 'Thumb folded in while other fingers form ISL 6 gesture',
    movement: 'Hold dominant hand at chest level, palm facing inward or forward',
    summary: 'Standard Indian Sign Language gesture for number 6.'
  },
  '7': {
    dominant: 'Dominant hand positions fingers to indicate quantity 7',
    movement: 'Hold at chest level with palm facing forward',
    summary: 'Standard Indian Sign Language gesture for number 7.'
  },
  '8': {
    dominant: 'Dominant hand positions fingers to indicate quantity 8',
    movement: 'Hold at chest level with palm facing forward',
    summary: 'Standard Indian Sign Language gesture for number 8.'
  },
  '9': {
    dominant: 'Dominant hand positions fingers to indicate quantity 9',
    movement: 'Hold at chest level with palm facing forward',
    summary: 'Standard Indian Sign Language gesture for number 9.'
  }
};

const numberSigns: Sign[] = digits.map((digit) => {
  const info = numberDescriptions[digit];
  return {
    id: nextId(),
    word: digit,
    slug: digit,
    name: `Number ${digit}`,
    topics: ['Numbers'],
    meaning: `The number "${digit}" in Indian Sign Language (ISL). Used for counting, dates, time, currency, and quantities.`,
    howToSign: {
      summary: info.summary,
      dominantHand: info.dominant,
      movement: info.movement,
      location: 'Chest level'
    },
    usageExample: {
      english: `Count quantity ${digit} in Indian Sign Language.`,
      islGloss: `[NUMBER ${digit}]`
    },
    relatedSigns: ['0', '1', '2', '5', '9'],
    relatedTopics: ['Numbers'],
    handsUsed: 'One-handed'
  };
});

// 4. Special Characters
const specialsList: { char: string; slug: string; name: string; desc: string; dominant: string; movement: string }[] = [
  {
    char: '?',
    slug: 'question-mark',
    name: 'Question Mark',
    desc: 'Punctuation mark used in ISL fingerspelling and notation to indicate an inquiry or question.',
    dominant: 'Index finger traces a hook in the air and finishes with a downward dot tap',
    movement: 'Draw a question mark curve in space followed by a single tap below'
  },
  {
    char: '!',
    slug: 'exclamation-mark',
    name: 'Exclamation Mark',
    desc: 'Punctuation mark expressing emphasis, excitement, surprise, or an urgent imperative.',
    dominant: 'Index finger strokes down sharply followed by a crisp dot motion below',
    movement: 'Move dominant index straight down and tap once in space for the dot'
  },
  {
    char: '.',
    slug: 'period',
    name: 'Period (Full Stop)',
    desc: 'Punctuation mark indicating the end of a sentence or decimal point in numbers and URLs.',
    dominant: 'Index finger makes a single precise forward tap in the air',
    movement: 'Tap forward once at mid-chest height'
  },
  {
    char: ',',
    slug: 'comma',
    name: 'Comma',
    desc: 'Punctuation mark indicating a pause or separating items in a list or clause.',
    dominant: 'Index finger taps and executes a short downward curved tail',
    movement: 'Tap and curve downward slightly to trace a comma shape'
  },
  {
    char: '@',
    slug: 'at-symbol',
    name: 'At Symbol',
    desc: 'Symbol used in email addresses, social media usernames, and digital communication.',
    dominant: 'Index finger traces an "a" in the air, then circles completely around it',
    movement: 'Draw letter A then make a wide enclosing circle around it'
  },
  {
    char: '#',
    slug: 'hash',
    name: 'Hash / Pound',
    desc: 'Symbol used for social media hashtags, numbering, code identifiers, and musical notation.',
    dominant: 'Two horizontal fingers crossed by two vertical fingers using both hands',
    movement: 'Form a grid pattern by intersecting two index fingers of both hands'
  },
  {
    char: '&',
    slug: 'ampersand',
    name: 'Ampersand',
    desc: 'Logogram representing the conjunction "and", used in titles, company names, and abbreviations.',
    dominant: 'Index finger traces the figure-8 shape of an ampersand in the air',
    movement: 'Trace the curved figure-8 stroke starting from bottom up and looping across'
  },
  {
    char: '%',
    slug: 'percent',
    name: 'Percent',
    desc: 'Mathematical symbol used to indicate a percentage or fraction of 100.',
    dominant: 'Index finger taps a small circle, draws a diagonal slash downward, and taps a second circle',
    movement: 'Circle top-left, diagonal stroke down-right, circle bottom-right'
  },
  {
    char: '+',
    slug: 'plus',
    name: 'Plus',
    desc: 'Mathematical sign for addition, positive values, or medical cross notation.',
    dominant: 'Dominant index finger crosses vertically over horizontal base index finger',
    movement: 'Hold non-dominant index horizontally and cross dominant index vertically across it'
  },
  {
    char: '=',
    slug: 'equals',
    name: 'Equals',
    desc: 'Mathematical symbol indicating equivalence between two quantities or expressions.',
    dominant: 'Dominant index finger held parallel to base index finger',
    movement: 'Hold both index fingers horizontally parallel in front of chest'
  },
  {
    char: '(',
    slug: 'open-parenthesis',
    name: 'Open Parenthesis',
    desc: 'Curved bracket used to open parenthetical remarks or mathematical expressions.',
    dominant: 'Index finger traces a left-facing arc downward in space',
    movement: 'Draw an open curved arc "(" from top to bottom'
  },
  {
    char: ')',
    slug: 'close-parenthesis',
    name: 'Close Parenthesis',
    desc: 'Curved bracket used to close parenthetical remarks or mathematical expressions.',
    dominant: 'Index finger traces a right-facing arc downward in space',
    movement: 'Draw a closing curved arc ")" from top to bottom'
  },
  {
    char: '[',
    slug: 'open-bracket',
    name: 'Open Bracket',
    desc: 'Square bracket used in technical notation, glossary citations, and editorial additions.',
    dominant: 'Index finger traces top horizontal, vertical down, and bottom horizontal stroke',
    movement: 'Trace the three square edges of "[" in the air'
  },
  {
    char: ']',
    slug: 'close-bracket',
    name: 'Close Bracket',
    desc: 'Square bracket used to close technical notation and editorial citations.',
    dominant: 'Index finger traces top horizontal, vertical down, and bottom horizontal stroke',
    movement: 'Trace the three square edges of "]" in the air'
  },
  {
    char: '/',
    slug: 'forward-slash',
    name: 'Forward Slash',
    desc: 'Punctuation mark used in web addresses, fractions, dates, and alternatives.',
    dominant: 'Flat hand or index finger slashes downward from upper-right to lower-left',
    movement: 'Chop or point downward along a forward diagonal line'
  },
  {
    char: '\\',
    slug: 'backslash',
    name: 'Backslash',
    desc: 'Punctuation symbol used primarily in computing file paths and code escapes.',
    dominant: 'Flat hand or index finger slashes downward from upper-left to lower-right',
    movement: 'Chop or point downward along a reverse diagonal line'
  },
  {
    char: ':',
    slug: 'colon',
    name: 'Colon',
    desc: 'Punctuation mark indicating an explanation, list, ratio, or time separation.',
    dominant: 'Index finger taps twice vertically in the signing space',
    movement: 'Tap once, move hand down slightly, and tap a second time'
  },
  {
    char: ';',
    slug: 'semicolon',
    name: 'Semicolon',
    desc: 'Punctuation mark linking two independent clauses or separating complex items.',
    dominant: 'Index finger taps a dot above, then draws a short curved comma below',
    movement: 'Tap upper dot, then stroke downward with a short curved comma'
  },
  {
    char: '"',
    slug: 'double-quote',
    name: 'Double Quote',
    desc: 'Quotation mark used to indicate direct dialogue or speech quotes in ISL discourse.',
    dominant: 'Index and middle fingers flexed twice in air-quotes gesture',
    movement: 'Flex index and middle fingers in a gentle bending air-quote motion twice'
  },
  {
    char: "'",
    slug: 'single-quote',
    name: 'Single Quote',
    desc: 'Quotation mark used for quotes within quotes, apostrophes, or contractions.',
    dominant: 'Single index finger flexes once in the air like a single quote',
    movement: 'Flex index finger once at shoulder height to indicate a single quotation'
  }
];

const specialCharacterSigns: Sign[] = specialsList.map((item) => ({
  id: nextId(),
  word: item.char,
  slug: item.slug,
  name: item.name,
  topics: ['Special Characters'],
  meaning: item.desc,
  howToSign: {
    summary: `${item.name} (${item.char}) is signed in Indian Sign Language by ${item.dominant.toLowerCase()}.`,
    dominantHand: item.dominant,
    movement: item.movement,
    location: 'Chest to eye level'
  },
  usageExample: {
    english: `Type or sign "${item.char}" (${item.name}) when communicating online or in notation.`,
    islGloss: `[SYMBOL ${item.slug.toUpperCase()}]`
  },
  relatedSigns: ['?', '!', '.', '@', '#'],
  relatedTopics: ['Special Characters'],
  handsUsed: item.char === '#' || item.char === '+' || item.char === '=' ? 'Two-handed' : 'One-handed'
}));

// Complete combined signs dictionary
export const CHIKKY_SIGNS: Sign[] = [
  ...alphabetSigns,
  ...vocabularySigns,
  ...numberSigns,
  ...specialCharacterSigns
];

// Dynamically generate existing topics only (No hardcoded topics that have 0 signs!)
const topicDescriptions: Record<string, string> = {
  Alphabet: 'Indian Sign Language two-handed manual fingerspelling alphabet from A to Z.',
  Numbers: 'Numerals from 0 to 9 for counting, time, currency, and quantities.',
  'Special Characters': 'Standard punctuation, symbols, and mathematical characters.',
  Food: 'Vocabulary for dining, fruit, meals, and hospitality in Indian Sign Language.',
  Technology: 'Modern digital communication terms, computers, and connectivity.',
  Family: 'Kinship markers, parents, relatives, and close family members.',
  Greetings: 'Polite cultural salutations, respect markers, and warm introductory phrases.'
};

const uniqueTopicsSet = new Set<string>();
CHIKKY_SIGNS.forEach((sign) => {
  sign.topics.forEach((t) => uniqueTopicsSet.add(t));
});

export const CHIKKY_TOPICS: Topic[] = Array.from(uniqueTopicsSet)
  .sort()
  .map((topicTitle, index) => {
    const slug = topicTitle.toLowerCase().replace(/\s+/g, '-');
    const count = CHIKKY_SIGNS.filter((s) => s.topics.includes(topicTitle)).length;
    return {
      id: `TOPIC${String(index + 1).padStart(3, '0')}`,
      slug,
      title: topicTitle,
      description: topicDescriptions[topicTitle] || `Comprehensive collection of ${topicTitle} signs in Indian Sign Language.`,
      signCount: count
    };
  });
