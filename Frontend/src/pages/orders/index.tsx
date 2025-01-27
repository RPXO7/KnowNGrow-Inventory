import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">150</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Total Quantity</h3>
          <p className="text-3xl font-bold mt-2">500</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Total Bill</h3>
          <p className="text-3xl font-bold mt-2">₹15,00,000/-</p>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-secondary">
                <tr>
                  <th className="px-6 py-3">Order Id</th>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Order Value</th>
                  <th className="px-6 py-3">Receipt Name</th>
                  <th className="px-6 py-3">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">{111 + index}</td>
                    <td className="px-6 py-4">Product A</td>
                    <td className="px-6 py-4">5</td>
                    <td className="px-6 py-4">5000</td>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">25/08/2025</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}