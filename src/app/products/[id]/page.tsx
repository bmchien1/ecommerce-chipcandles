"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Heart, ShoppingCart, Star, Minus, Plus, ArrowLeft } from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock product data - in real app, fetch based on params.id
  const product = {
    id: Number.parseInt(params.id as string),
    name: "Nến Thơm Lavender Premium",
    price: 150000,
    originalPrice: 180000,
    category: "Nến Thơm",
    rating: 4.5,
    reviewCount: 24,
    inStock: true,
    description:
      "Nến thơm hương lavender cao cấp được làm từ sáp đậu nành tự nhiên, mang lại hương thơm dịu nhẹ và thư giãn. Thời gian cháy lên đến 40 giờ.",
    features: [
      "Sáp đậu nành tự nhiên 100%",
      "Hương lavender Pháp cao cấp",
      "Thời gian cháy: 40 giờ",
      "Bấc nến cotton không khói",
      "Kích thước: 8cm x 10cm",
    ],
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    relatedProducts: [
      { id: 2, name: "Nến Thơm Vanilla", price: 140000, image: "/placeholder.svg?height=200&width=200" },
      { id: 3, name: "Nến Thơm Rose", price: 160000, image: "/placeholder.svg?height=200&width=200" },
      { id: 4, name: "Khuôn Nến Hình Trái Tim", price: 85000, image: "/placeholder.svg?height=200&width=200" },
      { id: 7, name: "Bộ Màu Nến 12 Màu", price: 120000, image: "/placeholder.svg?height=200&width=200" },
    ],
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const addToCart = () => {
    // Add to cart logic
    console.log(`Added ${quantity} of product ${product.id} to cart`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-orange-600">
            Sản phẩm
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Back Button */}
        <Button variant="outline" className="mb-6 bg-transparent" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
              {product.originalPrice > product.price && (
                <Badge className="absolute top-4 left-4 bg-red-600">
                  Giảm {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-orange-600" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviewCount} đánh giá)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-orange-600">{product.price.toLocaleString("vi-VN")}đ</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.originalPrice.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Số lượng:</span>
                <div className="flex items-center border rounded-lg">
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={addToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Thêm vào giỏ hàng
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <div className="text-sm text-gray-600">
                {product.inStock ? (
                  <span className="text-green-600 font-medium">✓ Còn hàng</span>
                ) : (
                  <span className="text-red-600 font-medium">✗ Hết hàng</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Mô tả</TabsTrigger>
              <TabsTrigger value="features">Đặc điểm</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Mô tả sản phẩm</h3>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Nến thơm Lavender Premium là sản phẩm cao cấp được chế tạo từ 100% sáp đậu nành tự nhiên, kết hợp
                      với tinh dầu lavender nhập khẩu từ Pháp. Sản phẩm mang lại hương thơm dịu nhẹ, thư giãn và giúp
                      tạo không gian ấm cúng cho ngôi nhà của bạn.
                    </p>
                    <p className="mb-4">
                      Với thiết kế tinh tế và sang trọng, nến thơm này không chỉ là nguồn ánh sáng mà còn là món đồ
                      trang trí hoàn hảo cho mọi không gian. Thời gian cháy lên đến 40 giờ đảm bảo bạn có thể tận hưởng
                      hương thơm trong thời gian dài.
                    </p>
                    <p>
                      Sản phẩm được đóng gói cẩn thận trong hộp quà đẹp mắt, phù hợp làm quà tặng cho người thân yêu
                      trong các dịp đặc biệt.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Đặc điểm nổi bật</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Đánh giá khách hàng</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">Nguyễn Thị A</span>
                        <span className="text-sm text-gray-500">2 ngày trước</span>
                      </div>
                      <p className="text-gray-600">
                        Nến thơm rất chất lượng, hương lavender thơm nhẹ nhàng và không gắt. Cháy đều và lâu. Rất hài
                        lòng với sản phẩm!
                      </p>
                    </div>

                    <div className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="font-medium">Trần Văn B</span>
                        <span className="text-sm text-gray-500">1 tuần trước</span>
                      </div>
                      <p className="text-gray-600">
                        Sản phẩm đẹp, đóng gói cẩn thận. Hương thơm dễ chịu nhưng hơi nhạt so với mong đợi.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản phẩm liên quan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-orange-600 font-bold">{relatedProduct.price.toLocaleString("vi-VN")}đ</p>
                    <Button className="w-full mt-3" size="sm" asChild>
                      <Link href={`/products/${relatedProduct.id}`}>Xem chi tiết</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
