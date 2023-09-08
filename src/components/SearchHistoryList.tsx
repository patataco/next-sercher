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

  if (!searchedWords) return;

  const reverseArray = [...searchedWords].reverse();

  return (
    <div className="flex w-[440px] flex-col gap-3 rounded-2xl bg-white ">
      <div className="px-5 pt-5 text-sm text-gray-400">최근 검색어</div>
      {searchedWords.length === 0 ? (
        <div className="flex w-full items-center px-5 py-4 text-base text-gray-500">
          최근 검색어가 없습니다.
        </div>
      ) : (
        <ul ref={ref} className="pb-2 text-lg">
          {reverseArray.slice(0, 7).map((history, i) => {
            return (
              <SearchHistoryItem key={i} item={history} isFocus={index === i} />
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default SearchHistoryList;
SearchHistoryList.displayName = 'SearchHistoryList';
