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
import { Search, Sparkles, Heart, Star } from "lucide-react"

export default function ScentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const scentCategories = [
    { value: "all", label: "Tất Cả Mùi Hương" },
    { value: "floral", label: "Hương Hoa" },
    { value: "fresh", label: "Hương Tươi Mát" },
    { value: "woody", label: "Hương Gỗ" },
    { value: "fruity", label: "Hương Trái Cây" },
    { value: "spicy", label: "Hương Gia Vị" },
  ]

  const scents = [
    {
      id: 1,
      name: "Tinh Dầu Lavender",
      price: 85000,
      category: "floral",
      categoryName: "Hương Hoa",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hương lavender thư giãn, giúp giảm stress",
      origin: "Pháp",
      volume: "30ml",
      rating: 4.8,
      inStock: true,
      intensity: "Nhẹ nhàng",
    },
    {
      id: 2,
      name: "Tinh Dầu Bạc Hà",
      price: 65000,
      category: "fresh",
      categoryName: "Hương Tươi Mát",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hương bạc hà tươi mát, sảng khoái",
      origin: "Việt Nam",
      volume: "30ml",
      rating: 4.5,
      inStock: true,
      intensity: "Mạnh mẽ",
    },
    {
      id: 3,
      name: "Tinh Dầu Hoa Hồng",
      price: 120000,
      category: "floral",
      categoryName: "Hương Hoa",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hương hoa hồng Bulgaria cao cấp",
      origin: "Bulgaria",
      volume: "30ml",
      rating: 4.9,
      inStock: true,
      intensity: "Vừa phải",
    },
    {
      id: 4,
      name: "Tinh Dầu Gỗ Đàn Hương",
      price: 150000,
      category: "woody",
      categoryName: "Hương Gỗ",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hương gỗ đàn hương ấm áp, sang trọng",
      origin: "Ấn Độ",
      volume: "30ml",
      rating: 4.7,
      inStock: false,
    },
    {
      id: 5,
      name: "Tinh Dầu Cam Bergamot",
      price: 75000,
      category: "fruity",
      categoryName: "Hương Trái Cây",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hương cam bergamot tươi mới",
      origin: "Ý",
      volume: "30ml",
      rating: 4.6,
      inStock: true,
      intensity: "Tươi mới",
    },
    {
      id: 6,
      name: "Tinh Dầu Vanilla",
      price: 90000,
      category: "spicy",
      categoryName: "Hương Gia Vị",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hương vanilla Madagascar ngọt ngào",
      origin: "Madagascar",
      volume: "30ml",
      rating: 4.8,
      inStock: true,
      intensity: "Ngọt ngào",
    },
    {
      id: 7,
      name: "Tinh Dầu Eucalyptus",
      price: 70000,
      category: "fresh",
      categoryName: "Hương Tươi Mát",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hương bạch đàn tươi mát, thanh khiết",
      origin: "Úc",
      volume: "30ml",
      rating: 4.4,
      inStock: true,
      intensity: "Thanh khiết",
    },
    {
      id: 8,
      name: "Tinh Dầu Quế",
      price: 80000,
      category: "spicy",
      categoryName: "Hương Gia Vị",
      image: "/placeholder.svg?height=250&width=250",
      description: "Hương quế ấm áp, cay nồng",
      origin: "Sri Lanka",
      volume: "30ml",
      rating: 4.3,
      inStock: true,
      intensity: "Ấm áp",
    },
  ]

  const filteredScents = scents.filter((scent) => {
    const matchesSearch = scent.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || scent.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-16 w-16 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mùi Hương</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bộ sưu tập tinh dầu thơm cao cấp từ khắp nơi trên thế giới để tạo ra những chiếc nến thơm độc đáo
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Tìm kiếm mùi hương..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Loại hương" />
            </SelectTrigger>
            <SelectContent>
              {scentCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Scents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredScents.map((scent) => (
            <Card key={scent.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary-300">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={scent.image || "/placeholder.svg"}
                    alt={scent.name}
                    width={250}
                    height={250}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary-600">{scent.categoryName}</Badge>
                  {!scent.inStock && (
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
                    {scent.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{scent.description}</p>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(scent.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({scent.rating})</span>
                  </div>

                  <div className="text-xs text-gray-500 mb-3 space-y-1">
                    <p>
                      <strong>Xuất xứ:</strong> {scent.origin}
                    </p>
                    <p>
                      <strong>Dung tích:</strong> {scent.volume}
                    </p>
                    <p>
                      <strong>Cường độ:</strong> {scent.intensity}
                    </p>
                  </div>

                  {/* <div className="flex justify-between items-center">
                    <p className="text-primary-600 font-bold text-lg">{scent.price.toLocaleString("vi-VN")}đ</p>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredScents.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Không tìm thấy mùi hương nào phù hợp</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
