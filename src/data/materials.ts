import { Material, Glass, Technique } from '../types';

export const materials: Material[] = [
  {
    id: 'gin',
    name: 'ジン',
    category: 'spirit',
    tags: ['香り', '強い'],
    stock: 'unlimited',
    isSpecial: false,
    icon: '🍸',
    flavorImpact: { sweet: 0, sour: 0, bitter: 1, strength: 8 }
  },
  {
    id: 'vodka',
    name: 'ウォッカ',
    category: 'spirit',
    tags: ['強い', '爽やか'],
    stock: 'unlimited',
    isSpecial: false,
    icon: '🥃',
    flavorImpact: { sweet: 0, sour: 0, bitter: 0, strength: 9 }
  },
  {
    id: 'rum',
    name: 'ラム',
    category: 'spirit',
    tags: ['甘い', '強い'],
    stock: 'unlimited',
    isSpecial: false,
    icon: '🥃',
    flavorImpact: { sweet: 3, sour: 0, bitter: 0, strength: 8 }
  },
  {
    id: 'tequila',
    name: 'テキーラ',
    category: 'spirit',
    tags: ['強い', '香り'],
    stock: 'unlimited',
    isSpecial: false,
    icon: '🍹',
    flavorImpact: { sweet: 0, sour: 1, bitter: 1, strength: 8 }
  },
  {
    id: 'lemon',
    name: 'レモンジュース',
    category: 'citrus',
    tags: ['酸味', '爽やか'],
    stock: 'unlimited',
    isSpecial: false,
    icon: '🍋',
    flavorImpact: { sweet: 0, sour: 8, bitter: 0, strength: 0 }
  },
  {
    id: 'lime',
    name: 'ライムジュース',
    category: 'citrus',
    tags: ['酸味', '爽やか'],
    stock: 'unlimited',
    isSpecial: false,
    icon: '🟢',
    flavorImpact: { sweet: 0, sour: 7, bitter: 1, strength: 0 }
  },
  {
    id: 'orange',
    name: 'オレンジジュース',
    category: 'citrus',
    tags: ['甘い', '爽やか'],
    stock: 'unlimited',
    isSpecial: false,
    icon: '🍊',
    flavorImpact: { sweet: 6, sour: 3, bitter: 0, strength: 0 }
  },
  {
    id: 'simple-syrup',
    name: 'シンプルシロップ',
    category: 'syrup',
    tags: ['甘い'],
    stock: 'unlimited',
    isSpecial: false,
    icon: '🧪',
    flavorImpact: { sweet: 9, sour: 0, bitter: 0, strength: 0 }
  },
  {
    id: 'grenadine',
    name: 'グレナデンシロップ',
    category: 'syrup',
    tags: ['甘い', '香り'],
    stock: 'unlimited',
    isSpecial: false,
    icon: '💧',
    flavorImpact: { sweet: 8, sour: 1, bitter: 0, strength: 0 }
  },
  {
    id: 'angostura',
    name: 'アンゴスチュラビターズ',
    category: 'bitter',
    tags: ['苦味', '香り'],
    stock: 'unlimited',
    isSpecial: false,
    icon: '⚗️',
    flavorImpact: { sweet: 0, sour: 0, bitter: 9, strength: 1 }
  },
  {
    id: 'blue-curacao',
    name: 'ブルーキュラソー',
    category: 'syrup',
    tags: ['甘い', '香り'],
    stock: 3,
    isSpecial: true,
    icon: '💎',
    flavorImpact: { sweet: 7, sour: 1, bitter: 0, strength: 2 }
  },
  {
    id: 'champagne',
    name: 'シャンパン',
    category: 'other',
    tags: ['爽やか', '香り'],
    stock: 2,
    isSpecial: true,
    icon: '🍾',
    flavorImpact: { sweet: 2, sour: 2, bitter: 0, strength: 5 }
  },
  {
    id: 'absinthe',
    name: 'アブサン',
    category: 'spirit',
    tags: ['強い', '香り'],
    stock: 3,
    isSpecial: true,
    icon: '✨',
    flavorImpact: { sweet: 0, sour: 0, bitter: 3, strength: 10 }
  }
];

export const glasses: Glass[] = [
  { id: 'martini', name: 'マティーニグラス', capacity: '120ml', icon: '🍸' },
  { id: 'rocks', name: 'ロックグラス', capacity: '180ml', icon: '🥃' },
  { id: 'highball', name: 'ハイボールグラス', capacity: '240ml', icon: '🥛' },
  { id: 'coupe', name: 'クープグラス', capacity: '150ml', icon: '🍷' },
  { id: 'hurricane', name: 'ハリケーングラス', capacity: '300ml', icon: '🍹' }
];

export const techniques: Technique[] = [
  { 
    id: 'shake', 
    name: 'シェイク', 
    description: '冷えやすい・泡立ち', 
    icon: '🧊' 
  },
  { 
    id: 'stir', 
    name: 'ステア', 
    description: '香り重視・クリア', 
    icon: '🥄' 
  },
  { 
    id: 'build', 
    name: 'ビルド', 
    description: 'シンプル・直接', 
    icon: '🔨' 
  },
  { 
    id: 'blend', 
    name: 'ブレンド', 
    description: '滑らか・フローズン', 
    icon: '🌪️' 
  }
];
