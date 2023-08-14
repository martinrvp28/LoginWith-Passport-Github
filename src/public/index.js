const socketClient = io();

function deleteProduct(i) {
    socketClient.emit('deleteProd', Number(i));
}

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputPrice = document.getElementById('price');
const inputCode = document.getElementById('code');
const inputStock = document.getElementById('stock');
const inputCategory = document.getElementById('category');


form.onsubmit = (e) => {

    e.preventDefault();
    const newProduct = {
        title: inputTitle.value,
        description: inputDescription.value,
        price: Number(inputPrice.value),
        code: inputCode.value,
        stock: Number(inputStock.value),
        category: inputCategory.value,
    }


    socketClient.emit('newProduct', newProduct);
}

socketClient.on('allProducts', (products) => {
    let infoProd = '';
    if(products.length) {
        products.forEach((prod) => {
            infoProd += `<ul class="containerUl2">
            <p><span>Producto:</span> ${prod.title}</p>
            <p><span>Descripcion:</span> ${prod.description}</p>
            <p><span>Precio:</span> ${prod.price}</p>
            <p><span>Codigo: </span>${prod.code}</p>
            <p><span>Stock:</span> ${prod.stock}</p>
            <p><span>Categoria:</span> ${prod.category}</p>
            <p><span>ID:</span> ${prod.id}</p>
            <button onClick="deleteProduct('${prod.id}')">BORRAR</button>
        </ul>`     
        });
    } else {
        infoProd += `<p class="noProduct2">No hay productos, por favor ingrese uno</p>`
    }
    
    
    document.getElementById('products').innerHTML = infoProd;
})
