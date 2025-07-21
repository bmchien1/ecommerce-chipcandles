# API Hooks và Services

Tài liệu hướng dẫn sử dụng các hooks và services để kết nối với backend API.

## 🚀 Cài đặt

### 1. Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục gốc của frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### 2. Import và sử dụng

```typescript
import { useProducts, useCategories, useReviews } from '@/hooks';
import { ProductService, CategoryService } from '@/lib/services';
```

## 📚 API Services

### ProductService

Quản lý các API liên quan đến sản phẩm:

```typescript
import { ProductService } from '@/lib/services';

// Lấy danh sách sản phẩm
const products = await ProductService.getProducts({
  category: 'candles',
  page: 1,
  limit: 12,
  sort: 'name',
  order: 'asc'
});

// Lấy sản phẩm theo ID
const product = await ProductService.getProduct(1);

// Lấy sản phẩm nổi bật
const featuredProducts = await ProductService.getFeaturedProducts(8);

// Tìm kiếm sản phẩm
const searchResults = await ProductService.searchProducts({
  q: 'nến thơm',
  category: 'candles'
});
```

### CategoryService

Quản lý các API liên quan đến danh mục:

```typescript
import { CategoryService } from '@/lib/services';

// Lấy tất cả danh mục
const categories = await CategoryService.getCategories();

// Lấy chi tiết danh mục
const categoryDetails = await CategoryService.getCategory('candles');

// Lấy danh mục cho navigation
const navCategories = await CategoryService.getCategoriesForNavigation();
```

### ReviewService

Quản lý các API liên quan đến đánh giá:

```typescript
import { ReviewService } from '@/lib/services';

// Lấy đánh giá của sản phẩm
const productReviews = await ReviewService.getProductReviews(1, {
  page: 1,
  limit: 10
});

// Lấy thống kê đánh giá
const reviewStats = await ReviewService.getProductReviewStats(1);

// Lấy đánh giá nổi bật
const featuredReviews = await ReviewService.getFeaturedReviews(6);
```

### UploadService

Quản lý upload ảnh lên Cloudinary:

```typescript
import { UploadService } from '@/lib/services';

// Upload ảnh sản phẩm
const result = await UploadService.uploadProductImage(file);

// Upload nhiều ảnh
const results = await UploadService.uploadMultipleImages(files);

// Xóa ảnh
await UploadService.deleteImage('public_id');

// Validate file
const validation = UploadService.validateFile(file);
```

## 🎣 React Hooks

### useProducts

Hook để quản lý danh sách sản phẩm:

```typescript
import { useProducts } from '@/hooks';

function ProductList() {
  const { 
    products, 
    loading, 
    error, 
    pagination, 
    setParams 
  } = useProducts({
    initialParams: {
      category: 'candles',
      page: 1,
      limit: 12
    }
  });

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### useProduct

Hook để lấy chi tiết sản phẩm:

```typescript
import { useProduct } from '@/hooks';

function ProductDetail({ id }: { id: number }) {
  const { product, loading, error } = useProduct(id);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Giá: {product.price.toLocaleString('vi-VN')}₫</p>
    </div>
  );
}
```

### useCategories

Hook để quản lý danh mục:

```typescript
import { useCategories } from '@/hooks';

function CategoryList() {
  const { categories, loading, error } = useCategories();

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      {categories.map(category => (
        <div key={category.value}>
          <h3>{category.name}</h3>
          <p>{category.productCount} sản phẩm</p>
        </div>
      ))}
    </div>
  );
}
```

### useReviews

Hook để quản lý đánh giá:

```typescript
import { useProductReviews } from '@/hooks';

function ProductReviews({ productId }: { productId: number }) {
  const { 
    reviews, 
    loading, 
    error, 
    statistics 
  } = useProductReviews(productId);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <div>Thống kê: {statistics?.totalReviews} đánh giá</div>
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
```

### useUpload

Hook để upload ảnh:

```typescript
import { useUpload } from '@/hooks';

function ImageUpload() {
  const { 
    uploading, 
    error, 
    uploadProductImage 
  } = useUpload({
    onSuccess: (result) => {
      console.log('Upload thành công:', result.secure_url);
    },
    onError: (error) => {
      console.error('Upload thất bại:', error);
    }
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadProductImage(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {uploading && <div>Đang upload...</div>}
      {error && <div>Lỗi: {error}</div>}
    </div>
  );
}
```

## 🔧 Ví dụ sử dụng

### Trang sản phẩm với tìm kiếm và lọc

```typescript
'use client';

import { useState } from 'react';
import { useProducts, useCategories } from '@/hooks';
import { ProductGrid } from '@/components/ProductGrid';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { categories } = useCategories();

  return (
    <div>
      {/* Filters */}
      <div className="mb-6">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.name} ({category.productCount})
            </option>
          ))}
        </select>
        
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Product Grid */}
      <ProductGrid 
        category={selectedCategory}
        searchQuery={searchQuery}
        limit={12}
        showPagination={true}
      />
    </div>
  );
}
```

### Trang chi tiết sản phẩm

```typescript
'use client';

import { useProduct, useProductReviews } from '@/hooks';

export default function ProductDetailPage({ id }: { id: number }) {
  const { product, loading: productLoading } = useProduct(id);
  const { reviews, statistics, loading: reviewsLoading } = useProductReviews(id);

  if (productLoading) return <div>Đang tải sản phẩm...</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Giá: {product.price.toLocaleString('vi-VN')}₫</p>
      
      {/* Reviews */}
      <div>
        <h2>Đánh giá ({statistics?.totalReviews || 0})</h2>
        {reviewsLoading ? (
          <div>Đang tải đánh giá...</div>
        ) : (
          reviews.map(review => (
            <div key={review.id}>
              <div>Đánh giá: {review.rating}/5</div>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

## 📝 Lưu ý

1. **Error Handling**: Tất cả hooks đều có error handling tích hợp
2. **Loading States**: Mỗi hook đều có loading state
3. **TypeScript**: Tất cả đều có type definitions đầy đủ
4. **Pagination**: Hỗ trợ phân trang cho danh sách dài
5. **Caching**: Có thể tích hợp với React Query để cache data

## 🔄 Cập nhật

Khi backend API thay đổi, chỉ cần cập nhật các services tương ứng, các hooks sẽ tự động sử dụng API mới. 