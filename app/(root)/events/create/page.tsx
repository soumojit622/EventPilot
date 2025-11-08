import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className=" bg-cover bg-center py-10 md:py-16 border-b border-border/40">
        <div className="wrapper text-center sm:text-left space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create a New Event
          </h1>
          <p className="text-muted-foreground text-base max-w-lg">
            Fill out the details below and publish your event for others to
            discover.
          </p>
        </div>
        <div className="wrapper my-8">
          <EventForm userId={userId} type="Create" />
        </div>
      </section>
    </>
  );
};

export default CreateEvent;
