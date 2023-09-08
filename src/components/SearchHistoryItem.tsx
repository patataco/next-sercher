import SearchIcon from '@/components/SearchIcon';

const SearchHistoryItem = ({
  item,
  isFocus,
}: {
  item: string;
  isFocus: boolean;
}) => {
  return (
    <li className={`${isFocus ? 'bg-gray-300' : ''} flex w-full items-center`}>
      <div className="pl-5">
        <SearchIcon width={16} height={16} color={'#6b7280'} />
      </div>
      <div className="flex-1 p-3">{item}</div>
    </li>
  );
};

export default SearchHistoryItem;
