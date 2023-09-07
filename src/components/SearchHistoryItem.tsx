const SearchHistoryItem = ({
  item,
  isFocus,
}: {
  item: string;
  isFocus: boolean;
}) => {
  return (
    <li className={`${isFocus ? 'bg-red-400' : ''}`}>
      <div>{item}</div>
    </li>
  );
};

export default SearchHistoryItem;
