const { Sequelize } = require("sequelize");
import path from "path";
import dotenv from "dotenv";

// Nạp biến môi trường từ file `.env`
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Cấu hình Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, // Tên database
  process.env.DB_USER, // Tên người dùng
  process.env.DB_PASSWORD, // Mật khẩu
  {
    host: process.env.DB_HOST, // Địa chỉ server
    dialect: process.env.DB_DIALECT || "mssql", // Dialect, mặc định là SQL Server
    port: parseInt(process.env.DB_PORT, 10) || 1433, // Cổng (thay 'DB_POST' thành 'DB_PORT' đúng chuẩn)
    dialectOptions: {
      options: {
        encrypt: true, // Yêu cầu mã hóa kết nối
        trustServerCertificate: true, // Chấp nhận chứng chỉ không hợp lệ
      },
    },
  }
);

// Hàm kiểm tra kết nối
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection;
