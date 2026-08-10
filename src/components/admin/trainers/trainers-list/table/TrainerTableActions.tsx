"use client";

import { useRouter } from "next/navigation";
import { Eye, Mail, MoreVertical, CheckCircle } from "lucide-react";
import { useUpdateTrainer, useDeleteTrainer, useResendTrainerSetup } from "@/api/trainers";
import type { Trainer } from "@/components/admin/trainers/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

type TrainerTableActionsProps = {
  trainer: Trainer;
};

export function TrainerTableActions({ trainer }: TrainerTableActionsProps) {
  const router = useRouter();
  const updateTrainer = useUpdateTrainer(trainer.id);
  const deleteTrainer = useDeleteTrainer();
  const resendSetup = useResendTrainerSetup();

  function handleResendSetup() {
    if (!trainer.email?.trim()) return;
    resendSetup.mutate(trainer.email.trim());
  }

  function goToDetail() {
    router.push(`/admin/trainers/${trainer.id}`);
  }

  function handleDeactivate() {
    deleteTrainer.mutate(trainer.id);
  }

  function handleUpdateStatus(newOnboardingStatus: string) {
    updateTrainer.mutate({ onboarding_status: newOnboardingStatus });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          onClick={(e) => e.stopPropagation()}
          className="h-10 w-10 p-0 text-gray-400 hover:text-gray-700 focus:ring-0 shadow-none hover:bg-gray-100 rounded-[9999px]"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Trainer actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onClick={(e) => e.stopPropagation()}
        className="w-44 rounded-[12px] p-1.5 border border-gray-100 shadow-xl bg-white z-50"
      >
        <DropdownMenuItem
          onSelect={() => goToDetail()}
          className="rounded-[8px] px-3 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleResendSetup}
          disabled={resendSetup.isPending || !trainer.email?.trim()}
          className="rounded-[8px] px-3 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 disabled:opacity-50 disabled:pointer-events-none"
        >
          <Mail className="h-3.5 w-3.5" />
          {resendSetup.isPending ? "Sending…" : "Resend email"}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 border-gray-100" />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className="rounded-[8px] px-3 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5" />
              Status
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              className="w-36 rounded-[12px] p-1.5 border border-gray-100 shadow-xl bg-white z-50"
            >
              <DropdownMenuItem
                disabled={trainer.status === "Active" || updateTrainer.isPending}
                onSelect={() => handleUpdateStatus("approved")}
                className="rounded-[8px] px-3 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 disabled:opacity-50 disabled:pointer-events-none"
              >
                Active
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={trainer.status === "Pending" || updateTrainer.isPending}
                onSelect={() => handleUpdateStatus("pending")}
                className="rounded-[8px] px-3 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 disabled:opacity-50 disabled:pointer-events-none"
              >
                Pending
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={trainer.status === "Rejected" || updateTrainer.isPending}
                onSelect={() => handleUpdateStatus("rejected")}
                className="rounded-[8px] px-3 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 disabled:opacity-50 disabled:pointer-events-none"
              >
                Rejected
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={trainer.status === "Suspended" || deleteTrainer.isPending}
                onSelect={handleDeactivate}
                className="rounded-[8px] px-3 py-2 text-xs font-semibold text-amber-600 cursor-pointer hover:bg-amber-50 focus:bg-amber-50 focus:text-amber-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Deactivate
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
