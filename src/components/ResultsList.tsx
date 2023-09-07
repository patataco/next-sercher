import { forwardRef } from 'react';
import { useRecoilValue } from 'recoil';

import ResultItem from '@/components/ResultItem';
import { apiResponseAtom, indexAtom } from '@/recoil/atom';

const ResultsList = forwardRef<HTMLUListElement>((_, ref) => {
  const results = useRecoilValue(apiResponseAtom);
  const index = useRecoilValue(indexAtom);
  return (
    <div className="h-80 w-80 bg-amber-400">
      <ul ref={ref}>
        {results.slice(0, 7).map(({ sickNm }, i) => {
          return (
            <ResultItem key={i} isFocus={index === i} result={{ sickNm }} />
          );
        })}
      </ul>
    </div>
  );
});

export default ResultsList;
ResultsList.displayName = 'ResultsList';
