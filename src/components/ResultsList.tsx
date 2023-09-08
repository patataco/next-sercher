import { forwardRef } from 'react';
import { useRecoilValue } from 'recoil';

import Loading from '@/components/Loading';
import ResultItem from '@/components/ResultItem';
import SearchIcon from '@/components/SearchIcon';
import {
  apiResponseAtom,
  indexAtom,
  loadingAtom,
  searchKeywordAtom,
} from '@/recoil/atom';

const ResultsList = forwardRef<HTMLUListElement>((_, ref) => {
  const results = useRecoilValue(apiResponseAtom);
  const isLoading = useRecoilValue(loadingAtom);
  const index = useRecoilValue(indexAtom);
  const query = useRecoilValue(searchKeywordAtom);

  if (!results) return;
  return (
    <div className="flex w-[440px] flex-col rounded-2xl bg-white">
      <div className="flex items-center px-5 pt-5">
        <SearchIcon color={'#6b7280'} width={16} height={16} />
        <p className="px-3 text-lg">{query}</p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="px-5 pt-6 text-sm text-gray-400">추천 검색어</div>
          {results.length === 0 ? (
            <div className="flex w-full items-center px-5 py-4 text-base text-gray-500">
              추천 검색어가 없습니다.
            </div>
          ) : (
            <ul ref={ref} className="pb-2 text-lg">
              {results.slice(0, 7).map(({ sickNm }, i) => {
                return (
                  <ResultItem
                    key={i}
                    isFocus={index === i}
                    result={{ sickNm }}
                  />
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
});

export default ResultsList;
ResultsList.displayName = 'ResultsList';
