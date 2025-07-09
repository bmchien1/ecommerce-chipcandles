"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Star, ThumbsUp, MessageCircle, Filter } from "lucide-react"

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", name: "" })

  const filterOptions = [
    { value: "all", label: "Tất Cả Đánh Giá" },
    { value: "5", label: "5 Sao" },
    { value: "4", label: "4 Sao" },
    { value: "3", label: "3 Sao" },
    { value: "2", label: "2 Sao" },
    { value: "1", label: "1 Sao" },
  ]

  const reviews = [
    {
      id: 1,
      customerName: "Nguyễn Thị Hoa",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Sản phẩm rất chất lượng! Màu sắc đẹp, mùi hương thơm nhẹ nhàng. Khuôn nến cũng rất dễ sử dụng. Sẽ quay lại mua thêm.",
      productName: "Bộ làm nến lavender",
      verified: true,
      helpful: 12,
      images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    },
    {
      id: 2,
      customerName: "Trần Văn Nam",
      rating: 4,
      date: "2024-01-12",
      comment:
        "Khuôn nến chất lượng tốt, dễ tháo. Màu nến đẹp nhưng hơi nhạt so với mong đợi. Nhìn chung vẫn hài lòng với sản phẩm.",
      productName: "Khuôn nến hình trái tim + Màu đỏ",
      verified: true,
      helpful: 8,
      images: [],
    },
    {
      id: 3,
      customerName: "Lê Thị Mai",
      rating: 5,
      date: "2024-01-10",
      comment: "Tuyệt vời! Hộp đựng rất đẹp và chắc chắn. Thiệp tặng kèm cũng rất xinh. Món quà hoàn hảo cho bạn bè.",
      productName: "Hộp gỗ tre + Thiệp sinh nhật",
      verified: true,
      helpful: 15,
      images: ["/placeholder.svg?height=100&width=100"],
    },
    {
      id: 4,
      customerName: "Phạm Minh Tuấn",
      rating: 4,
      date: "2024-01-08",
      comment: "Tinh dầu thơm rất tự nhiên, không gắt. Cháy đều và lâu. Giá cả hợp lý. Sẽ giới thiệu cho bạn bè.",
      productName: "Tinh dầu bạc hà",
      verified: false,
      helpful: 6,
      images: [],
    },
    {
      id: 5,
      customerName: "Hoàng Thị Lan",
      rating: 3,
      date: "2024-01-05",
      comment: "Sản phẩm ổn nhưng giao hàng hơi chậm. Khuôn nến có một chút khuyết điểm nhỏ nhưng vẫn sử dụng được.",
      productName: "Khuôn nến hình hoa",
      verified: true,
      helpful: 3,
      images: [],
    },
    {
      id: 6,
      customerName: "Vũ Đình Khoa",
      rating: 5,
      date: "2024-01-03",
      comment:
        "Chất lượng tuyệt vời! Màu sắc rất đẹp và bền. Khuôn silicon mềm mại, dễ tháo nến. Rất hài lòng với lần mua hàng này.",
      productName: "Bộ màu nến 12 màu + Khuôn tròn",
      verified: true,
      helpful: 20,
      images: [
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ]

  const filteredReviews = reviews.filter((review) => {
    if (selectedFilter === "all") return true
    return review.rating === Number.parseInt(selectedFilter)
  })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }))

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New review:", newReview)
    // Handle review submission
    setNewReview({ rating: 5, comment: "", name: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Star className="h-16 w-16 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Đánh Giá Khách Hàng</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Xem những đánh giá chân thực từ khách hàng về sản phẩm và dịch vụ của chúng tôi
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reviews Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Tổng Quan Đánh Giá</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">{averageRating.toFixed(1)}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{reviews.length} đánh giá</p>
                </div>

                <div className="space-y-2">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm w-6">{rating}</span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>

                {/* Write Review Form */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Viết Đánh Giá</h3>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Họ tên</label>
                      <Input
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        placeholder="Nhập họ tên của bạn"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Đánh giá</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="p-1"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nhận xét</label>
                      <Textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="Chia sẻ trải nghiệm của bạn..."
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
                      Gửi Đánh Giá
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter */}
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Lọc đánh giá" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{review.customerName}</h4>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Đã xác minh
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {new Date(review.date).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Sản phẩm: {review.productName}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    {review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((image, index) => (
                          <Image
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`Review image ${index + 1}`}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <button className="flex items-center gap-1 hover:text-primary-600">
                        <ThumbsUp className="h-4 w-4" />
                        Hữu ích ({review.helpful})
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary-600">
                        <MessageCircle className="h-4 w-4" />
                        Trả lời
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Không có đánh giá nào phù hợp với bộ lọc</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
