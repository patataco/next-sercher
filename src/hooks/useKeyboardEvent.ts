import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  apiResponseAtom,
  exposedKeywordAtom,
  indexAtom,
  modalStatusAtom,
  searchHistoryAtom,
  searchKeywordAtom,
} from '@/recoil/atom';

const useKeyboardEvent = () => {
  const [query, setQuery] = useRecoilState(searchKeywordAtom);
  const setExposedKeyword = useSetRecoilState(exposedKeywordAtom);
  const results = useRecoilValue(apiResponseAtom);
  const searchHistoryList = useRecoilValue(searchHistoryAtom);
  const [index, setIndex] = useRecoilState(indexAtom);
  const setIsOpen = useSetRecoilState(modalStatusAtom);

  useEffect(() => {
    setIndex(-1);
  }, [query, setIndex]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    const getListMaxLength = () => {
      if (query.length > 0 && results) {
        return Math.min(results.length, 7);
      }
      if (query.length < 0 && searchHistoryList) {
        return Math.min(searchHistoryList.length, 7);
      }
      return 7;
    };

    const maxLength = getListMaxLength();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIndex((prev) => (prev + 1) % maxLength);
        if (query.length > 0) {
          if (results) {
            const keyword = results[(index + 1) % maxLength].sickNm;
            setExposedKeyword(keyword);
          }
        } else {
          if (searchHistoryList) {
            const reverseArray = [...searchHistoryList].reverse();
            const keyword = reverseArray[(index + 1) % maxLength];
            setExposedKeyword(keyword);
          }
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        setIndex((prev) => (prev - 1 + maxLength) % maxLength);
        if (query.length > 0) {
          if (results) {
            const keyword = results[(index - 1) % maxLength].sickNm;
            setExposedKeyword(keyword);
          } else return;
        } else {
          if (searchHistoryList) {
            const reverseArray = [...searchHistoryList].reverse();
            const keyword = reverseArray[(index - 1) % maxLength];
            setExposedKeyword(keyword);
          } else return;
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIndex(-1);
        setQuery('');
        setExposedKeyword('');
        break;

      default:
        setIsOpen(true);
        break;
    }
  };
  return { handleKeyDown };
};

export default useKeyboardEvent;
