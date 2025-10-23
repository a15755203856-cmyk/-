function padNumber(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());
  const hour = padNumber(date.getHours());
  const minute = padNumber(date.getMinutes());

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

function addHours(date, hours) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function createLogisticsTimeline(baseDate = new Date()) {
  return [
    {
      status: '订单已提交，等待商家确认',
      timestamp: formatDateTime(baseDate)
    },
    {
      status: '仓库备货完成，等待发出',
      timestamp: formatDateTime(addHours(baseDate, 2))
    },
    {
      status: '商家已发货，包裹交接至物流中心',
      timestamp: formatDateTime(addHours(baseDate, 8))
    },
    {
      status: '干线运输中，预计次日抵达目的地城市',
      timestamp: formatDateTime(addHours(baseDate, 24))
    },
    {
      status: '包裹到达目的地网点，正在派送',
      timestamp: formatDateTime(addHours(baseDate, 36))
    },
    {
      status: '包裹已签收，感谢您的选购',
      timestamp: formatDateTime(addHours(baseDate, 60))
    }
  ];
}

module.exports = {
  formatDateTime,
  createLogisticsTimeline
};
