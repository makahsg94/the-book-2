import { useEffect, useReducer } from 'react'
import {
  formatTime,
  getPlayhead,
  seekAudio,
  stepAudio,
  stopAudio,
  subscribePlayhead,
  toggleTrack,
} from '../lib/audio'
import { IconClose, IconForward, IconPause, IconPlay, IconRewind } from './Icons'
import { SpeedControl } from './Media'

export default function MiniPlayer() {
  const [, force] = useReducer((n: number) => n + 1, 0)

  useEffect(() => subscribePlayhead(force), [])

  const ph = getPlayhead()
  if (!ph) return null

  const max = ph.duration > 0 ? ph.duration : 1

  return (
    <div className="pointer-events-none sponsor-aware-bottom fixed inset-x-0 z-40 flex justify-center px-4">
      <div className="pointer-events-auto flex w-full max-w-xl items-center gap-3 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)]/95 px-3 py-2 text-[var(--ink)] shadow-2xl shadow-black/20 backdrop-blur">
        <button
          type="button"
          onClick={() => toggleTrack(ph.file, ph.label, ph.instance)}
          aria-label={ph.playing ? 'Pause' : 'Play'}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700"
        >
          {ph.playing ? <IconPause size={16} /> : <IconPlay size={16} className="ml-0.5" />}
        </button>

        <span className={`eq shrink-0 text-accent-500 ${ph.playing ? 'eq-on' : ''}`} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight">{ph.label}</p>
          <p className="truncate font-mono text-[11px] text-[var(--ink-faint)]">{ph.file.split('/audio/').pop()}</p>
        </div>

        <SpeedControl compact />

        <button
          type="button"
          onClick={() => stepAudio(-10)}
          className="hidden shrink-0 flex-col items-center rounded-md px-1.5 py-0.5 text-[var(--ink-soft)] transition-colors hover:bg-[var(--line)] sm:flex"
          title="Back 10 seconds"
        >
          <IconRewind size={16} />
          <span className="text-[9px] font-bold leading-none">10</span>
        </button>

        <span className="hidden shrink-0 font-mono text-[11px] tabular-nums text-[var(--ink-soft)] sm:inline">
          {formatTime(ph.position)}
        </span>

        <input
          type="range"
          min={0}
          max={max}
          step={1}
          value={Math.min(ph.position, max)}
          onChange={(e) => seekAudio(Number(e.target.value))}
          aria-label="Seek"
          className="w-24 min-w-0 cursor-pointer accent-brand-600 sm:w-32"
        />

        <span className="hidden shrink-0 font-mono text-[11px] tabular-nums text-[var(--ink-faint)] sm:inline">
          {formatTime(ph.duration)}
        </span>

        <button
          type="button"
          onClick={() => stepAudio(10)}
          className="hidden shrink-0 flex-col items-center rounded-md px-1.5 py-0.5 text-[var(--ink-soft)] transition-colors hover:bg-[var(--line)] sm:flex"
          title="Forward 10 seconds"
        >
          <IconForward size={16} />
          <span className="text-[9px] font-bold leading-none">10</span>
        </button>

        <button
          type="button"
          onClick={stopAudio}
          aria-label="Stop"
          className="grid size-7 shrink-0 place-items-center rounded-lg text-[var(--ink-faint)] transition-colors hover:bg-[var(--line)]"
        >
          <IconClose size={14} />
        </button>
      </div>
    </div>
  )
}