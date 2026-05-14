import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo-text.svg"
        alt="FitCall logo"
        width={132}
        height={40}
        className="h-10 w-[132px] object-contain"
      />
    </Link>
  )
}

export default Logo
