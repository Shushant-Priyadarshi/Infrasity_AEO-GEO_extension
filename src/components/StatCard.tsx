import { FaRegCheckCircle } from "react-icons/fa"
import { RxCrossCircled } from "react-icons/rx";

export default function StatCard({
  label,
  value,
  needChars
}: {
  label: string
  value: any
  needChars: boolean
}) {
  const isBoolean =
    typeof value === "boolean"

  return (
    <div className="rounded-3xl border border-[#E6E6E0] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <p className="text-[11px] uppercase tracking-[0.15em] text-[#8B8B84]">
        {label}
      </p>

      {isBoolean ? (
        <div className="mt-4">
          {value ? (
            <FaRegCheckCircle className="text-[20px] text-emerald-500" />
          ) : (
            <RxCrossCircled className="text-[20px] text-red-500" />
          )}
        </div>
      ) : (
        <>
          <p className="mt-3 text-[12px] leading-6 text-[#111111] break-words">
            {value || "Not Found"}
          </p>

          {needChars && (
            <p className="mt-2 text-[11px] text-[#8B8B84]">
              {value?.length || 0} chars
            </p>
          )}
        </>
      )}
    </div>
  )
}