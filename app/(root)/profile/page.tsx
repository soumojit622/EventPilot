import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <div className="min-h-screen flex flex-col space-y-6">
      {/* MY TICKETS */}
      <section className="border-b border-border/40 py-10">
        <div className="wrapper flex items-center justify-between flex-wrap gap-4">
          <h3 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-foreground">
            My Tickets
          </h3>

          <Button
            asChild
            size="lg"
            className="hidden sm:flex shadow-md hover:shadow-xl transition"
          >
            <Link href="/#events" className="flex items-center gap-2">
              <Search className="size-5" />
              Browse Events
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper py-10">
        <Collection
          data={orderedEvents}
          emptyTitle="You haven’t purchased any tickets yet"
          emptyStateSubtext="Start exploring events and book your first ticket."
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* EVENTS ORGANIZED */}
      <section className="border-b border-border/40 py-10 mt-4">
        <div className="wrapper flex items-center justify-between flex-wrap gap-4">
          <h3 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-foreground">
            Events Organized
          </h3>

          <Button
            asChild
            size="lg"
            className="hidden sm:flex shadow-md hover:shadow-xl transition"
          >
            <Link href="/events/create" className="flex items-center gap-2">
              <PlusCircle className="size-5" />
              Create Event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper py-10">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No events created yet"
          emptyStateSubtext="Start your first event today."
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </div>
  );
};

export default ProfilePage;
