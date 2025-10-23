const app = getApp();

Page({
  data: {
    items: [],
    totalPrice: '0.00',
    address: {
      name: '',
      phone: '',
      detail: ''
    },
    paymentMethod: 'wechat',
    paymentOptions: [
      { key: 'wechat', label: '微信支付' },
      { key: 'alipay', label: '支付宝' },
      { key: 'card', label: '银行卡' }
    ]
  },

  onLoad() {
    const items = app.getCheckoutItems() || [];

    if (!items.length) {
      wx.showToast({ title: '请先选择商品', icon: 'none' });
      setTimeout(() => {
        wx.navigateBack();
      }, 600);
      return;
    }

    const totalPrice = items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

    this.setData({
      items,
      totalPrice
    });
  },

  handleInput(event) {
    const { field } = event.currentTarget.dataset;
    const value = event.detail.value;

    this.setData({ [`address.${field}`]: value });
  },

  choosePayment(event) {
    const { method } = event.currentTarget.dataset;
    this.setData({ paymentMethod: method });
  },

  submitOrder() {
    const { address, items, totalPrice, paymentMethod } = this.data;

    if (!address.name) {
      wx.showToast({ title: '请输入收货人姓名', icon: 'none' });
      return;
    }

    if (!/^\d{11}$/.test(address.phone)) {
      wx.showToast({ title: '请输入11位手机号', icon: 'none' });
      return;
    }

    if (!address.detail) {
      wx.showToast({ title: '请填写详细地址', icon: 'none' });
      return;
    }

    const order = app.createOrder({
      items,
      address,
      totalPrice,
      paymentMethod
    });

    app.removeCartItems(items.map((item) => item.productId));
    app.setCheckoutItems([]);

    wx.showToast({ title: '下单成功', icon: 'success' });

    setTimeout(() => {
      wx.redirectTo({ url: `/pages/order/order?id=${order.id}` });
    }, 800);
  }
});
