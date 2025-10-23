const app = getApp();

Page({
  data: {
    cartItems: [],
    totalPrice: 0,
    totalQuantity: 0,
    allChecked: false
  },

  onShow() {
    this.loadCart();
  },

  loadCart() {
    const rawCart = app.globalData.cart || [];

    const cartItems = rawCart
      .map((item) => {
        const product = app.getProductById(item.productId);

        if (!product) {
          return null;
        }

        return {
          productId: item.productId,
          quantity: item.quantity,
          checked: item.checked !== false,
          product,
          subtotal: product.price * item.quantity
        };
      })
      .filter(Boolean);

    this.refreshCartState(cartItems);
  },

  refreshCartState(cartItems) {
    const totalPrice = cartItems
      .filter((item) => item.checked)
      .reduce((sum, item) => sum + item.subtotal, 0);

    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + (item.checked ? item.quantity : 0),
      0
    );

    const allChecked = cartItems.length
      ? cartItems.every((item) => item.checked)
      : false;

    this.setData({
      cartItems,
      totalPrice: totalPrice.toFixed(2),
      totalQuantity,
      allChecked
    });

    this.syncGlobalCart(cartItems);
  },

  syncGlobalCart(cartItems) {
    const payload = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      checked: item.checked
    }));

    app.updateCart(payload);
  },

  toggleItem(event) {
    const { productId } = event.currentTarget.dataset;
    const cartItems = [...this.data.cartItems];
    const target = cartItems.find((item) => item.productId === productId);

    if (!target) return;

    target.checked = !target.checked;
    this.refreshCartState(cartItems);
  },

  toggleAll() {
    const { allChecked, cartItems } = this.data;
    const updated = cartItems.map((item) => ({
      ...item,
      checked: !allChecked
    }));

    this.refreshCartState(updated);
  },

  decreaseQuantity(event) {
    const { productId } = event.currentTarget.dataset;
    const cartItems = [...this.data.cartItems];
    const target = cartItems.find((item) => item.productId === productId);

    if (!target || target.quantity <= 1) return;

    target.quantity -= 1;
    target.subtotal = target.product.price * target.quantity;
    this.refreshCartState(cartItems);
  },

  increaseQuantity(event) {
    const { productId } = event.currentTarget.dataset;
    const cartItems = [...this.data.cartItems];
    const target = cartItems.find((item) => item.productId === productId);

    if (!target) return;

    target.quantity += 1;
    target.subtotal = target.product.price * target.quantity;
    this.refreshCartState(cartItems);
  },

  removeItem(event) {
    const { productId } = event.currentTarget.dataset;
    const filtered = this.data.cartItems.filter(
      (item) => item.productId !== productId
    );

    this.refreshCartState(filtered);
    wx.showToast({ title: '已移出购物车', icon: 'none' });
  },

  goToCheckout() {
    const selectedItems = this.data.cartItems.filter((item) => item.checked);

    if (!selectedItems.length) {
      wx.showToast({ title: '请选择要结算的商品', icon: 'none' });
      return;
    }

    const checkoutItems = selectedItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
      name: item.product.name,
      image: item.product.images[0],
      subtotal: (item.product.price * item.quantity).toFixed(2)
    }));

    app.setCheckoutItems(checkoutItems);

    wx.navigateTo({ url: '/pages/checkout/checkout' });
  }
});
