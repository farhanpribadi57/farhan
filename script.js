// Daftar produk dengan gambar
const products = [
    { id: 1, name: 'AQUA', price: 2000, img: 'img/aqua.jpg'},
    { id: 2, name: 'BONCABE', price: 1000, img: 'img/beng beng.jpg'},
    { id: 3, name: 'CHOCOPIE', price: 2000, img: 'img/boncabe.webp'},
    { id: 4, name: 'MAXICORN', price: 2000, img: 'img/chocopie.jpg'},
    { id: 5, name: 'QTELLA', price: 2000, img: 'img/qtella.png'},


];

// keranjang belanja
let cart = [];

// fungsi untuk menampilkan daftar produk
function displayproducts() {
    const productscontainer = document.getElementById('products');
    products.forEach(product => {
        const productsdiv = document.createElement('div');
        productsdiv.classList.add('product');
        productsdiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>
            <button onclick="addTocart(${product.id})">tambah ke keranjang</button>
        `;
        productscontainer.appendChild(productsdiv);
    });
}

// fungsi untuk manambah produk ke keranjang belanja
function addTocart(productid) {
    const product = products.find(p => p.id === productid);
    const cartitem = cart.find(item => item.id === productid);

    if (cartitem) {
        cartitem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updatecart();
}

// fungsi untuk menampilkan isi keranjang belanja 
function addTocart() {
    const cartitemcontainer = document.getElementByIdyId('cart-items');
    cartitemcontainer.innerHTML = '';

    let totalprice = 0;
    cart.forEach(item => {
        const listitem = document.createElement('li');
        listitem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
        cartitemcontainer.appendChild(listitem);

        totalprice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalprice;
}

//fungsi untuk melakukan checkout
function checkout() {
    if(cart.length === 0) {
        alert('keranjang anda kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment = prompt(`total belanja anda Rp ${total}. masuklah jumlah pembayaran:`);

    if (payment >= total) {
        alert(`pembayaran berhasil! kembalian anda: Rp ${payment - total}`);
        cart = [];
        updatecart();
    } else {
        alert('Uang Anda tidak mencukupi.');
    }    
}

// event listener untuk tombol checkout 
document.getElementById('checkout-btn').addEventListener('click', checkout);

//  tampilkan produk saat halaman dimuat
displayproducts();