import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { saveOrder } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  productId: string;
  batchNo: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddOrderDialog({ open, onOpenChange }: AddOrderDialogProps) {
  const { toast } = useToast();
  const [orderImage, setOrderImage] = useState<string | null>(null);
  const [receiptName, setReceiptName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      productId: "",
      batchNo: "",
      productName: "",
      quantity: 0,
      pricePerUnit: 0,
      totalPrice: 0,
    },
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrderImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      {
        productId: "",
        batchNo: "",
        productName: "",
        quantity: 0,
        pricePerUnit: 0,
        totalPrice: 0,
      },
    ]);
  };

  const updateOrderItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...orderItems];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
      totalPrice: field === 'quantity' || field === 'pricePerUnit' 
        ? (field === 'quantity' ? Number(value) : newItems[index].quantity) * 
          (field === 'pricePerUnit' ? Number(value) : newItems[index].pricePerUnit)
        : newItems[index].totalPrice
    };
    setOrderItems(newItems);
  };

  const handleSubmit = () => {
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: receiptName,
      date: orderDate,
      items: orderItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.pricePerUnit
      })),
      total: orderItems.reduce((sum, item) => sum + item.totalPrice, 0),
      status: 'completed' as const
    };

    saveOrder(order);
    toast({
      title: "Order Added",
      description: "Order has been successfully created",
    });
    onOpenChange(false);
    setOrderItems([{
      productId: "",
      batchNo: "",
      productName: "",
      quantity: 0,
      pricePerUnit: 0,
      totalPrice: 0,
    }]);
    setReceiptName("");
    setOrderDate("");
    setOrderImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-white">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-start gap-6">
            <div className="w-[200px]">
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {orderImage ? (
                  <img src={orderImage} alt="Order Bill" className="w-full h-auto" />
                ) : (
                  <>
                    <Label htmlFor="orderImage" className="cursor-pointer">
                      Drag image here
                      <br />
                      or
                      <br />
                      Browse image
                      <br />
                      <span className="text-sm text-red-500">Add Image of Order Bill</span>
                    </Label>
                    <Input 
                      id="orderImage" 
                      type="file" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="receiptName">Receipt Name</Label>
                <Input 
                  id="receiptName" 
                  value={receiptName}
                  onChange={(e) => setReceiptName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="orderDate">Order Date</Label>
                <Input 
                  id="orderDate" 
                  type="date" 
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Add Products in bill</h3>
            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div key={index} className="grid grid-cols-6 gap-4">
                  <div>
                    <Label>Product ID</Label>
                    <Input
                      value={item.productId}
                      onChange={(e) => updateOrderItem(index, 'productId', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Batch No</Label>
                    <Input
                      value={item.batchNo}
                      onChange={(e) => updateOrderItem(index, 'batchNo', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Product Name</Label>
                    <Input
                      value={item.productName}
                      onChange={(e) => updateOrderItem(index, 'productName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateOrderItem(index, 'quantity', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Price per Unit</Label>
                    <Input
                      type="number"
                      value={item.pricePerUnit}
                      onChange={(e) => updateOrderItem(index, 'pricePerUnit', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Total Price</Label>
                    <Input type="number" value={item.totalPrice} disabled />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addOrderItem}
              >
                <Plus className="h-4 w-4 mr-2" /> Add More
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Discard
            </Button>
            <Button onClick={handleSubmit}>Confirm Order</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}