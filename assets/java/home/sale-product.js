$(document).ready(function () {
    //Save
//     let newProducts = [
//         {
//             Id:1,
//             Name: 'Bộ Áo Choàng 90CM',
//             Image: './assets/img/sale1.jpg',
//             Price: 125000,
//             DiscountPrice: 112500,
//             DiscountPercent: 10,
//             ProductCategory: "Sale"
//         },
//         {
//             Id:2,
//             Name: 'Bộ Áo Choàng Và Nón',
//             Image: './assets/img/sale2.jpg',
//             Price: 165000,
//             DiscountPrice: 148500,
//             DiscountPercent: 20,
//             ProductCategory: "Sale"
//         },
//         {
//             Id:3,
//             Name: 'Áo choàng',
//             Image: './assets/img/sale3.jpg',
//             Price: 50000,
//             DiscountPrice: 49000,
//             DiscountPercent: 15,
//             ProductCategory: "Sale"
//         },
//         {
//             Id:4,
//             Name: 'Bí ngô vẽ mặt',
//             Image: './assets/img/sale4.jpg',
//             Price: 110000,
//             DiscountPrice: 100000,
//             DiscountPercent: 20,
//             ProductCategory: "Sale"
//         },
//         {
//             Id:5,
//             Name: 'Băng đô mắt',
//             Image: './assets/img/sale5.jpg',
//             Price:52000,
//             DiscountPrice: 50000,
//             DiscountPercent: 20,
//             ProductCategory: "Sale"
//         },
//         {
//             Id:6,
//             Name: "Anna Karenina - Tập 2",
//             DiscountPrice: 125000,
//             Image: './assets/img/vanhoc1.jpg',
//             ProductCategory: "Van Hoc"
//         },
      
//         {Id:7,Name:"Coraline",DiscountPrice:150000,Image:"./assets/img/itemvh1.jpg",ProductCategory: "Van Hoc"},
//         {Id:8,Name:"Chuyện thầy trò",DiscountPrice:149000,Image:"./assets/img/itemvh2.jpg",ProductCategory: "Van Hoc"},
//         {Id:9,Name:"Thương nhớ thời bao cấp",DiscountPrice:95000,Image:"./assets/img/itemvh3.jpg",ProductCategory: "Van Hoc"},
//         {Id:10,Name:"Charlotte and Wilbur",DiscountPrice:59000,Image:"./assets/img/itemvh4.jpg",ProductCategory: "Van Hoc"},
//         {Id:11,Name:"Chinh phục Nam Cực",DiscountPrice:90000,Image:"./assets/img/itemvh5.jpg",ProductCategory: "Van Hoc"},
//         {Id:12,Name:"Metaverse",DiscountPrice:100000,Image:"./assets/img/itemvh6.jpg",ProductCategory: "Van Hoc"},
//         {Id:13,Name:"Pinochoio",DiscountPrice:149000,Image:"./assets/img/itemvh7.jpg",ProductCategory: "Van Hoc"},
//         {Id:14,Name:"Wonderland",DiscountPrice:150000,Image:"./assets/img/itemvh8.jpg",ProductCategory: "Van Hoc"},
//         {Id:15,Name:"Phụ Nữ và Tự Do",DiscountPrice:90000,Image:"./assets/img/itemvh9.jpg",ProductCategory: "Van Hoc"},
//         { Id: 16, Name: "Phẩm Giá Quý Cô", DiscountPrice: 149000, Image: "./assets/img/phamgiaquyco.jpg", ProductCategory: "Ky nang" },
//   { Id: 17, Name: "Lời Nói Đùa - Tập 5", DiscountPrice: 155000, Image: "./assets/img/theloai2.jpg", ProductCategory: "Ky nang" },
//   { Id: 18, Name: "Sức Mạnh Của Buông Bỏ", DiscountPrice:120000, Image: "./assets/img/theloai3.jpg", ProductCategory: "Ky nang" },
//   { Id: 19, Name: "Việt Nam Văn Hóa Sử Cương", DiscountPrice: 158000, Image: "./assets/img/theloai4.jpg", ProductCategory: "Ky nang" },
//   { Id: 20, Name: "Moriarty The Patriot - Tập 3", DiscountPrice: 45000, Image: "./assets/img/theloai5.jpg", ProductCategory: "Ky nang" },
//   { Id: 21, Name: "Trôi", DiscountPrice: 95000, Image: "./assets/img/theloai6.jpg", ProductCategory: "Ky nang" }
//     ];

    // localStorage.setItem('products', JSON.stringify(newProducts));

    // Get
    var storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    var saleProducts = storedProducts.filter(function(product) {
        return product.ProductCategory === 'sale';
      });
    //   saleProducts = storedProducts;
    // Lặp qua mảng sản phẩm và tạo HTML cho mỗi sản phẩm
    saleProducts.forEach(function (product) {
        let productHtml = `
            <div class="sale">
                <div class="sale10">
                    <span>${product.DiscountPercent}%</span>
                </div>
                <div class="saleimg">
                    <a href="#!">
                        <img src="${product.Image}">
                    </a>
                </div>
                <div class="salemota">
                    <a href="#!">${product.Name}</a>
                    <div class="giasale">
                        <span class="giadasale">${product.DiscountPrice}đ</span>
                        <span class="giabd">${product.Price}đ</span>
                    </div>
                </div>
                <button class="chonmua" data-id="${product.Id}">
                    <i class="fa-solid fa-cart-shopping"></i>
                    Chon Mua
                </button>
                <div class="heart">
                    <a href="#!">
                        <i class="fa-solid fa-heart"></i>
                    </a>
                </div>
            </div>
        `;
        // Thêm HTML của sản phẩm vào phần tử có id "sale-products"
        $('#sale-products').append(productHtml);
    });
    
});
