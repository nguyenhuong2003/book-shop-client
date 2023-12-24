// JavaScript
document.getElementById('productImage').addEventListener('change', function (event) {
    var input = event.target;

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // Hiển thị hình ảnh trước khi tải lên
            document.getElementById('previewImage').src = e.target.result;
        };

        // Đọc tệp hình ảnh như là một dữ liệu URI
        reader.readAsDataURL(input.files[0]);
    }
});
function displayProducts() {
    // Lấy danh sách sản phẩm từ Local Storage
    var productList = JSON.parse(localStorage.getItem('products')) || [];
    productList.forEach(function (product) {
        renderRow(product);
    });
}


const renderRow = (product) => {
    var productID = product.Id;
    var productName = product.Name;
    var productType = product.ProductCategory;
    var productPrice = product.Price;
    var productDiscountPrice = product.DiscountPrice;
    var productDiscountPercent= product.DiscountPercent;
    var productImage = product.Image;

    // Tạo một hàng mới trong table
    var table = document.getElementById("productTable");
    var newRow = table.insertRow(table.rows.length);
    var cells = [];
    // Lấy đường dẫn hình ảnh từ thẻ img có id là 'previewImage'
    var productImage = document.getElementById("previewImage").src;
// Thêm các ô cột
for (var i = 0; i < 7; i++) {
    cells[i] = newRow.insertCell(i);
}
    // Đổ dữ liệu vào các ô cột
    cells[0].innerHTML = productID;
    cells[1].innerHTML = productName;
    cells[2].innerHTML = productType;
    cells[3].innerHTML = productPrice;
    cells[4].innerHTML = productDiscountPrice;
    cells[5].innerHTML = productDiscountPercent;
    cells[6].innerHTML = `<img src="${productImage}" alt="Product Image" width="100">`;
  // Thêm icon thùng rác và icon sửa
    var trashIconCell = newRow.insertCell(7);
    trashIconCell.innerHTML = `<i class="fa-regular fa-trash-can" onclick="deleteProduct(this)"></i><i class="fa-regular fa-edit" onclick="editProduct(this)"></i>`;
  
} 
// Gọi hàm để hiển thị sản phẩm ngay khi trang tải lên
displayProducts();

function editProduct(iconElement) {
    // Get the row index
    var row = iconElement.closest('tr');
    var rowIndex = row.rowIndex;

    // Get the product details from the corresponding row
    var productID = document.getElementById("productTable").rows[rowIndex].cells[0].innerHTML;
    var productName = document.getElementById("productTable").rows[rowIndex].cells[1].innerHTML;
    var productType = document.getElementById("productTable").rows[rowIndex].cells[2].innerHTML;
    var productPrice = document.getElementById("productTable").rows[rowIndex].cells[3].innerHTML;
    var productDiscountPrice = document.getElementById("productTable").rows[rowIndex].cells[4].innerHTML;
    var productDiscountPercent = document.getElementById("productTable").rows[rowIndex].cells[5].innerHTML;
    // var productDescription = document.getElementById("productTable").rows[rowIndex].cells[6].innerHTML;

    // Set the form values
    document.getElementById("productID").value = productID;
    document.getElementById("productName").value = productName;
    document.getElementById("productType").value = productType;
    document.getElementById("productPrice").value = productPrice;
    document.getElementById("productDiscountPrice").value = productDiscountPrice;
    document.getElementById("productDiscountPercent").value = productDiscountPercent;
    // document.getElementById("productDescription").value = productDescription;

   
    // Remove the product from localStorage
    removeProductFromStorage(productID);
}
function removeProductFromStorage(productID) {
    var existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    var updatedProducts = existingProducts.filter(product => product.Id !== productID);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
}
// ... (previous code)

// Function to update the edited product in the table and localStorage
function saveEditedProduct() {
    // Get the edited values from the form
    var editedProduct = {
        "Id": document.getElementById("productID").value,
        "Name": document.getElementById("productName").value,
        "ProductCategory": document.getElementById("productType").value,
        "Price": document.getElementById("productPrice").value,
        "DiscountPrice": document.getElementById("productDiscountPrice").value,
        "DiscountPercent": document.getElementById("productDiscountPercent").value,
        "Image": document.getElementById("previewImage").src
    };

    // Update the table with the edited values
    updateTableRow(editedProduct);

    // Update the localStorage with the edited values
    updateLocalStorage(editedProduct);

    // Reset the form
    document.getElementById("productForm").reset();
}

// Function to update the table row with the edited values
function updateTableRow(editedProduct) {
    var table = document.getElementById("productTable");

    // Find the row index of the edited product
    var rowIndex = findRowIndexById(editedProduct.Id);

    // If the rowIndex is found, update the row
    if (rowIndex !== -1) {
        var row = table.rows[rowIndex];
        row.cells[1].innerHTML = editedProduct.Name;
        row.cells[2].innerHTML = editedProduct.ProductCategory;
        row.cells[3].innerHTML = editedProduct.Price;
        row.cells[4].innerHTML = editedProduct.DiscountPrice;
        row.cells[5].innerHTML = editedProduct.DiscountPercent;
        row.cells[6].innerHTML = `<img src="${editedProduct.Image}" alt="Product Image" width="100">`;
    }
}

