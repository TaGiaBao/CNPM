import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingCart, 
  Users, 
  Menu,
  LogOut
} from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export function AdminLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/books", label: "Quản lý sách", icon: BookOpen },
    { path: "/orders", label: "Đơn hàng", icon: ShoppingCart },
    { path: "/customers", label: "Khách hàng", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white border-r transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <h1 className="font-bold text-xl text-blue-600">BookStore Admin</h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={!isSidebarOpen ? "mx-auto" : ""}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${!isSidebarOpen && "justify-center px-2"}`}
                >
                  <Icon className="h-5 w-5" />
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 ${
              !isSidebarOpen && "justify-center px-2"
            }`}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Đăng xuất</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
