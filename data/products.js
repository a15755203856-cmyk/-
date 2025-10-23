const products = [
  {
    id: 'P001',
    name: '18K玫瑰金钻石项链',
    price: 2580,
    originalPrice: 2980,
    category: '项链',
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80'
    ],
    tags: ['热销', '人气爆款'],
    description:
      '精选18K玫瑰金搭配群镶钻石，简约优雅的线条突显颈部曲线，适合日常通勤与宴会场合。',
    specs: {
      材质: '18K玫瑰金',
      主石: '圆形切割钻石 0.12ct',
      链长: '40-45cm可调节',
      包装: '珠宝定制礼盒+鉴定证书'
    }
  },
  {
    id: 'P002',
    name: 'PT950钻石对戒',
    price: 4599,
    originalPrice: 4999,
    category: '戒指',
    images: [
      'https://images.unsplash.com/photo-1521540216272-a50305cd4421'
    ],
    tags: ['限时优惠', '情侣必备'],
    description:
      '经典四爪镶嵌设计，选用PT950铂金材质，耐磨不褪色，见证爱情的经典之选。',
    specs: {
      材质: 'PT950铂金',
      主石: '八心八箭钻石 0.23ct',
      戒指尺寸: '11-18号可定制',
      服务: '免费刻字/终身保养'
    }
  },
  {
    id: 'P003',
    name: '18K金祖母绿耳环',
    price: 3280,
    originalPrice: 3680,
    category: '耳饰',
    images: [
      'https://images.unsplash.com/photo-1514890547357-a9ee288728e0'
    ],
    tags: ['新品上市'],
    description:
      '采用哥伦比亚祖母绿主石，搭配钻石点缀，彰显复古高级质感。',
    specs: {
      材质: '18K黄金',
      主石: '祖母绿 0.6ct * 2',
      副石: '圆形钻石 0.05ct * 10',
      耳针: 'S925银针+防过敏电镀'
    }
  },
  {
    id: 'P004',
    name: '南洋金珠珍珠项链',
    price: 6890,
    originalPrice: 7590,
    category: '项链',
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80'
    ],
    tags: ['镇店推荐', '轻奢'],
    description:
      '精选12-14mm南洋金珠珍珠，搭配手工编织链条，色泽温润饱满。',
    specs: {
      珍珠直径: '12-14mm',
      珍珠等级: 'AAAA',
      链长: '42cm',
      配件: '赠送珠宝养护套装'
    }
  },
  {
    id: 'P005',
    name: '彩宝星河手链',
    price: 1899,
    originalPrice: 2199,
    category: '手链',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518'
    ],
    tags: ['热卖', '自留款'],
    description:
      '彩色蓝宝石+黄玉+紫水晶组合，象征好运与守护，适合日常佩戴。',
    specs: {
      材质: '18K金镶嵌',
      宝石: '蓝宝石/黄玉/紫水晶',
      手围: '16cm 可加延长链',
      包装: '精美礼盒+贺卡'
    }
  },
  {
    id: 'P006',
    name: '星辉系列胸针',
    price: 1399,
    originalPrice: 1699,
    category: '胸针',
    images: [
      'https://images.unsplash.com/photo-1456926631375-92c8ce872def'
    ],
    tags: ['职场必备'],
    description:
      '星芒造型搭配锆石镶嵌，提升整体造型层次感，是礼赠佳品。',
    specs: {
      材质: 'S925银镀18K金',
      主石: '进口锆石',
      尺寸: '45mm * 18mm',
      包装: '礼盒+丝绒收纳袋'
    }
  }
];

function getCategories() {
  return Array.from(new Set(products.map((item) => item.category)));
}

module.exports = {
  products,
  getCategories
};
