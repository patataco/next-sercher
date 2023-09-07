import axios from 'axios';

import { Sick } from '@/recoil/atom';
import cacheManager from '@/utils/CacheManager';

export const apiClient = axios.create({
  baseURL: 'https://search-api-server.vercel.app/',
});
const queryString: { query?: string } = {};
apiClient.interceptors.request.use((config) => {
  if (config.params && config.params.q) {
    queryString['query'] = config.params.q;
  }
  return config;
});
apiClient.interceptors.response.use((response) => {
  const query = queryString.query;
  if (query) {
    response.data.sort((a: Sick, b: Sick) => {
      const startsWithA = a.sickNm.startsWith(query);
      const startsWithB = b.sickNm.startsWith(query);
      if (!startsWithA && startsWithB) {
        return 1;
      } else if (startsWithA && !startsWithB) {
        return -1;
      }
      return 0;
    });
  }
  return response;
});
export const getSickList = async (param: string) => {
  if (!param || param.length === 0) return [];
  const config = {
    params: { q: param },
  };
  const cacheKey = `sick_${param}`;

  if (cacheManager.has(cacheKey)) {
    return cacheManager.get(cacheKey);
  }
  try {
    const res = await apiClient.get('/sick', config);
    console.info('calling api');
    cacheManager.set(cacheKey, res.data, 10 * 60 * 1000);
    return res.data;
  } catch (e) {
    console.error(e);
    if (cacheManager.has(cacheKey)) {
      cacheManager.delete(cacheKey);
    }
  }
};
