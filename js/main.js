// open & close cart
let iconcard = document.querySelector(".icon-card");
let cart = document.querySelector(".cart");
let closecart = document.querySelector(".top-cart i");
let touch_product = document.querySelectorAll(".touch");
iconcard.addEventListener("click", (el) => {
  cart.classList.toggle("open");
});
window.addEventListener("click", (e) => {
  let isTouchProduct = false;
  touch_product.forEach((product) => {
    if (product.contains(e.target)) {
      isTouchProduct = true;
    }
  });
  if (
    !cart.contains(e.target) &&
    !iconcard.contains(e.target) &&
    !isTouchProduct
  ) {
    cart.classList.remove("open");
  }
});
closecart.addEventListener("click", () => {
  cart.classList.remove("open");
});

let menu = document.querySelector(".link .menu");
let list = document.querySelector("header nav .link ul");
let closemenu = document.querySelector("header nav .link ul .close");

menu.addEventListener("click", () => {
  list.classList.toggle("active");
});
closemenu.addEventListener("click", () => {
  if (list.classList.contains("active")) {
    list.classList.remove("active");
  }
});
window.addEventListener("click", (e) => {
  if (!list.contains(e.target) && !menu.contains(e.target)) {
    list.classList.remove("active");
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    list.classList.remove("active");
  }
});
// Back to Top
let Back_Top = document.querySelector(".top_footer .back_to_top");
Back_Top.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior:"smooth",
  });
};
// التحقق من صحه البريد
if (window.location.pathname.endsWith("index.html")) {
  const emailRegex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9.-]+\.(com|net|org)$/;
  document
    .getElementById("newsletterForm")
    .addEventListener("submit", function (event) {
      const emailInput = document.getElementById("email").value;
      if (!emailRegex.test(emailInput)) {
        alert("Email is Not Valid!");
      } else {
        alert("Email is Valid!");
      }
    });
}
// resposive
if (window.location.pathname.endsWith("item.html")) {
  // change item img
  let big_item = document.querySelector(".big-item img");
  let sm_item = document.querySelectorAll(".sm-item img");

  sm_item.forEach((e) => {
    e.addEventListener("click", () => {
      big_item.src = e.src;
    });
  });
}
// عمل class="active" على allproducts
if (window.location.pathname.endsWith("Allproduct.html")) {
  let btn_filter = document.querySelector(".btn_filter");
  let boxs_fliter = document.querySelector(".boxs .fliter");
  btn_filter.addEventListener("click", (e) => {
    boxs_fliter.classList.toggle("active");
  });
  window.addEventListener("click", (e) => {
    if (!boxs_fliter.contains(e.target) && !btn_filter.contains(e.target)) {
      boxs_fliter.classList.remove("active");
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      boxs_fliter.classList.remove("active");
    }
  });
}
