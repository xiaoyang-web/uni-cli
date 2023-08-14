export interface EncryptionOptions {
  key?: string;
  iv?: string;
}
export interface CreateStorageOptions extends EncryptionOptions {
  prefix?: string;
  hasEncrypt?: boolean;
  timeout?: number;
}
