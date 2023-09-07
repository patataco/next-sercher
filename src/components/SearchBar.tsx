import React, { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import DropDown from '@/components/DropDown';
import Input from '@/components/Input';
import { useDebounce } from '@/hooks/useDebounce';
import useKeyboardEvent from '@/hooks/useKeyboardEvent';
import useSearchHistory from '@/hooks/useSearchHistory';
import {
  apiResponseAtom,
  modalStatusAtom,
  searchKeywordAtom,
} from '@/recoil/atom';
import { getSickList } from '@/service/axios';

import Button from './Button';

const SearchBar = () => {
  const [query, setQuery] = useRecoilState(searchKeywordAtom);
  const [isOpen, setIsOpen] = useRecoilState(modalStatusAtom);
  const [results, setResults] = useRecoilState(apiResponseAtom);
  const { setWordInLocalStorage } = useSearchHistory();
  const { handleKeyDown } = useKeyboardEvent();
  const debouncedQuery = useDebounce(query, 300);
  const autoRef = useRef<HTMLUListElement>(null);
  const fetchSickList = async () => {
    console.log('query', debouncedQuery);
    const data = await getSickList(debouncedQuery);
    setResults(data);
  };

  useEffect(() => {
    if (debouncedQuery) {
      fetchSickList();
    } else {
      setResults([]); // 검색어가 비어 있을 경우 결과를 빈 배열로 설정
    }
  }, [debouncedQuery]);
  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeywordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWordInLocalStorage(query);
    setQuery('');
  };

  return (
    <div className="w-[600px]">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <form onSubmit={handleKeywordSubmit}>
          <Input
            type="text"
            placeholder="질병명을 입력하세요."
            onChange={handleInputValue}
            value={query}
            className="text-black"
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <Button type="submit">검색</Button>
        </form>
      </div>
      {isOpen && <DropDown ref={autoRef} />}
    </div>
  );
};
export default SearchBar;
