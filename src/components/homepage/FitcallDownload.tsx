import Link from 'next/link'
import { Button } from '../ui/button'
import Image from 'next/image'

export default function FitcallDownload() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <Button
        size="lg"
        disabled
        className="flex items-center gap-3 opacity-50 cursor-not-allowed"
      >
        <Image
          src="/images/ads/us/app-store.svg"
          alt="Apple"
          width={16}
          height={16}
        />
        App Store Coming Soon
      </Button>

      <Button
        size="lg"
        variant="outline"
        asChild
        className="flex items-center gap-3"
      >
        <Link
          href="https://play.google.com/store/apps/details?id=net.emerj.fitcall"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/landing-page/google-play.svg"
            alt="Playstore"
            width={16}
            height={16}
          />
          Download on PlayStore
        </Link>
      </Button>
    </div>
  )
}
