"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { ProductService, Product } from "@/lib/services/productService";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    ProductService.getProduct(Number(params.id))
      .then(res => setProduct(res.product))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div>Đang tải...</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const addToCart = () => {
    if (!product) return;
    const order = {
      id: product.id,
      name: product.name,
      components: {}, // Sản phẩm có sẵn không có components tuỳ chỉnh
      price: Number(product.cost),
      quantity,
      image: product.img_url,
    };
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('cartOrders') || '[]');
      const foundIndex = existing.findIndex((item: any) => item.id === order.id && JSON.stringify(item.components) === JSON.stringify(order.components));
      if (foundIndex !== -1) {
        existing[foundIndex].quantity = (existing[foundIndex].quantity || 1) + quantity;
      } else {
        existing.push(order);
      }
      localStorage.setItem('cartOrders', JSON.stringify(existing));
    }
    // Optional: chuyển hướng sang /cart hoặc toast thông báo
    window.location.href = '/cart'; 
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Trang chủ</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-orange-600">Sản phẩm</Link>
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
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square relative">
              <Image
                src={product.img_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-orange-600">{product.cost}đ</span>
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
              </div>
              <div className="text-sm text-gray-600">
                {product.status ? (
                  <span className="text-green-600 font-medium">✓ Còn hàng</span>
                ) : (
                  <span className="text-red-600 font-medium">✗ Hết hàng</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
