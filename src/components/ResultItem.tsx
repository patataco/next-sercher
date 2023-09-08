import { useRecoilValue } from 'recoil';

import SearchIcon from '@/components/SearchIcon';
import { apiResponseAtom, Sick } from '@/recoil/atom';

const ResultItem = ({
  result,
  isFocus,
}: {
  result: Pick<Sick, 'sickNm'>;
  isFocus: boolean;
}) => {
  const results = useRecoilValue(apiResponseAtom);
  if (!results) return;

  return (
    <li className={`${isFocus ? 'bg-gray-300' : ''} flex w-full items-center`}>
      <div className="pl-5">
        <SearchIcon width={16} height={16} color={'#6b7280'} />
      </div>
      <div className="flex-1 p-3">{result.sickNm}</div>
    </li>
  );
};

export default ResultItem;
