// Cloudflare Pages refuses to deploy any single asset larger than 25 MiB, and the
// failure surfaces as a bare "asset too large" with no file name. This runs as
// `prebuild`, so an oversized clip is re-encoded to fit instead of breaking the
// deploy. Files already under the target are skipped, which keeps repeat builds fast.

import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import process from 'node:process'
import ffmpeg from 'ffmpeg-static'

const HARD_LIMIT = 25 * 1024 * 1024
const TARGET = 20 * 1024 * 1024
// Vite copies public/ into dist/ verbatim, so keeping public/ under the limit is
// all that is needed for the deploy to pass.
const SCAN_DIR = 'public'
const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v', '.webm', '.mkv'])
const AUDIO_EXT = new Set(['.mp3', '.m4a', '.aac', '.wav'])

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MiB`

if (!ffmpeg || !existsSync(ffmpeg)) {
  console.error('fit-media: ffmpeg-static did not provide a binary. Run `npm install` first.')
  process.exit(1)
}

const run = (args) => {
  try {
    return execFileSync(ffmpeg, args, { stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1 << 24 })
  } catch (err) {
    return { failed: true, stderr: err.stderr?.toString() ?? '', stdout: err.stdout?.toString() ?? '' }
  }
}

const probe = (file) => {
  const out = run(['-hide_banner', '-i', file])
  const info = out.failed ? out.stderr : out.toString()
  const match = /Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/.exec(info)
  if (!match) throw new Error(`could not read the duration of ${file}`)
  return {
    duration: Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]),
    hasVideo: /Stream #\d+:\d+.*: Video:/.test(info),
  }
}

const walk = (dir) => {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.isFile() ? [full] : []
  })
}

const encode = (file, target) => {
  const { duration, hasVideo } = probe(file)
  const tmp = `${file}.fitmedia.mp4`
  const passLog = `${file}.fitmedia`

  try {
    if (!hasVideo) {
      const audioKbps = Math.max(32, Math.floor(((target * 8) / duration) / 1000))
      const out = run(['-y', '-hide_banner', '-loglevel', 'error', '-i', file, '-vn', '-c:a', 'aac', '-b:a', `${audioKbps}k`, '-movflags', '+faststart', tmp])
      if (out.failed) throw new Error(out.stderr)
    } else {
      const totalKbps = (target * 8) / duration / 1000
      const audioKbps = Math.max(48, Math.min(96, Math.floor(totalKbps * 0.18)))
      const videoKbps = Math.max(120, Math.floor(totalKbps - audioKbps))
      const pass1 = run(['-y', '-hide_banner', '-loglevel', 'error', '-i', file, '-c:v', 'libx264', '-b:v', `${videoKbps}k`, '-pass', '1', '-passlogfile', passLog, '-an', '-f', 'null', '-'])
      if (pass1.failed) throw new Error(pass1.stderr)
      const out = run([
        '-y', '-hide_banner', '-loglevel', 'error', '-i', file,
        '-c:v', 'libx264', '-b:v', `${videoKbps}k`, '-pass', '2', '-passlogfile', passLog,
        '-c:a', 'aac', '-b:a', `${audioKbps}k`, '-movflags', '+faststart', tmp,
      ])
      if (out.failed) throw new Error(out.stderr)
    }

    const size = statSync(tmp).size
    if (size >= HARD_LIMIT) throw new Error(`still ${mb(size)} after encoding, limit is ${mb(HARD_LIMIT)}`)
    renameSync(tmp, file)
    return size
  } finally {
    rmSync(tmp, { force: true })
    for (const ext of ['log', 'log.mbtree', '-0.log', '-0.log.mbtree']) rmSync(`${passLog}${ext}`, { force: true })
  }
}

const candidates = walk(SCAN_DIR).filter((file) => {
  const ext = extname(file).toLowerCase()
  return (VIDEO_EXT.has(ext) || AUDIO_EXT.has(ext)) && statSync(file).size > TARGET
})

if (candidates.length === 0) {
  console.log('fit-media: every media file is already under the 25 MiB deploy limit.')
} else {
  console.log(`fit-media: ${candidates.length} file(s) over the target, encoding down to ${mb(TARGET)}...`)
}

let failed = false
for (const file of candidates) {
  const before = statSync(file).size
  process.stdout.write(`  ${relative(process.cwd(), file)}  ${mb(before)} -> `)
  try {
    console.log(mb(encode(file, TARGET)))
  } catch (err) {
    console.log('FAILED')
    console.error(`    ${err.message}`)
    failed = true
  }
}

const oversized = walk(SCAN_DIR).filter((file) => statSync(file).size > HARD_LIMIT)
if (oversized.length > 0) {
  console.error(`\nfit-media: these files still exceed the ${mb(HARD_LIMIT)} limit and would fail the deploy:`)
  for (const file of oversized) console.error(`  ${relative(process.cwd(), file)}  ${mb(statSync(file).size)}`)
  failed = true
}

if (failed) process.exit(1)
