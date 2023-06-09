import type { PiniaPluginContext } from 'pinia';
import { storage } from '@/utils/storage';

export interface PersistStrategy {
  key?: string;
  paths?: string[];
}

export interface PersistOptions {
  enabled: true;
  strategies?: PersistStrategy[];
}

type Store = PiniaPluginContext['store'];
type PartialState = Partial<Store['$state']>;

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions;
  }
}

export const updateStorage = (strategy: PersistStrategy, store: Store) => {
  const storeKey = strategy.key || store.$id;

  if (strategy.paths) {
    const partialState = strategy.paths.reduce((finalObj, key) => {
      finalObj[key] = store.$state[key];
      return finalObj;
    }, {} as PartialState);
    storage.set(storeKey, JSON.stringify(partialState));
  } else {
    storage.set(storeKey, JSON.stringify(store.$state));
  }
};

export default ({ options, store }: PiniaPluginContext): void => {
  if (options.persist?.enabled) {
    const defaultStrat: PersistStrategy[] = [{ key: store.$id }];

    const strategies = options.persist?.strategies?.length
      ? options.persist?.strategies
      : defaultStrat;

    strategies.forEach((strategy) => {
      const storeKey = strategy.key || store.$id;
      const storageResult = storage.get(storeKey);

      if (storageResult) {
        store.$patch(JSON.parse(storageResult));
        updateStorage(strategy, store);
      }
    });

    store.$subscribe(() => {
      strategies.forEach((strategy) => {
        updateStorage(strategy, store);
      });
    });
  }
};
