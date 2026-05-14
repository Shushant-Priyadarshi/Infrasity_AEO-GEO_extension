import { useState } from "react"
import { FiImage } from "react-icons/fi"

type Props = {
  title: string
  description: string
  image: string
  host: string
}

export default function OpenGraphPreview({
  title,
  description,
  image,
  host
}: Props) {
  const [imgFailed, setImgFailed] = useState(false)
  const hasAny = title || description || image

  if (!hasAny) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-surface-muted/40 p-5 shadow-card">
        <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium mb-2">
          Open Graph
        </p>
        <p className="text-[12.5px] italic text-ink-300">
          No Open Graph metadata detected
        </p>
      </div>
    )
  }

  const showImage = image && !imgFailed

  return (
    <div className="rounded-2xl border border-line bg-surface-raised shadow-card overflow-hidden">
      <div className="px-4 pt-4 pb-3">
        <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium">
          Twitter Card Preview
        </p>
      </div>

      <div className="mx-4 mb-4 rounded-xl border border-line overflow-hidden bg-surface-muted">
        {showImage ? (
          <div className="aspect-[1.91/1] bg-surface-sunken">
            <img
              src={image}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        ) : (
          <div className="aspect-[1.91/1] bg-surface-sunken flex items-center justify-center">
            <div className="flex flex-col items-center gap-1.5 text-ink-300">
              <FiImage className="h-5 w-5" strokeWidth={1.5} />
              <p className="text-[10.5px] tracking-wide">No preview image</p>
            </div>
          </div>
        )}

        <div className="px-3.5 py-3 bg-surface-raised border-t border-line">
          {host && (
            <p className="text-[10.5px] uppercase tracking-eyebrow text-ink-300 font-medium mb-1">
              {host}
            </p>
          )}

          {title ? (
            <p className="text-[13px] font-semibold leading-5 text-ink-900 break-words line-clamp-2">
              {title}
            </p>
          ) : (
            <p className="text-[12.5px] italic text-ink-300">No og:title</p>
          )}

          {description ? (
            <p className="mt-1 text-[11.5px] leading-5 text-ink-500 break-words line-clamp-2">
              {description}
            </p>
          ) : (
            <p className="mt-1 text-[11.5px] italic text-ink-300">
              No og:description
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
