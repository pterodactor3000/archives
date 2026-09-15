import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

/** Vault static hosting on GitHub Pages (docs/apps/remote-learning/react-vite). */
const vaultBase = '/archives/apps/remote-learning/react-vite/'

const config = defineConfig({
  base: vaultBase,
  resolve: { tsconfigPaths: true },
  server: {
    host: '127.0.0.1',
    port: 3001,
    strictPort: true,
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})

export default config
