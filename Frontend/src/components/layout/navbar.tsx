import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Navbar() {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="flex h-16 items-center px-4">
        <div className="flex-1 flex items-center space-x-4">
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by Name/Vendor/SKU"
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
}