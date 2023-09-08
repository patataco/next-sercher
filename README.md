# 원티드 프리온보딩 3주차 - 검색창 + 검색어 추천 기능 구현

## 📚 과제

### 검색창 + 검색어 추천 기능 구현

#### 과제1. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- 검색한 질환명으로 추천 검색어 목록 가져오기 API 활용
- 추천 검색어가 없을 시 검색어 없음 표시

#### 과제2. API 호출 별로 Local caching 구현

- 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
- 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
- expire time을 구현할 경우 가산점
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
- API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

#### 과제3. 키보드만으로 추천 검색어들로 이동 가능하도록 구현


---

## 사용한 기술 스택

<img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square"/> <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=Tailwind%20CSS&logoColor=white"/> <img src="https://img.shields.io/badge/axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/recoil-5277C3?style=flat-square&logo=recoil&logoColor=white"/>
</br>

---

## 프로젝트 실행 방법

```
npm install
npm run dev

```

---

## 데모영상

Vercel을 통해 배포. [DEMO](https://next-sercher.vercel.app/)

---

## 구조

```
 src
├──  components
│   ├──  Button.tsx
│   ├──  DropDown.tsx
│   ├──  Input.tsx
│   ├──  Loading.tsx
│   ├──  ResultItem.tsx
│   ├──  ResultsList.tsx
│   ├──  SearchBar.tsx
│   ├──  SearchButton.tsx
│   ├──  SearchHistoryItem.tsx
│   ├──  SearchHistoryList.tsx
│   └──  SearchIcon.tsx
├──  hooks
│   ├──  useDebounce.ts
│   ├──  useKeyboardEvent.ts
│   └──  useSearchHistory.ts
├──  pages
│   ├──  _app.tsx
│   ├──  _document.tsx
│   ├──  api
│   │   └──  hello.ts
│   └──  index.tsx
├──  recoil
│   └──  atom.ts
├──  service
│   └──  axios.ts
├──  styles
│   └──  globals.css
└──  utils
    └──  CacheManager.ts

```
---

## 💭 설계 방향

#### 설계 목표

- debounce를 활용하여 Api 호출 횟수 조절, fetching 한 data는 Map 객체로 캐싱하여 중복 호출 방지
- localstorage에 최근 검색한 검색어 30개 limit으로 저장하여 검색 input창 최초 focus 시 최근 검색어 제공하도록 함
- keydown이벤트 + keyboard hook을 만들어 arrow, escape 등 키보드를 활용하여 검색어 목록 이동 가능하게 함

#### 구현 방법

1. 전역에서 사용될 데이터가 많아 전역 상태 라이브러리인 recoil 활용
2. 추천 검색어 목록의 경우 persist하게 캐싱할 필요는 없을 것으로 판단되어 Map 객체 클래스를 활용
3. 반대로 최근 검색 이력의 경우 앱 재구동 시에도 활용할 데이터라 판단되어 localStorage에 저장하였다.

## 🛠️ 설계 및 구현 설명

### 1. Debounce API 호출 설계 및 로컬 캐싱을 활용한 최적화

#### 설계 및 개발 방향

API 호출 시, 사용자의 입력마다 즉시 네트워크 요청을 보내는 것은 리소스를 많이 사용하게 되므로, 이를 최적화하기 위해 debounce 방식을 도입하였습니다. 또한, 이전에 요청한 데이터는 Map 객체를 사용하여 캐싱하여 재요청을 줄였습니다. 이를 통해 네트워크 부하를 줄이고 사용자에게 빠른 반응성을 제공하였습니다.

- useDebounce 훅을 사용하여 사용자의 입력을 기다린 후 일정 시간이 경과하면 API 요청을 보냅니다. 이로 인해 불필요한 API 호출을 크게 줄일 수 있습니다.
- 검색 결과는 사용자가 입력한 키워드와 가장 연관성이 높은 결과부터 표시하도록 정렬하였습니다. 이를 위해 axios의 interceptors를 활용하여 요청 전과 후에 특정 로직을 수행합니다.
    - request 시: 사용자의 검색어를 queryString에 저장
    - response 시: 저장된 검색어를 기반으로 결과를 정렬
- 검색 결과는 Map 객체를 활용하여 캐싱합니다. 이를 통해 동일한 검색어에 대한 요청을 다시 보내지 않고, 캐싱된 데이터를 활용하여 사용자에게 빠른 응답을 제공합니다.


### 2. LocalStorage를 활용한 최근 검색어 관리 및 제공

#### 설계 및 개발 방향

사용자의 검색 효율을 높이기 위해, 사용자가 이전에 검색했던 검색어를 localStorage에 저장하였습니다. 이를 통해 사용자가 검색 입력창에 포커스를 줄 때마다 최근 검색했던 검색어 목록을 빠르게 확인하고 선택할 수 있도록 도움을 제공합니다.

- 최근 검색어는 30개까지만 저장되며, 31번째 검색어가 추가될 때 가장 오래된 검색어부터 제거됩니다.
- `useSearchHistory` 훅을 구현하여 localStorage의 검색어 관련 동작을 캡슐화하였습니다.
    - setWordInLocalStorage: 새로운 검색어를 localStorage에 추가하는 함수입니다. 만약 저장된 검색어가 30개를 초과하면, 가장 오래된 검색어부터 제거됩니다.
    - getWordInLocalStorage: localStorage에서 저장된 검색어 목록을 불러오는 함수입니다.
    - deleteWordInLocalStorage: 특정 검색어를 localStorage에서 제거하는 함수입니다.
- 검색창 컴포넌트에서는 사용자가 키워드를 제출할 때 setWordInLocalStorage 함수를 호출하여 검색어를 저장합니다.

### 3. 키보드 이벤트를 활용한 검색어 목록 탐색

#### 설계 및 개발 방향

검색 입력창을 통해 사용자는 추천되는 검색어 목록을 쉽게 탐색할 수 있도록, 키보드만으로의 이동 기능을 추가하였습니다. 이 기능은 사용자에게 더 나은 접근성과 사용성을 제공하고자 설계되었습니다.

- useKeyboardEvent 훅은 주요 로직을 포함하고 있습니다. 이 훅에서는 사용자의 키보드 입력에 따라 어떤 동작을 해야하는지 결정하게 됩니다.
    - ArrowDown 키: 추천 검색어 목록에서 아래로 이동합니다. 마지막 항목에 도달한 경우 처음 항목으로 되돌아갑니다.
    - ArrowUp 키: 추천 검색어 목록에서 위로 이동합니다. 첫 번째 항목에서 이전으로 이동할 경우 마지막 항목으로 이동합니다.
    - Escape 키: 검색 입력을 초기화하고, 모든 추천 검색어 목록을 숨깁니다.
- useRecoilState와 같은 Recoil 훅들은 상태 관리를 위해 사용되었습니다. 특히 indexAtom은 현재 선택된 검색어의 인덱스를 관리합니다.
- 검색어 목록의 최대 길이는 getListMaxLength 함수를 통해 계산됩니다. 이는 사용자가 입력한 쿼리의 길이, 결과, 그리고 검색 기록 목록에 따라 달라집니다.
- 키보드로 추천 검색어 목록을 탐색하며 현재 선택된 검색어는 입력창에 실시간으로 반영됩니다.

이러한 방식으로, 사용자는 키보드만으로 검색어 목록을 효과적으로 탐색할 수 있으며, 선택한 검색어를 입력창에 빠르게 적용할 수 있습니다. 이는 특히 키보드 중심의 사용자에게 더 나은 사용 경험을 제공합니다.



