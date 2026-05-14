import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-gray-100 bg-white pb-8 pt-16">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                <Image
                  src="/logo.svg"
                  alt="Fitcall Logo"
                  fill
                  sizes="true"
                  className="object-cover"
                />
              </div>
              <span className="font-(family-name:--font-heading) text-xl font-bold">
                Fitcall.me
              </span>
            </div>
            <p className="max-w-xs text-base leading-relaxed text-muted-foreground">
              Connecting you with expert trainers for real accountability.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="mb-4 font-bold text-muted-foreground">Product</h3>
              <ul className="space-y-3 text-sm text-muted">
                <li>
                  <Link
                    href="#how-it-works"
                    className="transition-colors hover:text-primary"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trainers"
                    className="transition-colors hover:text-primary"
                  >
                    Find Trainers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="transition-colors hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="transition-colors hover:text-primary"
                  >
                    Book Free Trial
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold text-muted-foreground">Company</h3>
              <ul className="space-y-3 text-sm text-muted">
                <li>
                  <Link
                    href="/about-us"
                    className="transition-colors hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition-colors hover:text-primary"
                  >
                    Become a Trainer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition-colors hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="mb-4 font-bold text-muted-foreground">Legal</h3>
              <ul className="space-y-3 text-sm text-muted">
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-primary"
                  >
                    Help Centre
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-primary"
                  >
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-8 md:flex-row">
          <p className="order-2 text-sm text-muted-foreground md:order-1">
            © {currentYear} Fitcall. All rights reserved.
          </p>

          <div className="order-1 flex items-center gap-4 md:order-2">
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-400 transition-colors hover:text-black"
            >
              <div className="relative h-4 w-4">
                <Image
                  src="/images/landing-page/icons/twitter.png"
                  alt="Twitter"
                  fill
                  sizes="true"
                  className="object-contain"
                />
              </div>
            </Link>
            <Link
              href="#"
              className="text-gray-400 transition-colors hover:text-black"
            >
              <div className="relative h-4 w-4">
                <Image
                  src="/images/landing-page/icons/insta.png"
                  alt="Instagram"
                  fill
                  sizes="true"
                  className="object-contain"
                />
              </div>
            </Link>
            <Link
              href="#"
              className="text-gray-400 transition-colors hover:text-black"
            >
              <div className="relative h-5 w-5">
                <Image
                  src="/images/landing-page/icons/link.png"
                  alt="LinkedIn"
                  fill
                  sizes="true"
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
