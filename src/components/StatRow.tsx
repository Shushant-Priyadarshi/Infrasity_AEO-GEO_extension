import { FaRegCheckCircle } from "react-icons/fa"
import { RxCrossCircled } from "react-icons/rx";

export default function StatRow({
  label,
  value
}: {
  label: string
  value: any
}) {
  const isBoolean =
    typeof value === "boolean"

  return (
    <div className="flex items-center justify-between py-4 border-b border-[#F0F0EB] last:border-none">
      <p className="text-sm text-[#52524D]">
        {label}
      </p>

      {isBoolean ? (
        <div className="flex items-center">
          {value ? (
            <FaRegCheckCircle className="text-[18px] text-emerald-500" />
          ) : (
            <RxCrossCircled className="text-[18px] text-red-500" />
          )}
        </div>
      ) : (
        <p className="text-sm font-semibold text-[#111111]">
          {value}
        </p>
      )}
    </div>
  )
}