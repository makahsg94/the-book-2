const trimSlash = (url: string) => url.replace(/\/+$/, '')

const env = import.meta.env

export const BOOK_1_URL = trimSlash(
  env.VITE_BOOK_1_URL || 'https://my-english-book.pages.dev',
)

export const BOOK_2_URL = trimSlash(
  env.VITE_BOOK_2_URL || 'https://the-book-2.pages.dev',
)
