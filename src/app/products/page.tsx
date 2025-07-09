"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search, Filter } from "lucide-react"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [sortBy, setSortBy] = useState("name")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { value: "all", label: "Tất Cả Sản Phẩm" },
    { value: "candles", label: "Nến Thơm" },
    { value: "molds", label: "Khuôn Nến" },
    { value: "colors", label: "Màu Nến" },
    { value: "boxes", label: "Hộp Đựng" },
    { value: "cards", label: "Thiệp Tặng" },
    { value: "accessories", label: "Phụ Kiện" },
  ]

  const allProducts = [
    // Nến Thơm
    {
      id: 1,
      name: "Nến Thơm Lavender",
      price: 150000,
      category: "candles",
      categoryName: "Nến Thơm",
      image: "/placeholder.svg?height=300&width=300",
      description: "Nến thơm hương lavender thư giãn",
    },
    {
      id: 2,
      name: "Nến Thơm Vanilla",
      price: 140000,
      category: "candles",
      categoryName: "Nến Thơm",
      image: "/placeholder.svg?height=300&width=300",
      description: "Nến thơm hương vanilla ngọt ngào",
    },
    {
      id: 3,
      name: "Nến Thơm Rose",
      price: 160000,
      category: "candles",
      categoryName: "Nến Thơm",
      image: "/placeholder.svg?height=300&width=300",
      description: "Nến thơm hương hoa hồng lãng mạn",
    },

    // Khuôn Nến
    {
      id: 4,
      name: "Khuôn Nến Hình Trái Tim",
      price: 85000,
      category: "molds",
      categoryName: "Khuôn Nến",
      image: "/placeholder.svg?height=300&width=300",
      description: "Khuôn silicon hình trái tim",
    },
    {
      id: 5,
      name: "Khuôn Nến Hình Tròn",
      price: 65000,
      category: "molds",
      categoryName: "Khuôn Nến",
      image: "/placeholder.svg?height=300&width=300",
      description: "Khuôn silicon hình tròn cơ bản",
    },
    {
      id: 6,
      name: "Khuôn Nến Hình Vuông",
      price: 70000,
      category: "molds",
      categoryName: "Khuôn Nến",
      image: "/placeholder.svg?height=300&width=300",
      description: "Khuôn silicon hình vuông hiện đại",
    },

    // Màu Nến
    {
      id: 7,
      name: "Bộ Màu Nến 12 Màu",
      price: 120000,
      category: "colors",
      categoryName: "Màu Nến",
      image: "/placeholder.svg?height=300&width=300",
      description: "Bộ 12 màu nhuộm nến cơ bản",
    },
    {
      id: 8,
      name: "Màu Nến Đỏ",
      price: 25000,
      category: "colors",
      categoryName: "Màu Nến",
      image: "/placeholder.svg?height=300&width=300",
      description: "Màu nhuộm nến đỏ tươi",
    },
    {
      id: 9,
      name: "Màu Nến Xanh Dương",
      price: 25000,
      category: "colors",
      categoryName: "Màu Nến",
      image: "/placeholder.svg?height=300&width=300",
      description: "Màu nhuộm nến xanh dương",
    },

    // Hộp Đựng
    {
      id: 10,
      name: "Hộp Quà Cao Cấp",
      price: 45000,
      category: "boxes",
      categoryName: "Hộp Đựng",
      image: "/placeholder.svg?height=300&width=300",
      description: "Hộp đựng nến sang trọng",
    },
    {
      id: 11,
      name: "Hộp Giấy Kraft",
      price: 25000,
      category: "boxes",
      categoryName: "Hộp Đựng",
      image: "/placeholder.svg?height=300&width=300",
      description: "Hộp giấy kraft thân thiện môi trường",
    },
    {
      id: 12,
      name: "Hộp Nhựa Trong Suốt",
      price: 35000,
      category: "boxes",
      categoryName: "Hộp Đựng",
      image: "/placeholder.svg?height=300&width=300",
      description: "Hộp nhựa trong suốt bảo vệ sản phẩm",
    },

    // Thiệp Tặng
    {
      id: 13,
      name: "Thiệp Chúc Mừng Sinh Nhật",
      price: 15000,
      category: "cards",
      categoryName: "Thiệp Tặng",
      image: "/placeholder.svg?height=300&width=300",
      description: "Thiệp chúc mừng sinh nhật đẹp",
    },
    {
      id: 14,
      name: "Thiệp Cảm Ơn",
      price: 12000,
      category: "cards",
      categoryName: "Thiệp Tặng",
      image: "/placeholder.svg?height=300&width=300",
      description: "Thiệp cảm ơn tinh tế",
    },
    {
      id: 15,
      name: "Thiệp Chúc Mừng Năm Mới",
      price: 18000,
      category: "cards",
      categoryName: "Thiệp Tặng",
      image: "/placeholder.svg?height=300&width=300",
      description: "Thiệp chúc mừng năm mới",
    },

    // Phụ Kiện
    {
      id: 16,
      name: "Bấc Nến Cotton",
      price: 30000,
      category: "accessories",
      categoryName: "Phụ Kiện",
      image: "/placeholder.svg?height=300&width=300",
      description: "Bấc nến cotton chất lượng cao",
    },
    {
      id: 17,
      name: "Kẹp Bấc Nến",
      price: 20000,
      category: "accessories",
      categoryName: "Phụ Kiện",
      image: "/placeholder.svg?height=300&width=300",
      description: "Kẹp cố định bấc nến",
    },
    {
      id: 18,
      name: "Nhiệt Kế Làm Nến",
      price: 85000,
      category: "accessories",
      categoryName: "Phụ Kiện",
      image: "/placeholder.svg?height=300&width=300",
      description: "Nhiệt kế chuyên dụng làm nến",
    },
  ]

  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  useEffect(() => {
    let filtered = allProducts

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [selectedCategory, searchQuery, sortBy])

  const currentCategoryName = categories.find((cat) => cat.value === selectedCategory)?.label || "Tất Cả Sản Phẩm"

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentCategoryName}</h1>
          <p className="text-gray-600">Khám phá bộ sưu tập sản phẩm chất lượng cao</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Tên A-Z</SelectItem>
              <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
              <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-orange-600">{product.categoryName}</Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <p className="text-orange-600 font-bold text-lg mb-4">{product.price.toLocaleString("vi-VN")}đ</p>
                  <div className="flex gap-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/products/${product.id}`}>Xem Chi Tiết</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào phù hợp</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
