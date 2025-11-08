"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteEvent } from "@/lib/actions/event.actions";

export function DeleteConfirmation({ eventId }: { eventId: string }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteEvent({ eventId, path: pathname });
        toast.success("Event deleted successfully");
      } catch (error) {
        toast.error("Something went wrong while deleting");
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="p-2 rounded-md hover:bg-destructive/10 transition-colors"
          aria-label="Delete Event"
        >
          <Image
            src="/assets/icons/delete.svg"
            alt="delete"
            width={20}
            height={20}
          />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white dark:bg-neutral-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            Delete this event?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-muted-foreground">
            This action cannot be undone. The event will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-accent transition">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={handleDelete}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
