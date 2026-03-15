import { Restaurant, Review, Dish } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: '后街老王拉面',
    category: '快餐',
    rating: 4.8,
    avgPrice: 12,
    distance: 3,
    lat: 40,
    lng: 30,
    image: 'https://picsum.photos/seed/ramen/400/300',
    isStudentFriendly: true,
    tags: ['分量足', '加面免费'],
    description: '开了十年的老店，学生党的最爱，汤头浓郁。',
    hotness: 15,
    waitTime: '直接进',
    crowdedness: 'low'
  },
  {
    id: '2',
    name: '西门桥头麻辣烫',
    category: '快餐',
    rating: 4.5,
    avgPrice: 18,
    distance: 8,
    lat: 60,
    lng: 70,
    image: 'https://picsum.photos/seed/malatang/400/300',
    isStudentFriendly: false,
    tags: ['口味重', '菜品新鲜'],
    description: '自选菜品，味道正宗，就是排队有点久。',
    hotness: 42,
    waitTime: '15分钟以上',
    crowdedness: 'high'
  },
  {
    id: '3',
    name: '学子餐厅二楼小炒',
    category: '中餐',
    rating: 4.2,
    avgPrice: 14,
    distance: 2,
    lat: 20,
    lng: 40,
    image: 'https://picsum.photos/seed/canteen/400/300',
    isStudentFriendly: true,
    tags: ['校内', '干净卫生'],
    description: '食堂里的清流，宫保鸡丁是一绝。',
    hotness: 28,
    waitTime: '5分钟内',
    crowdedness: 'medium'
  },
  {
    id: '4',
    name: '转角遇到猫咖啡',
    category: '咖啡/甜品',
    rating: 4.9,
    avgPrice: 25,
    distance: 12,
    lat: 80,
    lng: 20,
    image: 'https://picsum.photos/seed/cafe/400/300',
    isStudentFriendly: false,
    tags: ['撸猫', '适合自习'],
    description: '环境安静，猫咪很乖，适合下午茶。',
    hotness: 8,
    waitTime: '直接进',
    crowdedness: 'low'
  },
  {
    id: '5',
    name: '东北大饺子',
    category: '中餐',
    rating: 4.6,
    avgPrice: 15,
    distance: 5,
    lat: 50,
    lng: 50,
    image: 'https://picsum.photos/seed/dumplings/400/300',
    isStudentFriendly: true,
    tags: ['手工现包', '皮薄馅大'],
    description: '纯手工水饺，酸菜猪肉馅绝了。',
    hotness: 20,
    waitTime: '5-15分钟',
    crowdedness: 'medium'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    restaurantId: '1',
    userName: '张同学',
    userSchool: '本校',
    isFromThisSchool: true,
    rating: 5,
    content: '真的很好吃，每次加面都能吃撑，老板人特别好！',
    date: '2024-03-10'
  },
  {
    id: 'r2',
    restaurantId: '1',
    userName: '李同学',
    userSchool: 'B大学',
    isFromThisSchool: false,
    rating: 4,
    content: '味道不错，就是环境稍微简陋了一点，不过价格确实便宜。',
    date: '2024-03-12'
  },
  {
    id: 'r3',
    restaurantId: '1',
    userName: '王同学',
    userSchool: '本校',
    isFromThisSchool: true,
    rating: 5,
    content: '面条劲道，汤底鲜美，学生党福音。',
    date: '2024-03-14'
  },
  {
    id: 'r4',
    restaurantId: '2',
    userName: '赵同学',
    userSchool: '本校',
    isFromThisSchool: true,
    rating: 5,
    content: '麻辣烫味道绝了，特别是那个秘制蘸料。',
    date: '2024-03-15'
  },
  {
    id: 'r5',
    restaurantId: '2',
    userName: '刘同学',
    userSchool: 'C大学',
    isFromThisSchool: false,
    rating: 3,
    content: '排队太久了，味道还可以，但没到惊艳的地步。',
    date: '2024-03-11'
  }
];

export const DISHES: Dish[] = [
  { id: 'd1', restaurantId: '1', name: '招牌牛肉面', price: 12, image: 'https://picsum.photos/seed/dish1/200/200' },
  { id: 'd2', restaurantId: '1', name: '秘制卤蛋', price: 2, image: 'https://picsum.photos/seed/dish2/200/200' },
  { id: 'd3', restaurantId: '1', name: '香菜拌牛肉', price: 15, image: 'https://picsum.photos/seed/dish3/200/200' },
  { id: 'd4', restaurantId: '1', name: '手工煎饺', price: 10, image: 'https://picsum.photos/seed/dish4/200/200' },
  { id: 'd5', restaurantId: '2', name: '麻辣拌', price: 18, image: 'https://picsum.photos/seed/dish5/200/200' },
  { id: 'd6', restaurantId: '2', name: '炸串拼盘', price: 25, image: 'https://picsum.photos/seed/dish6/200/200' },
  { id: 'd7', restaurantId: '3', name: '宫保鸡丁', price: 14, image: 'https://picsum.photos/seed/dish7/200/200' },
  { id: 'd8', restaurantId: '3', name: '鱼香肉丝', price: 15, image: 'https://picsum.photos/seed/dish8/200/200' },
  { id: 'd9', restaurantId: '3', name: '西红柿炒蛋', price: 10, image: 'https://picsum.photos/seed/dish9/200/200' }
];
