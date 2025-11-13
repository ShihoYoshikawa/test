import { Material, Glass, Technique } from './types';

export const materials: Material[] = [
  {
    id: 'vodka',
    name: 'ウォッカ',
    category: 'spirit',
    icon: '🍸',
    tags: ['strong'],
    isSpecial: false,
    flavorProfile: { sweet: 0, sour: 0, bitter: 0, strong: 90 }
  },
  {
    id: 'gin',
    name: 'ジン',
    category: 'spirit',
    icon: '🌿',
    tags: ['strong', 'aromatic'],
    isSpecial: false,
    flavorProfile: { sweet: 0, sour: 0, bitter: 10, strong: 85 }
  },
  {
    id: 'rum',
    name: 'ラム',
    category: 'spirit',
    icon: '🥃',
    tags: ['sweet', 'strong'],
    isSpecial: false,
    flavorProfile: { sweet: 30, sour: 0, bitter: 0, strong: 80 }
  },
  {
    id: 'tequila',
    name: 'テキーラ',
    category: 'spirit',
    icon: '🌵',
    tags: ['strong'],
    isSpecial: false,
    flavorProfile: { sweet: 5, sour: 0, bitter: 5, strong: 85 }
  },
  {
    id: 'lemon',
    name: 'レモンジュース',
    category: 'citrus',
    icon: '🍋',
    tags: ['sour', 'refreshing'],
    isSpecial: false,
    flavorProfile: { sweet: 5, sour: 85, bitter: 0, strong: 0 }
  },
  {
    id: 'lime',
    name: 'ライムジュース',
    category: 'citrus',
    icon: '🟢',
    tags: ['sour', 'refreshing'],
    isSpecial: false,
    flavorProfile: { sweet: 5, sour: 90, bitter: 0, strong: 0 }
  },
  {
    id: 'orange',
    name: 'オレンジジュース',
    category: 'citrus',
    icon: '🍊',
    tags: ['sweet', 'refreshing'],
    isSpecial: false,
    flavorProfile: { sweet: 60, sour: 25, bitter: 0, strong: 0 }
  },
  {
    id: 'simple-syrup',
    name: 'シンプルシロップ',
    category: 'syrup',
    icon: '🍯',
    tags: ['sweet'],
    isSpecial: false,
    flavorProfile: { sweet: 95, sour: 0, bitter: 0, strong: 0 }
  },
  {
    id: 'grenadine',
    name: 'グレナディンシロップ',
    category: 'syrup',
    icon: '🍒',
    tags: ['sweet'],
    isSpecial: false,
    flavorProfile: { sweet: 90, sour: 5, bitter: 0, strong: 0 }
  },
  {
    id: 'triple-sec',
    name: 'トリプルセック',
    category: 'liqueur',
    icon: '🍊',
    tags: ['sweet', 'aromatic'],
    isSpecial: false,
    flavorProfile: { sweet: 60, sour: 10, bitter: 0, strong: 40 }
  },
  {
    id: 'angostura',
    name: 'アンゴスチュラビターズ',
    category: 'bitter',
    icon: '🌶️',
    tags: ['bitter', 'aromatic'],
    isSpecial: false,
    flavorProfile: { sweet: 0, sour: 0, bitter: 85, strong: 45 }
  },
  {
    id: 'blue-curacao',
    name: 'ブルーキュラソー',
    category: 'liqueur',
    icon: '💙',
    tags: ['sweet', 'aromatic'],
    isSpecial: true,
    stockCount: 3,
    flavorProfile: { sweet: 65, sour: 10, bitter: 0, strong: 35 }
  },
  {
    id: 'elderflower',
    name: 'エルダーフラワー',
    category: 'liqueur',
    icon: '🌸',
    tags: ['sweet', 'aromatic'],
    isSpecial: true,
    stockCount: 2,
    flavorProfile: { sweet: 70, sour: 5, bitter: 0, strong: 20 }
  },
  {
    id: 'absinthe',
    name: 'アブサン',
    category: 'spirit',
    icon: '🟩',
    tags: ['bitter', 'aromatic', 'strong'],
    isSpecial: true,
    stockCount: 1,
    flavorProfile: { sweet: 0, sour: 0, bitter: 70, strong: 95 }
  },
  {
    id: 'mint',
    name: 'ミント',
    category: 'other',
    icon: '🌿',
    tags: ['aromatic', 'refreshing'],
    isSpecial: false,
    flavorProfile: { sweet: 5, sour: 0, bitter: 10, strong: 0 }
  },
  {
    id: 'soda',
    name: 'ソーダ',
    category: 'other',
    icon: '💧',
    tags: ['refreshing'],
    isSpecial: false,
    flavorProfile: { sweet: 0, sour: 0, bitter: 0, strong: 0 }
  }
];

export const glasses: Glass[] = [
  { id: 'rocks', name: 'ロックグラス', icon: '🥃', capacity: '180-240ml' },
  { id: 'highball', name: 'ハイボールグラス', icon: '🍺', capacity: '240-360ml' },
  { id: 'martini', name: 'マティーニグラス', icon: '🍸', capacity: '90-180ml' },
  { id: 'coupe', name: 'クープグラス', icon: '🍷', capacity: '120-180ml' },
  { id: 'collins', name: 'コリンズグラス', icon: '🥤', capacity: '300-360ml' },
];

export const techniques: Technique[] = [
  {
    id: 'shake',
    name: 'シェイク',
    icon: '🧊',
    description: '冷えやすい / 水っぽくなる'
  },
  {
    id: 'stir',
    name: 'ステア',
    icon: '🥄',
    description: 'なめらか / 香り重視'
  },
  {
    id: 'build',
    name: 'ビルド',
    icon: '📐',
    description: 'そのまま注ぐ / シンプル'
  },
  {
    id: 'muddle',
    name: 'マドル',
    icon: '🌿',
    description: '潰して香りを出す'
  },
];
