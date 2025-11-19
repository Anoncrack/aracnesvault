import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const isBuild = process.env.NODE_ENV === 'production'

export default defineConfig({
  appType: 'mpa',
  plugins: [
    tailwindcss(),
    ...(isBuild
      ? [
          createHtmlPlugin({
            minify: {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeEmptyAttributes: true,
              minifyJS: true,
              minifyCSS: true,
            },
          }),
        ]
      : []),
  ],
  root: 'src',
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'src/index.html'),
        about: path.resolve(__dirname, 'src/about/index.html'),
        games: path.resolve(__dirname, 'src/games/index.html'),
        cookies: path.resolve(__dirname, 'src/cookie-policy/index.html'),
        privacy: path.resolve(__dirname, 'src/privacy-policy/index.html'),
        terms: path.resolve(__dirname, 'src/terms-of-use/index.html'),
                tesrms: path.resolve(__dirname, 'src/Eldertree/index.html'),
                                terams: path.resolve(__dirname, 'src/Astral/index.html')
                                             
      }
    }
  }
})


