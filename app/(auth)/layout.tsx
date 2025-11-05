import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-screen bg-[url(/auth.jpg)] bg-top bg-cover bg-no-repeat flex items-center justify-center">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

            {/* Back button */}
            <div className="absolute top-6 left-6 z-20">
                <Button
                    asChild
                    variant="secondary"
                    className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20"
                >
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" /> Back
                    </Link>
                </Button>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full flex items-center justify-center p-6">
                {children}
            </div>
        </div>
    )
}

export default Layout
