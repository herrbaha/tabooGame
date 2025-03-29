import { TabooWord } from '@/store/gameStore';
import tabooWordsData from '../assets/taboo_words.json';

export const TABOO_WORDS: TabooWord[] = tabooWordsData.map(item => ({
  word: item.word,
  tabooWords: item.clues,
  level: item.level 
}));
