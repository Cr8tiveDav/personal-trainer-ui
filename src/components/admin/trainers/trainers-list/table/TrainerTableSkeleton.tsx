"use client";

import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

const TrainerTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.tr
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="border-b border-gray-100 last:border-none"
        >
          <td className="py-4 px-6 whitespace-nowrap">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-[9999px]" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </td>
          <td className="py-4 px-6 whitespace-nowrap">
            <Skeleton className="h-6 w-24 rounded-[9999px]" />
          </td>
          <td className="py-4 px-6 whitespace-nowrap">
            <Skeleton className="h-6 w-20 rounded-[9999px]" />
          </td>
          <td className="py-4 px-6 whitespace-nowrap">
            <Skeleton className="h-4 w-12" />
          </td>
          <td className="py-4 px-6 whitespace-nowrap">
            <Skeleton className="h-4 w-16" />
          </td>
          <td className="py-4 px-6 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-[9999px]" />
              <Skeleton className="h-4 w-16" />
            </div>
          </td>
          <td className="py-4 px-6 whitespace-nowrap">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="py-4 px-6 whitespace-nowrap text-right">
            <Skeleton className="h-8 w-8 rounded-[6px] ml-auto" />
          </td>
        </motion.tr>
      ))}
    </>
  );
};

export default TrainerTableSkeleton;
