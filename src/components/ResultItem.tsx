import { Sick } from '@/recoil/atom';

const ResultItem = ({
  result,
  isFocus,
}: {
  result: Pick<Sick, 'sickNm'>;
  isFocus: boolean;
}) => {
  return (
    <li className={`${isFocus ? 'bg-amber-950' : ''}`}>{result.sickNm}</li>
  );
};

export default ResultItem;
