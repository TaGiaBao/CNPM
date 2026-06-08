import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, Eye, ShoppingCart, Package, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: { bookTitle: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "shipping" | "delivered" | "cancelled";
  orderDate: string;
  address: string;
}

const initialOrders: Order[] = [
  {
    id: "DH001",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@email.com",
    customerPhone: "0912345678",
    items: [
      { bookTitle: "Đắc Nhân Tâm", quantity: 2, price: 86000 },
      { bookTitle: "Nhà Giả Kim", quantity: 1, price: 79000 },
    ],
    total: 251000,
    status: "delivered",
    orderDate: "2026-06-05",
    address: "123 Nguyễn Huệ, Q1, TP.HCM"
  },
  {
    id: "DH002",
    customerName: "Trần Thị B",
    customerEmail: "tranthib@email.com",
    customerPhone: "0987654321",
    items: [
      { bookTitle: "Sapiens", quantity: 1, price: 189000 },
    ],
    total: 189000,
    status: "shipping",
    orderDate: "2026-06-06",
    address: "456 Lê Lợi, Q1, TP.HCM"
  },
  {
    id: "DH003",
    customerName: "Lê Văn C",
    customerEmail: "levanc@email.com",
    customerPhone: "0901234567",
    items: [
      { bookTitle: "Tuổi Trẻ Đáng Giá Bao Nhiêu", quantity: 3, price: 80000 },
    ],
    total: 240000,
    status: "pending",
    orderDate: "2026-06-07",
    address: "789 Hai Bà Trưng, Q3, TP.HCM"
  },
  {
    id: "DH004",
    customerName: "Phạm Thị D",
    customerEmail: "phamthid@email.com",
    customerPhone: "0923456789",
    items: [
      { bookTitle: "Think and Grow Rich", quantity: 1, price: 95000 },
      { bookTitle: "Đắc Nhân Tâm", quantity: 1, price: 86000 },
    ],
    total: 181000,
    status: "processing",
    orderDate: "2026-06-07",
    address: "321 Võ Văn Tần, Q3, TP.HCM"
  },
  {
    id: "DH005",
    customerName: "Hoàng Văn E",
    customerEmail: "hoangvane@email.com",
    customerPhone: "0934567890",
    items: [
      { bookTitle: "Nhà Giả Kim", quantity: 2, price: 79000 },
    ],
    total: 158000,
    status: "cancelled",
    orderDate: "2026-06-04",
    address: "654 Cách Mạng Tháng 8, Q10, TP.HCM"
  },
];

const statusConfig = {
  pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700", icon: Package },
  processing: { label: "Đang xử lý", color: "bg-blue-100 text-blue-700", icon: ShoppingCart },
  shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-700", icon: Package },
  delivered: { label: "Đã giao", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700", icon: XCircle },
};

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success("Cập nhật trạng thái đơn hàng thành công!");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Quản lý đơn hàng</h1>
        <p className="text-gray-600">Theo dõi và xử lý đơn hàng</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Danh sách đơn hàng
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm mã đơn hoặc khách hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pending">Chờ xử lý</SelectItem>
                  <SelectItem value="processing">Đang xử lý</SelectItem>
                  <SelectItem value="shipping">Đang giao</SelectItem>
                  <SelectItem value="delivered">Đã giao</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Mã đơn</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Khách hàng</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Ngày đặt</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Tổng tiền</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const config = statusConfig[order.status];
                  return (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerPhone}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{order.orderDate}</td>
                      <td className="py-3 px-4 font-semibold text-blue-600">
                        {order.total.toLocaleString('vi-VN')} ₫
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="order-details-description">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          <div id="order-details-description" className="sr-only">
            Xem chi tiết đơn hàng bao gồm thông tin khách hàng, sản phẩm và trạng thái
          </div>
          {selectedOrder && (
            <div className="space-y-6 py-4">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-3">Thông tin khách hàng</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Họ tên:</span>
                    <span className="font-medium">{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Điện thoại:</span>
                    <span className="font-medium">{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Địa chỉ:</span>
                    <span className="font-medium text-right">{selectedOrder.address}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3">Sản phẩm</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Tên sách</th>
                        <th className="text-center py-2 px-4 font-semibold text-sm">SL</th>
                        <th className="text-right py-2 px-4 font-semibold text-sm">Đơn giá</th>
                        <th className="text-right py-2 px-4 font-semibold text-sm">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 px-4">{item.bookTitle}</td>
                          <td className="py-2 px-4 text-center">{item.quantity}</td>
                          <td className="py-2 px-4 text-right">
                            {item.price.toLocaleString('vi-VN')} ₫
                          </td>
                          <td className="py-2 px-4 text-right font-medium">
                            {(item.quantity * item.price).toLocaleString('vi-VN')} ₫
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t bg-gray-50">
                        <td colSpan={3} className="py-3 px-4 font-semibold text-right">
                          Tổng cộng:
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-blue-600">
                          {selectedOrder.total.toLocaleString('vi-VN')} ₫
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="font-semibold mb-3">Cập nhật trạng thái</h3>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => {
                    handleUpdateStatus(selectedOrder.id, value as Order["status"]);
                    setSelectedOrder({ ...selectedOrder, status: value as Order["status"] });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                    <SelectItem value="processing">Đang xử lý</SelectItem>
                    <SelectItem value="shipping">Đang giao</SelectItem>
                    <SelectItem value="delivered">Đã giao</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
