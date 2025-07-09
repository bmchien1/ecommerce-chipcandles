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
import { Search, Mail, Heart, Star } from "lucide-react"

export default function CardsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const cardCategories = [
    { value: "all", label: "Tất Cả Thiệp" },
    { value: "birthday", label: "Sinh Nhật" },
    { value: "thank-you", label: "Cảm Ơn" },
    { value: "congratulations", label: "Chúc Mừng" },
    { value: "love", label: "Tình Yêu" },
    { value: "holiday", label: "Ngày Lễ" },
  ]

  const cards = [
    {
      id: 1,
      name: "Thiệp Sinh Nhật Hoa Tươi",
      price: 15000,
      category: "birthday",
      categoryName: "Sinh Nhật",
      image: "/placeholder.svg?height=250&width=250",
      description: "Thiệp sinh nhật với họa tiết hoa tươi đẹp mắt",
      material: "Giấy cao cấp",
      size: "15cm x 10cm",
      rating: 4.6,
      inStock: true,
      design: "Hoa tươi",
    },
    {
      id: 2,
      name: "Thiệp Cảm Ơn Tối Giản",
      price: 12000,
      category: "thank-you",
      categoryName: "Cảm Ơn",
      image: "/placeholder.svg?height=250&width=250",
      description: "Thiệp cảm ơn thiết kế tối giản, thanh lịch",
      material: "Giấy kraft",
      size: "14cm x 9cm",
      rating: 4.4,
      inStock: true,
      design: "Tối giản",
    },
    {
      id: 3,
      name: "Thiệp Chúc Mừng Vàng Kim",
      price: 20000,
      category: "congratulations",
      categoryName: "Chúc Mừng",
      image: "/placeholder.svg?height=250&width=250",
      description: "Thiệp chúc mừng với chi tiết vàng kim sang trọng",
      material: "Giấy art",
      size: "16cm x 11cm",
      rating: 4.8,
      inStock: true,
      design: "Vàng kim",
    },
    {
      id: 4,
      name: "Thiệp Tình Yêu Trái Tim",
      price: 18000,
      category: "love",
      categoryName: "Tình Yêu",
      image: "/placeholder.svg?height=250&width=250",
      description: "Thiệp tình yêu với họa tiết trái tim lãng mạn",
      material: "Giấy cao cấp",
      size: "15cm x 10cm",
      rating: 4.7,
      inStock: true,
      design: "Trái tim",
    },
    {
      id: 5,
      name: "Thiệp Giáng Sinh Cây Thông",
      price: 22000,
      category: "holiday",
      categoryName: "Ngày Lễ",
      image: "/placeholder.svg?height=250&width=250",
      description: "Thiệp Giáng sinh với hình cây thông đẹp mắt",
      material: "Giấy cao cấp",
      size: "17cm x 12cm",
      rating: 4.9,
      inStock: false,
    },
    {
      id: 6,
      name: "Thiệp Sinh Nhật Động Vật",
      price: 16000,
      category: "birthday",
      categoryName: "Sinh Nhật",
      image: "/placeholder.svg?height=250&width=250",
      description: "Thiệp sinh nhật với hình động vật dễ thương",
      material: "Giấy cao cấp",
      size: "15cm x 10cm",
      rating: 4.5,
      inStock: true,
      design: "Động vật",
    },
    {
      id: 7,
      name: "Thiệp Cảm Ơn Hoa Lavender",
      price: 14000,
      category: "thank-you",
      categoryName: "Cảm Ơn",
      image: "/placeholder.svg?height=250&width=250",
      description: "Thiệp cảm ơn với họa tiết hoa lavender thư giãn",
      material: "Giấy kraft",
      size: "14cm x 9cm",
      rating: 4.6,
      inStock: true,
      design: "Hoa lavender",
    },
    {
      id: 8,
      name: "Thiệp Năm Mới Pháo Hoa",
      price: 25000,
      category: "holiday",
      categoryName: "Ngày Lễ",
      image: "/placeholder.svg?height=250&width=250",
      description: "Thiệp năm mới với họa tiết pháo hoa rực rỡ",
      material: "Giấy art",
      size: "18cm x 13cm",
      rating: 4.8,
      inStock: true,
      design: "Pháo hoa",
    },
  ]

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || card.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Mail className="h-16 w-16 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Thiệp Tặng</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bộ sưu tập thiệp tặng đẹp mắt cho mọi dịp đặc biệt, hoàn hảo để đi kèm với món quà nến thơm
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Tìm kiếm thiệp..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Loại thiệp" />
            </SelectTrigger>
            <SelectContent>
              {cardCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <Card key={card.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary-300">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.name}
                    width={250}
                    height={250}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary-600">{card.categoryName}</Badge>
                  {!card.inStock && (
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
                    {card.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{card.description}</p>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(card.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({card.rating})</span>
                  </div>

                  <div className="text-xs text-gray-500 mb-3 space-y-1">
                    <p>
                      <strong>Thiết kế:</strong> {card.design}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Không tìm thấy thiệp nào phù hợp</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
