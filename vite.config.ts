import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import DefineOptions from 'unplugin-vue-define-options/vite';
import Uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';

export default ({ mode }: ConfigEnv) => {
  const ENV_PATH = resolve(__dirname, 'env');
  const { VITE_APP_NAME } = loadEnv(mode, ENV_PATH);
  console.log(`[${VITE_APP_NAME}]: start`);

  return defineConfig({
    envDir: ENV_PATH,
    plugins: [Uni(), Unocss(), DefineOptions()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src')
        }
      ]
    },
    build: {
      watch: {
        exclude: ['node_modules/**', '/__uno.css']
      }
    }
  });
};
