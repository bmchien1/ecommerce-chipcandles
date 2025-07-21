"use client"

import { useState, useEffect, useMemo } from "react"
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
import { useProducts } from "@/hooks/useProducts";

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

  const options = useMemo(() => ({ search: searchQuery }), [searchQuery]);
  const { products, isLoading, error } = useProducts(options);

  useEffect(() => {
    // The filtering and sorting logic is now handled by the useProducts hook
    // We just need to ensure the products are sorted based on the current sortBy state
    // The useProducts hook already handles filtering by category and search query
    // and sorting by the default sortBy value.
    // If a specific sortBy is selected, the useProducts hook will override it.
  }, [sortBy, searchQuery]);

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
          {isLoading ? (
            <div>Đang tải...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào phù hợp</p>
            </div>
          ) : (
            products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={product.img_url || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    {/* Có thể thêm badge category nếu muốn */}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <p className="text-orange-600 font-bold text-lg mb-4">{product.cost}đ</p>
                    <div className="flex gap-2">
                      <Button className="flex-1" asChild>
                        <Link href={`/products/${product.id}`}>Xem Chi Tiết</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
