-- 1. Tạo Cơ sở dữ liệu
CREATE DATABASE BookstoreDB;
GO

-- Sử dụng CSDL vừa tạo
USE BookstoreDB;
GO

-- 2. Tạo bảng Categories (Danh mục sách)
-- Phải tạo bảng này trước vì bảng Books sẽ tham chiếu đến nó
CREATE TABLE Categories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255)
);
GO

-- 3. Tạo bảng Users (Người dùng: Khách hàng và Admin)
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    FullName NVARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    Role VARCHAR(20) DEFAULT 'Customer' -- Có thể lưu 'Admin' hoặc 'Customer'
);
GO

-- 4. Tạo bảng Books (Sách)
CREATE TABLE Books (
    BookID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Author NVARCHAR(100),
    CategoryID INT FOREIGN KEY REFERENCES Categories(CategoryID),
    Price DECIMAL(18,2) NOT NULL,
    Stock INT DEFAULT 0,
    Description NVARCHAR(MAX)
);
GO

-- 5. Tạo bảng Orders (Đơn hàng)
CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    OrderDate DATETIME DEFAULT GETDATE(),
    TotalAmount DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(50) DEFAULT N'Chờ duyệt' -- Các trạng thái: Chờ duyệt, Đang giao, Hoàn thành
);
GO