"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, Menu, Flame, Palette, Package, Gift, Mail, Sparkles, Star } from "lucide-react"

export function Header() {
  const [cartCount] = useState(0)

  const categories = [
    { name: "Màu Nến", href: "/colors", icon: Palette },
    { name: "Khuôn Nến", href: "/molds", icon: Package },
    { name: "Mùi Hương", href: "/scents", icon: Sparkles },
    { name: "Hộp Đựng", href: "/boxes", icon: Gift },
    { name: "Thiệp Tặng", href: "/cards", icon: Mail },
    { name: "Đánh Giá", href: "/reviews", icon: Star },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Flame className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">CandleShop</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Danh Mục</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                    {categories.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <NavigationMenuLink key={category.name} asChild>
                          <Link
                            href={category.href}
                            className="flex items-center space-x-3 rounded-md p-3 hover:bg-accent"
                          >
                            <IconComponent className="h-5 w-5 text-primary-600" />
                            <span className="font-medium">{category.name}</span>
                          </Link>
                        </NavigationMenuLink>
                      )
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/create-order"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    Tạo Đơn Hàng
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/reviews"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    Đánh Giá
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="search" placeholder="Tìm kiếm..." className="pl-10" />
            </div>
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary-600">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input type="search" placeholder="Tìm kiếm..." className="pl-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Danh Mục</h3>
                    {categories.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="flex items-center space-x-3 rounded-md p-2 hover:bg-accent"
                        >
                          <IconComponent className="h-4 w-4 text-primary-600" />
                          <span>{category.name}</span>
                        </Link>
                      )
                    })}
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Link href="/create-order" className="block py-2 hover:text-primary-600 font-medium">
                      Tạo Đơn Hàng
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
