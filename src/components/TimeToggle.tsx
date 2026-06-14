import type { TimeRange } from '../types'

export function TimeToggle({
  value,
  onChange,
}: {
  value: TimeRange
  onChange: (r: TimeRange) => void
}) {
  return (
    <div className="range-toggle" role="tablist" aria-label="Time range">
      <button
        role="tab"
        aria-selected={value === 'week'}
        className={value === 'week' ? 'active' : ''}
        onClick={() => onChange('week')}
      >
        This week
      </button>
      <button
        role="tab"
        aria-selected={value === 'month'}
        className={value === 'month' ? 'active' : ''}
        onClick={() => onChange('month')}
      >
        This month
      </button>
    </div>
  )
}
