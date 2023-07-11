import type { CreateStorageOptions } from './types';
import { createStorage } from './cache';
import config from './config';

const { DEFAULT_CACHE_CIPHER, DEFAULT_CACHE_PREFIX, DEFAULT_CACHE_TIME, ENABLE_ENCRYPTION } =
  config;
const options: Partial<CreateStorageOptions> = {
  prefix: DEFAULT_CACHE_PREFIX,
  key: DEFAULT_CACHE_CIPHER.key,
  iv: DEFAULT_CACHE_CIPHER.iv,
  hasEncrypt: ENABLE_ENCRYPTION,
  timeout: DEFAULT_CACHE_TIME
};

export const storage = createStorage(options);
