import { atom } from 'recoil';

export interface Sick {
  sickCd: string;
  sickNm: string;
}

export const searchHistoryAtom = atom<Array<string>>({
  key: 'searchHistoryAtom',
  default: [],
});

export const apiResponseAtom = atom<Sick[]>({
  key: 'apiResponseAtom',
  default: [],
});

export const searchKeywordAtom = atom<string>({
  key: 'searchKeywordAtom',
  default: '',
});

export const modalStatusAtom = atom<boolean>({
  key: 'modalStatusAtom',
  default: false,
});

export const indexAtom = atom<number>({
  key: 'indexAtom',
  default: -1,
});
