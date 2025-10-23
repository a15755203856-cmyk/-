const app = getApp();

function normalizeOrder(order) {
  if (!order) return null;

  return {
    ...order,
    logistics: [...(order.logistics || [])].sort((a, b) =>
      a.timestamp < b.timestamp ? 1 : -1
    )
  };
}

Page({
  data: {
    order: null
  },

  onLoad(options) {
    const { id } = options;
    this.loadOrder(id);
  },

  onShow() {
    const { order } = this.data;

    if (order) {
      const latest = normalizeOrder(app.getOrderById(order.id));
      if (latest) {
        this.setData({ order: latest });
      }
    }
  },

  loadOrder(orderId) {
    let order = null;

    if (orderId) {
      order = app.getOrderById(orderId);
    }

    if (!order) {
      const [latest] = app.globalData.orders || [];
      order = latest;
    }

    if (!order) {
      wx.showToast({ title: '暂无订单信息', icon: 'none' });
      setTimeout(() => {
        wx.navigateBack();
      }, 600);
      return;
    }

    this.setData({ order: normalizeOrder(order) });
  },

  copyOrderId() {
    const { order } = this.data;

    if (!order) return;

    wx.setClipboardData({
      data: order.id,
      success: () => {
        wx.showToast({ title: '订单编号已复制', icon: 'none' });
      }
    });
  }
});
