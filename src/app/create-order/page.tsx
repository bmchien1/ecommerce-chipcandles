"use client"

import React, { useState, useMemo } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChevronRight, ChevronLeft, Package, Palette, Sparkles, Gift, Mail, Check } from "lucide-react"
import { useMolds } from "@/hooks/useMolds"
import { useScents } from "@/hooks/useScents"
import { useColors } from "@/hooks/useColors"
import { useBoxes } from "@/hooks/useBoxes"
import { useCards } from "@/hooks/useCards"

export default function CreateOrderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedItems, setSelectedItems] = useState({
    productType: "candle", // "candle" | "wax"
    mold: null as any,
    color: null as any,
    scent: null as any,
    box: null as any,
    card: null as any,
  })

  // Hooks lấy dữ liệu động với useMemo để tránh fetch liên tục
  const moldOptions = useMemo(() => ({}), [])
  const colorOptions = useMemo(() => ({}), [])
  const scentOptions = useMemo(() => ({}), [])
  const boxOptions = useMemo(() => ({}), [])
  const cardOptions = useMemo(() => ({}), [])
  const { molds, isLoading: loadingMolds } = useMolds(moldOptions)
  const { colors, isLoading: loadingColors } = useColors(colorOptions)
  const { scents, isLoading: loadingScents } = useScents(scentOptions)
  const { boxes, isLoading: loadingBoxes } = useBoxes(boxOptions)
  const { cards, isLoading: loadingCards } = useCards(cardOptions)

  const steps = [
    { id: 1, name: "Chọn Khuôn", icon: Package, required: true },
    { id: 2, name: "Chọn Màu", icon: Palette, required: true },
    { id: 3, name: "Chọn Mùi", icon: Sparkles, required: true },
    { id: 4, name: "Chọn Hộp", icon: Gift, required: false },
    { id: 5, name: "Chọn Thiệp", icon: Mail, required: false },
  ]

  const handleSelectProductType = (type: string) => {
    setSelectedItems({ ...selectedItems, productType: type })
  }

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
    if (selectedItems.mold && selectedItems.mold.cost) total += Number(selectedItems.mold.cost)
    if (selectedItems.color && selectedItems.color.cost) total += Number(selectedItems.color.cost)
    if (selectedItems.scent && selectedItems.scent.cost) total += Number(selectedItems.scent.cost)
    if (selectedItems.box && selectedItems.box.cost) total += Number(selectedItems.box.cost)
    if (selectedItems.card && selectedItems.card.cost) total += Number(selectedItems.card.cost)
    return total
  }

  // Thêm hàm lưu order vào localStorage
  const saveOrderToCart = (order: any) => {
    if (typeof window === 'undefined') return;
    const existing = JSON.parse(localStorage.getItem('cartOrders') || '[]');
    // Tìm sản phẩm cùng loại (so sánh id khuôn, màu, mùi, hộp, thiệp)
    const foundIndex = existing.findIndex((item: any) =>
      item.name === order.name &&
      item.components.mold === order.components.mold &&
      item.components.color === order.components.color &&
      item.components.scent === order.components.scent &&
      item.components.box === order.components.box &&
      item.components.card === order.components.card
    );
    if (foundIndex !== -1) {
      existing[foundIndex].quantity = (existing[foundIndex].quantity || 1) + 1;
    } else {
      existing.push(order);
    }
    localStorage.setItem('cartOrders', JSON.stringify(existing));
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      // Bước chọn loại sản phẩm (nến thơm/sáp thơm)
      return (
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 justify-center mb-6">
            <Button
              variant={selectedItems.productType === "candle" ? "default" : "outline"}
              onClick={() => handleSelectProductType("candle")}
            >
              Nến thơm
            </Button>
            <Button
              variant={selectedItems.productType === "wax" ? "default" : "outline"}
              onClick={() => handleSelectProductType("wax")}
            >
              Sáp thơm
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadingMolds ? (
              <div>Đang tải khuôn...</div>
            ) : (
              molds.map((mold) => (
                <Card
                  key={mold.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedItems.mold?.id === mold.id ? "border-primary-600 bg-primary-50" : ""
                  }`}
                  onClick={() => handleSelectItem("mold", mold)}
                >
                  <CardContent className="p-4">
                    <img
                      src={mold.img_url || "/placeholder.svg"}
                      alt={mold.name}
                      width={150}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-2">{mold.name}</h3>
                    <p className="text-primary-600 font-bold">{Number(mold.cost)?.toLocaleString("vi-VN") || 0}đ</p>
                    {selectedItems.mold?.id === mold.id && (
                      <div className="flex justify-center mt-2">
                        <Check className="h-5 w-5 text-primary-600" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )
    }
    if (currentStep === 2) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loadingColors ? (
            <div>Đang tải màu...</div>
          ) : (
            colors.map((color) => (
              <Card
                key={color.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedItems.color?.id === color.id ? "border-primary-600 bg-primary-50" : ""
                }`}
                onClick={() => handleSelectItem("color", color)}
              >
                <CardContent className="p-4">
                  <img
                    src={color.img_url || "/placeholder.svg"}
                    alt={color.name}
                    width={150}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-sm mb-2">{color.name}</h3>
                  {/* Không có trường price/cost cho Color, có thể bỏ giá hoặc để trống */}
                  {selectedItems.color?.id === color.id && (
                    <div className="flex justify-center mt-2">
                      <Check className="h-5 w-5 text-primary-600" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )
    }
    if (currentStep === 3) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loadingScents ? (
            <div>Đang tải mùi hương...</div>
          ) : (
            scents.map((scent) => (
              <Card
                key={scent.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedItems.scent?.id === scent.id ? "border-primary-600 bg-primary-50" : ""
                }`}
                onClick={() => handleSelectItem("scent", scent)}
              >
                <CardContent className="p-4">
                  <img
                    src={scent.img_url || "/placeholder.svg"}
                    alt={scent.name}
                    width={150}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-sm mb-2">{scent.name}</h3>
                  {/* Không có trường price, có thể bỏ giá hoặc để trống */}
                  {selectedItems.scent?.id === scent.id && (
                    <div className="flex justify-center mt-2">
                      <Check className="h-5 w-5 text-primary-600" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )
    }
    if (currentStep === 4) {
      return (
        <div>
          <div className="text-center mb-6">
            <p className="text-gray-600">Bước này là tuỳ chọn. Bạn có thể bỏ qua nếu không cần hộp đựng.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loadingBoxes ? (
              <div>Đang tải hộp...</div>
            ) : (
              boxes.map((box) => (
                <Card
                  key={box.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedItems.box?.id === box.id ? "border-primary-600 bg-primary-50" : ""
                  }`}
                  onClick={() => handleSelectItem("box", box)}
                >
                  <CardContent className="p-4">
                    <img
                      src={box.img_url || "/placeholder.svg"}
                      alt={box.name}
                      width={150}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-2">{box.name}</h3>
                    <p className="text-primary-600 font-bold">{Number(box.cost)?.toLocaleString("vi-VN") || 0}đ</p>
                    {selectedItems.box?.id === box.id && (
                      <div className="flex justify-center mt-2">
                        <Check className="h-5 w-5 text-primary-600" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )
    }
    if (currentStep === 5) {
      return (
        <div>
          <div className="text-center mb-6">
            <p className="text-gray-600">Bước này là tuỳ chọn. Bạn có thể bỏ qua nếu không cần thiệp tặng.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loadingCards ? (
              <div>Đang tải thiệp...</div>
            ) : (
              cards.map((card) => (
                <Card
                  key={card.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedItems.card?.id === card.id ? "border-primary-600 bg-primary-50" : ""
                  }`}
                  onClick={() => handleSelectItem("card", card)}
                >
                  <CardContent className="p-4">
                    <img
                      src={card.img_url || "/placeholder.svg"}
                      alt={card.name}
                      width={150}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-2">{card.name}</h3>
                    <p className="text-primary-600 font-bold">{Number(card.cost)?.toLocaleString("vi-VN") || 0}đ</p>
                    {selectedItems.card?.id === card.id && (
                      <div className="flex justify-center mt-2">
                        <Check className="h-5 w-5 text-primary-600" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )
    }
    return null
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
                  {selectedItems.mold && selectedItems.mold.cost && (
                    <div className="flex justify-between text -sm">
                      <span>Khuôn: {selectedItems.mold.name}</span>
                      <span>{Number(selectedItems.mold.cost).toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                  {selectedItems.color && selectedItems.color.cost && (
                    <div className="flex justify-between text-sm">
                      <span>Màu: {selectedItems.color.name}</span>
                      <span>{Number(selectedItems.color.cost).toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                  {selectedItems.scent && selectedItems.scent.cost && (
                    <div className="flex justify-between text-sm">
                      <span>Mùi: {selectedItems.scent.name}</span>
                      <span>{Number(selectedItems.scent.cost).toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                  {selectedItems.box && selectedItems.box.cost && (
                    <div className="flex justify-between text-sm">
                      <span>Hộp: {selectedItems.box.name}</span>
                      <span>{Number(selectedItems.box.cost).toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                  {selectedItems.card && selectedItems.card.cost && (
                    <div className="flex justify-between text-sm">
                      <span>Thiệp: {selectedItems.card.name}</span>
                      <span>{Number(selectedItems.card.cost).toLocaleString("vi-VN")}đ</span>
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
                      onClick={() => {
                        // Tạo order object
                        const order = {
                          id: Date.now(),
                          name: selectedItems.productType === 'candle' ? 'Nến Thơm' : 'Sáp Thơm',
                          components: {
                            mold: selectedItems.mold?.name,
                            color: selectedItems.color?.name,
                            scent: selectedItems.scent?.name,
                            box: selectedItems.box?.name,
                            card: selectedItems.card?.name,
                          },
                          price: calculateTotal(),
                          quantity: 1,
                          image: selectedItems.mold?.img_url || '/placeholder.svg',
                        };
                        saveOrderToCart(order);
                        // Optional: chuyển hướng sang /cart
                        window.location.href = '/cart';
                      }}
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
