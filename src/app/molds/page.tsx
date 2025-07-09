"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search, Package, Heart, Star } from "lucide-react"

export default function MoldsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const moldCategories = [
    { value: "all", label: "Tất Cả Khuôn" },
    { value: "basic", label: "Khuôn Cơ Bản" },
    { value: "decorative", label: "Khuôn Trang Trí" },
    { value: "seasonal", label: "Khuôn Theo Mùa" },
    { value: "special", label: "Khuôn Đặc Biệt" },
  ]

  const molds = [
    {
      id: 1,
      name: "Khuôn Nến Tròn Cơ Bản",
      price: 45000,
      category: "basic",
      categoryName: "Khuôn Cơ Bản",
      image: "/placeholder.svg?height=250&width=250",
      description: "Khuôn silicon tròn cơ bản, dễ sử dụng",
      material: "Silicon",
      size: "8cm x 5cm",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 2,
      name: "Khuôn Nến Hình Trái Tim",
      price: 65000,
      category: "decorative",
      categoryName: "Khuôn Trang Trí",
      image: "/placeholder.svg?height=250&width=250",
      description: "Khuôn hình trái tim lãng mạn",
      material: "Silicon",
      size: "10cm x 8cm",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 3,
      name: "Khuôn Nến Hình Lá",
      price: 75000,
      category: "decorative",
      categoryName: "Khuôn Trang Trí",
      image: "/placeholder.svg?height=250&width=250",
      description: "Khuôn hình lá tự nhiên",
      material: "Silicon",
      size: "12cm x 6cm",
      rating: 4.6,
      inStock: true,
    },
    {
      id: 4,
      name: "Khuôn Nến Vuông",
      price: 50000,
      category: "basic",
      categoryName: "Khuôn Cơ Bản",
      image: "/placeholder.svg?height=250&width=250",
      description: "Khuôn vuông hiện đại, tinh tế",
      material: "Silicon",
      size: "8cm x 8cm x 6cm",
      rating: 4.3,
      inStock: true,
    },
    {
      id: 5,
      name: "Khuôn Nến Hoa Tuyết",
      price: 85000,
      category: "seasonal",
      categoryName: "Khuôn Theo Mùa",
      image: "/placeholder.svg?height=250&width=250",
      description: "Khuôn hoa tuyết cho mùa đông",
      material: "Silicon",
      size: "9cm x 9cm",
      rating: 4.9,
      inStock: false,
    },
    {
      id: 6,
      name: "Khuôn Nến Hình Hoa",
      price: 70000,
      category: "decorative",
      categoryName: "Khuôn Trang Trí",
      image: "/placeholder.svg?height=250&width=250",
      description: "Khuôn hình hoa đẹp mắt",
      material: "Silicon",
      size: "10cm x 10cm",
      rating: 4.7,
      inStock: true,
    },
    {
      id: 7,
      name: "Khuôn Nến Hình Ngôi Sao",
      price: 60000,
      category: "special",
      categoryName: "Khuôn Đặc Biệt",
      image: "/placeholder.svg?height=250&width=250",
      description: "Khuôn hình ngôi sao độc đáo",
      material: "Silicon",
      size: "8cm x 8cm",
      rating: 4.4,
      inStock: true,
    },
    {
      id: 8,
      name: "Khuôn Nến Hình Cây Thông",
      price: 90000,
      category: "seasonal",
      categoryName: "Khuôn Theo Mùa",
      image: "/placeholder.svg?height=250&width=250",
      description: "Khuôn cây thông cho Giáng sinh",
      material: "Silicon",
      size: "12cm x 8cm",
      rating: 4.8,
      inStock: true,
    },
  ]

  const filteredMolds = molds.filter((mold) => {
    const matchesSearch = mold.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || mold.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Package className="h-16 w-16 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Khuôn Nến</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bộ sưu tập khuôn nến đa dạng với nhiều hình dáng và kích thước khác nhau để tạo ra những chiếc nến độc đáo
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Tìm kiếm khuôn..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Loại khuôn" />
            </SelectTrigger>
            <SelectContent>
              {moldCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Molds Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMolds.map((mold) => (
            <Card key={mold.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary-300">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={mold.image || "/placeholder.svg"}
                    alt={mold.name}
                    width={250}
                    height={250}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary-600">{mold.categoryName}</Badge>
                  {!mold.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg flex items-center justify-center">
                      <Badge variant="destructive">Hết hàng</Badge>
                    </div>
                  )}
                  <Button variant="ghost" size="icon" className="absolute top-4 left-4 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {mold.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{mold.description}</p>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(mold.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({mold.rating})</span>
                  </div>

                  <div className="text-xs text-gray-500 mb-3 space-y-1">
                    <p>
                      <strong>Chất liệu:</strong> {mold.material}
                    </p>
                    <p>
                      <strong>Kích thước:</strong> {mold.size}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-primary-600 font-bold text-lg">{mold.price.toLocaleString("vi-VN")}đ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMolds.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Không tìm thấy khuôn nào phù hợp</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
