import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

import path from "path"

// 按需引入组件
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// svg图标插件
import viteSvgIcons, { createSvgIconsPlugin } from "vite-plugin-svg-icons"

import ElementPlus from "unplugin-element-plus/vite"

// css原子化UnoCSS
import UnoCSS from 'unocss/vite'

export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		ElementPlus({ useSource: true }),
		//引入SVG图标素材文件
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), "src/icons")],
			symbolId: "icon-[dir]-[name]",
			customDomId: "menu-default"
		}),
		// UnoCSS
		UnoCSS(),
	],
	server: {
		open: true,
		port: 8888,
		proxy: {
			"/api": {
				target: "",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ""),
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "./src/styles/variables.scss" as *;', // 引入变量
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),	// 设置 `@` 指向 `src` 目录
		},
	},
})