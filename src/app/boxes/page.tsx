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
import { Search, Gift, Heart, Star } from "lucide-react"

export default function BoxesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const boxCategories = [
    { value: "all", label: "Tất Cả Hộp" },
    { value: "paper", label: "Hộp Giấy" },
    { value: "wood", label: "Hộp Gỗ" },
    { value: "plastic", label: "Hộp Nhựa" },
    { value: "metal", label: "Hộp Kim Loại" },
    { value: "eco", label: "Hộp Thân Thiện Môi Trường" },
  ]

  const boxes = [
    {
      id: 1,
      name: "Hộp Giấy Kraft Eco",
      price: 25000,
      category: "eco",
      categoryName: "Hộp Thân Thiện Môi Trường",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hộp giấy kraft tái chế, thân thiện môi trường",
      material: "Giấy kraft",
      size: "12cm x 12cm x 8cm",
      rating: 4.5,
      inStock: true,
      capacity: "1 nến",
    },
    {
      id: 2,
      name: "Hộp Gỗ Tre Cao Cấp",
      price: 85000,
      category: "wood",
      categoryName: "Hộp Gỗ",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hộp gỗ tre tự nhiên, sang trọng và bền đẹp",
      material: "Gỗ tre",
      size: "15cm x 15cm x 10cm",
      rating: 4.8,
      inStock: true,
      capacity: "2 nến",
    },
    {
      id: 3,
      name: "Hộp Nhựa Trong Suốt",
      price: 35000,
      category: "plastic",
      categoryName: "Hộp Nhựa",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hộp nhựa trong suốt, bảo vệ và trưng bày sản phẩm",
      material: "Nhựa PET",
      size: "10cm x 10cm x 8cm",
      rating: 4.2,
      inStock: true,
      capacity: "1 nến",
    },
    {
      id: 4,
      name: "Hộp Giấy Cao Cấp",
      price: 45000,
      category: "paper",
      categoryName: "Hộp Giấy",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hộp giấy cao cấp với thiết kế sang trọng",
      material: "Giấy duplex",
      size: "14cm x 14cm x 9cm",
      rating: 4.6,
      inStock: true,
      capacity: "1-2 nến",
    },
    {
      id: 5,
      name: "Hộp Kim Loại Vintage",
      price: 120000,
      category: "metal",
      categoryName: "Hộp Kim Loại",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hộp kim loại phong cách vintage, có thể tái sử dụng",
      material: "Thiếc",
      size: "16cm x 12cm x 8cm",
      rating: 4.9,
      inStock: false,
    },
    {
      id: 6,
      name: "Hộp Giấy Hoa Văn",
      price: 38000,
      category: "paper",
      categoryName: "Hộp Giấy",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hộp giấy với họa tiết hoa văn đẹp mắt",
      material: "Giấy art",
      size: "13cm x 13cm x 8cm",
      rating: 4.4,
      inStock: true,
      capacity: "1 nến",
    },
    {
      id: 7,
      name: "Hộp Tre Tròn",
      price: 65000,
      category: "eco",
      categoryName: "Hộp Thân Thiện Môi Trường",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hộp tre tròn tự nhiên, độc đáo",
      material: "Tre tự nhiên",
      size: "Đường kính 12cm x 8cm",
      rating: 4.7,
      inStock: true,
      capacity: "1 nến",
    },
    {
      id: 8,
      name: "Hộp Nhựa Màu Sắc",
      price: 42000,
      category: "plastic",
      categoryName: "Hộp Nhựa",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hộp nhựa nhiều màu sắc, bắt mắt",
      material: "Nhựa PP",
      size: "11cm x 11cm x 7cm",
      rating: 4.1,
      inStock: true,
      capacity: "1 nến",
    },
  ]

  const filteredBoxes = boxes.filter((box) => {
    const matchesSearch = box.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || box.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Gift className="h-16 w-16 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hộp Đựng Nến</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bộ sưu tập hộp đựng nến đa dạng chất liệu và thiết kế để bảo vệ và tôn lên vẻ đẹp của sản phẩm
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Tìm kiếm hộp đựng..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Loại hộp" />
            </SelectTrigger>
            <SelectContent>
              {boxCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Boxes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBoxes.map((box) => (
            <Card key={box.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary-300">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={box.image || "/placeholder.svg"}
                    alt={box.name}
                    width={250}
                    height={250}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary-600">{box.categoryName}</Badge>
                  {!box.inStock && (
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
                    {box.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{box.description}</p>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(box.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({box.rating})</span>
                  </div>

                  <div className="text-xs text-gray-500 mb-3 space-y-1">
                    <p>
                      <strong>Chất liệu:</strong> {box.material}
                    </p>
                    <p>
                      <strong>Kích thước:</strong> {box.size}
                    </p>
                    <p>
                      <strong>Sức chứa:</strong> {box.capacity}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-primary-600 font-bold text-lg">{box.price.toLocaleString("vi-VN")}đ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBoxes.length === 0 && (
          <div className="text-center py-12">
            <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Không tìm thấy hộp đựng nào phù hợp</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
