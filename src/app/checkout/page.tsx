"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
import { useBills } from '@/hooks/useBills';
import { useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function CheckoutPage() {
  const [paymentMethod] = useState("bank")
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const { createBill, isLoading } = useBills();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('cartOrders') || '[]');
      setOrderItems(stored);
    }
  }, []);

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
  const shipping = 30000
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const form = formRef.current;
    const billData = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement)?.value || '',
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement)?.value || '',
      email: (form.elements.namedItem('email') as HTMLInputElement)?.value || '',
      phone: (form.elements.namedItem('phone') as HTMLInputElement)?.value || '',
      address: (form.elements.namedItem('address') as HTMLInputElement)?.value || '',
      city: (form.elements.namedItem('city') as HTMLInputElement)?.value || '',
      district: (form.elements.namedItem('district') as HTMLInputElement)?.value || '',
      ward: (form.elements.namedItem('ward') as HTMLInputElement)?.value || '',
      notes: (form.elements.namedItem('notes') as HTMLTextAreaElement)?.value || '',
      orderItems,
      paymentMethod,
      isPaid: false,
    };
    try {
      await createBill(billData);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cartOrders');
      }
      toast.success('Đặt hàng thành công! Bạn sẽ nhận được email xác nhận sớm.', {
        duration: 4000,
        style: {
          background: '#ffffff',
          color: '#333',
          border: '1px solid #f97316', // Matches orange-600
          padding: '16px',
        },
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 2000); // Redirect after 2 seconds to allow toast visibility
    } catch (err) {
      toast.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.', {
        duration: 4000,
        style: {
          background: '#ffffff',
          color: '#333',
          border: '1px solid #dc2626', // Matches red-600 for error
          padding: '16px',
        },
      });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Toaster position="top-right" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

        <form onSubmit={handleSubmit} ref={formRef}>
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

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    <Truck className="h-4 w-率先

System: w-4 mr-2" />
                    {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
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