import { createAlova } from 'alova';
import { checkStatus } from './checkStatus';
import { Toast } from '../functions/toast';
import AdapterUniapp from '@alova/adapter-uniapp';

const alovaInstance = createAlova({
  ...AdapterUniapp(),
  timeout: 15000,
  responded: {
    onSuccess(response) {
      const { statusCode, data: rawData } = response as UniNamespace.RequestSuccessCallbackResult;
      if (statusCode === 200) return rawData;
      try {
        checkStatus(statusCode);
      } catch (error: any) {
        Toast.show(error.message);
        console.error(error.message);
        return rawData;
      }
    },
    onError(error) {
      throw new Error(error.message);
    }
  }
});

export const request = alovaInstance;
