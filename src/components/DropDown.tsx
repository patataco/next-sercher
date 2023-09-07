import { forwardRef } from 'react';
import { useRecoilValue } from 'recoil';

import ResultsList from '@/components/ResultsList';
import SearchHistoryList from '@/components/SearchHistoryList';
import { searchKeywordAtom } from '@/recoil/atom';

const DropDown = forwardRef<HTMLUListElement>((_, ref) => {
  const query = useRecoilValue(searchKeywordAtom);

  return query.length > 0 ? (
    <ResultsList ref={ref} />
  ) : (
    <SearchHistoryList ref={ref} />
  );
});

export default DropDown;

DropDown.displayName = 'DropDown';
