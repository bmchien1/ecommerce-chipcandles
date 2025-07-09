import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Palette, Package, Gift, Mail, Sparkles, Star } from "lucide-react"

export default function HomePage() {
  const categories = [
    {
      id: "colors",
      name: "Màu Nến",
      description: "Khám phá bảng màu đa dạng cho nến của bạn",
      icon: Palette,
      image: "/placeholder.svg?height=300&width=300",
      href: "/colors",
    },
    {
      id: "molds",
      name: "Khuôn Nến",
      description: "Khuôn đúc nến với nhiều hình dáng độc đáo",
      icon: Package,
      image: "/placeholder.svg?height=300&width=300",
      href: "/molds",
    },
    {
      id: "scents",
      name: "Mùi Hương",
      description: "Tinh dầu thơm cao cấp cho nến của bạn",
      icon: Sparkles,
      image: "/placeholder.svg?height=300&width=300",
      href: "/scents",
    },
    {
      id: "boxes",
      name: "Hộp Đựng",
      description: "Hộp đựng nến sang trọng và bảo vệ",
      icon: Gift,
      image: "/placeholder.svg?height=300&width=300",
      href: "/boxes",
    },
    {
      id: "cards",
      name: "Thiệp Tặng",
      description: "Thiệp chúc mừng và tặng kèm đẹp mắt",
      icon: Mail,
      image: "/placeholder.svg?height=300&width=300",
      href: "/cards",
    },
    {
      id: "reviews",
      name: "Đánh Giá",
      description: "Xem đánh giá từ khách hàng",
      icon: Star,
      image: "/placeholder.svg?height=300&width=300",
      href: "/reviews",
    },
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "Màu Xanh Lá Tự Nhiên",
      price: 35000,
      image: "/placeholder.svg?height=250&width=250",
      category: "Màu Nến",
    },
    {
      id: 2,
      name: "Khuôn Nến Hình Lá",
      price: 95000,
      image: "/placeholder.svg?height=250&width=250",
      category: "Khuôn Nến",
    },
    {
      id: 3,
      name: "Tinh Dầu Bạc Hà",
      price: 85000,
      image: "/placeholder.svg?height=250&width=250",
      category: "Mùi Hương",
    },
    {
      id: 4,
      name: "Hộp Tre Eco",
      price: 65000,
      image: "/placeholder.svg?height=250&width=250",
      category: "Hộp Đựng",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Nến Thơm
                <span className="text-primary-600"> Handmade</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Tạo ra những chiếc nến thơm độc đáo với màu sắc, hình dáng và mùi hương theo ý thích của bạn
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary-600 hover:bg-primary-700" asChild>
                  <Link href="/create-order">Tạo Đơn Hàng</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-600 text-primary-600 hover:bg-primary-50 bg-transparent"
                  asChild
                >
                  <Link href="/colors">Xem Màu Sắc</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500"
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
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary-300">
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md">
                          <IconComponent className="h-6 w-6 text-primary-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-xl text-gray-600">Những sản phẩm được yêu thích nhất</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={250}
                      height={250}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4 bg-primary-600 text-white px-2 py-1 rounded text-sm">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-primary-600 font-bold text-lg">{product.price.toLocaleString("vi-VN")}đ</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Bắt Đầu Tạo Đơn Hàng Của Bạn</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Tham gia cộng đồng những người yêu thích nến thơm và khám phá nghệ thuật làm nến handmade
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100" asChild>
            <Link href="/create-order">Tạo Đơn Hàng Ngay</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
