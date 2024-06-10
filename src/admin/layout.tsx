"use client";
import { Pathname } from "react-router-dom";
import React from "react";
import Sidebar from "../sidebarTemplate";
import Topbar from "../topbarTemplate";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const isCurrentPage = (href: string) => href === pathName;

  const board = {
    title: "Admin",
    link: "/admin/overview",
  }

  const sidebarData = [
    {
      id: 1,
      title: "Overview",
      link: "/admin/overview",
    },
    {
      id: 2,
      title: "Articles",
      link: "/admin/blogs",
      subtitles: [
        { id: 1, text: "Create", link: "/admin/blogs/create" },
      ],
    },
    {
      id: 3,
      title: "Events",
      link: "/admin/events",
      subtitles: [
        { id: 1, text: "Create", link: "/admin/events/create" },
        // { id: 2, text: 'Subscription', link: "/admin/events/subscription" },
      ],
    },
    {
      id: 4,
      title: "Member",
      link: "/admin/members",
      subtitles: [
        { id: 1, text: "Create", link: "/admin/members/create" },
        // { id: 2, text: 'Sous-menu 1.2', link: "#" },
      ],
    },
    {
      id: 5,
      title: "Users",
      link: "/admin/users",
      subtitles: [
        { id: 1, text: "Update", link: "/admin/users/update" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64  max-sm:hidden">
        <Sidebar data={sidebarData} board={board} />
      </div>

      <div className="flex-grow md:overflow-y-auto">
        <div className="w-full flex-1">
          <Topbar />
        </div>
        <div className="p-6 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
