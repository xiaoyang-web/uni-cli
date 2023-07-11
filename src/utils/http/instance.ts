import AdapterUniapp, { type UniappConfig } from '@alova/adapter-uniapp';
import { createAlova } from 'alova';
import { checkStatus } from './checkStatus';
import type { Ref } from 'vue';

const alovaInstance = createAlova<
  Ref<unknown>,
  Ref<unknown>,
  UniappConfig,
  | UniApp.RequestSuccessCallbackResult
  | UniApp.UploadFileSuccessCallbackResult
  | UniApp.DownloadSuccessData,
  any
>({
  ...AdapterUniapp(),
  timeout: 15000,
  responded: {
    onSuccess(response) {
      const { statusCode, data: rawData } = response as UniNamespace.RequestSuccessCallbackResult;
      if (statusCode === 200) {
        return rawData;
      } else {
        checkStatus(statusCode);
        return rawData;
      }
    },
    onError(error) {
      throw new Error(error.message);
    }
  }
});

export const request = alovaInstance;
