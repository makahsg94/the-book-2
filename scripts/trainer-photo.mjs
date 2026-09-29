import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'

const SRC = 'src/assets/trainer/abubakr.png'

const OUT = [
  { file: 'src/assets/trainer/abubakr-320.webp', width: 320, quality: 78 },
  { file: 'src/assets/trainer/abubakr-640.webp', width: 640, quality: 82 },
  // fallback for browsers without WebP support, kept small on purpose
  { file: 'src/assets/trainer/abubakr-320.png', width: 320, format: 'png' },
]

await mkdir('src/assets/trainer', { recursive: true })

const meta = await sharp(SRC).metadata()
console.log('source:', meta.width, 'x', meta.height, meta.format, meta.hasAlpha ? 'alpha' : 'opaque')

for (const { file, width, quality, format } of OUT) {
  const pipe = sharp(SRC).resize({ width, withoutEnlargement: true })
  if (format === 'png') {
    await pipe.png({ compressionLevel: 9, quality: 82 }).toFile(file)
  } else {
    await pipe.webp({ quality }).toFile(file)
  }
  const { size } = await stat(file)
  console.log(file, '->', width + 'px', (size / 1024).toFixed(1), 'KB')
}
