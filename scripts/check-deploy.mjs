// Ad-hoc check: serve dist/ under the GitHub Pages base path and confirm the
// built HTML, JS bundle and the new trainer images all resolve.
import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const BASE = '/the-book-2/'
const ROOT = 'dist'
const PORT = 4180
const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

const server = http.createServer(async (req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0])
  if (rel === BASE.slice(0, -1)) rel = BASE
  if (!rel.startsWith(BASE)) {
    res.writeHead(404).end('outside base')
    return
  }
  rel = rel.slice(BASE.length)
  if (rel === '') rel = 'index.html'
  const file = path.join(ROOT, rel)
  try {
    const info = await stat(file)
    if (!info.isFile()) throw new Error('not a file')
    const body = await readFile(file)
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404).end('not found')
  }
})

server.listen(PORT, () => console.log(`serving ${ROOT} at http://localhost:${PORT}${BASE}`))

const ORIGIN = `http://localhost:${PORT}`
const get = async (p) => {
  const r = await fetch(ORIGIN + p)
  return { status: r.status, text: r.status === 200 ? await r.text() : '' }
}

const home = await get(BASE)
console.log('index.html           ->', home.status)

const assetUrls = [...home.text.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((u) => u.startsWith('/the-book-2/'))
console.log('assets referenced    ->', assetUrls.length)

for (const u of assetUrls) {
  const r = await fetch(ORIGIN + u)
  console.log(' ', r.status, u)
}

// the trainer chunk + images must exist in dist under the base path
const { readdir } = await import('node:fs/promises')
const files = await readdir('dist/assets')
for (const pattern of [/index-.*\.js$/, /abubakr.*\.webp$/, /abubakr.*\.png$/]) {
  const hit = files.find((f) => pattern.test(f))
  console.log('dist has', pattern, '->', hit ?? 'MISSING')
}

// is the trainer route code actually inside the bundle?
const mainJs = files.find((f) => /^index-.*\.js$/.test(f))
const bundle = await readFile(path.join('dist/assets', mainJs), 'utf8')
for (const needle of ['/trainer', 'sponsor-dismissed', 'wa.me/', 'abu-bakr-english']) {
  console.log(`bundle contains ${needle.padEnd(20)} ->`, bundle.includes(needle))
}

server.closeAllConnections()
server.close()
