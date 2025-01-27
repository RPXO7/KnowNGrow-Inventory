import { Card } from '@/components/ui/card';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Sales Overview</h3>
          <div className="h-[300px] flex items-center justify-center bg-secondary/50 rounded-lg">
            Sales Chart Placeholder
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Inventory Status</h3>
          <div className="h-[300px] flex items-center justify-center bg-secondary/50 rounded-lg">
            Inventory Chart Placeholder
          </div>
        </Card>
      </div>
    </div>
  );
}