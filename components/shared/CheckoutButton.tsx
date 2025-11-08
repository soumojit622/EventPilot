"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { TicketIcon, ExternalLink } from "lucide-react";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  const [hasPurchased, setHasPurchased] = useState(false);
  const [ticketOrderId, setTicketOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      const orders = await getOrdersByUser({ userId, page: 1 });

      const ticketOrder = orders?.data.find(
        (order: any) => order.event._id.toString() === event._id.toString()
      );

      if (ticketOrder) {
        setHasPurchased(true);
        setTicketOrderId(ticketOrder._id); // ✅ store order ID for ticket page
      }
    };

    fetchOrders();
  }, [userId, event._id]);

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-500">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            {hasPurchased ? (
              <div className="flex items-center gap-3">
                {/* ✅ Purchased Button */}
                <Button
                  size="lg"
                  disabled
                  className="bg-green-500/15 text-green-700 rounded-full border border-green-400 flex items-center gap-2"
                >
                  <TicketIcon className="h-5 w-5" />
                  Ticket Purchased
                </Button>

                {/* ✅ View Ticket Button */}
                {ticketOrderId && (
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-primary text-white flex items-center gap-2"
                  >
                    <Link href={`/tickets/${ticketOrderId}`}>
                      View Ticket
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <Checkout event={event} userId={userId} hasPurchased={false} />
            )}
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
