$(document).ready(function () {
    updateCartCount();
    // Đọc mảng JSON từ Local Storage hoặc tạo mảng rỗng nếu không tồn tại hoặc không hợp lệ
    let products = JSON.parse(localStorage.getItem('products') || '[]');

   

    // Sự kiện click cho nút "Chọn Mua"
    $('.chonmua').click(function () {
        // Lấy ID của sản phẩm từ thuộc tính data-id
        let productId = $(this).data('id');
        // Tăng số lượng sản phẩm trong giỏ hàng
        increaseQuantity(productId);
        // Lưu giỏ hàng vào Local Storage
        saveCartToLocalStorage();
        // Hiển thị số lượng sản phẩm trong giỏ hàng (nếu cần)
        updateCartCount();
    });

    // Hàm tăng số lượng sản phẩm trong giỏ hàng
    function increaseQuantity(productId) {
        // Lấy giỏ hàng từ Local Storage
        let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        let existingItem = cartItems.find(item => item.Id === productId);

        if (existingItem) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            existingItem.Quantity += 1;
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng với số lượng là 1
            cartItems.push({ Id: productId, Quantity: 1 });
        }

        // Lưu giỏ hàng mới vào Local Storage
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    function updateCartCount() {
        // Lấy giỏ hàng từ Local Storage
        let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        $('#cart-count').text(cartItems.length);
    }

    // Hàm lưu giỏ hàng vào Local Storage
    function saveCartToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(products));

        //lấy ra, đọc mảng products từ local
        var storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    
    }
    // Gọi hàm cập nhật số lượng sản phẩm khi trang được tải
    updateCartCount();
});
