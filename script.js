// Daftar produk
const products = [
  { id: 1, name: "AQUA", price: 2000, img: "aqua.jpg" },
  { id: 2, name: "BONCABE", price: 1000, img: "boncabe.jpg" },
  { id: 3, name: "CHOCOPIE", price: 2000, img: "chocopie.jpg" },
  { id: 4, name: "MAXICORN", price: 2000, img: "maxicorn.jpg" },
  { id: 5, name: "QTELLA", price: 2000, img: "qtella.png" },
];

// Keranjang
let cart = [];

// Format rupiah
function formatRupiah(number) {
  return number.toLocaleString("id-ID");
}

// Tampilkan produk
function displayProducts() {
  const productsContainer = document.getElementById("products");

  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");

    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}" width="120">
      <h3>${product.name}</h3>
      <p>Rp ${formatRupiah(product.price)}</p>
      <button onclick="addToCart(${product.id})">
        Tambah ke Keranjang
      </button>
    `;

    productsContainer.appendChild(productDiv);
  });
}

// Tambah ke keranjang
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
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

    const subtotal = item.price * item.quantity;

    listItem.textContent = `
${item.name} x ${item.quantity} - Rp ${formatRupiah(subtotal)}
    `;

    cartContainer.appendChild(listItem);

    totalPrice += subtotal;
  });

  document.getElementById("total-price").textContent =
    formatRupiah(totalPrice);
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang anda kosong.");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const payment = Number(
    prompt(
      `Total belanja anda Rp ${formatRupiah(
        total
      )}\nMasukkan jumlah pembayaran:`
    )
  );

  // Validasi input
  if (isNaN(payment) || payment <= 0) {
    alert("Masukkan jumlah pembayaran yang valid.");
    return;
  }

  // Cek pembayaran
  if (payment >= total) {
    const change = payment - total;

    alert(
      `Pembayaran berhasil!\nKembalian anda: Rp ${formatRupiah(change)}`
    );

    cart = [];

    updateCart();
  } else {
    alert("Uang Anda tidak mencukupi.");
  }
}

// Event tombol checkout
document
  .getElementById("checkout-btn")
  .addEventListener("click", checkout);

// Jalankan saat halaman dibuka
displayProducts();
