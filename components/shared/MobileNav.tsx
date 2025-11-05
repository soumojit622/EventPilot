import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
    return (
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger className="align-middle">
                    <Image
                        src="/assets/icons/menu.svg"
                        alt="menu"
                        width={24}
                        height={24}
                        className="cursor-pointer hover:scale-110 transition-transform duration-200"
                    />
                </SheetTrigger>

                <SheetContent className="flex flex-col gap-6 bg-white dark:bg-gray-900 text-foreground p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                    {/* Logo + Project Name */}
                    <div className="flex items-center gap-3 mb-4">
                        <Image
                            src="/logo.svg"
                            alt="EventPilot Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                        <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            EventPilot
                        </span>
                    </div>

                    <Separator className="border border-gray-300 dark:border-gray-600" />

                    {/* Navigation Links */}
                    <NavItems />

                    <Separator className="border border-gray-300 dark:border-gray-600 mt-4" />
                </SheetContent>
            </Sheet>
        </nav>
    );
};

export default MobileNav;
