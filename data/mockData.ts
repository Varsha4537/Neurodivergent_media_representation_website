import type { Poster, TimelineEvent, ResearchTopic, ChartData, QuizQuestion } from '../types';

import oneBrainImg from '../assets/posters/one_brain_many_worlds.jpg';
import connectDifferentlyImg from '../assets/posters/connect_differently.jpg';
import realisticImg from '../assets/posters/realistic_representation.jpg';
import savantSyndromeImg from '../assets/posters/savant_syndrome.jpg';

import slide1 from '../assets/workshop/1_intro.png';
import slide2 from '../assets/workshop/2_goals.png';
import slide3 from '../assets/workshop/3_beyond_stereotypes.png';
import slide4 from '../assets/workshop/4_focus_shift.png';
import slide5 from '../assets/workshop/5_real_vs_unreal.png';
import slide6 from '../assets/workshop/6_impact_stereotypes.png';
import slide7 from '../assets/workshop/7_long_term_commitment.png';
import slide8 from '../assets/workshop/8_real_vs_unreal_resources.png';

export const posters: Poster[] = [
  {
    id: 1,
    title: "One Brain, Many Worlds",
    imageUrl: oneBrainImg,
    description: "Neurodivergence is not a monolith but a spectrum of unique internal worlds."
  },
  {
    id: 2,
    title: "Listen to Every Voice",
    imageUrl: connectDifferentlyImg,
    description: "I feel deeply. I think pictures. I connect differently. Listen to every voice."
  },
  {
    id: 3,
    title: "Real vs. Unreal",
    imageUrl: realisticImg,
    description: "Contrasting 'Rain Man' (Unrealistic) with 'Temple Grandin' (Realistic). Perceptions are being harmed by outdated tropes."
  },
  {
    id: 4,
    title: "Did You Know?",
    imageUrl: savantSyndromeImg,
    description: "Savant Syndrome is a rare condition. Media often overrepresents this, ignoring the broader spectrum."
  }
];

export const workshopSlides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

export const timelineEvents: TimelineEvent[] = [
  {
    year: '1988',
    title: 'Rain Man',
    description: 'A landmark film that brought autism to mainstream audiences, though its portrayal is now viewed with mixed perspectives.'
  },
  {
    year: '2001',
    title: 'I Am Sam',
    description: 'Explores the story of a father with an intellectual disability, raising questions about parenthood and societal support.'
  },
  {
    year: '2010',
    title: 'Temple Grandin',
    description: 'A biographical film praised for its insightful and respectful portrayal of an autistic woman who became a leader in her field.'
  },
  {
    year: '2012',
    title: 'The Perks of Being a Wallflower',
    description: 'Touches on themes of mental health, trauma, and social anxiety in adolescence, resonating with many neurodivergent viewers.'
  },
  {
    year: '2020',
    title: 'The Reason I Jump',
    description: 'A documentary based on the book by Naoki Higashida, offering a sensory and immersive look into the experience of non-speaking autistic people.'
  }
];

export const researchTopics: ResearchTopic[] = [
  {
    title: "The Evolution of 'The Savant' Trope",
    summary: "From Rain Man to The Good Doctor, we trace the history and impact of the savant stereotype in media.",
    content: "The savant trope, while bringing visibility, often flattens neurodivergent characters into one-dimensional geniuses, ignoring the diversity of the autistic experience. Our research analyzes over 50 films and shows to quantify the prevalence of this trope and its correlation with public perception. We found that media featuring savant characters often neglects to portray daily challenges and co-occurring conditions."
  },
  {
    title: "Representation Beyond Autism: ADHD, Dyslexia, and More",
    summary: "An analysis of how conditions other than autism are portrayed, or often ignored, in popular films.",
    content: "While autism representation has increased, other forms of neurodivergence like ADHD, Dyslexia, and Tourette's Syndrome remain significantly underrepresented. This section explores the rare instances of their portrayal, analyzing for accuracy, stigma, and impact. For example, the character of Percy Jackson has been praised for positively framing ADHD and Dyslexia as strengths in a different context."
  },
  {
    title: "Authenticity in Casting and Creation",
    summary: "The importance of including neurodivergent voices in the creative process, from writing to acting.",
    content: "'Nothing about us, without us.' This principle is crucial for authentic storytelling. We present case studies of productions that have successfully involved neurodivergent talent, both on-screen and behind the scenes. The results show a marked improvement in character depth, nuance, and audience reception. Shows like 'Everything's Gonna Be Okay' are prime examples of this collaborative success."
  }
];

export const researchChartData: ChartData[] = [
  { name: 'Savant Trope', value: 65 },
  { name: 'Socially Awkward', value: 80 },
  { name: 'Non-Verbal', value: 25 },
  { name: 'Female Representation', value: 15 },
  { name: 'Daily Struggles', value: 35 },
  { name: 'Authentic Casting', value: 10 },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "A neurodivergent character is introduced. Their primary role in the story is to solve a complex problem using a unique, savant-like skill. What is a potential issue with this portrayal?",
    options: [
      "It showcases a positive trait.",
      "It reduces the character to a single 'superpower', ignoring their full humanity.",
      "It makes the character memorable.",
      "It provides good plot motivation."
    ],
    correctOption: 1,
    explanation: "This is a common trope known as the 'magical neurodivergent' or 'savant'. While seemingly positive, it can be reductive, creating unrealistic expectations and overlooking the character's personality, struggles, and relationships beyond their special skill."
  },
  {
    id: 2,
    question: "When writing a scene where a character experiences sensory overload, what is the MOST effective approach to ensure authenticity?",
    options: [
      "Show them yelling and running away.",
      "Focus on the external chaos causing the overload.",
      "Consult with neurodivergent individuals and use specific sensory details (light, sound, texture) from their perspective.",
      "Have another character explain what's happening to the audience."
    ],
    correctOption: 2,
    explanation: "Authenticity comes from lived experience. Consulting with neurodivergent people is crucial. Portraying the overload from the character's internal, sensory perspective (e.g., the hum of a light becoming a roar, a scratchy tag feeling like sandpaper) is more impactful than just showing the external reaction."
  },
  {
    id: 3,
    question: "A film's plot revolves around 'curing' a character's neurodivergence so they can live a 'normal' life. Why is this narrative considered harmful?",
    options: [
      "It provides a hopeful ending.",
      "It's a classic character arc of overcoming adversity.",
      "It reflects a real-world medical approach.",
      "It implies that being neurodivergent is a tragedy to be fixed, rather than a valid way of being."
    ],
    correctOption: 3,
    explanation: "The 'cure' narrative is widely rejected by neurodiversity advocates. It frames neurodivergence as a flaw or disease, promoting harmful ideas of conformity. More authentic stories focus on acceptance, accommodation, and the character learning to thrive as themselves."
  }
];