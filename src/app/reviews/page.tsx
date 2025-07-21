"use client"

import type React from "react"
import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Star, ThumbsUp, MessageCircle, Filter, Loader2 } from "lucide-react"
import { useReviews } from "@/hooks/useReviews"

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [newReview, setNewReview] = useState({ star: 5, comment: "", name: "", img_url: "" })
  const [page, setPage] = useState(1)
  const limit = 6
  const filterOptions = [
    { value: "all", label: "Tất Cả Đánh Giá" },
    { value: "5", label: "5 Sao" },
    { value: "4", label: "4 Sao" },
    { value: "3", label: "3 Sao" },
    { value: "2", label: "2 Sao" },
    { value: "1", label: "1 Sao" },
  ]
  const [uploading, setUploading] = useState(false)

  const reviewOptions = useMemo(() => {
    const opts: any = { page, limit }
    if (selectedFilter !== "all") opts.search = undefined // (API chưa filter star, filter client)
    return opts
  }, [page, limit, selectedFilter])

  const {
    reviews,
    pagination,
    isLoading,
    error,
    fetchReviews,
    createReview,
  } = useReviews(reviewOptions)

  // Filter by star on client (API chưa hỗ trợ filter star)
  const filteredReviews = selectedFilter === "all"
    ? reviews
    : reviews.filter((r) => r.star === Number(selectedFilter))

  // Tổng số review và điểm trung bình
  const totalReviews = pagination?.total || reviews.length
  const averageRating =
    totalReviews > 0 ? (reviews.reduce((sum, r) => sum + (r.star || 0), 0) / reviews.length) : 0
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.star === star).length,
    percentage: reviews.length > 0 ? (reviews.filter((r) => r.star === star).length / reviews.length) * 100 : 0,
  }))

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createReview(newReview)
      setNewReview({ star: 5, comment: "", name: "", img_url: "" })
      fetchReviews(reviewOptions)
    } catch (err) {
      // handle error
    }
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
                        className={`h-5 w-5 ${i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{totalReviews} đánh giá</p>
                </div>
                <div className="space-y-2">
                  {ratingDistribution.map(({ star, count, percentage }) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-sm w-6">{star}</span>
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
                            onClick={() => setNewReview({ ...newReview, star })}
                            className="p-1"
                          >
                            <Star
                              className={`h-6 w-6 ${star <= newReview.star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
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
                    <div>
                      <label className="block text-sm font-medium mb-2">Ảnh (tùy chọn)</label>
                      <div className="flex gap-2 items-center">
                        <Input
                          placeholder="URL ảnh"
                          value={newReview.img_url}
                          onChange={e => setNewReview({ ...newReview, img_url: e.target.value })}
                          disabled={uploading}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          id="review-image-upload"
                          style={{ display: 'none' }}
                          disabled={uploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setUploading(true);
                            const formData = new FormData();
                            formData.append('file', file);
                            formData.append('upload_preset', 'bmchien1');
                            try {
                              const res = await fetch('https://api.cloudinary.com/v1_1/dukap4zei/image/upload', {
                                method: 'POST',
                                body: formData,
                              });
                              const data = await res.json();
                              if (data.secure_url) {
                                setNewReview(r => ({ ...r, img_url: data.secure_url }));
                              } else {
                                alert('Upload thất bại!');
                              }
                            } catch (err) {
                              alert('Lỗi upload ảnh!');
                            } finally {
                              setUploading(false);
                            }
                          }}
                        />
                        <Button type="button" variant="outline" onClick={() => document.getElementById('review-image-upload')?.click()} disabled={uploading}>
                          {uploading ? (<><Loader2 className="animate-spin w-4 h-4 mr-2 inline" /> Đang upload...</>) : "Tải ảnh lên Cloudinary"}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700" disabled={isLoading}>
                      {isLoading ? "Đang gửi..." : "Gửi Đánh Giá"}
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
              {isLoading ? (
                <div>Đang tải...</div>
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : filteredReviews.length === 0 ? (
                <div className="text-center py-12">
                  <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Không có đánh giá nào phù hợp với bộ lọc</p>
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{review.name}</h4>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      {review.img_url && (
                        <div className="flex gap-2 mb-4">
                          <Image
                            src={review.img_url || "/placeholder.svg"}
                            alt={`Review image`}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    onClick={() => setPage(p)}
                    className="px-4"
                  >
                    {p}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
