import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = process.env.APP_URL ?? 'http://127.0.0.1:3000'
const outputDir = path.resolve(process.cwd(), '..', 'testing')
const outputVideo = path.join(outputDir, 'landing-screen-demo.webm')

await fs.mkdir(outputDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: {
    dir: outputDir,
    size: { width: 1280, height: 720 }
  }
})

const page = await context.newPage()
await page.goto(appUrl, { waitUntil: 'networkidle' })
await page.waitForTimeout(5000)
await page.close()
await context.close()
await browser.close()

const files = await fs.readdir(outputDir)
const generatedVideo = files.find((file) => file.endsWith('.webm') && file !== 'landing-screen-demo.webm')

if (!generatedVideo) {
  throw new Error('No recorded video was generated.')
}

await fs.copyFile(path.join(outputDir, generatedVideo), outputVideo)
