import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Search, Users, Eye, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  lastOrder: string;
  status: "active" | "inactive";
}

const initialCustomers: Customer[] = [
  {
    id: "KH001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0912345678",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    totalOrders: 15,
    totalSpent: 3450000,
    joinDate: "2025-01-15",
    lastOrder: "2026-06-05",
    status: "active"
  },
  {
    id: "KH002",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0987654321",
    address: "456 Lê Lợi, Q1, TP.HCM",
    totalOrders: 8,
    totalSpent: 1890000,
    joinDate: "2025-03-22",
    lastOrder: "2026-06-06",
    status: "active"
  },
  {
    id: "KH003",
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "0901234567",
    address: "789 Hai Bà Trưng, Q3, TP.HCM",
    totalOrders: 23,
    totalSpent: 5670000,
    joinDate: "2024-11-10",
    lastOrder: "2026-06-07",
    status: "active"
  },
  {
    id: "KH004",
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    phone: "0923456789",
    address: "321 Võ Văn Tần, Q3, TP.HCM",
    totalOrders: 12,
    totalSpent: 2340000,
    joinDate: "2025-02-05",
    lastOrder: "2026-06-07",
    status: "active"
  },
  {
    id: "KH005",
    name: "Hoàng Văn E",
    email: "hoangvane@email.com",
    phone: "0934567890",
    address: "654 Cách Mạng Tháng 8, Q10, TP.HCM",
    totalOrders: 5,
    totalSpent: 890000,
    joinDate: "2025-05-18",
    lastOrder: "2026-05-20",
    status: "inactive"
  },
  {
    id: "KH006",
    name: "Đỗ Thị F",
    email: "dothif@email.com",
    phone: "0945678901",
    address: "987 Trần Hưng Đạo, Q5, TP.HCM",
    totalOrders: 18,
    totalSpent: 4120000,
    joinDate: "2024-09-30",
    lastOrder: "2026-06-04",
    status: "active"
  },
  {
    id: "KH007",
    name: "Võ Văn G",
    email: "vovang@email.com",
    phone: "0956789012",
    address: "246 Nguyễn Thị Minh Khai, Q3, TP.HCM",
    totalOrders: 7,
    totalSpent: 1560000,
    joinDate: "2025-04-12",
    lastOrder: "2026-06-01",
    status: "active"
  },
];

export function CustomersPage() {
  const [customers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === "active").length,
    inactive: customers.filter(c => c.status === "inactive").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Quản lý khách hàng</h1>
        <p className="text-gray-600">Theo dõi thông tin và hoạt động của khách hàng</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng khách hàng</p>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Đang hoạt động</p>
                <h3 className="text-2xl font-bold text-green-600">{stats.active}</h3>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Không hoạt động</p>
                <h3 className="text-2xl font-bold text-orange-600">{stats.inactive}</h3>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng doanh thu</p>
                <h3 className="text-xl font-bold text-blue-600">
                  {(stats.totalRevenue / 1000000).toFixed(1)}M ₫
                </h3>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Danh sách khách hàng
            </CardTitle>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Mã KH</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Thông tin</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Liên hệ</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Đơn hàng</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Tổng chi tiêu</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{customer.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">
                          Tham gia: {customer.joinDate}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="text-sm flex items-center gap-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          {customer.email}
                        </div>
                        <div className="text-sm flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{customer.totalOrders}</div>
                        <div className="text-xs text-gray-500">đơn hàng</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      {customer.totalSpent.toLocaleString('vi-VN')} ₫
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={customer.status === "active" ? "default" : "secondary"}
                        className={
                          customer.status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {customer.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết khách hàng</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6 py-4">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-sm text-gray-600">THÔNG TIN CÁ NHÂN</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Mã khách hàng</div>
                      <div className="font-medium">{selectedCustomer.id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Họ và tên</div>
                      <div className="font-medium">{selectedCustomer.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Trạng thái</div>
                      <Badge
                        variant={selectedCustomer.status === "active" ? "default" : "secondary"}
                        className={
                          selectedCustomer.status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {selectedCustomer.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-sm text-gray-600">THÔNG TIN LIÊN HỆ</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm text-gray-600">Email</div>
                        <div className="font-medium">{selectedCustomer.email}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm text-gray-600">Số điện thoại</div>
                        <div className="font-medium">{selectedCustomer.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm text-gray-600">Địa chỉ</div>
                        <div className="font-medium">{selectedCustomer.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="font-semibold mb-3 text-sm text-gray-600">THỐNG KÊ MUA HÀNG</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600 mb-1">Tổng đơn hàng</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedCustomer.totalOrders}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600 mb-1">Tổng chi tiêu</div>
                      <div className="text-xl font-bold text-green-600">
                        {(selectedCustomer.totalSpent / 1000000).toFixed(1)}M ₫
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600 mb-1">Ngày tham gia</div>
                      <div className="text-sm font-medium">{selectedCustomer.joinDate}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600 mb-1">Đơn gần nhất</div>
                      <div className="text-sm font-medium">{selectedCustomer.lastOrder}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
