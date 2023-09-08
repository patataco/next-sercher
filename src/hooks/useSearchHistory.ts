import { useRecoilState } from 'recoil';

import { searchHistoryAtom } from '@/recoil/atom';

interface SearchHistory {
  getWordInLocalStorage: () => void;
  setWordInLocalStorage: (word: string) => void;
  searchedWords: string[] | null;
  deleteWordInLocalStorage: (word: string) => void;
}

const useSearchHistory = (): SearchHistory => {
  const [searchedWords, setSearchedWords] = useRecoilState(searchHistoryAtom);
  const getWordInLocalStorage = () => {
    const savedWords: string | null = localStorage.getItem('savedWord');
    if (savedWords) {
      const savedWordsArray: string[] = JSON.parse(savedWords);
      setSearchedWords(savedWordsArray);
    } else setSearchedWords([]);
  };

  const setWordInLocalStorage = (word: string) => {
    const savedWords = localStorage.getItem('savedWord');
    let updatedWordArray: string[] = [];

    if (savedWords) {
      const savedWordsArray: string[] = JSON.parse(savedWords);
      updatedWordArray = [...savedWordsArray, word];

      while (updatedWordArray.length > 30) {
        updatedWordArray.shift();
      }
    } else {
      updatedWordArray = [word];
    }

    localStorage.setItem('savedWord', JSON.stringify(updatedWordArray));
    setSearchedWords(updatedWordArray);
  };

  const deleteWordInLocalStorage = (word: string) => {
    if (searchedWords) {
      const updatedWordArray = searchedWords.filter((item) => item !== word);
      localStorage.setItem('savedWord', JSON.stringify(updatedWordArray));
      setSearchedWords(updatedWordArray);
    }
  };

  return {
    setWordInLocalStorage,
    getWordInLocalStorage,
    searchedWords,
    deleteWordInLocalStorage,
  };
};

export default useSearchHistory;
