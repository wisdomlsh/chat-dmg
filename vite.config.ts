import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import crypto from 'crypto';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig((env) => {
  return {
    base: '/chat/',
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    plugins: [
      react(),
      removeConsole(),
      createSvgIconsPlugin({
        // eslint-disable-next-line no-undef
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[name]',
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {}, // 更改主题
        },
      },
      modules: {
        localsConvention: 'camelCase', // 类名转换小驼峰
        scopeBehaviour: 'local', // 本地
        globalModulePaths: [/\.global\.less$/], // 全局处理样式
        exportGlobals: true,
        generateScopedName: (name, filename, css) => {
          // 自定义cssmodule转换类名
          const match = filename.match(/src\/(.+?)\/index\.module\.less/);
          if (match) {
            const folderName = match[1].split('/').pop();
            const hash = crypto
              .createHash('md5')
              .update(css)
              .digest('base64')
              .substring(0, 5)
              .replace(/[+/]/g, '_');
            return `${folderName}_${name}_${hash}`;
          }
          const hash = crypto
            .createHash('md5')
            .update(css)
            .digest('base64')
            .substring(0, 5)
            .replace(/[+/]/g, '_');
          return `${name}_${hash}`;
        },
        hashPrefix: 'neur',
      },
      devSourcemap: true, // css sourcemap
    },
    server: {
      host: '0.0.0.0', // 监听所有地址，包括局域网和公网地址
      port: 3002,
      open: false,
      proxy: {
        '/api': {
          target: 'https://cn.vitejs.dev',
          changeOrigin: true,
          rewrite: (path) => path.replace('/api', '/'),
        },
      },
    },
    build: {
      // 分包策略日后在继续优化
      minify: 'esbuild',
      rollupOptions: {
        output: {
          minifyInternalExports: true,
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            lodash: ['lodash'],
            react: ['react', 'react-dom', 'react-router-dom', 'antd'],
          },
        },
      },
      sourcemap: env.mode === 'development' ? true : false,
      target: 'es2015',
    },
  };
});
