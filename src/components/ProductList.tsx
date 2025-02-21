import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Product } from '../types';
import { ShoppingBag, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (currentPage: number) => {
    setLoading(true);
    setProducts([]); // Clear previous data before fetching
    try {
      const skip = (currentPage - 1) * limit;
      console.log("Fetching products for page:", currentPage, "Skip:", skip);
      const response = await getProducts(limit, skip);
      console.log("API Response:", response);
      setProducts(response.products);
      setTotal(response.total);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-sm text-gray-500">Browse our collection</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative pt-[100%] bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-contain p-4"
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <p className="text-xs text-indigo-600 uppercase tracking-wide font-semibold">
                      {product.category}
                    </p>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="mt-4 flex items-center">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">
                          {product.rating.rate} ({product.rating.count})
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
                      <button className="px-3 py-1 text-sm text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50 transition-colors duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center bg-white px-4 py-3 rounded-lg shadow sm:px-6">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={loading || page === 1}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="mx-4 text-gray-700">Page {page} of {Math.ceil(total / limit)}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={loading || page >= Math.ceil(total / limit)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
