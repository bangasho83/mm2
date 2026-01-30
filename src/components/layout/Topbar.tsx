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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Agency } from "@/lib/schemas";
import { DateRangePicker } from "@/components/DateRangePicker";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/auth/UserContext";

interface TopbarProps {
  agency: Agency;
}

export function Topbar({ agency }: TopbarProps) {
  const router = useRouter();
  const { profile } = useUser();
  const profileRecord = profile as Record<string, unknown> | null;
  const profileUser = profileRecord?.user as Record<string, unknown> | undefined;
  const profileName =
    (profileUser?.name as string | undefined) ??
    (profileRecord?.name as string | undefined) ??
    agency.user.name;
  const profileAvatar =
    (profileUser?.avatarUrl as string | undefined) ??
    (profileRecord?.avatarUrl as string | undefined) ??
    undefined;
  const profileInitials =
    (profileName || agency.user.name)
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || agency.user.initials;

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-ink-100 bg-white/80 px-6 py-4 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-6">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="font-display text-lg font-semibold text-ink-900">MetrixMate</span>
          <sup className="text-xs font-semibold text-ink-400">beta</sup>
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
              <DropdownMenuItem asChild>
                <Link href="/site-audit">Site Audit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/keyword-planner">Keyword Planner</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/calendar-ideation">Calendar Ideation</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/ad-playground">Ad Playground</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/creatives">Creatives</Link>
              </DropdownMenuItem>
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
                {profileAvatar ? <AvatarImage src={profileAvatar} alt={profileName} /> : null}
                <AvatarFallback>{profileInitials}</AvatarFallback>
              </Avatar>
            <span className="hidden text-sm font-semibold text-ink-700 md:inline">
              {profileName}
            </span>
          </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Agency settings</DropdownMenuItem>
            <DropdownMenuItem>Team access</DropdownMenuItem>
            <DropdownMenuItem onSelect={handleSignOut}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
