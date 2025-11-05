import Faq from '@/components/shared/FAQ'
import Stats from '@/components/shared/Stats'
import Testimonials from '@/components/shared/Testimonials'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Organize, Engage, Celebrate: Seamless Campus Events!</h1>
            <p className="p-regular-20 md:p-regular-24">
              Manage, schedule, and promote your campus events effortlessly with EventPilot’s smart platform trusted by thousands of student communities.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit flex items-center gap-2">
              <Link href="/events">
                <Search className="w-5 h-5" />
                Explore Events
              </Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trusted by <br /> Thousands of Campus Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          {/* <Search /> */}
          {/* <CategoryFilter /> */}
        </div>

        {/* <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Check back soon for upcoming events"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        /> */}
      </section>

      <Stats />
      <Testimonials />
      <Faq />
    </>
  )
}
