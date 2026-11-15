/* Interacciones de la página: carga, navegación, catálogo y carrito local. */
(() => {
  const video = document.querySelector("#heroVideo");
  const loader = document.querySelector("#loader");
  const loaderBar = document.querySelector("#loaderBar");
  const nav = document.querySelector("#nav");
  const grid = document.querySelector("#productGrid");
  const cart = new Map();
  const money = amount => `Bs ${amount.toFixed(2)}`;

  // El catálogo está en products.js; esta función solo construye sus tarjetas.
  function renderProducts() {
    grid.innerHTML = PAI_PRODUCTS.map(product => `
      <article class="product-card">
        <div class="product-art"><img src="${product.image}" alt="PAI, ${product.name}, formato ${product.size}" loading="lazy"></div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-buy">
            <span class="product-price">${money(product.price)}</span>
            <button class="buy-button" type="button" data-add="${product.id}">Añadir al carrito +</button>
          </div>
        </div>
      </article>`).join("");
  }

  function renderCart() {
    const items = [...cart.entries()];
    const count = items.reduce((sum, [, quantity]) => sum + quantity, 0);
    const total = items.reduce((sum, [id, quantity]) => {
      const product = PAI_PRODUCTS.find(item => item.id === id);
      return sum + product.price * quantity;
    }, 0);
    document.querySelector("#cartCount").textContent = count;
    document.querySelector("#cartTotal").textContent = money(total);
    document.querySelector("#cartItems").innerHTML = items.length
      ? items.map(([id, quantity]) => {
          const product = PAI_PRODUCTS.find(item => item.id === id);
          return `<div class="cart-line"><span>${product.name} × ${quantity}</span><span>${money(product.price * quantity)}</span></div>`;
        }).join("")
      : '<p class="cart-note">Tu carrito está vacío. Elige un pack para comenzar.</p>';
  }

  // La pantalla de carga desaparece cuando el video puede reproducirse.
  let loadingFinished = false;
  function finishLoading() {
    if (loadingFinished) return;
    loadingFinished = true;
    loaderBar.style.width = "100%";
    window.setTimeout(() => loader.classList.add("done"), 260);
  }

  renderProducts();
  renderCart();
  video.addEventListener("progress", () => {
    if (video.buffered.length && video.duration) {
      const loaded = video.buffered.end(video.buffered.length - 1) / video.duration;
      loaderBar.style.width = `${Math.min(92, Math.round(loaded * 92))}%`;
    }
  });
  video.addEventListener("canplay", () => {
    finishLoading();
    video.play().catch(() => {});
  }, { once: true });
  video.addEventListener("ended", () => video.pause());
  video.addEventListener("error", finishLoading, { once: true });
  window.setTimeout(finishLoading, 4500);

  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 30), { passive: true });
  document.querySelector("#menu").addEventListener("click", () => {
    document.querySelector("#navLinks").classList.toggle("open");
  });
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", () => {
    document.querySelector("#navLinks").classList.remove("open");
  }));
  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-add]");
    if (!button) return;
    const id = button.dataset.add;
    cart.set(id, (cart.get(id) || 0) + 1);
    renderCart();
    document.querySelector("#cartPanel").classList.add("open");
  });
  document.querySelector("#cartToggle").addEventListener("click", () => {
    document.querySelector("#cartPanel").classList.toggle("open");
  });

  // Entrada suave de las secciones al aparecer en pantalla.
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.16 });
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
})();
