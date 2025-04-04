"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ArrowRightLeft, BarChart3, Briefcase, Cpu, DollarSign, Home, Newspaper, Settings } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuGroup,
  SidebarMenuGroupLabel,
  SidebarMenuGroupContent,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6" />
          <span className="text-lg font-bold">QuantumInvest</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                className={cn(
                  "flex items-center space-x-2",
                  pathname === "/" ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Home className="h-4 w-4" />
                <span>Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/?tab=portfolio"
                className={cn(
                  "flex items-center space-x-2",
                  pathname === "/?tab=portfolio" ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Briefcase className="h-4 w-4" />
                <span>Portfolio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/?tab=market"
                className={cn(
                  "flex items-center space-x-2",
                  pathname === "/?tab=market" ? "text-primary" : "text-muted-foreground"
                )}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Market</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/?tab=trading"
                className={cn(
                  "flex items-center space-x-2",
                  pathname === "/?tab=trading" ? "text-primary" : "text-muted-foreground"
                )}
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span>Trading</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/?tab=news"
                className={cn(
                  "flex items-center space-x-2",
                  pathname === "/?tab=news" ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Newspaper className="h-4 w-4" />
                <span>News</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/?tab=ai"
                className={cn(
                  "flex items-center space-x-2",
                  pathname === "/?tab=ai" ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Cpu className="h-4 w-4" />
                <span>AI Insights</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/settings"
                className={cn(
                  "flex items-center space-x-2",
                  pathname === "/settings" ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

