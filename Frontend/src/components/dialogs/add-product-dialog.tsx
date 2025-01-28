import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveProduct } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const [image, setImage] = useState<string | null>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    productName: "",
    productId: "",
    vendorName: "",
    batchNo: "",
    quantity: "",
    mfgDate: "",
    expDate: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const product = {
      id: formData.productId,
      name: formData.productName,
      vendorName: formData.vendorName,
      sku: formData.batchNo,
      quantity: parseInt(formData.quantity) || 0,
      image: image,
    };

    saveProduct(product);
    toast({
      title: "Product Added",
      description: "Product has been successfully added to inventory",
    });
    onOpenChange(false);
    setFormData({
      productName: "",
      productId: "",
      vendorName: "",
      batchNo: "",
      quantity: "",
      mfgDate: "",
      expDate: "",
    });
    setImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-start gap-6">
            <div className="w-[200px]">
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-auto" />
                ) : (
                  <>
                    <Label htmlFor="image" className="cursor-pointer">
                      Drag image here
                      <br />
                      or
                      <br />
                      Browse image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input 
                  id="productName" 
                  value={formData.productName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="productId">Product ID</Label>
                <Input 
                  id="productId" 
                  value={formData.productId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Input 
                  id="vendorName" 
                  value={formData.vendorName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Add First Batch</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="batchNo">Batch No</Label>
                <Input 
                  id="batchNo" 
                  value={formData.batchNo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mfgDate">MFG Date</Label>
                <Input 
                  id="mfgDate" 
                  type="date" 
                  value={formData.mfgDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expDate">EXP Date</Label>
                <Input 
                  id="expDate" 
                  type="date" 
                  value={formData.expDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Discard
            </Button>
            <Button onClick={handleSubmit}>Add Product</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}