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
import { Search, ShoppingCart, Menu, Palette, Package, Gift, Mail, Sparkles, Star, Heart } from "lucide-react"
import Image from "next/image"

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
    <header className="sticky top-0 z-50 w-full border-b border-pink-100 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500" />

        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Image
                src="https://res.cloudinary.com/dukap4zei/image/upload/v1760458550/ChatGPT_Image_23_14_00_14_thg_10_2025-Photoroom_zlefac.png"
                alt="Logo"
                width={70}
                height={70}
                className="h-12 w-12 object-contain transition-transform group-hover:scale-110"
              />
              <Heart className="absolute -top-1 -right-1 h-4 w-4 text-pink-500 fill-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              ChipScendle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-pink-600 data-[state=open]:text-pink-600">
                  Danh Mục
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4 bg-gradient-to-br from-white to-pink-50/30">
                    {categories.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <NavigationMenuLink key={category.name} asChild>
                          <Link
                            href={category.href}
                            className="flex items-center space-x-3 rounded-lg p-3 hover:bg-pink-50 hover:shadow-sm transition-all group border border-transparent hover:border-pink-100"
                          >
                            <div className="p-2 rounded-lg bg-pink-50 group-hover:bg-pink-100 transition-colors">
                              <IconComponent className="h-5 w-5 text-pink-600 group-hover:text-pink-700" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-pink-700">{category.name}</span>
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
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-pink-50 hover:text-pink-700 focus:bg-pink-50 focus:text-pink-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Tạo Đơn Hàng
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/reviews"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-pink-50 hover:text-pink-700 focus:bg-pink-50 focus:text-pink-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
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
              <Input
                type="search"
                placeholder="Tìm kiếm..."
                className="pl-10 border-pink-100 focus:border-pink-300 focus:ring-pink-200"
              />
            </div>
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="relative hover:bg-pink-50 hover:text-pink-700">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-pink-500 to-rose-500 border-2 border-white">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-pink-50 hover:text-pink-700">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-gradient-to-b from-white to-pink-50/20">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Tìm kiếm..."
                      className="pl-10 border-pink-100 focus:border-pink-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-pink-700 flex items-center gap-2">
                      <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
                      Danh Mục
                    </h3>
                    {categories.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="flex items-center space-x-3 rounded-lg p-3 hover:bg-pink-50 transition-colors group border border-transparent hover:border-pink-100"
                        >
                          <div className="p-1.5 rounded-md bg-pink-50 group-hover:bg-pink-100">
                            <IconComponent className="h-4 w-4 text-pink-600" />
                          </div>
                          <span className="text-gray-700 group-hover:text-pink-700">{category.name}</span>
                        </Link>
                      )
                    })}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-pink-100">
                    <Link
                      href="/create-order"
                      className="block py-2 px-3 rounded-lg hover:bg-pink-50 hover:text-pink-700 font-medium transition-colors"
                    >
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
