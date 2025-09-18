// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

const renderAppHostname = process.env.VITE_RENDER_APP_HOSTNAME || 'sistema-da-associacao-l5ow.onrender.com';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      load: {
        pattern: ['**/*.vue', '**/*.js'],
      },
      styles: {
        configFile: 'src/styles/settings.scss',
      },
      compilerOptions: {},
      autoImport: true,
      importComposables: true,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // IMPRESCINDÍVEL para ouvir em todas as interfaces
    port: process.env.PORT || 3000, // Usa a porta do Render, ou 3000 como fallback
    fs: {
      // Permite o diretório atual e qualquer outro que possa ser necessário.
      // O '*' é um "wildcard" para permitir todos os hosts para `fs.allow`.
      // Isso é uma medida de último recurso para o erro "Blocked request".
      allow: ['.', '/'], // Permite acesso à raiz do projeto e do sistema de arquivos
      strict: false // Desativa verificações de segurança de caminho (usar com cautela)
    },
    // **AQUI ESTÁ A MUDANÇA PRINCIPAL:**
    // Adicione o hostname da sua aplicação de produção à lista de allowedHosts.
    allowedHosts: [
      'front-end-associacao-production.up.railway.app',
      // Se você tiver outros domínios ou subdomínios, adicione-os aqui também.
      // Por exemplo, se você estiver usando localhost para desenvolvimento:
      'localhost',
      '127.0.0.1'
    ],
    hmr: {
      host: 'front-end-associacao-production.up.railway.app', // Especifique o host exato para HMR
      protocol: 'wss' // Use wss para HTTPS, ws para HTTP
    },
  },
  build: {
    outDir: 'dist', // Verifique se isso corresponde ao "Publish Directory" no Render
    emptyOutDir: true
  }
})