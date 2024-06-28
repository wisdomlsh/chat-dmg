import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import crypto from 'crypto';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig((env) => {
  return {
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        '@': path.resolve(process.cwd() , 'src'),
      },
    },
    plugins: [react(), createSvgIconsPlugin({
      // eslint-disable-next-line no-undef
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]',
    }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {} // 更改主题
        },
      },
      modules: {
        localsConvention: 'camelCase', // 类名转换小驼峰
        scopeBehaviour: 'local',  // 本地
        globalModulePaths: [/\.global\.less$/],  // 全局处理样式
        exportGlobals: true,
        generateScopedName: (name, filename, css) => {
          const match = filename.match(/src\/(.+?)\/index\.module\.less/);
          if (match) {
            const folderName = match[1].split('/').pop();
            const hash = crypto.createHash('md5').update(css).digest('base64').substring(0, 5).replace(/[+/]/g, '_');
            return `${folderName}_${name}_${hash}`;
          }
          const hash = crypto.createHash('md5').update(css).digest('base64').substring(0, 5).replace(/[+/]/g, '_');
          return `${name}_${hash}`;
        }, // 自定义cssmodule转换类名
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
          rewrite: path => path.replace('/api', '/'),
        },
      },

    },
    build: {
      minify: 'esbuild',
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // 提取 .pnpm 目录中的正确包名
              const match = id.match(/node_modules\/\.pnpm\/([^@]+@[^/]+)\//);
              if (match) {
                return match[1];
              } else {
                // 提取 node_modules 目录中的正确包名
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
            }
          },
        },
      },
      sourcemap: env.mode === 'development' ? true : false,
      target: 'es2015',
    }

  }
})
