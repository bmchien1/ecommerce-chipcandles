"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CreditCard, Truck, MapPin } from "lucide-react"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod")

  const orderItems = [
    {
      id: 1,
      name: "Nến Thơm Lavender Premium",
      price: 150000,
      quantity: 2,
      category: "Nến Thơm",
    },
    {
      id: 4,
      name: "Khuôn Nến Hình Trái Tim",
      price: 85000,
      quantity: 1,
      category: "Khuôn Nến",
    },
    {
      id: 7,
      name: "Bộ Màu Nến 12 Màu",
      price: 120000,
      quantity: 1,
      category: "Màu Nến",
    },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 30000
  const total = subtotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle order submission
    console.log("Order submitted")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Thông tin giao hàng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Họ</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Tên</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" type="tel" required />
                  </div>

                  <div>
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input id="address" required />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Thành phố</Label>
                      <Input id="city" required />
                    </div>
                    <div>
                      <Label htmlFor="district">Quận/Huyện</Label>
                      <Input id="district" required />
                    </div>
                    <div>
                      <Label htmlFor="ward">Phường/Xã</Label>
                      <Input id="ward" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                    <Textarea id="notes" placeholder="Ghi chú cho đơn hàng..." />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Phương thức thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
                        <div className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer">
                        <div className="font-medium">Chuyển khoản ngân hàng</div>
                        <div className="text-sm text-gray-600">Chuyển khoản trước khi giao hàng</div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "bank" && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Thông tin chuyển khoản:</h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Ngân hàng:</strong> Vietcombank
                        </p>
                        <p>
                          <strong>Số tài khoản:</strong> 1234567890
                        </p>
                        <p>
                          <strong>Chủ tài khoản:</strong> CANDLESHOP VIETNAM
                        </p>
                        <p>
                          <strong>Nội dung:</strong> [Họ tên] - [Số điện thoại]
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Đơn hàng của bạn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.category}</p>
                          <p className="text-xs text-gray-600">Số lượng: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{(item.price * item.quantity).toLocaleString("vi-VN")}đ</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tạm tính</span>
                      <span>{subtotal.toLocaleString("vi-VN")}đ</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Phí vận chuyển</span>
                      <span>{shipping.toLocaleString("vi-VN")}đ</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Tổng cộng</span>
                      <span className="text-orange-600">{total.toLocaleString("vi-VN")}đ</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Truck className="h-4 w-4 mr-2" />
                    Đặt hàng
                  </Button>

                  <div className="text-xs text-gray-600 text-center">
                    Bằng việc đặt hàng, bạn đồng ý với{" "}
                    <a href="#" className="text-orange-600 hover:underline">
                      Điều khoản dịch vụ
                    </a>{" "}
                    và{" "}
                    <a href="#" className="text-orange-600 hover:underline">
                      Chính sách bảo mật
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
