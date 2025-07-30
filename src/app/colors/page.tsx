"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search, Palette, Heart, Star, ShoppingCart } from "lucide-react"
import { useColors } from "@/hooks/useColors"
import { useCategories } from "@/hooks/useCategories"

export default function ColorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [limit] = useState(12)

  const options = useMemo(() => ({ search: searchQuery, page, limit }), [searchQuery, page, limit]);

  // Memoize categories options to prevent unnecessary fetches
  const categoryOptions = useMemo(() => ({}), []);
  const {
    colors,
    isLoading,
    error,
    fetchColors,
    pagination,
  } = useColors(options)

  // Fetch all categories with memoized options
  const { categories, isLoading: categoriesLoading, error: categoriesError } = useCategories(categoryOptions);

  // Create a map of category ID to category name
  const categoryMap = useMemo(() => {
    const map = new Map<number, string>();
    categories.forEach(category => {
      map.set(category.id, category.name);
    });
    return map;
  }, [categories]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setPage(1)
    fetchColors({ search: e.target.value, page: 1, limit })
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    fetchColors({ search: searchQuery, page: newPage, limit })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Màu Nến</h1>
          <p className="text-gray-600">Khám phá bộ sưu tập màu nến chất lượng cao</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Tìm kiếm màu nến..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">Lỗi: {error}</p>
          </div>
        )}
        {!isLoading && !error && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {colors.map((color) => (
                <Card key={color.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={color.img_url || "/placeholder.svg"}
                        alt={color.name}
                        width={250}
                        height={250}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {color.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">Chất liệu: {color.material}</p>
                      {color.categoryId !== 0 && (
                        <p className="text-gray-600 text-sm mb-1">
                          Danh mục: {categoriesLoading ? "Đang tải..." : categoriesError ? "Lỗi" : categoryMap.get(color.categoryId) || "Không xác định"}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={pagination.page === i + 1 ? "default" : "outline"}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}