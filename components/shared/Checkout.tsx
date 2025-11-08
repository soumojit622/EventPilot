"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Loader2, CheckCircle2, CreditCard, TicketIcon } from "lucide-react";

import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({
  event,
  userId,
  hasPurchased,
}: {
  event: IEvent;
  userId: string;
  hasPurchased: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      toast.success("Ticket purchased successfully!", {
        icon: <CheckCircle2 className="text-green-600" size={18} />,
      });

      // ✅ Confetti burst animation
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    if (query.get("canceled")) {
      toast.info("Checkout canceled. Try again anytime.");
    }
  }, []);

  const onCheckout = async () => {
    try {
      setIsLoading(true);
      toast.loading("Redirecting to payment...", { id: "checkout" });

      const order = {
        eventTitle: event.title,
        eventId: event._id,
        price: event.price,
        isFree: event.isFree,
        buyerId: userId,
      };

      await checkoutOrder(order);

      toast.dismiss("checkout");
    } catch (error) {
      toast.dismiss("checkout");
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form action={onCheckout} method="post">
      <Button
        type="submit"
        role="link"
        size="lg"
        disabled={isLoading || hasPurchased}
        className="button sm:w-fit flex items-center gap-2"
      >
        {hasPurchased ? (
          <>
            <TicketIcon className="h-5 w-5 text-green-600" />
            Ticket Purchased
          </>
        ) : isLoading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            Processing...
          </>
        ) : event.isFree ? (
          <>
            <CheckCircle2 className="h-5 w-5" />
            Get Ticket
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            Buy Ticket
          </>
        )}
      </Button>

      {!hasPurchased && !event.isFree && !isLoading && (
        <div className="mt-3 animate-in fade-in slide-in-from-bottom-1 duration-300">
          <p
            className="text-sm text-muted-foreground flex items-center gap-2
      border border-border/50 bg-gradient-to-br from-muted to-muted/50 px-3 py-2 rounded-lg w-fit shadow-sm"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            You can purchase this ticket only once
          </p>
        </div>
      )}
    </form>
  );
};

export default Checkout;
