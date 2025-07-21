'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts, useProductAverageRating } from '@/hooks';
import { Product } from '@/lib/api';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductGridProps {
  category?: string;
  searchQuery?: string;
  limit?: number;
  showPagination?: boolean;
}

export function ProductGrid({ 
  category, 
  searchQuery, 
  limit = 12, 
  showPagination = true 
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use the appropriate hook based on props
  const { 
    products, 
    loading, 
    error, 
    pagination, 
    setParams 
  } = useProducts({
    initialParams: {
      category: category === 'all' ? undefined : category,
      search: searchQuery,
      page: currentPage,
      limit,
      sort: 'name',
      order: 'asc'
    }
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setParams({
      category: category === 'all' ? undefined : category,
      search: searchQuery,
      page,
      limit,
      sort: 'name',
      order: 'asc'
    });
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: limit }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-6 w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Thử lại
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Không tìm thấy sản phẩm nào.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showPagination && pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Trước
          </Button>
          
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            disabled={currentPage === pagination.totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Sau
          </Button>
        </div>
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { averageRating } = useProductAverageRating(product.id);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative">
          <Image
            src={product.image_url || '/placeholder.svg'}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-primary-600">
              Nổi bật
            </Badge>
          )}
          {product.stock_quantity === 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Hết hàng
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} ({product.reviews?.length || 0})
            </span>
          </div>
          <span className="font-bold text-primary-600">
            {product.price.toLocaleString('vi-VN')}₫
          </span>
        </div>
        
        <Button 
          className="w-full" 
          disabled={product.stock_quantity === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Thêm vào giỏ
        </Button>
      </CardContent>
    </Card>
  );
} 