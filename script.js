// =======================
// DAFTAR PRODUK
// =======================

const products = [
  { id: 1, name: "AQUA", price: 2000, img: "aqua.jpg" },
  { id: 2, name: "BONCABE", price: 1000, img: "boncabe.jpg" },
  { id: 3, name: "CHOCOPIE", price: 2000, img: "chocopie.jpg" },
  { id: 4, name: "MAXICORN", price: 2000, img: "maxicorn.jpg" },
  { id: 5, name: "QTELLA", price: 2000, img: "qtella.png" },

  // Produk pack
  {
    id: 6,
    name: "AQUA 1 PACK",
    price: 24000,
    img: "aqua-pack.jpg",
    qtyPack: 12,
  },
  {
    id: 7,
    name: "BONCABE 1 PACK",
    price: 12000,
    img: "boncabe-pack.jpg",
    qtyPack: 12,
  },
  {
    id: 8,
    name: "CHOCOPIE 1 PACK",
    price: 24000,
    img: "chocopie-pack.jpg",
    qtyPack: 12,
  },
  {
    id: 9,
    name: "MAXICORN 1 PACK",
    price: 24000,
    img: "maxicorn-pack.jpg",
    qtyPack: 12,
  },
  {
    id: 10,
    name: "QTELLA 1 PACK",
    price: 24000,
    img: "qtella-pack.png",
    qtyPack: 12,
  },
];

// =======================
// KERANJANG
// =======================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =======================
// FORMAT RUPIAH
// =======================

function formatRupiah(number) {
  return number.toLocaleString("id-ID");
}

// =======================
// SIMPAN CART
// =======================

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =======================
// TEMPLATE PRODUK
// =======================

function createProductCard(product) {
  return `
    <img src="${product.img}" alt="${product.name}" width="120">

    <h3>${product.name}</h3>

    <p>Rp ${formatRupiah(product.price)}</p>

    ${
      product.qtyPack
        ? `<p>Isi ${product.qtyPack} pcs</p>`
        : ""
    }

    <button onclick="addToCart(${product.id})">
      Tambah ke Keranjang
    </button>
  `;
}

// =======================
// TAMPILKAN PRODUK
// =======================

function displayProducts(keyword = "") {
  const productsContainer =
    document.getElementById("products");

  productsContainer.innerHTML = "";

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

  filteredProducts.forEach((product) => {
    const productDiv = document.createElement("div");

    productDiv.classList.add("product");

    productDiv.innerHTML =
      createProductCard(product);

    productsContainer.appendChild(productDiv);
  });
}

// =======================
// TAMBAH KE CART
// =======================

function addToCart(productId) {
  const product = products.find(
    (p) => p.id === productId
  );

  if (!product) return;

  const cartItem = cart.find(
    (item) => item.id === productId
  );

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

// =======================
// TAMBAH QUANTITY
// =======================

function increaseQty(id) {
  const item = cart.find((i) => i.id === id);

  if (item) {
    item.quantity++;

    updateCart();
  }
}

// =======================
// KURANG QUANTITY
// =======================

function decreaseQty(id) {
  const item = cart.find((i) => i.id === id);

  if (item) {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.id !== id);
    }

    updateCart();
  }
}

// =======================
// HAPUS ITEM
// =======================

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// =======================
// UPDATE CART
// =======================

function updateCart() {
  const cartContainer =
    document.getElementById("cart-items");

  cartContainer.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((item) => {
    const subtotal =
      item.price * item.quantity;

    const listItem =
      document.createElement("li");

    listItem.innerHTML = `
      <b>${item.name}</b>

      <br>

      Rp ${formatRupiah(item.price)}
      x ${item.quantity}

      = Rp ${formatRupiah(subtotal)}

      <br><br>

      <button onclick="decreaseQty(${item.id})">
        -
      </button>

      <button onclick="increaseQty(${item.id})">
        +
      </button>

      <button onclick="removeFromCart(${item.id})">
        Hapus
      </button>

      <hr>
    `;

    cartContainer.appendChild(listItem);

    totalPrice += subtotal;
  });

  document.getElementById(
    "total-price"
  ).textContent =
    formatRupiah(totalPrice);

  saveCart();
}

// =======================
// CHECKOUT
// =======================

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang anda kosong.");
    return;
  }

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const payment = Number(
    prompt(
      `Total belanja anda Rp ${formatRupiah(
        total
      )}\nMasukkan jumlah pembayaran:`
    )
  );

  if (isNaN(payment) || payment <= 0) {
    alert("Masukkan jumlah pembayaran valid.");
    return;
  }

  if (payment >= total) {
    const change = payment - total;

    alert(
      `Pembayaran berhasil!\nKembalian: Rp ${formatRupiah(
        change
      )}`
    );

    cart = [];

    updateCart();

    localStorage.removeItem("cart");
  } else {
    alert("Uang anda tidak mencukupi.");
  }
}

// =======================
// EVENT SEARCH
// =======================

document
  .getElementById("search")
  .addEventListener("input", (e) => {
    displayProducts(e.target.value);
  });

// =======================
// EVENT CHECKOUT
// =======================

document
  .getElementById("checkout-btn")
  .addEventListener("click", checkout);

// =======================
// LOAD AWAL
// =======================

displayProducts();

updateCart();
