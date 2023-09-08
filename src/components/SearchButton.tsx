import Button from '@/components/Button';
import SearchIcon from '@/components/SearchIcon';

const SearchButton = () => {
  return (
    <Button className="h-12 w-12 rounded-full bg-[#007CE9] p-3.5">
      <SearchIcon color={'#FFFFFF'} />
    </Button>
  );
};
export default SearchButton;
