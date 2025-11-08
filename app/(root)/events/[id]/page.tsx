import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      {/* EVENT HERO */}
      <section className="wrapper flex justify-center bg-muted/40 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full 2xl:max-w-7xl">
          {/* IMAGE */}
          <div className="relative w-full overflow-hidden">
            <div className="w-full h-full aspect-[16/10] md:aspect-auto">
              <Image
                src={event.imageUrl}
                alt="Event image"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center gap-6 p-6 md:p-10">
            <h2 className="text-3xl font-semibold">{event.title}</h2>

            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="px-3 py-1 bg-green-500/10 text-green-700 rounded-full text-sm font-medium">
                {event.isFree ? "Free Entry" : `₹${event.price}`}
              </span>

              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {event.category.name}
              </span>

              <p className="text-sm text-muted-foreground">
                Hosted by{" "}
                <span className="text-primary font-medium">
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </p>
            </div>

            <CheckoutButton event={event} />

            <div className="space-y-3 text-sm text-muted-foreground">
              {/* DATE & TIME */}
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={20}
                  height={20}
                />
                <p>
                  {formatDateTime(event.startDateTime).dateOnly} •{" "}
                  {formatDateTime(event.startDateTime).timeOnly} —{" "}
                  {formatDateTime(event.endDateTime).dateOnly} •{" "}
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={20}
                  height={20}
                />
                <p>{event.location}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 space-y-2">
              <p className="text-base font-medium">About this event</p>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>

              {event.url && (
                <a
                  href={event.url}
                  target="_blank"
                  className="text-primary underline text-sm"
                >
                  Visit Event Website
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TERMS & CONDITIONS */}
      <section className="wrapper my-12">
        <div className="rounded-xl border border-border bg-muted/30 p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>

          <Accordion type="single" collapsible className="space-y-1">
            <AccordionItem value="general">
              <AccordionTrigger className="text-base">
                General Rules
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Entry is only allowed with valid registration. Organizers
                reserve the right to deny entry to anyone violating rules or
                causing disturbance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refunds">
              <AccordionTrigger className="text-base">
                Refund & Cancellation
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Tickets are non-refundable unless the event is cancelled. Any
                changes will be communicated via email or the event page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy">
              <AccordionTrigger className="text-base">
                Privacy & Data Usage
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                By attending, you agree that your basic information may be used
                for event communication and updates.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="liability">
              <AccordionTrigger className="text-base">
                Liability
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Organizers are not responsible for lost items. Attendees are
                responsible for personal belongings and safety.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* RELATED EVENTS */}
      <section className="wrapper my-12 flex flex-col gap-8">
        <h2 className="text-2xl font-semibold">Related Events</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Similar Events"
          emptyStateSubtext="Check back soon!"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;
