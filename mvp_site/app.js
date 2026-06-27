const products = [
  {
    id: "desk-stand",
    name: "Modular Desk Stand",
    category: "Desk",
    price: 24,
    lead: "2-3 days",
    colors: ["#293241", "#2a9d8f", "#f2cc8f"],
    shape: "stand"
  },
  {
    id: "planter",
    name: "Geometric Mini Planter",
    category: "Decor",
    price: 18,
    lead: "3-4 days",
    colors: ["#8ab17d", "#e9c46a", "#f6f8fb"],
    shape: "planter"
  },
  {
    id: "cable-comb",
    name: "Cable Comb Kit",
    category: "Utility",
    price: 12,
    lead: "1-2 days",
    colors: ["#18212f", "#e76f51", "#89b0ae"],
    shape: "comb"
  },
  {
    id: "display-riser",
    name: "Collectible Display Riser",
    category: "Decor",
    price: 30,
    lead: "4-5 days",
    colors: ["#f6f8fb", "#3d405b", "#f4a261"],
    shape: "riser"
  },
  {
    id: "drawer-tray",
    name: "Drawer Organizer Tray",
    category: "Desk",
    price: 22,
    lead: "2-4 days",
    colors: ["#2a9d8f", "#293241", "#ded8cc"],
    shape: "tray"
  },
  {
    id: "mount",
    name: "Small Wall Mount",
    category: "Utility",
    price: 16,
    lead: "3-5 days",
    colors: ["#18212f", "#f6f8fb", "#e76f51"],
    shape: "mount"
  }
];

const state = {
  filter: "all",
  cart: JSON.parse(localStorage.getItem("printforge-cart") || "[]")
};

const grid = document.querySelector("#productGrid");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const dashboardCart = document.querySelector("#dashboardCart");
const cartItems = document.querySelector("#cartItems");
const cartDrawer = document.querySelector("#cartDrawer");
const toast = document.querySelector("#toast");

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function productSvg(shape, colors) {
  const [a, b, c] = colors;
  const drawings = {
    stand: `<rect x="84" y="38" width="82" height="152" rx="14" fill="${a}"/><rect x="102" y="58" width="46" height="98" rx="8" fill="${c}"/><circle cx="125" cy="172" r="8" fill="${b}"/>`,
    planter: `<path d="M58 78h134l-18 118H76z" fill="${a}"/><path d="M74 58h102l16 30H58z" fill="${b}"/><path d="M92 54c12-28 30-38 54-28 10 4 18 12 24 24" fill="none" stroke="${c}" stroke-width="14" stroke-linecap="round"/>`,
    comb: `<rect x="42" y="78" width="166" height="86" rx="14" fill="${a}"/><path d="M68 104h114M68 138h114" stroke="${c}" stroke-width="14" stroke-linecap="round"/><circle cx="68" cy="104" r="9" fill="${b}"/><circle cx="182" cy="138" r="9" fill="${b}"/>`,
    riser: `<rect x="54" y="126" width="144" height="54" rx="10" fill="${a}"/><rect x="78" y="82" width="96" height="54" rx="10" fill="${b}"/><rect x="102" y="42" width="48" height="50" rx="8" fill="${c}"/>`,
    tray: `<rect x="48" y="58" width="154" height="128" rx="18" fill="${a}"/><path d="M78 58v128M126 58v128M48 118h154" stroke="${c}" stroke-width="12"/><rect x="48" y="58" width="154" height="128" rx="18" fill="none" stroke="${b}" stroke-width="10"/>`,
    mount: `<path d="M68 54h114v132H68z" fill="${a}"/><path d="M88 76h74v36H88z" fill="${c}"/><path d="M88 136h74" stroke="${b}" stroke-width="18" stroke-linecap="round"/><circle cx="86" cy="170" r="8" fill="${c}"/><circle cx="164" cy="170" r="8" fill="${c}"/>`
  };
  return `<svg viewBox="0 0 250 230" role="img" aria-hidden="true">${drawings[shape]}</svg>`;
}

function renderProducts() {
  const visible = state.filter === "all" ? products : products.filter(product => product.category === state.filter);
  grid.innerHTML = visible.map(product => `
    <article class="product-card">
      <div class="product-art">${productSvg(product.shape, product.colors)}</div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <div class="product-meta"><span>${product.category}</span><strong>${money(product.price)}</strong></div>
        <div class="product-meta"><span>Lead time</span><span>${product.lead}</span></div>
        <div class="swatches" aria-label="Available colors">
          ${product.colors.map(color => `<span class="swatch" style="background:${color}"></span>`).join("")}
        </div>
        <button class="add-button" type="button" data-add="${product.id}">Add to cart</button>
      </div>
    </article>
  `).join("");
}

function saveCart() {
  localStorage.setItem("printforge-cart", JSON.stringify(state.cart));
}

function cartSubtotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
  cartTotal.textContent = money(cartSubtotal());
  dashboardCart.textContent = money(cartSubtotal());
  if (!state.cart.length) {
    cartItems.innerHTML = `<p class="fine-print">Your cart is empty. Add a print from the catalog.</p>`;
    return;
  }
  cartItems.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <span>${money(item.price)} x ${item.quantity}</span>
      </div>
      <button class="remove-button" type="button" data-remove="${item.id}">Remove</button>
    </div>
  `).join("");
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  saveCart();
  renderCart();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    state.filter = button.dataset.filter;
    renderProducts();
  });
});

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (button) removeFromCart(button.dataset.remove);
});

document.querySelector("[data-open-cart]").addEventListener("click", () => {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
});

document.querySelector("[data-close-cart]").addEventListener("click", () => {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
});

cartDrawer.addEventListener("click", event => {
  if (event.target === cartDrawer) {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  }
});

document.querySelector("#checkoutButton").addEventListener("click", () => {
  if (!state.cart.length) {
    showToast("Add an item before checkout");
    return;
  }
  showToast("Checkout demo ready: connect Stripe next");
});

document.querySelector("#customForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const description = form.get("description").trim();
  const material = form.get("material");
  const quantity = form.get("quantity") || 1;
  const budget = form.get("budget") || "not provided";
  const deadline = form.get("deadline") || "flexible";

  document.querySelector("#requestTitle").textContent = "Custom request ready for review";
  document.querySelector("#requestBody").textContent = `${quantity}x ${description}. Preferred material: ${material}. Budget: ${budget}. Needed by: ${deadline}.`;
  document.querySelector("#requestChecklist").innerHTML = `
    <li>Confirm exact dimensions or upload a model file</li>
    <li>Choose color and surface finish</li>
    <li>Approve quote before production</li>
    <li>Collect shipping address at checkout</li>
  `;
  document.querySelector("#customRequests").textContent = "4";
  showToast("Custom request summary created");
});

renderProducts();
renderCart();
