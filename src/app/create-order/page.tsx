"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChevronRight, ChevronLeft, Package, Palette, Sparkles, Gift, Mail, Check } from "lucide-react"

export default function CreateOrderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedItems, setSelectedItems] = useState({
    mold: null as any,
    color: null as any,
    scent: null as any,
    box: null as any,
    card: null as any,
  })

  const steps = [
    { id: 1, name: "Chọn Khuôn", icon: Package, required: true },
    { id: 2, name: "Chọn Màu", icon: Palette, required: true },
    { id: 3, name: "Chọn Mùi", icon: Sparkles, required: true },
    { id: 4, name: "Chọn Hộp", icon: Gift, required: false },
    { id: 5, name: "Chọn Thiệp", icon: Mail, required: false },
  ]

  // Sample data for each step
  const molds = [
    { id: 1, name: "Khuôn Tròn Cơ Bản", price: 45000, image: "/placeholder.svg?height=150&width=150" },
    { id: 2, name: "Khuôn Hình Trái Tim", price: 65000, image: "/placeholder.svg?height=150&width=150" },
    { id: 3, name: "Khuôn Hình Lá", price: 75000, image: "/placeholder.svg?height=150&width=150" },
    { id: 4, name: "Khuôn Hình Hoa", price: 70000, image: "/placeholder.svg?height=150&width=150" },
  ]

  const colors = [
    { id: 1, name: "Đỏ Cherry", code: "#DC143C", price: 25000 },
    { id: 2, name: "Xanh Lá Tự Nhiên", code: "#6B8E23", price: 30000 },
    { id: 3, name: "Xanh Dương Đại Dương", code: "#006994", price: 28000 },
    { id: 4, name: "Hồng Pastel", code: "#FFB6C1", price: 32000 },
  ]

  const scents = [
    { id: 1, name: "Tinh Dầu Lavender", price: 85000, image: "/placeholder.svg?height=150&width=150" },
    { id: 2, name: "Tinh Dầu Bạc Hà", price: 65000, image: "/placeholder.svg?height=150&width=150" },
    { id: 3, name: "Tinh Dầu Hoa Hồng", price: 120000, image: "/placeholder.svg?height=150&width=150" },
    { id: 4, name: "Tinh Dầu Vanilla", price: 90000, image: "/placeholder.svg?height=150&width=150" },
  ]

  const boxes = [
    { id: 1, name: "Hộp Giấy Kraft Eco", price: 25000, image: "/placeholder.svg?height=150&width=150" },
    { id: 2, name: "Hộp Gỗ Tre Cao Cấp", price: 85000, image: "/placeholder.svg?height=150&width=150" },
    { id: 3, name: "Hộp Nhựa Trong Suốt", price: 35000, image: "/placeholder.svg?height=150&width=150" },
  ]

  const cards = [
    { id: 1, name: "Thiệp Sinh Nhật Hoa Tươi", price: 15000, image: "/placeholder.svg?height=150&width=150" },
    { id: 2, name: "Thiệp Cảm Ơn Tối Giản", price: 12000, image: "/placeholder.svg?height=150&width=150" },
    { id: 3, name: "Thiệp Chúc Mừng Vàng Kim", price: 20000, image: "/placeholder.svg?height=150&width=150" },
  ]

  const handleSelectItem = (category: string, item: any) => {
    setSelectedItems({ ...selectedItems, [category]: item })
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    const currentStepData = steps[currentStep - 1]
    if (!currentStepData.required) return true

    switch (currentStep) {
      case 1:
        return selectedItems.mold !== null
      case 2:
        return selectedItems.color !== null
      case 3:
        return selectedItems.scent !== null
      default:
        return true
    }
  }

  const calculateTotal = () => {
    let total = 0
    if (selectedItems.mold) total += selectedItems.mold.price
    if (selectedItems.color) total += selectedItems.color.price
    if (selectedItems.scent) total += selectedItems.scent.price
    if (selectedItems.box) total += selectedItems.box.price
    if (selectedItems.card) total += selectedItems.card.price
    return total
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {molds.map((mold) => (
              <Card
                key={mold.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedItems.mold?.id === mold.id ? "border-primary-600 bg-primary-50" : ""
                }`}
                onClick={() => handleSelectItem("mold", mold)}
              >
                <CardContent className="p-4">
                  <Image
                    src={mold.image || "/placeholder.svg"}
                    alt={mold.name}
                    width={150}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-sm mb-2">{mold.name}</h3>
                  <p className="text-primary-600 font-bold">{mold.price.toLocaleString("vi-VN")}đ</p>
                  {selectedItems.mold?.id === mold.id && (
                    <div className="flex justify-center mt-2">
                      <Check className="h-5 w-5 text-primary-600" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case 2:
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {colors.map((color) => (
              <Card
                key={color.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedItems.color?.id === color.id ? "border-primary-600 bg-primary-50" : ""
                }`}
                onClick={() => handleSelectItem("color", color)}
              >
                <CardContent className="p-4">
                  <div className="w-full h-32 rounded-lg mb-3 border" style={{ backgroundColor: color.code }} />
                  <h3 className="font-semibold text-sm mb-2">{color.name}</h3>
                  <p className="text-primary-600 font-bold">{color.price.toLocaleString("vi-VN")}đ</p>
                  {selectedItems.color?.id === color.id && (
                    <div className="flex justify-center mt-2">
                      <Check className="h-5 w-5 text-primary-600" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case 3:
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scents.map((scent) => (
              <Card
                key={scent.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedItems.scent?.id === scent.id ? "border-primary-600 bg-primary-50" : ""
                }`}
                onClick={() => handleSelectItem("scent", scent)}
              >
                <CardContent className="p-4">
                  <Image
                    src={scent.image || "/placeholder.svg"}
                    alt={scent.name}
                    width={150}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-sm mb-2">{scent.name}</h3>
                  <p className="text-primary-600 font-bold">{scent.price.toLocaleString("vi-VN")}đ</p>
                  {selectedItems.scent?.id === scent.id && (
                    <div className="flex justify-center mt-2">
                      <Check className="h-5 w-5 text-primary-600" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case 4:
        return (
          <div>
            <div className="text-center mb-6">
              <p className="text-gray-600">Bước này là tùy chọn. Bạn có thể bỏ qua nếu không cần hộp đựng.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {boxes.map((box) => (
                <Card
                  key={box.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedItems.box?.id === box.id ? "border-primary-600 bg-primary-50" : ""
                  }`}
                  onClick={() => handleSelectItem("box", box)}
                >
                  <CardContent className="p-4">
                    <Image
                      src={box.image || "/placeholder.svg"}
                      alt={box.name}
                      width={150}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-2">{box.name}</h3>
                    <p className="text-primary-600 font-bold">{box.price.toLocaleString("vi-VN")}đ</p>
                    {selectedItems.box?.id === box.id && (
                      <div className="flex justify-center mt-2">
                        <Check className="h-5 w-5 text-primary-600" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div>
            <div className="text-center mb-6">
              <p className="text-gray-600">Bước này là tùy chọn. Bạn có thể bỏ qua nếu không cần thiệp tặng.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedItems.card?.id === card.id ? "border-primary-600 bg-primary-50" : ""
                  }`}
                  onClick={() => handleSelectItem("card", card)}
                >
                  <CardContent className="p-4">
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.name}
                      width={150}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-2">{card.name}</h3>
                    <p className="text-primary-600 font-bold">{card.price.toLocaleString("vi-VN")}đ</p>
                    {selectedItems.card?.id === card.id && (
                      <div className="flex justify-center mt-2">
                        <Check className="h-5 w-5 text-primary-600" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tạo Đơn Hàng Nến Thơm</h1>
          <p className="text-gray-600">Tạo ra chiếc nến thơm độc đáo theo ý thích của bạn</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Các Bước</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {steps.map((step) => {
                  const IconComponent = step.icon
                  const isCompleted =
                    currentStep > step.id ||
                    (step.id === 1 && selectedItems.mold) ||
                    (step.id === 2 && selectedItems.color) ||
                    (step.id === 3 && selectedItems.scent) ||
                    (step.id === 4 && selectedItems.box) ||
                    (step.id === 5 && selectedItems.card)

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        currentStep === step.id
                          ? "bg-primary-100 border border-primary-300"
                          : isCompleted
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          currentStep === step.id
                            ? "bg-primary-600 text-white"
                            : isCompleted
                              ? "bg-green-600 text-white"
                              : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {isCompleted ? <Check className="h-4 w-4" /> : <IconComponent className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className={`font-medium ${currentStep === step.id ? "text-primary-700" : ""}`}>
                          {step.name}
                        </p>
                        {!step.required && <p className="text-xs text-gray-500">Tùy chọn</p>}
                      </div>
                    </div>
                  )
                })}

                <Separator />

                {/* Order Summary */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Tóm Tắt Đơn Hàng</h3>
                  {selectedItems.mold && (
                    <div className="flex justify-between text-sm">
                      <span>Khuôn: {selectedItems.mold.name}</span>
                      <span>{selectedItems.mold.price.toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                  {selectedItems.color && (
                    <div className="flex justify-between text-sm">
                      <span>Màu: {selectedItems.color.name}</span>
                      <span>{selectedItems.color.price.toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                  {selectedItems.scent && (
                    <div className="flex justify-between text-sm">
                      <span>Mùi: {selectedItems.scent.name}</span>
                      <span>{selectedItems.scent.price.toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                  {selectedItems.box && (
                    <div className="flex justify-between text-sm">
                      <span>Hộp: {selectedItems.box.name}</span>
                      <span>{selectedItems.box.price.toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                  {selectedItems.card && (
                    <div className="flex justify-between text-sm">
                      <span>Thiệp: {selectedItems.card.name}</span>
                      <span>{selectedItems.card.price.toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-primary-600">{calculateTotal().toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {React.createElement(steps[currentStep - 1].icon, { className: "h-6 w-6 text-primary-600" })}
                    <CardTitle>{steps[currentStep - 1].name}</CardTitle>
                    {!steps[currentStep - 1].required && <Badge variant="secondary">Tùy chọn</Badge>}
                  </div>
                  <div className="text-sm text-gray-600">
                    Bước {currentStep} / {steps.length}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Quay lại
                  </Button>

                  {currentStep < steps.length ? (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700"
                    >
                      Tiếp theo
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      disabled={!selectedItems.mold || !selectedItems.color || !selectedItems.scent}
                      className="bg-primary-600 hover:bg-primary-700"
                    >
                      Hoàn Tất Đơn Hàng
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
