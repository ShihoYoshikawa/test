import { SpecialIngredient } from '../types';

export const specialIngredients: SpecialIngredient[] = [
  {
    id: 'starfruit-syrup',
    name: 'スターフルーツ・シロップ',
    description: 'エキゾチックな甘みと爽やかな香りが特徴',
    icon: '⭐',
    effect: 'フルーティ系でGood率アップ'
  },
  {
    id: 'midnight-bitters',
    name: 'ミッドナイト・ビターズ',
    description: '深夜にしか抽出できない神秘的な苦味',
    icon: '🌙',
    effect: '苦味系の安定性アップ'
  },
  {
    id: 'crystal-ice',
    name: 'クリスタル・アイス',
    description: '完璧に透明な氷の結晶',
    icon: '💎',
    effect: 'Presentationが上がる'
  }
];
