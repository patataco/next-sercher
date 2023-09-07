import { useRecoilState } from 'recoil';

import { searchHistoryAtom } from '@/recoil/atom';

interface SearchHistory {
  getWordInLocalStorage: () => string[];
  setWordInLocalStorage: (word: string) => void;
  searchedWords: string[];
  deleteWordInLocalStorage: (word: string) => void;
}

const useSearchHistory = (): SearchHistory => {
  const [searchedWords, setSearchedWords] = useRecoilState(searchHistoryAtom);
  const getWordInLocalStorage = () => {
    const savedWords: string | null = localStorage.getItem('savedWord');
    if (savedWords) {
      const savedWordsArray: string[] = JSON.parse(savedWords);
      setSearchedWords(savedWordsArray);
    }
    return [];
  };

  const setWordInLocalStorage = (word: string) => {
    const savedWords = localStorage.getItem('savedWord');
    if (savedWords) {
      const savedWordsArray: string[] = JSON.parse(savedWords);

      const isDuplicated = savedWordsArray.includes(word);
      if (!isDuplicated) {
        const updatedWordArray = [...savedWordsArray, word];
        localStorage.setItem('savedWord', JSON.stringify(updatedWordArray));
        setSearchedWords(updatedWordArray);
      }
      return;
    } else {
      const wordArray = [word];
      localStorage.setItem('savedWord', JSON.stringify(wordArray));
      setSearchedWords(wordArray);
    }
  };

  const deleteWordInLocalStorage = (word: string) => {
    const updatedWordArray = searchedWords.filter((item) => {
      return item !== word;
    });
    localStorage.setItem('savedWord', JSON.stringify(updatedWordArray));
    setSearchedWords(updatedWordArray);
  };

  return {
    setWordInLocalStorage,
    getWordInLocalStorage,
    searchedWords,
    deleteWordInLocalStorage,
  };
};

export default useSearchHistory;
