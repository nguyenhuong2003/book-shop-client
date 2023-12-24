
$(document).ready(function () {
    var storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    var kynangProducts = storedProducts.filter(function(product) {
        return product.ProductCategory === 'kynang';
      });
    
  // Lặp qua mảng sản phẩm và tạo HTML cho mỗi sản phẩm   
  kynangProducts.forEach(function (product) {
        let knHtml = `
        <div class="vanhocitem">
        <div class="vanhocimg"><a href="#!"><img src="${product.Image}"></a></div>
        <div class="salemota">
            <a href="#!">${product.Name}</a>
            
            <div >
                <span class="giavh">${product.DiscountPrice}đ</span>
            </div>
        </div>
        <button class="chonmua" data-id="${product.Id}">
            <i class="fa-solid fa-cart-shopping"></i>
            Chon Mua
        </button>
    </div>
        `;

        // Thêm HTML của sản phẩm vào phần tử có id "sale-products"
        $('#product-kn').append(knHtml);
    });
});
