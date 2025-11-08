import { getOrderById } from "@/lib/actions/order.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import QRCode from "react-qr-code";
import {
  Calendar,
  MapPin,
  User,
  Ticket as TicketIcon,
  ShieldCheck,
  BadgeCheck,
  Info,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import DownloadTicketButton from "@/components/DownloadTicketButton";

interface TicketPageProps {
  params: { orderId: string };
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const order = await getOrderById(params.orderId);

  if (!order || order.buyer._id.toString() !== userId) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 font-semibold">
        You don’t have permission to view this ticket.
      </div>
    );
  }

  const event = order.event;
  const buyer = order.buyer;
  const date = formatDateTime(event.startDateTime);

  const qrValue = `${event.title} | Order #${order._id} | ${buyer.email}`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative bg-background">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[radial-gradient(circle_at_top_left,theme(colors.primary)/20%,transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(circle_at_bottom_right,theme(colors.indigo.500)/15%,transparent_65%)]" />

      <div className="w-full max-w-4xl relative">
        <div
          id="ticket-container"
          className="
        relative bg-card border border-border rounded-3xl shadow-[0_5px_25px_-8px_rgba(0,0,0,0.25)]
        overflow-hidden
      "
        >
          {/* Foil strip */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 animate-pulse" />

          {/* Perforated ticket holes */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background border border-border"></div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background border border-border"></div>

          <div className="flex flex-col lg:flex-row">
            {/* LEFT PANEL */}
            <div className="flex-1 p-6 sm:p-8 space-y-6">
              {/* Event image */}
              <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                    {event.title}
                  </h1>
                  <p className="text-[11px] sm:text-xs opacity-80">
                    {event.category?.name}
                  </p>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4 bg-muted/40 border border-border rounded-xl p-5 text-sm">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar className="h-4 w-4 text-primary" /> Date & Time
                  </div>
                  <p className="font-semibold mt-1">{date.dateTime}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <MapPin className="h-4 w-4 text-primary" /> Venue
                  </div>
                  <p className="font-semibold mt-1">{event.location}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <User className="h-4 w-4 text-primary" /> Attendee
                  </div>
                  <p className="font-semibold mt-1">
                    {buyer.firstName} {buyer.lastName}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <TicketIcon className="h-4 w-4 text-primary" /> Ticket ID
                  </div>
                  <p className="font-semibold mt-1">#{order._id}</p>
                </div>
              </div>

              {/* Seat/Gate/Entry */}
              <div className="grid grid-cols-3 text-center bg-muted/70 border border-border rounded-xl p-4 text-sm">
                <div>
                  <p className="font-semibold">Gate</p>
                  <span className="text-muted-foreground">A</span>
                </div>
                <div>
                  <p className="font-semibold">Seat</p>
                  <span className="text-muted-foreground">
                    {order?.seat || "General"}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">Entry</p>
                  <span className="text-muted-foreground">{date.timeOnly}</span>
                </div>
              </div>

              {/* Small meta */}
              <div className="text-[10px] text-muted-foreground space-y-1 mt-2">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-green-600" />
                  Verified Digital Ticket
                </div>
                <div className="flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3 text-blue-600" />
                  Issued on {date.dateOnly}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE STUB */}
            <div className="w-full lg:w-[260px] bg-muted/30 border-l border-dashed border-border flex flex-col items-center justify-center p-6 gap-6">
              <div className="bg-background rounded-xl border border-border shadow p-3">
                <QRCode value={qrValue} size={110} />
              </div>

              <p className="text-[11px] text-muted-foreground">Scan at entry</p>

              <p className="text-3xl font-black tracking-tight">
                {event.isFree ? "FREE" : `₹${event.price}`}
              </p>

              <DownloadTicketButton fileName={`Ticket-${order._id}`} />

              <p className="text-[9px] text-muted-foreground text-center leading-tight">
                Entry allowed once. Carry valid ID proof.
              </p>
            </div>
          </div>

          {/* TERMS */}
          <div className="flex items-center gap-2 text-[10px] bg-muted/90 border-t border-border px-6 py-3 text-muted-foreground">
            <Info className="h-3 w-3" />
            Non-refundable unless event is cancelled. Resale or duplication
            prohibited.
          </div>
        </div>

        <p className="text-center mt-3 text-[11px] text-muted-foreground">
          Ticket Serial #{order._id}
        </p>
      </div>
    </div>
  );
}
