// Daftar produk
const products = [
  { id: 1, name: "AQUA", price: 2000, img: "img/aqua.jpg" },
  { id: 2, name: "BONCABE", price: 1000, img: "img/beng-beng.jpg" },
  { id: 3, name: "CHOCOPIE", price: 2000, img: "img/boncabe.webp" },
  { id: 4, name: "MAXICORN", price: 2000, img: "img/chocopie.jpg" },
  { id: 5, name: "QTELLA", price: 2000, img: "img/qtella.png" },
];

// Keranjang
let cart = [];

// Tampilkan produk
function displayProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = ""; // biar tidak dobel

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>
            <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
        `;

    productsContainer.appendChild(productDiv);
  });
}

// Tambah ke keranjang
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Update tampilan keranjang
function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
    cartContainer.appendChild(listItem);

    totalPrice += item.price * item.quantity;
  });

  document.getElementById("total-price").textContent = totalPrice;
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang anda kosong.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const payment = prompt(
    `Total belanja anda Rp ${total}. Masukkan jumlah pembayaran:`,
  );

  if (payment >= total) {
    alert(`Pembayaran berhasil! Kembalian anda: Rp ${payment - total}`);
    cart = [];
    updateCart();
  } else {
    alert("Uang Anda tidak mencukupi.");
  }
}

// Event tombol checkout
document.getElementById("checkout-btn").addEventListener("click", checkout);

// Jalankan saat load
displayProducts();
