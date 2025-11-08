import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import { Inbox } from "lucide-react";

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  const showPagination = totalPages > 1;

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-12 animate-fade-in">
          {/* Event Grid */}
          <ul className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li
                  key={event._id}
                  className="flex justify-center transition hover:scale-[1.02]"
                >
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>

          {/* Pagination */}
          {showPagination && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        // Beautiful Empty State
        <div className="wrapper flex min-h-[260px] w-full flex-col items-center justify-center gap-4 rounded-xl border border-border/40 bg-muted/20 backdrop-blur-sm py-20 shadow-sm animate-fade-in text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Inbox className="size-8 text-primary" />
          </div>

          <h3 className="text-xl font-semibold text-foreground">
            {emptyTitle}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {emptyStateSubtext}
          </p>
        </div>
      )}
    </>
  );
};

export default Collection;
