export default {
  // 默认本地缓存时间(30天)
  DEFAULT_CACHE_TIME: 60 * 60 * 24 * 30,
  // 默认本地缓存前缀
  DEFAULT_CACHE_PREFIX: 'UNI-CLI-',
  // AES加密秘钥
  DEFAULT_CACHE_CIPHER: {
    key: 'n3YWb-8jM2~p@pmE',
    iv: '61F4vP04C2P6AC^a'
  },
  // 本地缓存是否加密(默认生产环境加密)
  ENABLE_ENCRYPTION: import.meta.env.PROD
};
