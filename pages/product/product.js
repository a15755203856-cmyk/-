const app = getApp();

Page({
  data: {
    product: null,
    quantity: 1,
    specEntries: []
  },

  onLoad(options) {
    const { id } = options;

    if (id) {
      this.loadProduct(id);
    }
  },

  loadProduct(productId) {
    const product = app.getProductById(productId);

    if (!product) {
      wx.showToast({ title: '商品不存在', icon: 'none' });
      return;
    }

    const specEntries = Object.keys(product.specs || {}).map((key) => ({
      key,
      value: product.specs[key]
    }));

    this.setData({
      product,
      specEntries,
      quantity: 1
    });
  },

  decreaseQuantity() {
    const { quantity } = this.data;

    if (quantity > 1) {
      this.setData({ quantity: quantity - 1 });
    }
  },

  increaseQuantity() {
    const { quantity } = this.data;
    this.setData({ quantity: quantity + 1 });
  },

  previewImage(event) {
    const { current } = event.currentTarget.dataset;
    const { product } = this.data;

    if (!product) return;

    wx.previewImage({
      current,
      urls: product.images
    });
  },

  addToCart() {
    const { product, quantity } = this.data;

    if (!product) {
      wx.showToast({ title: '商品信息缺失', icon: 'none' });
      return;
    }

    app.addToCart(product.id, quantity);
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  },

  goToCart() {
    wx.navigateTo({ url: '/pages/cart/cart' });
  }
});
