import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Package, 
  ShoppingCart, 
  BarChart2, 
  DollarSign,
  Settings,
  Leaf
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

const navigation = [
  { name: 'Inventory', icon: Package, href: ROUTES.INVENTORY },
  { name: 'Orders', icon: ShoppingCart, href: ROUTES.ORDERS },
  { name: 'Analytics', icon: BarChart2, href: ROUTES.ANALYTICS },
  { name: 'Sales', icon: DollarSign, href: ROUTES.SALES },
  { name: 'Settings', icon: Settings, href: ROUTES.SETTINGS },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[14%] lg:flex-col">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">KnowNGrow</span>
          </Link>
        </div>
        <div className="flex-grow flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5',
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}