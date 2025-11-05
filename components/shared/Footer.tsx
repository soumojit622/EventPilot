import Image from "next/image";
import { Twitter, Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
    const columns = {
        Product: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Security", href: "#security" },
            { label: "Integrations", href: "#" },
        ],
        Company: [
            { label: "About Us", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
            { label: "Partners", href: "#" },
        ],
        Resources: [
            { label: "Documentation", href: "#" },
            { label: "Community", href: "#" },
            { label: "Help Center", href: "#" },
            { label: "Contact", href: "#contact" },
        ],
        Legal: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Cookie Policy", href: "#" },
            { label: "Compliance", href: "#" },
        ],
    };

    const socials = [
        { icon: Twitter, href: "#" },
        { icon: Linkedin, href: "#" },
        { icon: Github, href: "#" },
        { icon: Mail, href: "#contact" },
    ];

    return (
        <footer className="bg-black text-white border-t border-white/10">
            <div className="container py-20">

                {/* CTA Block */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                        Smarter event management for modern campuses.
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base">
                        EventPilot reduces scheduling conflicts, speeds up coordination, and keeps teams aligned.
                    </p>

                    <div className="flex justify-center gap-4 mt-8">
                        <Button asChild className="group px-6 py-3 text-sm font-medium">
                            <a href="#">
                                Start Free Trial
                                <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                            </a>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="px-6 py-3 text-sm font-medium border-white/20 text-white hover:bg-white/5 hover:text-white"
                        >
                            <a href="#contact">Contact Sales</a>
                        </Button>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">

                    {/* Brand */}
                    <div className="lg:col-span-2 space-y-5">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo.svg"
                                alt="EventPilot Logo"
                                width={46}
                                height={46}
                                className="object-contain"
                            />
                            <span className="text-xl font-semibold">EventPilot</span>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Event management built specifically for colleges and universities.
                            Simple setup. Reliable automation. No complication.
                        </p>

                        <div className="flex gap-3 pt-1">
                            {socials.map(({ icon: Icon, href }) => (
                                <a
                                    key={href}
                                    href={href}
                                    className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 border border-white/10 transition hover:bg-white/10"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {Object.entries(columns).map(([title, items]) => (
                        <div key={title}>
                            <h3 className="mb-4 text-xs font-semibold tracking-wider uppercase text-white/70">
                                {title}
                            </h3>
                            <ul className="space-y-3">
                                {items.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-white transition"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Bottom */}
                <div className="mt-16 border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-400">
                            © 2025 EventPilot. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-400">
                            Designed for campuses that value clarity and efficiency.
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
