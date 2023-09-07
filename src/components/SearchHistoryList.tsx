import { forwardRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import useSearchHistory from '@/hooks/useSearchHistory';
import { indexAtom } from '@/recoil/atom';

import SearchHistoryItem from './SearchHistoryItem';

const SearchHistoryList = forwardRef<HTMLUListElement>((_, ref) => {
  const { getWordInLocalStorage, searchedWords } = useSearchHistory();
  const index = useRecoilValue(indexAtom);
  useEffect(() => {
    getWordInLocalStorage();
  }, []);
  console.log(index);
  if (!searchedWords) return;
  return (
    <div className="h-80 w-80 bg-blue-800">
      <ul ref={ref}>
        {searchedWords.slice(0, 7).map((history, i) => {
          return (
            <SearchHistoryItem key={i} item={history} isFocus={index === i} />
          );
        })}
      </ul>
    </div>
  );
});

export default SearchHistoryList;
SearchHistoryList.displayName = 'SearchHistoryList';
