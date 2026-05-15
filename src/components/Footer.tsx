// Footer.tsx

const Footer = () => {
  return (
    <div className="h-[46px] border-t border-zinc-200 bg-white px-5 flex items-center justify-between">
      <p className="text-[12px] text-zinc-400">
        A Product By{" "}
        <a
          href="https://www.infrasity.com/"
          target="__blank"
          className="text-blue-500 font-semibold hover:underline hover:underline-offset-2 hover:decoration-blue-500 transition-all">
          Infrasity
        </a>
      </p>

      <p className="text-[11px] text-zinc-400">v0.1</p>
    </div>
  )
}

export default Footer
