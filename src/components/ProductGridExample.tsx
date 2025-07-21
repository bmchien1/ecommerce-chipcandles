"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Heart, ShoppingCart } from "lucide-react"
import { useBoxes, useCards, useMolds, useScents, useColors } from "@/hooks"
import { MockProduct } from "@/lib/mockData"

interface ProductGridExampleProps {
  productType: 'boxes' | 'cards' | 'molds' | 'scents' | 'colors';
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ProductGridExample({ productType, title, description, icon }: ProductGridExampleProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Use the appropriate hook based on product type
  const hooks = {
    boxes: useBoxes({ searchQuery, selectedCategory }),
    cards: useCards({ searchQuery, selectedCategory }),
    molds: useMolds({ searchQuery, selectedCategory }),
    scents: useScents({ searchQuery, selectedCategory }),
    colors: useColors({ searchQuery, selectedCategory }),
  }

  const {
    categories,
    filteredBoxes,
    filteredCards,
    filteredMolds,
    filteredScents,
    filteredColors,
    totalItems,
    totalPages,
    currentPage,
    isLoading,
    error,
    setSearchQuery: setHookSearchQuery,
    setSelectedCategory: setHookSelectedCategory,
    setPage,
  } = hooks[productType]

  const getFilteredProducts = () => {
    switch (productType) {
      case 'boxes': return filteredBoxes;
      case 'cards': return filteredCards;
      case 'molds': return filteredMolds;
      case 'scents': return filteredScents;
      case 'colors': return filteredColors;
      default: return [];
    }
  }

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    await setHookSearchQuery(query);
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    await setHookSelectedCategory(category);
  };

  const handlePageChange = async (page: number) => {
    await setPage(page);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const renderProductCard = (product: MockProduct) => (
    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary-300">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
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
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
              <Badge variant="secondary" className="text-white bg-red-500">
                Hết Hàng
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-primary">
              {formatPrice(product.price)}
            </span>
            <Button size="sm" className="h-8 px-3">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Thêm
            </Button>
          </div>
          {product.material && (
            <p className="text-xs text-gray-500 mt-1">
              Chất liệu: {product.material}
            </p>
          )}
          {product.size && (
            <p className="text-xs text-gray-500">
              Kích thước: {product.size}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            {icon}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder={`Tìm kiếm ${productType}...`}
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Loại sản phẩm" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">Lỗi: {error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getFilteredProducts().map(renderProductCard)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Trước
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Sau
                  </Button>
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="text-center mt-4 text-gray-600">
              Hiển thị {getFilteredProducts().length} trong tổng số {totalItems} sản phẩm
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && getFilteredProducts().length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Không tìm thấy sản phẩm nào.</p>
          </div>
        )}
      </div>
    </div>
  );
} 