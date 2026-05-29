"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import StatusBadge from "./StatusBadge";
import { Trainer } from "../../types";
import { cn } from "@/utils";
import { formatDisplayName, TruncateEmail } from "@/lib/utils";
import { TrainerTableActions } from "./TrainerTableActions";

import { useRouter } from "next/navigation";

interface TrainerTableRowProps {
  trainer: Trainer;
  index?: number;
}

export const trainerRowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.06,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const TrainerTableRow = ({ trainer, index = 0 }: TrainerTableRowProps) => {
  const router = useRouter();
  let availabilityColor = "bg-[#D9D9D9]";
  if (trainer.availability === "Available") availabilityColor = "bg-[#14561C]";
  if (trainer.availability === "Busy") availabilityColor = "bg-[#A86908]";

  return (
    <motion.tr
      variants={trainerRowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      onClick={() => router.push(`/admin/trainers/${trainer.id}`)}
      className="group border-b border-gray-100 cursor-pointer"
    >
      <td className="py-4 px-6 transition-colors group-hover:bg-gray-50/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 shrink-0">
            {trainer.avatarUrl ? (
              <Image
                src={trainer.avatarUrl}
                alt={trainer.name}
                width={40}
                height={40}
                className="rounded-[9999px] h-10 w-10 object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-[9999px] bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                {trainer.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-sm font-semibold text-gray-900">
              {formatDisplayName(trainer.name)}
            </span>
            <span className="text-xs text-gray-500">
              {TruncateEmail(trainer.email)}
            </span>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 transition-colors group-hover:bg-gray-50/80">
        <StatusBadge type="specialty" value={trainer.specialty} />
      </td>
      <td className="py-4 px-6 transition-colors group-hover:bg-gray-50/80">
        <StatusBadge type="status" value={trainer.status} />
      </td>
      <td className="py-4 px-6 transition-colors group-hover:bg-gray-50/80">
        <span className="text-sm text-gray-600 font-medium">
          {trainer.sessions !== null ? trainer.sessions : "-"}
        </span>
      </td>
      <td className="py-4 px-6 transition-colors group-hover:bg-gray-50/80">
        <span className="text-sm text-gray-900 font-medium">
          ${trainer.earnings.toLocaleString()}
        </span>
      </td>
      <td className="py-4 px-6 transition-colors group-hover:bg-gray-50/80">
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-[9999px]", availabilityColor)} />
          <span
            className={cn("text-sm font-medium", {
              "text-[#14561C]": trainer.availability === "Available",
              "text-[#5C5C5C]": trainer.availability === "Offline",
              "text-[#A86908]": trainer.availability === "Busy",
            })}
          >
            {trainer.availability}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 transition-colors group-hover:bg-gray-50/80">
        <span className="text-sm text-gray-500">{trainer.dateAdded}</span>
      </td>
      <td className="py-4 px-6 transition-colors group-hover:bg-gray-50/80">
        <TrainerTableActions trainer={trainer} />
      </td>
    </motion.tr>
  );
};

export default TrainerTableRow;
