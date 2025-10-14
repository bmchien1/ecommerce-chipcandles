import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin, Heart, Sparkles } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-pink-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-rose-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-8" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <Image
                  src="https://res.cloudinary.com/dukap4zei/image/upload/v1760458550/ChatGPT_Image_23_14_00_14_thg_10_2025-Photoroom_zlefac.png"
                  alt="Logo"
                  width={70}
                  height={70}
                  className="h-12 w-12 object-contain relative z-10"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                ChipScendle
              </span>
            </Link>

            <p className="text-gray-400 text-sm mb-4 flex items-start gap-2">
              <Heart className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5 fill-pink-400" />
              <span>Tạo nên những khoảnh khắc ấm áp với nến thơm handmade</span>
            </p>

            <div className="flex space-x-3">
              <Link
                href="https://www.facebook.com/nbnm.5803"
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-pink-500 hover:text-white transition-all hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/chipscendle/"
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-500 hover:text-white transition-all hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pink-400" />
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/colors"
                  className="text-gray-300 hover:text-pink-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Màu Nến
                </Link>
              </li>
              <li>
                <Link
                  href="/molds"
                  className="text-gray-300 hover:text-pink-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Khuôn Nến
                </Link>
              </li>
              <li>
                <Link
                  href="/scents"
                  className="text-gray-300 hover:text-pink-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Mùi Hương
                </Link>
              </li>
              <li>
                <Link
                  href="/create-order"
                  className="text-gray-300 hover:text-pink-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Tạo Đơn Hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pink-400" />
              Danh Mục
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/boxes"
                  className="text-gray-300 hover:text-pink-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Hộp Đựng
                </Link>
              </li>
              <li>
                <Link
                  href="/cards"
                  className="text-gray-300 hover:text-pink-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Thiệp Tặng
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-gray-300 hover:text-pink-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Đánh Giá
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pink-400" />
              Liên Hệ
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 group">
                <div className="p-1.5 rounded-lg bg-gray-800 group-hover:bg-pink-500 transition-colors">
                  <MapPin className="h-4 w-4 text-pink-400 group-hover:text-white" />
                </div>
                <span className="text-gray-300 text-sm group-hover:text-pink-300 transition-colors">
                  98 Trung Liệt, Trung Liệt, Đống Đa, Hà Nội
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="p-1.5 rounded-lg bg-gray-800 group-hover:bg-pink-500 transition-colors">
                  <Phone className="h-4 w-4 text-pink-400 group-hover:text-white" />
                </div>
                <span className="text-gray-300 text-sm group-hover:text-pink-300 transition-colors">0975886285</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="p-1.5 rounded-lg bg-gray-800 group-hover:bg-pink-500 transition-colors">
                  <Mail className="h-4 w-4 text-pink-400 group-hover:text-white" />
                </div>
                <span className="text-gray-300 text-sm group-hover:text-pink-300 transition-colors">
                  chipscendle@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-6" />
          <p className="text-gray-400 flex items-center justify-center gap-2">
            © 2025 ChipScendle.
            <Heart className="h-3 w-3 text-pink-400 fill-pink-400 inline animate-pulse" />
            Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
