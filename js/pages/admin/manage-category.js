$(document).ready(() => {
    const getCategories = () => {
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        return categories;
    };

    const saveCategories = (categories) => {
        localStorage.setItem("categories", JSON.stringify(categories));
    };

    const displayCategories = () => {
        const categories = getCategories();
        const tableBody = $("#productTableBody");
    
        tableBody.empty();
    
        categories.forEach((category) => {
            const row = `<tr>
                            <td>${category.id}</td>
                            <td>${category.name}</td>
                            <td>${category.description}</td>
                            <td>
                                <button class="editButton" data-id="${category.id}">Sửa</button>
                                <button class="deleteButton" data-id="${category.id}">Xoá</button>
                            </td>
                        </tr>`;
            tableBody.append(row);
        });

        $(".editButton").click(editProductCategory);
        $(".deleteButton").click(deleteProductCategory);
    };

    const addProductCategory = () => {
        event.preventDefault();
        
        const productID = $("#productID").val();
        const productName = $("#productName").val();
        const productDescription = $("#productDescription").val();
        
        if (productID.trim() === "" || productName.trim() === "") {
            alert("Vui lòng nhập ID và Tên loại sách.");
            return;
        }
    
        const categories = getCategories();
    
        const isDuplicateID = categories.some(category => category.id === productID);
    
        if (isDuplicateID) {
            alert("ID đã tồn tại. Vui lòng nhập ID khác.");
            return;
        }
    
        categories.push({ id: productID, name: productName, description: productDescription });
        saveCategories(categories);
    
        displayCategories();
    
        $("#productID").val("");
        $("#productName").val("");
        $("#productDescription").val("");
    };

    const editProductCategory = (event) => {
        $('#action').val(2);
        $('#submitBtn').text('Sửa loại sách');
        $('#skipBtn').show();

        const categoryId = $(event.target).data("id");
        
        const categories = getCategories();
        console.log(categories)
        const categoryToEdit = categories.find(category => +category.id === +categoryId);
    
        if (!categoryToEdit) {
            alert("Không tìm thấy loại sách để sửa.");
            return;
        }
    
        $("#productID").val(categoryToEdit.id);
        $("#productName").val(categoryToEdit.name);
        $("#productDescription").val(categoryToEdit.description);
    };

    const confirmEdit = () => {
        const editedCategory = {
            id: $("#productID").val(),
            name: $("#productName").val(),
            description: $("#productDescription").val()
        };
    
        const categories = getCategories();
        const updatedCategories = categories.map(category => {
            if (category.id === editedCategory.id) {
                return editedCategory;
            } else {
                return category;
            }
        });
    
        saveCategories(updatedCategories);
    
        displayCategories();
    
        $("#productID").val("");
        $("#productName").val("");
        $("#productDescription").val("");
    
        $("#action").val(1);
        $('#skipBtn').hide();
        $('#submitBtn').text('Thêm loại sách');
    };

    const deleteProductCategory = (event) => {
        const categoryId = $(event.target).data("id");
    
        const isConfirmed = confirm("Bạn có chắc chắn muốn xoá loại sách này?");
    
        if (isConfirmed) {
            const categories = getCategories();
            const updatedCategories = categories.filter(category => +category.id !== +categoryId);
    
            saveCategories(updatedCategories);
    
            displayCategories();
        }
    };

    $('#skipBtn').click(() => {
        $('#action').val(1);
        $('#skipBtn').hide();
        $('#submitBtn').text('Sửa loại sách');

        $("#productID").val("");
        $("#productName").val("");
        $("#productDescription").val("");
    });

    $('#skipBtn').hide();

    displayCategories(); 

    $("#categoryForm").submit((event) => {
        event.preventDefault();
        let status = $('#action').val();
        
        if(+status === 1){
            addProductCategory();
        } else if(+status === 2){
            confirmEdit();
        }
    });
});
