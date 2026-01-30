"use client";

import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Briefcase,
  Wrench,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Agency } from "@/lib/schemas";
import { DateRangePicker } from "@/components/DateRangePicker";
import Link from "next/link";

interface TopbarProps {
  agency: Agency;
}

export function Topbar({ agency }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-ink-100 bg-white/80 px-6 py-4 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold text-ink-900">MetrixMate</span>
          <span className="text-xs font-semibold text-ink-400">beta</span>
        </Link>
        <nav className="hidden items-center gap-4 xl:flex">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-ink-700"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/workspace"
            className="flex items-center gap-2 text-sm font-semibold text-ink-700"
          >
            <Briefcase className="h-4 w-4" />
            Workspace
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-sm font-semibold text-ink-700">
                <Wrench className="h-4 w-4" />
                Tools
                <ChevronDown className="h-3 w-3 text-ink-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Site Audit</DropdownMenuItem>
              <DropdownMenuItem>Keyword Planner</DropdownMenuItem>
              <DropdownMenuItem>Calendar Ideation</DropdownMenuItem>
              <DropdownMenuItem>Ad Playground</DropdownMenuItem>
              <DropdownMenuItem>Creatives</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="flex items-center gap-2 text-sm font-semibold text-ink-700">
            <Users className="h-4 w-4" />
            Contacts
          </button>
        </nav>
        <DateRangePicker />
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              MetrixAssist
              <ChevronDown className="h-3 w-3 text-ink-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Social Media</DropdownMenuItem>
            <DropdownMenuItem>Website</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full border border-ink-100 bg-white px-2 py-1 shadow-sm">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{agency.user.initials}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-semibold text-ink-700 md:inline">
                {agency.user.name}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Agency settings</DropdownMenuItem>
            <DropdownMenuItem>Team access</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
