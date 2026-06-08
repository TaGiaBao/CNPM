import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookOpen, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";

const statsCards = [
  {
    title: "Tổng doanh thu",
    value: "245,680,000 ₫",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Đơn hàng",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Sách đang bán",
    value: "856",
    change: "-2.4%",
    trend: "down",
    icon: BookOpen,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Khách hàng",
    value: "3,567",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const revenueData = [
  { month: "T1", revenue: 18500000 },
  { month: "T2", revenue: 22000000 },
  { month: "T3", revenue: 19800000 },
  { month: "T4", revenue: 25400000 },
  { month: "T5", revenue: 28900000 },
  { month: "T6", revenue: 32100000 },
];

const categoryData = [
  { name: "Văn học", value: 35, color: "#3b82f6" },
  { name: "Kinh tế", value: 25, color: "#10b981" },
  { name: "Kỹ năng", value: 20, color: "#f59e0b" },
  { name: "Thiếu nhi", value: 15, color: "#ef4444" },
  { name: "Khác", value: 5, color: "#6b7280" },
];

const recentOrders = [
  { id: "DH001", customer: "Nguyễn Văn A", total: "450,000 ₫", status: "Đã giao" },
  { id: "DH002", customer: "Trần Thị B", total: "320,000 ₫", status: "Đang giao" },
  { id: "DH003", customer: "Lê Văn C", total: "680,000 ₫", status: "Chờ xử lý" },
  { id: "DH004", customer: "Phạm Thị D", total: "890,000 ₫", status: "Đã giao" },
  { id: "DH005", customer: "Hoàng Văn E", total: "230,000 ₫", status: "Đang giao" },
];

export function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Chào mừng trở lại! Đây là tổng quan hệ thống của bạn.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                    <div className="flex items-center text-sm">
                      <TrendIcon className={`h-4 w-4 mr-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                      <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                        {stat.change}
                      </span>
                      <span className="text-gray-500 ml-1">so với tháng trước</span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Doanh thu 6 tháng gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString('vi-VN')} ₫`} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân loại sách bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Đơn hàng gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Mã đơn</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Khách hàng</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Tổng tiền</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4 font-semibold">{order.total}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Đã giao"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Đang giao"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
