// Import base
const nodemailer = require("nodemailer");

// Create transporter with email
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: "nsj301.onlineshop@gmail.com",
    pass: "icducbogsjhlbjup",
  },
});

// Send mail about order
exports.sendOrder = async (req, res, next) => {
  try {
    // Create response data
    const resData = {};

    // Get data from request
    const order = req.body;

    // Function to convert product to html
    const prodToHtml = (prod) => {
      return `
      <tr>
        <td>${prod.product.name}</td>
        <td><img src="${prod.product.imgs[0]}" alt="product"></td>
        <td>${Number(prod.product.price).toLocaleString()} VND</td>
        <td>${prod.qty}</td>
        <td>${Number(prod.product.price * prod.qty).toLocaleString()} VND</td>
      </tr>
      `;
    };

    // Create message
    const msg = {
      from: "njs301.onlineshop@gmail.com",
      to: order.user.email,
      subject: "Thông tin đơn đặt hàng",
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order</title>
          <style>
            img {
              width: 100%;
              max-width: 100px;
            }
            table {
              text-align: center;
            }
            table th,
            table td {
              border: 1px solid #000;
              padding: 7.5px;
            }
          </style>
        </head>
        <body>
          <h2>Xin chào ${order.user.full_name}</h2>
          <h3>Chúng tôi xin gửi bạn thông tin đơn đặt hàng</h3>
          <p>Người nhận đơn: ${order.receiver.full_name}</p>
          <p>Số điện thoại: ${order.receiver.phone_number}</p>
          <p>Địa chỉ: ${order.receiver.address}</p>
          <table>
            <thead>
              <tr>
                <th>Tên Sản Phẩm</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              ${order.products.reduce((str, prod) => str + prodToHtml(prod), "")}
            </tbody>
          </table>
          <h2>Tổng Thanh Toán: ${Number(order.total_price).toLocaleString()} VND</h2>
          <h2>Cảm ơn bạn!</h2>
        </body>
      </html>
      `,
    };

    // Send mail
    await transporter.sendMail(msg);

    // Send response
    resData.message = "Email sent successfully";
    return res.json(resData);

    // Catch error
  } catch (error) {
    next(error);
  }
};
