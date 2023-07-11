import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';
import unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const ENV_DIR = resolve(process.cwd(), 'env');
  const { VITE_APP_NAME } = loadEnv(mode, ENV_DIR);
  console.log(VITE_APP_NAME);

  return defineConfig({
    envDir: ENV_DIR,
    plugins: [uni(), unocss()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(process.cwd(), 'src')
        }
      ]
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      proxy: {
        '/api': {
          target: 'https://xxx.com/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      watch: {
        exclude: ['node_modules/**', '/__uno.css']
      },
      chunkSizeWarningLimit: 1500,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].${new Date().getTime()}.js`,
          chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
          assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
          compact: true
        }
      }
    }
  });
};
