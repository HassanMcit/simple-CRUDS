// var productName = document.getElementById("productName");
// var productCategory = document.getElementById("productCategory");
// var productPrice = document.getElementById("productPrice");
// var productImage = document.getElementById("productImage");
// var tbody = document.getElementById("tbody");

// var productList = [];

// if(localStorage.getItem("products") !== null) {
//     productList = JSON.parse(localStorage.getItem("products"));
//     displayProduct();
// }

// function addProduct() {
//     var product = {
//         name: productName.value,
//         category: productCategory.value,
//         price: productPrice.value,
//         image: "image/chefs-1.jpg",
//     }
//     productList.push(product);
//     localStorage.setItem("products", JSON.stringify(productList));
//     clearForm();
//     displayProduct();
// }

// function clearForm() {
//     productName.value = "";
//     productCategory.value = "";
//     productPrice.value = "";
//     productImage.value = "";
// }

// function displayProduct() {
//     var content = "";
//     for (var i = 0; i < productList.length; i++) {
//         content += `
//         <tr class="table-info my-5">
//         <th scope="row">${i + 1}</th>
//         <td>${productList[i].name}</td>
//         <td>${productList[i].category}</td>
//         <td>${productList[i].price}</td>
//         <td><img src="image/chefs-1.jpg" width="50" alt="chefs-1"/></td>
//         <td>
//            <button type="button" class="btn btn-primary text-white" onclick="">Update</button>
//            <button type="button" class="btn btn-danger text-white" onclick="deleteProduct(${i})">Delete</button>
//         </td>
//         </tr>
//         `;
//     }
//     tbody.innerHTML = content;
// }

// function deleteProduct(index) {
//     productList.splice(index, 1 );
//     displayProduct();
// }

var addBtn = document.getElementById("addBtn");
var saveBtn = document.getElementById("saveBtn");
var updateBtn = document.getElementById("updateBtn");
var deleteBtn = document.getElementById("deleteBtn");
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var tbody = document.getElementById("tbody");
var productImage = document.getElementById("productImage");
var search = document.getElementById("search");

var productList = [];

if (JSON.parse(localStorage.getItem("product"))) {
    productList = (JSON.parse(localStorage.getItem("product")));
}

displayProduct(productList);

function addProduct(index) {
    var product = {
        name: productName.value,
        price: productPrice.value,
        cate: productCategory.value,
        desc: productDesc.value,
        image: productImage.files[0].name,
    };
    productList.push(product);
    localStorage.setItem("product", JSON.stringify(productList));
    displayProduct(productList);
    clearProduct();
}

function clearProduct() {
    productName.value = null;
    productPrice.value = null;
    productCategory.value = null;
    productDesc.value = null;
    productImage.value = null;
    updateBtn.classList.replace("d-block", "d-none");
    saveBtn.classList.replace("d-none", "d-block");
}

function displayProduct(arr) {
    var display = "";
    for (var i = 0; i < arr.length; i++) {
        display += `
            <tr>
                <th scope="row">
                ${i + 1}
                </th>
                <td>
                    <img src="image/${arr[i].image}" alt="emp-photo" width="100"/>
                </td>
                <td>${arr[i].name}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].cate}</td>
                <td>${arr[i].desc}</td>
                <td>
                    <div class="row">
                        <div class="col-md-3 col-12 ">
                            <button type="button" onclick=updateData(${i}) data-bs-toggle="modal"
                            data-bs-target="#exampleModal" class="btn btn-warning ms-lg-0 ms-3 px-2">
                                <i class="fa-solid fa-pen text-white"></i>
                            </button>
                        </div>
                        <div class="col-md-3 col-12 mt-md-0 mt-3">
                            <button type="button" onclick=deleteItem(${i}) 
                            class="btn btn-danger px-2 ms-lg-0 ms-3"><i class="fa-solid fa-trash text-white"></i>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>`
    }
    if (arr == "") {
        tbody.innerHTML = "<td colspan='7'><h2 class='text-center text-dark fs-1'>No Data To Show</h2></td>";
    }
    else {
        tbody.innerHTML = display;
    }
}

function deleteItem(index) {
    productList.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(productList));
    displayProduct(productList);
}

function deleteAll() {
    productList.splice(0, productList.length);
    localStorage.setItem("product", JSON.stringify(productList));
    displayProduct(productList);
}

function updateData(index) {
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].cate;
    productDesc.value = productList[index].desc;
    saveBtn.classList.replace("d-block", "d-none");
    updateBtn.classList.replace("d-none", "d-block");
    updateBtn.setAttribute("onclick", `update(${index})`);
    console.log(updateBtn);
}

function update(index) {
    productList[index].name = productName.value;
    productList[index].price = productPrice.value;
    productList[index].cate = productCategory.value;
    productList[index].desc = productDesc.value;
    productList[index].image= productImage.files[0].name;
    clearProduct();
    displayProduct(productList);
    localStorage.setItem("product", JSON.stringify(productList));
}

function searchEmp() {
    var newArray = [];
    for(var i = 0; i < productList.length; i++) {
        if(productList[i].name.toLowerCase().indexOf(search.value.toLowerCase()) !== -1) {
            newArray.push(productList[i]);
        }
    }
    displayProduct(newArray);
}