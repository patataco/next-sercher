import React, { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import DropDown from '@/components/DropDown';
import Input from '@/components/Input';
import SearchButton from '@/components/SearchButton';
import { useDebounce } from '@/hooks/useDebounce';
import useKeyboardEvent from '@/hooks/useKeyboardEvent';
import useSearchHistory from '@/hooks/useSearchHistory';
import {
  apiResponseAtom,
  exposedKeywordAtom,
  loadingAtom,
  modalStatusAtom,
  searchKeywordAtom,
} from '@/recoil/atom';
import { getSickList } from '@/service/axios';

const SearchBar = () => {
  const [query, setQuery] = useRecoilState(searchKeywordAtom);
  const [isOpen, setIsOpen] = useRecoilState(modalStatusAtom);
  const setResults = useSetRecoilState(apiResponseAtom);
  const [exposedKeyword, setExposedKeyword] =
    useRecoilState(exposedKeywordAtom);
  const setIsLoading = useSetRecoilState(loadingAtom);
  const { setWordInLocalStorage } = useSearchHistory();
  const { handleKeyDown } = useKeyboardEvent();
  const debouncedQuery = useDebounce(query, 300);
  const autoRef = useRef<HTMLUListElement>(null);
  const searchAreaRef = useRef<HTMLDivElement>(null);
  const fetchSickList = async () => {
    const data = await getSickList(debouncedQuery);
    setResults(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (debouncedQuery) {
      fetchSickList();
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleCloseModal = (e: MouseEvent) => {
    if (isOpen && !searchAreaRef?.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleCloseModal);
    return () => {
      document.removeEventListener('click', handleCloseModal);
    };
  }, [isOpen]);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsLoading(true);
    setExposedKeyword(e.target.value);
  };

  const handleKeywordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWordInLocalStorage(query);
    resetKeyword();
  };

  const resetKeyword = () => {
    setQuery('');
    setExposedKeyword('');
  };

  return (
    <div className="mx-auto mt-96 flex w-[500px] flex-col items-center gap-3">
      <div className="w-full text-center text-[40px] font-black">
        국내 모든 임상시험 검색하고 <br />
        온라인으로 참여하기
      </div>
      <div className="flex w-full pt-8" ref={searchAreaRef}>
        <form
          onSubmit={handleKeywordSubmit}
          className={`flex w-full rounded-[99px] bg-white p-3 ${
            isOpen ? 'shadow-innerBorder' : ''
          }`}
        >
          <Input
            type="text"
            placeholder="질환명을 입력하세요."
            onChange={handleInputValue}
            value={exposedKeyword}
            className="h-full flex-1 pl-4 text-lg text-black outline-0"
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <div className="flex items-center gap-2">
            {isOpen && (
              <Button
                onClick={resetKeyword}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-base font-bold text-white"
              >
                x
              </Button>
            )}
            <SearchButton />
          </div>
        </form>
      </div>
      {isOpen && <DropDown ref={autoRef} />}
    </div>
  );
};
export default SearchBar;
