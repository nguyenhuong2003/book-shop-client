$(document).ready(function () {
    const formatCurrency = (amount) => {
        const formattedAmount = amount.toLocaleString('vi-VN');
        return `${formattedAmount}đ`;
    }

    let cart = JSON.parse(localStorage.getItem('Cart') || '[]');

    cart.forEach(function (product) {
        let productHtml = `
        <div class="item-product-cart" data-product-id="${product.Id}">
            <div class="checked-product-cart">
                <input type="checkbox" id="checkbox-product-${product.Id}" class="checkbox-add-cart">
            </div>
            <div class="img-product-cart">
                <a href="#!">
                    <img src="${product.Image}" alt="">
                </a>
            </div>
            <div class="group-product-info">
                <div class="info-product-cart">
                    <div>
                        <h2>
                            <a href="#!">${product.Name}</a>
                        </h2>
                    </div>
                    <div class="price-original">
                        <div><span class="giamua">${product.DiscountPrice}đ</span></div>
                    </div>
                </div>
                <div class="number-product-cart">
                    <div class="tanggiamsoluong">
                        <a href="#!" class="decrease-quantity" data-step="1" data-product-id="${product.Id}">
                            <img class="dautru" src="./assets/img/dautru.png" alt="" class="giam-soluong">
                        </a>    
                        <input type="text" value="${product.Quantity}" class="qty-carts">
                        <a href="#!" class="increase-quantity" data-step="1" data-product-id="${product.Id}">
                            <img class="dautru" src="./assets/img/daucong.png" alt="" class="tang-soluong">
                        </a>
                    </div>
                    <div>
                        <span class="price">${formatCurrency(calculatePrice(product.Quantity, product.DiscountPrice))}</span>
                    </div>
                </div>
                <div class="thungrac">
                    <span class="delete-product" data-product-id="${product.Id}">
                        <i class="fa-solid fa-trash-can"></i>
                    </span>
                </div>
            </div>
        </div>
        `;

        // Thêm HTML của sản phẩm vào phần tử có id "sale-products"
        $('.product-cart-left').append(productHtml);

        $(`.item-product-cart[data-product-id="${product.ProductId}"] .qty-carts`).val(product.Quantity);
    });

    let totalAmount = cart.reduce((sum, product) => sum + product.DiscountPrice * product.Quantity, 0);

    $('#total-price').text(formatCurrency(totalAmount));

    $('.product-cart-left').on('click', '.delete-product', function (event) {
        event.preventDefault();
        let productId = $(this).data('product-id');
        let submit = confirm("Bạn có chắc muốn xoá sản phẩm khỏi giỏ hàng?");
        if(submit){
            let updatedCart = [...JSON.parse(localStorage.getItem('Cart') || '[]')];
            let updatedCartNew = updatedCart.filter(product => product.Id !== productId);

            localStorage.setItem('Cart', JSON.stringify(updatedCartNew));

            let totalAmount = updatedCartNew.reduce((sum, product) => sum + product.DiscountPrice * product.Quantity, 0);

    $('#total-price').text(formatCurrency(totalAmount));

            let productElement = $(`.item-product-cart[data-product-id="${productId}"]`);
            if (productElement.length) {
                productElement.remove();
            }

        }
    });

    // Lắng nghe sự kiện khi tăng số lượng
    $('.product-cart-left').on('click', '.increase-quantity', function (event) {
        event.preventDefault();
        let productId = $(this).data('product-id');
        let product = cart.find(p => p.Id === productId);
        let inputQuantity = $(this).siblings('.qty-carts');
        let quantity = parseInt(inputQuantity.val());
        let step = parseInt($(this).data('step')) || 1;
        inputQuantity.val(quantity + step);

        updatePrice(product, quantity + step);
    });

    // Lắng nghe sự kiện khi giảm số lượng
    $('.product-cart-left').on('click', '.decrease-quantity', function (event) {
        event.preventDefault();
        let productId = $(this).data('product-id');
        let product = cart.find(p => p.Id === productId);
        let inputQuantity = $(this).siblings('.qty-carts');
        let quantity = parseInt(inputQuantity.val());
        let step = parseInt($(this).data('step')) || 1; 
        if (quantity > 1) {
            inputQuantity.val(quantity - step);
            updatePrice(product, quantity - step);
        }
    });

    // Lắng nghe sự kiện thay đổi giá trị của qty-carts
    $('.qty-carts').on('input', function () {
        let productId = $(this).closest('.item-product-cart').data('product-id');
        let product = cart.find(p => p.ProductId === productId);
        let quantity = parseInt($(this).val());
        updatePrice(product, quantity);
    });

    // Hàm tính giá trị price dựa trên qty và giá mua
    function calculatePrice(quantity, discountPrice) {
        return quantity * discountPrice;
    }

    function updatePrice(product, newQuantity) {
        if (!product || typeof product !== 'object' || isNaN(newQuantity)) {
            // console.error("Invalid product or quantity:", product, newQuantity);
            return;
        }

        let productId = product.Id;

        // Cập nhật giỏ hàng trong localStorage
        let updatedCart = [...JSON.parse(localStorage.getItem('Cart') || '[]')];
        let updatedItemIndex = updatedCart.findIndex(item => item.Id === productId);

        if (updatedItemIndex !== -1) {
            // Update the quantity and calculate the new price
            updatedCart[updatedItemIndex].Quantity = newQuantity;
            updatedCart[updatedItemIndex].Price = calculatePrice(newQuantity, updatedCart[updatedItemIndex].DiscountPrice);

            // Cập nhật giá trị ngay sau khi thay đổi số lượng
            let productElement = $(`.item-product-cart[data-product-id="${productId}"]`);
            if (productElement.length) {
                let priceElement = productElement.find('.price');
                priceElement.text(formatCurrency(updatedCart[updatedItemIndex].Price)); // Thêm 'đ' sau giá trị
            }

            localStorage.setItem('Cart', JSON.stringify(updatedCart));
        }

        let updatedCartNew = [...JSON.parse(localStorage.getItem('Cart') || '[]')];

        let totalAmount = updatedCartNew.reduce((sum, product) => sum + product.DiscountPrice * product.Quantity, 0);

        $('#total-price').text(formatCurrency(totalAmount));

    }
});
