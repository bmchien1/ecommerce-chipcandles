"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Palette, Package, Gift, Mail, Sparkles, Star, Heart } from "lucide-react"
import { useProducts } from "@/hooks/useProducts"
import { useMemo } from "react"

export default function HomePage() {
  const categories = [
    {
      id: "colors",
      name: "Màu Nến",
      description: "Khám phá bảng màu đa dạng cho nến của bạn",
      icon: Palette,
      image: "/color-placeholder.jpg?height=300&width=300",
      href: "/colors",
    },
    {
      id: "molds",
      name: "Khuôn Nến",
      description: "Khuôn đúc nến với nhiều hình dáng độc đáo",
      icon: Package,
      image: "https://res.cloudinary.com/dukap4zei/image/upload/v1753368845/d90dd80de87f6121386e_txelbh.jpg",
      href: "/molds",
    },
    {
      id: "scents",
      name: "Mùi Hương",
      description: "Tinh dầu thơm cao cấp cho nến của bạn",
      icon: Sparkles,
      image: "/scent-placeholder.png?height=300&width=300",
      href: "/scents",
    },
    {
      id: "boxes",
      name: "Hộp Đựng",
      description: "Hộp đựng nến sang trọng và bảo vệ",
      icon: Gift,
      image:
        "https://res.cloudinary.com/dukap4zei/image/upload/v1753118250/1fbfc2d5-132a-4fd1-88f0-d160385e4618_fd7dq0.jpg",
      href: "/boxes",
    },
    {
      id: "cards",
      name: "Thiệp Tặng",
      description: "Thiệp chúc mừng và tặng kèm đẹp mắt",
      icon: Mail,
      image: "https://res.cloudinary.com/dukap4zei/image/upload/v1753630319/hqmzp8fbnupauzpaxl4p.jpg",
      href: "/cards",
    },
    {
      id: "reviews",
      name: "Đánh Giá",
      description: "Xem đánh giá từ khách hàng",
      icon: Star,
      image:
        "https://res.cloudinary.com/dukap4zei/image/upload/v1753705386/PAFF_030718_fivestarrating-1024x622_embnpt.jpg",
      href: "/reviews",
    },
  ]

  const featuredOptions = useMemo(() => ({ limit: 4 }), [])
  const {
    products: featuredProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useProducts(featuredOptions)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 py-20 overflow-hidden">
        {/* Decorative hearts */}
        <div className="absolute top-10 left-10 text-pink-200 opacity-50">
          <Heart className="h-16 w-16 fill-current" />
        </div>
        <div className="absolute bottom-10 right-20 text-rose-200 opacity-50">
          <Heart className="h-20 w-20 fill-current" />
        </div>
        <div className="absolute top-1/2 right-10 text-pink-300 opacity-30">
          <Heart className="h-12 w-12 fill-current" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full mb-4 shadow-lg">
                <Heart className="h-4 w-4 fill-current" />
                <span className="font-semibold">Chúc mừng 20/10 - Ngày Phụ Nữ Việt Nam</span>
                <Heart className="h-4 w-4 fill-current" />
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Nến Thơm
                <span className="text-pink-600"> Handmade</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Tạo ra những chiếc nến thơm độc đáo với màu sắc, hình dáng và mùi hương theo ý thích của bạn
              </p>
              <p className="text-lg text-pink-600 font-medium mb-8 italic">
                ✨ Món quà ý nghĩa dành tặng người phụ nữ yêu thương ✨
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg"
                  asChild
                >
                  <Link href="/create-order">Tạo nến thơm</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-pink-500 text-pink-600 hover:bg-pink-50 bg-transparent"
                  asChild
                >
                  <Link href="/products">Các sản phẩm</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://res.cloudinary.com/dukap4zei/image/upload/v1760457744/6a22c8ce-1f24-4686-974e-0233895119a5_kqnehf.png"
                alt="Nến thơm handmade"
                width={500}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Khám Phá Danh Mục</h2>
            <p className="text-xl text-gray-600">Tất cả những gì bạn cần để tạo ra những chiếc nến thơm hoàn hảo</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.id} href={category.href}>
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-pink-300">
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute top-4 left-4 bg-gradient-to-br from-pink-500 to-rose-500 p-2 rounded-full shadow-md">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-pink-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-xl text-gray-600">Những sản phẩm được yêu thích nhất</p>
          </div>

          {isLoadingFeatured ? (
            <div>Đang tải...</div>
          ) : errorFeatured ? (
            <div className="text-red-600">{errorFeatured}</div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nổi bật</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={product.img_url || "/placeholder.svg"}
                        alt={product.name}
                        width={250}
                        height={250}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-pink-600 font-bold text-lg">{Number(product.cost).toLocaleString("vi-VN")}đ</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <Heart className="absolute top-10 left-20 h-24 w-24 fill-current text-white" />
          <Heart className="absolute bottom-20 right-32 h-32 w-32 fill-current text-white" />
          <Heart className="absolute top-1/2 left-1/3 h-16 w-16 fill-current text-white" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Bắt Đầu Tạo Đơn Hàng Của Bạn</h2>
          <p className="text-xl text-pink-50 mb-8 max-w-2xl mx-auto">
            Tham gia cộng đồng những người yêu thích nến thơm và khám phá nghệ thuật làm nến handmade
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-pink-50 shadow-xl" asChild>
            <Link href="/create-order">Tạo Đơn Hàng Ngay</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
