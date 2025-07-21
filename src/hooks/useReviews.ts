'use client';

import { useCallback, useEffect, useState } from 'react';
import { Review, ReviewService, ReviewParams } from '@/lib/services/reviewService';

export const useReviews = (options: ReviewParams = {}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async (params: ReviewParams = options) => {
    setIsLoading(true);
    setError(null);
    try {
      const { reviews, pagination } = await ReviewService.getReviews(params);
      setReviews(reviews);
      setPagination(pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch reviews');
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchReviews(options);
  }, [fetchReviews, options]);

  // CRUD actions
  const createReview = async (data: Omit<Review, 'id'>) => {
    setIsLoading(true);
    try {
      const newReview = await ReviewService.createReview(data);
      setReviews(prev => [newReview, ...prev]);
      return newReview;
    } catch (err: any) {
      setError(err.message || 'Failed to create review');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateReview = async (id: number, data: Partial<Omit<Review, 'id'>>) => {
    setIsLoading(true);
    try {
      const updated = await ReviewService.updateReview(id, data);
      setReviews(prev => prev.map(r => (r.id === id ? updated : r)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update review');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReview = async (id: number) => {
    setIsLoading(true);
    try {
      await ReviewService.deleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete review');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    reviews,
    pagination,
    isLoading,
    error,
    fetchReviews,
    createReview,
    updateReview,
    deleteReview,
  };
};

export function useReview(id: number) {
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const data = await ReviewService.getReview(id);
        setReview(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch review');
        setReview(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  return { review, loading, error };
}

export function useProductReviews(productId: number, params?: Omit<ReviewsParams, 'productId'>) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<ProductReviewsResponse['pagination'] | null>(null);
  const [statistics, setStatistics] = useState<ReviewStats | null>(null);

  useEffect(() => {
    const fetchProductReviews = async () => {
      if (!productId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await ReviewService.getProductReviews(productId, params);
        setReviews(response.reviews);
        setPagination(response.pagination);
        setStatistics(response.statistics);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product reviews');
        setReviews([]);
        setPagination(null);
        setStatistics(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductReviews();
  }, [productId, params]);

  return { reviews, loading, error, pagination, statistics };
}

export function useFeaturedReviews(limit?: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await ReviewService.getFeaturedReviews(limit);
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured reviews');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedReviews();
  }, [limit]);

  return { reviews, loading, error };
}

export function useProductReviewStats(productId: number) {
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductReviewStats = async () => {
      if (!productId) return;

      setLoading(true);
      setError(null);

      try {
        const data = await ReviewService.getProductReviewStats(productId);
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product review stats');
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductReviewStats();
  }, [productId]);

  return { stats, loading, error };
}

export function useProductAverageRating(productId: number) {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductAverageRating = async () => {
      if (!productId) return;

      setLoading(true);
      setError(null);

      try {
        const data = await ReviewService.getProductAverageRating(productId);
        setAverageRating(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product average rating');
        setAverageRating(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAverageRating();
  }, [productId]);

  return { averageRating, loading, error };
} 