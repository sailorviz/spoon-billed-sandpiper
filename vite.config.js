import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // 关键：让 SVG 的 fill/stroke 继承父元素样式
        inheritColor: true,  // 启用颜色继承
        // 或者使用以下方式（二选一）：
        // icon: true,  // 自动设置 width=24, height=24, fill="currentColor"
        // 更精细的控制：
        // replaceAttrValues: {
        //   currentColor: 'currentColor',  // 保持 currentColor
        // },
      },
      // 如果你的 SVG 文件使用 ?react 后缀，确保这个配置正确
      include: '**/*.svg?react',
    }),
  ],
})