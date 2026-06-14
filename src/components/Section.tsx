import type { ReactNode } from 'react'

export function Section({
  title,
  lead,
  count,
  children,
}: {
  title: string
  lead?: string
  count?: string
  children: ReactNode
}) {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          {lead && <p className="lead">{lead}</p>}
        </div>
        {count && <span className="count">{count}</span>}
      </div>
      {children}
    </section>
  )
}

export function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="empty">
      <div className="big">{icon}</div>
      {text}
    </div>
  )
}
