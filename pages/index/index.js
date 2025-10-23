const app = getApp();
const { getCategories } = require('../../data/products');

Page({
  data: {
    products: [],
    displayProducts: [],
    categories: [],
    activeCategory: '全部',
    searchKeyword: '',
    cartCount: 0
  },

  onLoad() {
    const products = app.globalData.products || [];
    const categories = ['全部', ...getCategories()];

    this.setData({
      products,
      displayProducts: products,
      categories
    });
  },

  onShow() {
    this.updateCartCount();
  },

  updateCartCount() {
    const cart = app.globalData.cart || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    this.setData({ cartCount: count });
  },

  onSearchInput(event) {
    const value = event.detail.value.trim();

    this.setData({ searchKeyword: value });
    this.applyFilters(value, this.data.activeCategory);
  },

  onCategoryTap(event) {
    const { category } = event.currentTarget.dataset;

    this.setData({ activeCategory: category });
    this.applyFilters(this.data.searchKeyword, category);
  },

  applyFilters(keyword, category) {
    const { products } = this.data;
    let filtered = [...products];

    if (category && category !== '全部') {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (keyword) {
      filtered = filtered.filter(
        (item) =>
          item.name.includes(keyword) ||
          (item.description && item.description.includes(keyword))
      );
    }

    this.setData({ displayProducts: filtered });
  },

  goToCart() {
    wx.navigateTo({ url: '/pages/cart/cart' });
  }
});
