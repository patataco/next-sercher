class CacheManager {
  private cache: Map<string, { value: any; expire: number }> = new Map();

  set(key: string, value: any, duration: number) {
    const expire = Date.now() + duration;
    this.cache.set(key, { value, expire });
  }

  get(key: string) {
    const cached = this.cache.get(key);
    if (!cached) return undefined;

    if (Date.now() > cached.expire) {
      this.cache.delete(key);
      return undefined;
    }

    return cached.value;
  }

  has(key: string) {
    return !!this.get(key);
  }

  delete(key: string) {
    this.cache.delete(key);
  }
}

const cacheManager = new CacheManager();
export default cacheManager;
