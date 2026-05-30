"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Mail, MoreVertical, Pencil, Ban, CheckCircle } from "lucide-react";
import { useUpdateTrainer, useDeleteTrainer, useResendTrainerSetup } from "@/api/trainers";
import type { Trainer } from "@/components/admin/trainers/types";
import { EditTrainerDialog } from "./EditTrainerDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TrainerTableActionsProps = {
  trainer: Trainer;
};

export function TrainerTableActions({ trainer }: TrainerTableActionsProps) {
  const router = useRouter();
  const updateTrainer = useUpdateTrainer(trainer.id);
  const deleteTrainer = useDeleteTrainer();
  const resendSetup = useResendTrainerSetup();
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const isSuspended = trainer.status === "Suspended";

  function handleResendSetup() {
    if (!trainer.email?.trim()) return;
    resendSetup.mutate(trainer.email.trim());
  }

  function goToDetail() {
    router.push(`/admin/trainers/${trainer.id}`);
  }

  function handleDeactivate() {
    deleteTrainer.mutate(trainer.id, {
      onSuccess: () => setDeactivateOpen(false),
    });
  }

  function handleActivate() {
    updateTrainer.mutate(
      { onboarding_status: "approved" },
      {
        onSuccess: () => setActivateOpen(false),
      }
    );
  }

  return (
    <>
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
            onSelect={() => setEditOpen(true)}
            className="rounded-[8px] px-3 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
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
          {isSuspended ? (
            <DropdownMenuItem
              onSelect={() => setActivateOpen(true)}
              className="rounded-[8px] px-3 py-2 text-xs font-semibold text-green-600 cursor-pointer hover:bg-green-50 focus:bg-green-50 focus:text-green-700 data-[highlighted]:bg-green-50 data-[highlighted]:text-green-700"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              Activate
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onSelect={() => setDeactivateOpen(true)}
              className="rounded-[8px] px-3 py-2 text-xs font-semibold text-amber-600 cursor-pointer hover:bg-amber-50/80 focus:bg-amber-50/80 focus:text-amber-700 data-[highlighted]:bg-amber-50/80 data-[highlighted]:text-amber-700"
            >
              <Ban className="h-3.5 w-3.5" />
              Deactivate
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTrainerDialog
        trainer={trainer}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <Dialog open={deactivateOpen} onOpenChange={setDeactivateOpen}>
        <DialogContent
          className="bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>Deactivate trainer?</DialogTitle>
            <DialogDescription>
              This will deactivate {trainer.name} and restrict their access to the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              className="mt-0 rounded-[8px]"
              onClick={() => setDeactivateOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="mt-0 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-[8px]"
              disabled={deleteTrainer.isPending}
              onClick={handleDeactivate}
            >
              {deleteTrainer.isPending ? "Deactivating…" : "Deactivate trainer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activateOpen} onOpenChange={setActivateOpen}>
        <DialogContent
          className="bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>Activate trainer?</DialogTitle>
            <DialogDescription>
              This will reactivate {trainer.name} and restore their access to the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              className="mt-0 rounded-[8px]"
              onClick={() => setActivateOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="mt-0 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-[8px]"
              disabled={updateTrainer.isPending}
              onClick={handleActivate}
            >
              {updateTrainer.isPending ? "Activating…" : "Activate trainer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
