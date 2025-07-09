"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search, Palette } from "lucide-react"

export default function ColorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const colorCategories = [
    { value: "all", label: "Tất Cả Màu" },
    { value: "basic", label: "Màu Cơ Bản" },
    { value: "pastel", label: "Màu Pastel" },
    { value: "metallic", label: "Màu Kim Loại" },
    { value: "natural", label: "Màu Tự Nhiên" },
  ]

  const colors = [
    {
      id: 1,
      name: "Đỏ Cherry",
      code: "#DC143C",
      price: 25000,
      category: "basic",
      categoryName: "Màu Cơ Bản",
      image: "/placeholder.svg?height=200&width=200",
      description: "Màu đỏ cherry tươi sáng",
      inStock: true,
    },
    {
      id: 2,
      name: "Xanh Lá Tự Nhiên",
      code: "#6B8E23",
      price: 30000,
      category: "natural",
      categoryName: "Màu Tự Nhiên",
      image: "/placeholder.svg?height=200&width=200",
      description: "Màu xanh lá tự nhiên như bơ",
      inStock: true,
    },
    {
      id: 3,
      name: "Xanh Dương Đại Dương",
      code: "#006994",
      price: 28000,
      category: "basic",
      categoryName: "Màu Cơ Bản",
      image: "/placeholder.svg?height=200&width=200",
      description: "Màu xanh dương sâu như đại dương",
      inStock: true,
    },
    {
      id: 4,
      name: "Hồng Pastel",
      code: "#FFB6C1",
      price: 32000,
      category: "pastel",
      categoryName: "Màu Pastel",
      image: "/placeholder.svg?height=200&width=200",
      description: "Màu hồng pastel nhẹ nhàng",
      inStock: true,
    },
    {
      id: 5,
      name: "Vàng Ánh Kim",
      code: "#FFD700",
      price: 45000,
      category: "metallic",
      categoryName: "Màu Kim Loại",
      image: "/placeholder.svg?height=200&width=200",
      description: "Màu vàng ánh kim sang trọng",
      inStock: true,
    },
    {
      id: 6,
      name: "Tím Lavender",
      code: "#E6E6FA",
      price: 35000,
      category: "pastel",
      categoryName: "Màu Pastel",
      image: "/placeholder.svg?height=200&width=200",
      description: "Màu tím lavender thư giãn",
      inStock: true,
    },
    {
      id: 7,
      name: "Cam Sunset",
      code: "#FF8C00",
      price: 27000,
      category: "basic",
      categoryName: "Màu Cơ Bản",
      image: "/placeholder.svg?height=200&width=200",
      description: "Màu cam như hoàng hôn",
      inStock: false,
    },
    {
      id: 8,
      name: "Bạc Ánh Kim",
      code: "#C0C0C0",
      price: 50000,
      category: "metallic",
      categoryName: "Màu Kim Loại",
      image: "/placeholder.svg?height=200&width=200",
      description: "Màu bạc ánh kim tinh tế",
      inStock: true,
    },
  ]

  const filteredColors = colors.filter((color) => {
    const matchesSearch = color.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || color.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Palette className="h-16 w-16 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bảng Màu Nến</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập màu sắc đa dạng để tạo ra những chiếc nến thơm với màu sắc yêu thích của bạn
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Tìm kiếm màu..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Loại màu" />
            </SelectTrigger>
            <SelectContent>
              {colorCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Colors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredColors.map((color) => (
            <Card key={color.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary-300">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="w-full h-32 rounded-t-lg border-b" style={{ backgroundColor: color.code }} />
                  <Badge className="absolute top-4 right-4 bg-white text-gray-900 border">{color.categoryName}</Badge>
                  {!color.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg flex items-center justify-center">
                      <Badge variant="destructive">Hết hàng</Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {color.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{color.description}</p>
                  <p className="text-xs text-gray-500 mb-3 font-mono">{color.code}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredColors.length === 0 && (
          <div className="text-center py-12">
            <Palette className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Không tìm thấy màu nào phù hợp</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
