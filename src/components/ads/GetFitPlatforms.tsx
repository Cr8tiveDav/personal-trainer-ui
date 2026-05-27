const platforms = ['Zoom', 'WhatsApp', 'Google Meet', 'Twitter', 'Facebook']

const GetFitPlatforms = () => {
  return (
    <section className="border-y border-[#EDEDED] bg-white">
      <div className="mx-auto flex w-full max-w-[1088px] flex-col items-center gap-5 px-5 py-8 sm:px-8 md:flex-row md:justify-between md:px-10 md:py-7 lg:px-0">
        <p className="max-w-[280px] text-center text-[11px] text-[#5F6368] md:w-[390px] md:max-w-none md:text-left md:text-xs">
          Works with the tools you already use
        </p>

        <div className="flex w-full max-w-[420px] items-center justify-between gap-4 text-[10px] font-medium text-[#111111] md:max-w-none md:justify-end md:gap-8 md:text-xs">
          {platforms.map((platform) => (
            <span key={platform} className="whitespace-nowrap">
              {platform}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GetFitPlatforms
