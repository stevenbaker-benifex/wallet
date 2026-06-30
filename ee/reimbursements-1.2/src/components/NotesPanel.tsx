import { useState } from 'react'

const NOTES = [
  {
    id: 1,
    date: '16 Jan 2024 – 14:10',
    initials: 'AB',
    text: 'Hi Catherine, we need both parts in order to approve this. Let me know if this is an issue',
    side: 'right' as const,
    color: 'bg-blue-50',
    avatarColor: 'bg-blue-500',
  },
  {
    id: 2,
    date: '15 Jan 2024 – 09:31',
    initials: 'CS',
    text: "Can't find part two of the receipt",
    footnote: 'Auto-translated',
    side: 'left' as const,
    color: 'bg-grey-05',
    avatarColor: 'bg-grey-50',
  },
]

function Avatar({ initials, colorClass }: { initials: string; colorClass: string }) {
  return (
    <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${colorClass}`}>
      <span className="font-body text-xs font-bold leading-none text-white">{initials}</span>
    </div>
  )
}

export function NotesPanel() {
  const [noteText, setNoteText] = useState('')

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="flex items-center gap-1.5">
            <i className="fa-regular fa-comments text-base text-grey-90" aria-hidden />
            <h2 className="font-heading text-lg font-semibold leading-[1.2] text-grey-90">
              Notes
            </h2>
          </div>
          

      {/* <div className="flex items-center gap-2 rounded border border-grey-80 px-2 py-1.5">
        <input
          type="text"
          placeholder="Add a note..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="flex-1 bg-transparent font-body text-sm leading-[21px] tracking-wide text-grey-90 placeholder:text-grey-70 focus:outline-none"
        />
        <button
          type="button"
          aria-label="Send note"
          className="flex size-5 shrink-0 items-center justify-center text-grey-50"
        >
          <i className="fa-solid fa-paper-plane text-sm" aria-hidden />
        </button>
      </div> */}

      {/* Messages */}
      {NOTES.map((note) => (
        <div key={note.id} className="flex flex-col gap-1">
          <p className={`font-body text-xs leading-[18px] tracking-wide text-grey-50 ${note.side === 'right' ? 'pr-11 text-right' : 'pl-11'}`}>
            {note.date}
          </p>
          <div className={`flex items-end gap-2 ${note.side === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
            <Avatar initials={note.initials} colorClass={note.avatarColor} />
            <div className={`flex flex-1 flex-col gap-1 px-4 py-2 ${note.color} ${note.side === 'right' ? 'rounded-tl-xl rounded-tr-xl rounded-bl-xl' : 'rounded-tl-xl rounded-tr-xl rounded-br-xl'}`}>
              <p className="font-body text-sm leading-[21px] text-grey-90">{note.text}</p>
              {note.footnote && (
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-globe text-xs text-[#d1505f]" aria-hidden />
                  <span className="font-body text-xs leading-[18px] tracking-wide text-grey-90 underline">
                    {note.footnote}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
