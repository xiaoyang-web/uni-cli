import type { EncryptionOptions } from './types';
import { encrypt, decrypt } from 'crypto-js/aes';
import UTF8, { parse } from 'crypto-js/enc-utf8';
import PKCS7 from 'crypto-js/pad-pkcs7';
import ECB from 'crypto-js/mode-ecb';

/*
 * AES 加密解密
 */
export class AesEncryption {
  private readonly key;
  private readonly iv;

  constructor(options: EncryptionOptions) {
    const { key, iv } = options;
    if (key !== '' && key !== undefined) {
      this.key = parse(key);
    }
    if (iv !== '' && iv !== undefined) {
      this.iv = parse(iv);
    }
  }

  get options() {
    return {
      mode: ECB,
      padding: PKCS7,
      iv: this.iv
    };
  }

  encryptByAes(cipherText: string) {
    if (this.key === undefined) return;
    return encrypt(cipherText, this.key, this.options).toString();
  }

  decryptByAes(cipherText: string) {
    if (this.key === undefined) return;
    return decrypt(cipherText, this.key, this.options).toString(UTF8);
  }
}
