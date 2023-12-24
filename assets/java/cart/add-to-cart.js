$(document).ready(function () {
    //Event
    $(document).on('click', '.chonmua', function () {
        let id = $(this).data('id'); 
        console.log("id",id);
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        let existingItem = products.find(item => item.Id === id);
        console.log(existingItem);
        addToCart(existingItem);
      
    });
    function addToCart(product) {
        console.log(product);
        let cartItems = JSON.parse(localStorage.getItem('Cart') || '[]');
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        let existingItem = cartItems.find(item => item.Id === product.Id);
        if (existingItem) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            existingItem.Quantity += 1;
        } else {
          
            product.Quantity = 1;
            cartItems.push(product);
        }
        // Lưu giỏ hàng mới vào Local Storage
        localStorage.setItem('Cart', JSON.stringify(cartItems));
        alert('Đã thêm sản phẩm vào giỏ hàng!');
    }
   
   
});
