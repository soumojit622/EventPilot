"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { Loader2, CheckCircle2, CreditCard } from "lucide-react";

import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      toast.success("Ticket purchased successfully!", {
        icon: <CheckCircle2 className="text-green-600" size={18} />,
      });
    }

    if (query.get("canceled")) {
      toast.info("Checkout canceled. Try again anytime.");
    }
  }, []);

  const onCheckout = async () => {
    try {
      setIsLoading(true);

      toast.loading("Redirecting to payment...", {
        id: "checkout",
      });

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
        disabled={isLoading}
        className="button sm:w-fit flex items-center gap-2"
      >
        {isLoading ? (
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
    </form>
  );
};

export default Checkout;
