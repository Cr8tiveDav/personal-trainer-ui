import Image from 'next/image'

interface Properties {
  size?: 'big' | 'small'
}

const Logo = ({ size = 'big' }: Properties) => {
  const isSmall = size === 'small'

  return (
    <div className="flex items-center gap-2">
      <Image
        src={isSmall ? '/logo.svg' : '/logo.svg'}
        alt="FitCall logo"
        width={isSmall ? 40 : 57}
        height={isSmall ? 38 : 52}
        className="object-contain"
      />

      {!isSmall && (
        <span className="text-xl font-bold leading-none">FitCall</span>
      )}
    </div>
  )
}

export default Logo
