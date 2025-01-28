import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types";

interface ProductDetailsDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailsDialog({
  product,
  open,
  onOpenChange,
}: ProductDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-start gap-6">
            <div className="w-[200px] h-[200px] bg-secondary rounded-lg flex items-center justify-center">
              <img
                src="https://via.placeholder.com/200"
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Product Name</dt>
                  <dd className="text-lg font-semibold">{product.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Product ID</dt>
                  <dd className="text-lg font-semibold">{product.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Vendor Name</dt>
                  <dd className="text-lg font-semibold">{product.vendorName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">SKU</dt>
                  <dd className="text-lg font-semibold">{product.sku}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Current Stock</dt>
                  <dd className="text-lg font-semibold">{product.quantity}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Batch Information</h3>
            <div className="border rounded-lg">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 py-2 text-left">Batch No</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">MFG Date</th>
                    <th className="px-4 py-2 text-left">EXP Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">B001</td>
                    <td className="px-4 py-2">25</td>
                    <td className="px-4 py-2">2024-01-01</td>
                    <td className="px-4 py-2">2025-01-01</td>
                  </tr>
                  <tr className="bg-secondary/50">
                    <td className="px-4 py-2">B002</td>
                    <td className="px-4 py-2">25</td>
                    <td className="px-4 py-2">2024-02-01</td>
                    <td className="px-4 py-2">2025-02-01</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}