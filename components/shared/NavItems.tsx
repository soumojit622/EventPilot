"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li key={link.route} className="relative group">
            <Link
              href={link.route}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-400/30"
                    : "text-gray-500 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              {link.icon && <link.icon className="w-5 h-5" />}
              <span>{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
