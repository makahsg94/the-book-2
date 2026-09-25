import { OXFORD_GRAMMAR_PLAYLIST, type GrammarVideo } from '../types/content'
import { IconVideo, IconArrowUpRight } from './Icons'

function watchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`
}

const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${OXFORD_GRAMMAR_PLAYLIST}`

export function GrammarVideos({ videos }: { videos: GrammarVideo[] }) {
  if (videos.length === 0) return null

  return (
    <div className="rounded-xl border border-accent-200 bg-accent-50/50 p-3 dark:border-accent-900 dark:bg-accent-950/30">
      <p className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-widest text-accent-700 dark:text-accent-300">
        <IconVideo size={13} />
        <span>Watch the explanation</span>
        <span className="font-normal normal-case tracking-normal text-[var(--ink-faint)]">
          from{' '}
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-accent-600"
          >
            Oxford Online English Grammar
          </a>
        </span>
      </p>

      <ul className={`grid gap-2 ${videos.length > 1 ? 'sm:grid-cols-2' : ''}`}>
        {videos.map((v) => (
          <li key={v.id}>
            <a
              href={watchUrl(v.id)}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-2.5 transition-all hover:border-accent-400 hover:shadow-sm dark:hover:border-accent-700"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent-600 text-white transition-colors group-hover:bg-accent-700">
                <IconVideo size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-semibold leading-snug">{v.title}</span>
                <span className="mt-0.5 block font-mono text-[11px] text-[var(--ink-faint)]">
                  youtube.com/watch?v={v.id}
                </span>
              </span>
              <IconArrowUpRight
                size={14}
                className="mt-0.5 shrink-0 text-[var(--ink-faint)] transition-colors group-hover:text-accent-600"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
