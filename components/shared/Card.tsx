import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Calendar, Tag, Edit, ArrowRight, User } from "lucide-react";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex w-full max-w-[400px] flex-col overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/60">
      {/* Image */}
      <Link
        href={`/events/${event._id}`}
        className="relative h-48 w-full overflow-hidden"
      >
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-50 group-hover:opacity-60 transition-all" />
      </Link>

      {/* Edit & Delete */}
      {isEventCreator && !hidePrice && (
        <div className="absolute right-3 top-3 flex flex-col gap-2 rounded-xl bg-white/90 p-2 shadow-lg backdrop-blur-sm border border-border">
          <Link
            href={`/events/${event._id}/update`}
            className="rounded-md p-2 hover:bg-muted transition"
          >
            <Edit className="h-4 w-4 text-foreground" />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-4 p-5">
        {/* Price & Category */}
        {!hidePrice && (
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-green-600/10 text-green-700 px-3 py-1 text-xs font-semibold">
              {event.isFree ? "Free" : `₹${event.price}`}
            </span>

            <span className="flex items-center gap-1 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
              <Tag className="h-3 w-3" />
              {event.category.name}
            </span>
          </div>
        )}

        {/* Date */}
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        {/* Title */}
        <Link href={`/events/${event._id}`}>
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {event.title}
          </h3>
        </Link>

        {/* Organizer */}
        <div className="mt-1 flex items-center justify-between">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <User className="h-4 w-4 text-primary/80" />
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${event._id}`}
              className="flex items-center gap-1 text-primary text-sm font-medium hover:underline"
            >
              Order Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
