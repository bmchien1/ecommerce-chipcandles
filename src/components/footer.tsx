import Link from "next/link"
import { Flame, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
            <Image src="https://res.cloudinary.com/dukap4zei/image/upload/v1753118860/A_scent_a_day_keeps_the_stress_away-removebg-preview_lu3fq9.png" alt="Logo" width={70} height={70} className="h-12 w-12 object-contain" />
            <span className="text-2xl font-bold">ChipScendle</span>
            </Link>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/nbnm.5803" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/chipscendle/" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/colors" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Màu Nến
                </Link>
              </li>
              <li>
                <Link href="/molds" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Khuôn Nến
                </Link>
              </li>
              <li>
                <Link href="/scents" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Mùi Hương
                </Link>
              </li>
              <li>
                <Link href="/create-order" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Tạo Đơn Hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Danh Mục</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/boxes" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Hộp Đựng
                </Link>
              </li>
              <li>
                <Link href="/cards" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Thiệp Tặng
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Đánh Giá
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">98 Trung Liệt, Trung Liệt, Đống Đa, Hà Nội</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">0975886285</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">chipscendle@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2025 ChipScendle. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
