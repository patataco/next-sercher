import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  apiResponseAtom,
  indexAtom,
  modalStatusAtom,
  searchHistoryAtom,
  searchKeywordAtom,
} from '@/recoil/atom';

const useKeyboardEvent = () => {
  const [query, setQuery] = useRecoilState(searchKeywordAtom);
  const results = useRecoilValue(apiResponseAtom);
  const searchHistoryList = useRecoilValue(searchHistoryAtom);
  const setIndex = useSetRecoilState(indexAtom);
  const setIsOpen = useSetRecoilState(modalStatusAtom);

  useEffect(() => {
    setIndex(-1);
  }, [query]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    const getListMaxLength = () => {
      if (query.length > 0) {
        return Math.min(results.length, 7);
      }
      return Math.min(searchHistoryList.length, 7);
    };

    const maxLength = getListMaxLength();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIndex((prev) => (prev + 1) % maxLength);
        break;

      case 'ArrowUp':
        e.preventDefault();
        setIndex((prev) => (prev - 1 + maxLength) % maxLength);
        break;

      case 'Escape':
        e.preventDefault();
        setIndex(-1);
        setIsOpen(false);
        setQuery('');
        break;

      default:
        setIsOpen(true);
        break;
    }
  };
  return { handleKeyDown };
};

export default useKeyboardEvent;
