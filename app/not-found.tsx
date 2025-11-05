import { Button } from "@/components/ui/button"
import { Home, ArrowRight, Search, HeadphonesIcon } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 py-20 text-center max-w-3xl">

                {/* Error Code */}
                <div className="mb-10">
                    <span className="text-6xl md:text-8xl font-black text-foreground/15 tracking-tight select-none block animate-pulse">
                        404
                    </span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 text-balance">
                    Page not found
                </h1>

                {/* Description */}
                <p className="text-lg text-foreground/60 mb-12 leading-relaxed max-w-2xl mx-auto">
                    This section isn’t part of the current event map. The link may be outdated,
                    renamed, or temporarily unavailable. You’re still on track—here are a few things you can do:
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button size="lg" className="gap-2 font-medium tracking-wide">
                            <Home className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                    </Link>

                    <Link href="/events">
                        <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 font-medium tracking-wide border-foreground/25 hover:bg-foreground/5"
                        >
                            Browse Events
                            <Search className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                {/* Secondary Help Section */}
                <div className="mt-12 flex flex-col items-center gap-2 text-foreground/60 text-sm">
                    <div className="flex items-center gap-1 font-medium text-foreground/70">
                        <HeadphonesIcon className="w-4 h-4" />
                        Need assistance?
                    </div>
                    <Link href="/contact" className="text-primary hover:underline font-medium flex items-center gap-1">
                        Contact Support <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>

                {/* Footer */}
                <p className="mt-14 text-xs text-foreground/40 font-mono">
                    Error: PAGE_NOT_FOUND • EventPilot
                </p>
            </div>
        </div>
    )
}
