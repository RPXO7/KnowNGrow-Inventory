import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { Product } from '@/types';
import { AddProductDialog } from '@/components/dialogs/add-product-dialog';
import { ProductDetailsDialog } from '@/components/dialogs/product-details-dialog';
import { getProducts, getInventoryStats } from '@/lib/storage';

export default function Inventory() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    highStock: 0,
    lowStock: 0,
    outOfStock: 0
  });

  useEffect(() => {
    const loadData = () => {
      const loadedProducts = getProducts();
      setProducts(loadedProducts);
      setStats(getInventoryStats());
      console.log(loadedProducts, "loadedProducts");
    };

    loadData();
    // Add event listener for storage changes
    window.addEventListener('storage', loadData);

    return () => {
      window.removeEventListener('storage', loadData);
    };
  }, []);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <div className='primary-btn'>
          <Button
            onClick={() => setIsAddProductOpen(true)}
            className="btn-primary bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Total Products</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">High Stock</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">{stats.highStock}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Low Stock</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-600">{stats.lowStock}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Out of Stock</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">{stats.outOfStock}</p>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-8" />
          </div>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id} className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/64"
                      alt={product.name}
                      className="w-12 h-12 object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.vendorName}
                  </p>
                  <p className="text-sm text-muted-foreground">{product.sku}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      Product ID: {product.id}
                    </div>
                    <div className="mt-1 inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      QTY: {product.quantity}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleViewDetails(product)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <AddProductDialog
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
      />

      {selectedProduct && (
        <ProductDetailsDialog
          product={selectedProduct}
          open={isProductDetailsOpen}
          onOpenChange={setIsProductDetailsOpen}
        />
      )}
    </div>
  );
}