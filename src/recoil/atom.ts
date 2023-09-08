import { atom } from 'recoil';

export interface Sick {
  sickCd: string;
  sickNm: string;
}

export const searchHistoryAtom = atom<Array<string> | null>({
  key: 'searchHistoryAtom',
  default: null,
});

export const apiResponseAtom = atom<Sick[] | null>({
  key: 'apiResponseAtom',
  default: null,
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

export const exposedKeywordAtom = atom<string>({
  key: 'exposedKeywordAtom',
  default: '',
});

export const loadingAtom = atom<boolean>({
  key: 'loadingAtom',
  default: false,
});

export const initializingAtom = atom<boolean>({
  key: 'initializingAtom',
  default: true,
});
