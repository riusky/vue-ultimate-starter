import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'
import Layouts from 'vite-plugin-vue-layouts';
import Markdown from 'unplugin-vue-markdown/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import prism from 'markdown-it-prism'
import { join } from 'node:path'
const RouteGenerateExclude = [
  '**/ignored/**',
  '**/__*',
  '**/__**/*',
  '**/*.component.vue',
  '**/components/**',
  '**/layouts/**',
  '**/data/**',
  '**/types/**'
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      extensions: ['.page.vue', '.vue'],
      importMode: 'async',
      dts: 'src/types/typed-router.d.ts', // 类型提示文件
      logs: false,
      // getRouteName: getPascalCaseRouteName,
      experimental: {
        autoExportsDataLoaders: ['src/loaders/**/*', '@/loaders/**/*'],
      },
      // 对每个生成的路由进行修改
      extendRoute(route) {
        route.params.forEach((param) => {
          // transform kebab-case to camelCase
          param.paramName = param.paramName.replace(/-([a-z])/g, (g) =>
            g[1].toUpperCase()
          )
        })

        // example of deleting routes
        // if (route.name.startsWith('/users')) {
        //   route.delete()
        // }

        if (route.name === '/[name]') {
          route.addAlias('/hello-vite-:name')
        }

        // if (route.name === '/deep/nesting') {
        //   const children = [...route]
        //   children.forEach((child) => {
        //     // TODO: remove one node while copying the children to its parent
        //   })
        // }

        // example moving a route (without its children to the root)
        if (route.fullPath.startsWith('/deep/nesting/works/too')) {
          route.parent!.insert(
            '/at-root-but-from-nested',
            route.components.get('default')!
          )
          // TODO: make it easier to access the root
          let root = route
          while (root.parent) {
            root = root.parent
          }
          route.delete()
          const newRoute = root.insert(
            '/custom/page',
            route.components.get('default')!
          )
          // newRoute.components.set('default', route.components.get('default')!)
          newRoute.meta = {
            'custom-meta': 'works',
          }
        }
      },
      beforeWriteFiles(root) {
        // root.insert('/from-root', join(__dirname, './src/pages/index.vue'))
      },
      routesFolder: [
        // can add multiple routes folders
        {
          src: 'src/pages',
        },
        {
          src: 'src/views',
        },
        {
          src: 'src/docs',
          path: 'docs/[lang]/',
          // doesn't take into account files directly at src/docs, only subfolders
          filePatterns: ['*/**'],
          // ignores .vue files
          extensions: ['.md'],
        },
        {
          src: 'src/features',
          filePatterns: '*/pages/**/*',
          path: (file) => {
            const prefix = 'src/features'
            // +1 for the starting slash
            file = file
              .slice(file.lastIndexOf(prefix) + prefix.length + 1)
              .replace('/pages', '')
            // console.log('👉 FILE', file)
            return file
          },
        },
      ],
      exclude: RouteGenerateExclude,
    }),
    vue(),
    vueJsx(),
    vueDevTools(),
    visualizer({ gzipSize: true, brotliSize: true }),
    Markdown({
      markdownItOptions: {
      },
      headEnabled: true,
      markdownItUses: [
        prism,
      ],
    }),
    Layouts({
      defaultLayout: 'default',
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        'vue-router',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          'axios': [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
          '[package-name]': [
            '[import-names]',
            // alias
            ['[from]', '[alias]'],
          ],
        },
        // example type import
        {
          from: 'vue-router',
          imports: ['RouteLocationRaw'],
          type: true,
        },
        VueRouterAutoImports,
      ], // 自动加载 vue,vue-router api
      // Array of strings of regexes that contains imports meant to be filtered out.
      ignore: [
        'useMouse',
        'useFetch'
      ],
      dirsScanOptions: {
        filePatterns: ['*.ts'], // Glob patterns for matching files
        fileFilter: file => file.endsWith('.ts'), // Filter files
        types: true // Enable auto import the types under the directories
      },
      dirs: [
        'src/composables/**/*.ts',
        'src/enum/**/*.ts',
        'src/store/**/*.ts',
      ], // 自动加载配置里的文件
      // Include auto-imported packages in Vite's `optimizeDeps` options
      // Recommend to enable
      viteOptimizeDeps: true,
      injectAtEnd: true,
      // Options for scanning directories for auto import
      defaultExportByFilename: true, // 包含文件夹名称，避免命名冲突
      dts: 'src/types/auto-import.d.ts', // 类型提示文件
    }),
    Components({
      extensions: ['vue', 'md', 'svg'],
      // 启用目录名作为组件的命名空间。避免不同目录下同名组件的冲突。
      directoryAsNamespace: true,
      // 自动生成 TypeScript 类型声明文件。默认会在项目根目录生成 components.d.ts。提供组件导入的类型提示，避免 TS 报错。
      // dts: true,
      dts: 'src/types/auto-import-components.d.ts',
      // 指定全局组件的命名空间。例如 global::MyComponent 会从全局命名空间解析。适用于无需手动导入的全局组件。
      globalNamespaces: ['global'],
      include: [/\.vue($|\?)/, /\.md($|\?)/],
      // 自定义组件解析器，用于指定如何解析组件名到实际路径。
      resolvers: [
        // (name) => {
        //   if (name === 'MyCustom')
        //     return path.resolve(__dirname, 'src/CustomResolved.vue').replaceAll('\\', '/')
        // },
        VantResolver(),
        // 配合 unplugin-icons，将图标名解析为组件，并添加前缀 i（例如 <i-mdi-home />）。
        IconsResolver({
          componentPrefix: 'i',
        }),
      ],
      // 调试模式下打印解析到的组件信息。开发时会在控制台输出组件名和路径的映射关系。帮助确认组件是否被正确识别。
      dumpComponentsInfo: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
