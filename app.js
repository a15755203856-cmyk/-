const { products } = require('./data/products');
const { formatDateTime, createLogisticsTimeline } = require('./utils/time');

App({
  globalData: {
    products,
    cart: [],
    orders: [],
    checkoutItems: []
  },

  onLaunch() {
    try {
      const cart = wx.getStorageSync('cart') || [];
      const orders = wx.getStorageSync('orders') || [];
      this.globalData.cart = cart;
      this.globalData.orders = orders;
    } catch (error) {
      console.warn('读取本地缓存失败:', error);
    }
  },

  getProductById(productId) {
    return this.globalData.products.find((item) => item.id === productId);
  },

  addToCart(productId, quantity = 1) {
    const cart = [...this.globalData.cart];
    const existing = cart.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId, quantity, checked: true });
    }

    this.updateCart(cart);
  },

  updateCart(cart) {
    this.globalData.cart = cart;

    try {
      wx.setStorageSync('cart', cart);
    } catch (error) {
      console.warn('写入购物车缓存失败:', error);
    }
  },

  removeCartItems(productIds = []) {
    if (!Array.isArray(productIds) || !productIds.length) {
      return;
    }

    const cart = this.globalData.cart.filter(
      (item) => !productIds.includes(item.productId)
    );

    this.updateCart(cart);
  },

  setCheckoutItems(items = []) {
    this.globalData.checkoutItems = items;
  },

  getCheckoutItems() {
    return this.globalData.checkoutItems || [];
  },

  createOrder({ items, address, totalPrice, paymentMethod }) {
    const now = new Date();
    const order = {
      id: `ORD${now.getTime()}`,
      status: '待发货',
      createdAt: formatDateTime(now),
      items,
      address,
      totalPrice,
      paymentMethod,
      logistics: createLogisticsTimeline(now)
    };

    const orders = [order, ...this.globalData.orders];
    this.globalData.orders = orders;

    try {
      wx.setStorageSync('orders', orders);
    } catch (error) {
      console.warn('写入订单缓存失败:', error);
    }

    return order;
  },

  getOrderById(orderId) {
    return this.globalData.orders.find((order) => order.id === orderId);
  }
});
