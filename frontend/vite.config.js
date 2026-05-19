import path from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const requireFromFrontend = createRequire(path.join(__dirname, 'package.json'))

/** Apollon source is outside frontend/; resolve its npm imports from frontend/node_modules. */
function resolveApollonDepsFromFrontend() {
  return {
    name: 'resolve-apollon-deps-from-frontend',
    resolveId(source, importer) {
      if (!importer?.includes(`${path.sep}apollon${path.sep}`)) {
        return null
      }
      if (source.startsWith('.') || source.startsWith('\0') || path.isAbsolute(source)) {
        return null
      }
      try {
        return requireFromFrontend.resolve(source)
      } catch {
        return null
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), resolveApollonDepsFromFrontend()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    fs: {
      allow: [repoRoot],
    },
  },
})
