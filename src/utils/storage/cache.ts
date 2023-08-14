import type { CreateStorageOptions } from './types';
import { AesEncryption } from './cipher';
import config from './config';

const { DEFAULT_CACHE_PREFIX, DEFAULT_CACHE_TIME, DEFAULT_CACHE_CIPHER, ENABLE_ENCRYPTION } = config;

export function createUniappStorage(options: CreateStorageOptions = {}) {
  const {
    prefix = DEFAULT_CACHE_PREFIX,
    key = DEFAULT_CACHE_CIPHER.key,
    iv = DEFAULT_CACHE_CIPHER.iv,
    hasEncrypt = ENABLE_ENCRYPTION,
    timeout = DEFAULT_CACHE_TIME
  } = options;

  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  class UniappStorage {
    private readonly prefix?: string;
    private readonly encryption: AesEncryption;
    private readonly hasEncrypt: boolean;

    constructor() {
      this.prefix = prefix;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    private getKey(key: string) {
      return `${this.prefix}${key}`.toUpperCase();
    }

    get length() {
      return uni.getStorageInfoSync().keys.length;
    }

    clear() {
      return uni.clearStorageSync();
    }

    getItem(key: string): string | null {
      const storageValue = uni.getStorageSync(this.getKey(key));
      if (storageValue === undefined || storageValue === null) return null;

      try {
        const decryptValue = this.hasEncrypt ? this.encryption.decryptByAes(storageValue) : storageValue;
        const data = JSON.parse(decryptValue);
        const { value, expire } = data;
        if (expire !== undefined && expire !== null && expire < new Date().getTime()) {
          this.removeItem(key);
          return null;
        }
        return value;
      } catch (err) {
        return null;
      }
    }

    key(index: number): string | null {
      return uni.getStorageInfoSync().keys[index] || null;
    }

    removeItem(key: string) {
      uni.removeStorageSync(this.getKey(key));
    }

    setItem(key: string, value: any, expire: number | null = timeout) {
      try {
        const stringData = JSON.stringify({
          value,
          time: Date.now(),
          expire: expire !== null ? new Date().getTime() + expire * 1000 : null
        });
        const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAes(stringData) : stringData;

        uni.setStorageSync(this.getKey(key), stringifyValue);
      } catch (err) {
        throw new Error(`setStorageSync error: ${err}`);
      }
    }
  }

  return new UniappStorage();
}
