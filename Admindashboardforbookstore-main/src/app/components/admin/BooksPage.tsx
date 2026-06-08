import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus, Search, Edit, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  isbn: string;
  publisher: string;
}

const initialBooks: Book[] = [
  {
    id: "1",
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    category: "Kỹ năng sống",
    price: 86000,
    stock: 245,
    isbn: "978-604-2-14696-8",
    publisher: "NXB Tổng Hợp"
  },
  {
    id: "2",
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    category: "Lịch sử",
    price: 189000,
    stock: 128,
    isbn: "978-604-2-25325-5",
    publisher: "NXB Thế Giới"
  },
  {
    id: "3",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    category: "Văn học",
    price: 79000,
    stock: 312,
    isbn: "978-604-2-08866-5",
    publisher: "NXB Hội Nhà Văn"
  },
  {
    id: "4",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    author: "Rosie Nguyễn",
    category: "Kỹ năng sống",
    price: 80000,
    stock: 456,
    isbn: "978-604-2-10123-4",
    publisher: "NXB Hà Nội"
  },
  {
    id: "5",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Kinh tế",
    price: 95000,
    stock: 189,
    isbn: "978-604-2-45678-9",
    publisher: "NXB Lao Động"
  },
];

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({});

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  const handleOpenDialog = (book?: Book) => {
    if (book) {
      setEditingBook(book);
      setFormData(book);
    } else {
      setEditingBook(null);
      setFormData({});
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingBook(null);
    setFormData({});
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.author || !formData.price) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (editingBook) {
      setBooks(books.map((b) => (b.id === editingBook.id ? { ...b, ...formData } : b)));
      toast.success("Cập nhật sách thành công!");
    } else {
      const newBook: Book = {
        id: Date.now().toString(),
        title: formData.title!,
        author: formData.author!,
        category: formData.category || "Khác",
        price: formData.price!,
        stock: formData.stock || 0,
        isbn: formData.isbn || "",
        publisher: formData.publisher || "",
      };
      setBooks([newBook, ...books]);
      toast.success("Thêm sách mới thành công!");
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setBooks(books.filter((b) => b.id !== id));
    toast.success("Đã xóa sách!");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Quản lý sách</h1>
        <p className="text-gray-600">Quản lý danh mục sách trong cửa hàng</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Danh sách sách
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo tên, tác giả, ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm sách mới
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Tên sách</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Tác giả</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Thể loại</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">ISBN</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Giá</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Tồn kho</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{book.title}</td>
                    <td className="py-3 px-4">{book.author}</td>
                    <td className="py-3 px-4">{book.category}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{book.isbn}</td>
                    <td className="py-3 px-4 font-semibold text-blue-600">
                      {book.price.toLocaleString('vi-VN')} ₫
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.stock > 100
                            ? "bg-green-100 text-green-700"
                            : book.stock > 50
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {book.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(book)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(book.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingBook ? "Chỉnh sửa thông tin sách" : "Thêm sách mới"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tên sách *</Label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Nhập tên sách"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Tác giả *</Label>
              <Input
                id="author"
                value={formData.author || ""}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Nhập tên tác giả"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Thể loại</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thể loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Văn học">Văn học</SelectItem>
                  <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                  <SelectItem value="Kỹ năng sống">Kỹ năng sống</SelectItem>
                  <SelectItem value="Lịch sử">Lịch sử</SelectItem>
                  <SelectItem value="Thiếu nhi">Thiếu nhi</SelectItem>
                  <SelectItem value="Khoa học">Khoa học</SelectItem>
                  <SelectItem value="Khác">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={formData.isbn || ""}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                placeholder="978-604-2-xxxxx-x"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Giá bán (₫) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Số lượng tồn kho</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock || ""}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="publisher">Nhà xuất bản</Label>
              <Input
                id="publisher"
                value={formData.publisher || ""}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                placeholder="Nhập tên nhà xuất bản"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Hủy
            </Button>
            <Button onClick={handleSubmit}>
              {editingBook ? "Cập nhật" : "Thêm sách"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