// Function to find the row index of a product by its Id
function findRowIndexById(productId) {
    var table = document.getElementById("productTable");

    for (var i = 1; i < table.rows.length; i++) {
        if (table.rows[i].cells[0].innerHTML === productId) {
            return i;
        }
    }

    return -1;
}

// Function to update the localStorage with the edited values
function updateLocalStorage(editedProduct) {
    var existingProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Find the index of the edited product in the array
    var index = existingProducts.findIndex(product => product.Id === editedProduct.Id);

    // If the index is found, update the product in the array
    if (index !== -1) {
        existingProducts[index] = editedProduct;
        localStorage.setItem('products', JSON.stringify(existingProducts));
    }
   
}


function addProduct() {
    // Lấy giá trị từ form
    var productID = document.getElementById("productID").value;
    var productName = document.getElementById("productName").value;
    var productType = document.getElementById("productType").value;
    var productPrice = document.getElementById("productPrice").value;
    var  productDiscountPrice= document.getElementById("productDiscountPrice").value;
    var  productDiscountPercent = document.getElementById("productDiscountPercent").value;
    // var productDescription = document.getElementById("productDescription").value;
   
    var productImage = document.getElementById("productImage").value;

    // Tạo một hàng mới trong table
    var table = document.getElementById("productTable");
    var newRow = table.insertRow(table.rows.length);
    var cells = [];
    // Lấy đường dẫn hình ảnh từ thẻ img có id là 'previewImage'
    var productImage = document.getElementById("previewImage").src;


    for (var i = 0; i < 7; i++) {
        cells[i] = newRow.insertCell(i);
    }
        // Đổ dữ liệu vào các ô cột
        cells[0].innerHTML = productID;
        cells[1].innerHTML = productName;
        cells[2].innerHTML = productType;
        cells[3].innerHTML = productPrice;
        cells[4].innerHTML = productDiscountPrice;
        cells[5].innerHTML = productDiscountPercent;
        // cells[6].innerHTML = productDescription;
       
        cells[6].innerHTML = `<img src="${productImage}" alt="Product Image" width="100">`;
      // Thêm icon thùng rác
      var trashIconCell = newRow.insertCell(7);
      trashIconCell.innerHTML = `<i class="fa-regular fa-trash-can" onclick="deleteProduct(this)"></i><i class="fa-regular fa-edit" onclick="editProduct(this)"></i>`;


    // Lưu trữ dữ liệu vào localStorage
   

    // Reset giá trị của form
    document.getElementById("productForm").reset();

      
    // Lưu trữ dữ liệu vào localStorage
    saveTableData();
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

    const newProduct = {
        "Id": productID,
        "Name": productName,
        "ProductCategory": productType,
        "Price": productPrice,
        "DiscountPrice": productDiscountPrice,
        "DiscountPercent": productDiscountPercent,
        "Image": productImage
       
    };
    //Id:1,
    //             Name: 'Bộ Áo Choàng 90CM',
    //             Image: './assets/img/sale1.jpg',
    //             Price: 125000,
    //             DiscountPrice: 112500,
    //             DiscountPercent: 10,
    //             ProductCategory: "Sale"

    existingProducts.push(newProduct);

    localStorage.setItem('products', JSON.stringify(existingProducts));

    // Reset giá trị của form
    document.getElementById("productForm").reset();
}
function deleteProduct(iconElement) {
    // Confirm with the user before deleting
    var confirmation = confirm("Bạn có chắc chắn muốn xóa không?");
    
    if (confirmation) {
        var row = iconElement.closest('tr');
        row.remove(); // Remove the row from the table

        // Optionally, update your localStorage or perform any other necessary actions
        saveTableData();
    }
}


// Hàm để lưu trữ dữ liệu của bảng vào localStorage
function saveTableData() {
    var table = document.getElementById("productTable");
    var tableData = [];

    // Lặp qua các hàng và cột của bảng để lấy dữ liệu
    for (var i = 1; i < table.rows.length; i++) {
        var rowData = [];
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            rowData.push(table.rows[i].cells[j].innerHTML);
        }
        tableData.push(rowData);
    }

    // Lưu trữ dữ liệu vào localStorage
    localStorage.setItem("products", JSON.stringify(tableData));
}

// Hàm để tải dữ liệu của bảng từ localStorage khi trang được tải lại
function loadTableData() {
    var table = document.getElementById("productTable");
    var tableData = JSON.parse(localStorage.getItem("products"));

    // Nếu có dữ liệu trong localStorage, thêm dữ liệu vào bảng
    if (tableData) {
        for (var i = 0; i < tableData.length; i++) {
            var newRow = table.insertRow(table.rows.length);
            for (var j = 0; j < tableData[i].length; j++) {
                var cell = newRow.insertCell(j);
                cell.innerHTML = tableData[i][j];
            }
        }
    }
}

// Gọi hàm loadTableData khi trang được tải lại
window.onload = loadTableData;
