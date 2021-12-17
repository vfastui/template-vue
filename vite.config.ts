import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import theme from './src/assets/theme'
export default defineConfig(({ mode }) => {
    const { VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd())
    let versionStr = new Date().getTime()
    if (process.env.NODE_ENV === 'production') {
        const fs = require('fs')
        let version = JSON.stringify({ version: versionStr })
        fs.writeFileSync(__dirname + '/public/version.json', version)
    }
    return {
        root: './',
        base: VITE_PUBLIC_PATH,
        define: {
            __APP_VERSION__: versionStr
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                _pages: resolve(__dirname, 'src/pages'),
                _components: resolve(__dirname, 'src/components'),
                _assets: resolve(__dirname, 'src/assets')
            }
        },
        plugins: [
            vue(),
            Components({
                resolvers: [AntDesignVueResolver({ importLess: true })]
            })
        ],
        optimizeDeps: {
            include: ['ant-design-vue']
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    modifyVars: theme
                }
            }
        },
        server: {
            port: 4000, // 启动端口
            open: true,
            // force: true
        }
    }
})
