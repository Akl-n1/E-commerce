document.addEventListener("DOMContentLoaded", function () {
  fetch("js/item.json")
    .then((result) => result.json())
    .then((Data) => {
      // تحديد أقسام المنتجات الاول
      const slid_products = document.querySelector(".slid-products");

      // بدء حساب السعر الإجمالي
      let totalPrice = 0;

      // إضافة المنتجات إلى قسم slid_products
      Data.forEach((product, index) => {
        let productHTML = "";
        if (product.old_price) {
          const Discount = Math.floor(
            ((product.old_price - product.price) / product.old_price) * 100
          );
          productHTML = `
            <div class="product swiper-slide">
              <span class="Discount">${Discount}%</span>
              <div class="product-carts">
                <i class="fa-solid fa-cart-plus Cart" data-index="${index}" data-section="slid"></i>
                <i class="fa-regular fa-heart heart"></i>
                <i class="fa-regular fa-share share"></i>
              </div>
              <div class="top-product">
                <a href="item.html"><img src="${product.img}" alt=""></a>
                <a href="item.html"><img src="${product.img_hover}" class="img-hover" alt=""></a>
              </div>
              <a href="item.html" class="title-product">${product.name}</a>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <div class="price">
                <p class="new-price"><span>${product.price} LE</span></p>
                <p class="old-price"><span>${product.old_price} LE</span></p>
              </div>
            </div>`;
        } else {
          productHTML = `
            <div class="product swiper-slide">
              <div class="product-carts">
                <i class="fa-solid fa-cart-plus Cart" data-index="${index}" data-section="slid"></i>
                <i class="fa-regular fa-heart"></i>
                <i class="fa-regular fa-share"></i>
              </div>
              <div class="top-product">
                <a href="item.html"><img src="${product.img}" alt=""></a>
                <a href="item.html"><img src="${product.img_hover}" class="img-hover" alt=""></a>
              </div>
              <a href="item.html" class="title-product">${product.name}</a>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <div class="price">
                <p class="new-price"><span>${product.price} LE</span></p>
              </div>
            </div>`;
        }
        slid_products.innerHTML += productHTML;
      });

      // اختيار كل الأزرار من كلا القسمين
      const cartButtons = document.querySelectorAll(".Cart");
      let count_item = document.querySelectorAll(".count-item");
      const total_prices = document.querySelectorAll(".price-card-total");

      // عندما تضغط على زر العربة
      cartButtons.forEach((button) => {
        button.addEventListener("click", () => {
          let productIndex = button.getAttribute("data-index");
          let productSection = button.getAttribute("data-section");
          let product = Data[productIndex];

          // إضافة الـ class="active" لمنع العنصر من الإضافة أكثر من مرة
          if (!button.classList.contains("active")) {
            const isAddedInOtherSection = Array.from(
              document.querySelectorAll(".item-cart")
            ).some(
              (cartItem) => cartItem.getAttribute("data-index") == productIndex
            );
            if (!isAddedInOtherSection) {
              button.classList.add("active");
              let item_in_cart = document.querySelector(".item-in-cart");
              item_in_cart.innerHTML += `<div class="item-cart" data-index="${productIndex}" data-section="${productSection}">
                  <img src="${product.img}" alt="">
                  <div class="content">
                    <p>${product.name}</p>
                    <div class="delete">
                      <p class="price-card">${product.price}</p>
                      <button class="delete-item"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    </div>
                    </div>`;
              // لحساب توتل السعر
              totalPrice += product.price;
              total_prices.forEach((total_price) => {
                total_price.innerHTML = `${totalPrice} LE`;
              });
              // زيادة عدد المنتجات في السلة
              count_item.forEach((e) => {
                const itemCount = parseInt(e.textContent);
                e.textContent = itemCount + 1;
              });
            }
          }

          addDeleteEventListeners();
          // وظيفة لحذف العناصر عند الضغط على زر الحذف
          function addDeleteEventListeners() {
            const delete_items = document.querySelectorAll(".delete-item");
            delete_items.forEach((delete_item) => {
              delete_item.addEventListener("click", function () {
                const itemCart = this.closest(".item-cart");
                const itemPrice = parseFloat(
                  itemCart.querySelector(".price-card").textContent
                );
                const productIndex = itemCart.getAttribute("data-index");
                const productSection = itemCart.getAttribute("data-section");

                // طرح السعر من الإجمالي عند حذف العنصر
                totalPrice -= itemPrice;
                total_prices.forEach((total_price) => {
                  total_price.innerHTML = `${totalPrice} LE`;
                });

                // طرح عدد الاوردرات من الإجمالي
                count_item.forEach((e) => {
                  const itemCount = parseInt(e.textContent);
                  e.textContent = itemCount - 1;
                });
                // إزالة الـ class="active" من الزر المرتبط بالمنتج المحذوف
                const relatedButton = document.querySelector(
                  `.Cart[data-index="${productIndex}"][data-section="${productSection}"]`
                );
                relatedButton.classList.remove("active");
                // إزالة العنصر من السلة
                itemCart.remove();
              });
            });
          }
        });
      });
    });
});
