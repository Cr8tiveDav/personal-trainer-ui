'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useEnvironmentStore from '~/hooks/global/use-enviroment'
import { signOut } from 'next-auth/react'
import { cn } from '~/utils'

export default function EnvironmentSwitcher() {
  const { backend, setBackend } = useEnvironmentStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentBackend = backend || 'default'

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="mb-2 text-lg font-bold text-white">Backend Environment</h3>
      <div className="flex items-center space-x-4">
        <motion.div
          className="relative flex h-12 w-24 cursor-pointer items-center justify-center rounded-full bg-white"
          onClick={async () => {
            const newBackend = currentBackend === 'python' ? 'php' : 'python'
            setBackend(newBackend)
            await signOut({
              callbackUrl: '/',
            })
          }}
          aria-label={`Switch to ${currentBackend === 'python' ? 'PHP' : 'Python'}`}
        >
          <motion.div
            className="absolute h-11 w-11 rounded-full"
            layout
            transition={{
              type: 'spring',
              stiffness: 600,
              damping: 30,
            }}
            style={{
              backgroundColor:
                currentBackend === 'python' ? '#306998' : '#8892BF',
              left: currentBackend === 'python' ? '2px' : 'calc(100% - 46px)',
            }}
          />
          <PythonIcon
            className={cn(
              'absolute left-0.5 h-9 w-9',
              currentBackend === 'python' ? 'text-white' : 'text-gray-400'
            )}
          />
          <PhpIcon
            className={cn(
              'absolute left-0.5 h-9 w-9',
              currentBackend === 'php' ? 'text-white' : 'text-gray-400'
            )}
          />
        </motion.div>
        <span className="text-lg font-semibold text-white">
          {currentBackend === 'python'
            ? 'Python'
            : currentBackend === 'php'
              ? 'PHP'
              : 'Default'}
        </span>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
          onClick={async () => {
            setBackend('')
            await signOut({
              callbackUrl: '/',
            })
          }}
        >
          Default
        </button>
      </div>
    </motion.div>
  )
}

function PythonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <linearGradient
        id="python-original-a"
        gradientUnits="userSpaceOnUse"
        x1="70.252"
        y1="1237.476"
        x2="170.659"
        y2="1151.089"
        gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
      >
        <stop offset="0" stopColor="#5A9FD4" />
        <stop offset="1" stopColor="#306998" />
      </linearGradient>
      <linearGradient
        id="python-original-b"
        gradientUnits="userSpaceOnUse"
        x1="209.474"
        y1="1098.811"
        x2="173.62"
        y2="1149.537"
        gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
      >
        <stop offset="0" stopColor="#FFD43B" />
        <stop offset="1" stopColor="#FFE873" />
      </linearGradient>
      <path
        fill="currentColor"
        d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311
        transform="translate(0 10)"
      />
      <path
        fill="currentColor"
        d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.3
        transform="translate(0 10)"
      />
    </svg>
  )
}

function PhpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        fill="currentColor"
        d="M64 33.039C30.26 33.039 2.906 46.901 2.906 64S30.26 94.961 64 94.961 125.094 81.099 125.094 64 97.74 33.039 64 33.039zM48.103 70.032c-1.458 1.364-3.077 1.927-4.86 2.507-1.783.581-4.052.461-
      />
    </svg>
  )
}
