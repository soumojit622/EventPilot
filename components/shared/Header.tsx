import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm transition-colors">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        {/* Logo + Project Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            width={48}
            height={48}
            alt="EventPilot Logo"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white transition-opacity duration-300 group-hover:opacity-80">
            EventPilot
          </span>
        </Link>

        {/* Desktop Navigation */}
        <SignedIn>
          <nav className="hidden md:flex items-center gap-8">
            <NavItems />
          </nav>
        </SignedIn>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <div className="md:hidden">
              <MobileNav />
            </div>
          </SignedIn>

          <SignedOut>
            <Button
              asChild
              size="lg"
              className="flex items-center gap-2 rounded-full font-medium tracking-wide bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link href="/sign-in">
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
