export type MaterialCategory = 'spirit' | 'citrus' | 'syrup' | 'bitter' | 'other';
export type FlavorTag = '甘い' | '酸味' | '香り' | '苦味' | '強い' | '爽やか';
export type Quantity = '少なめ' | '普通' | '多め';

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  tags: FlavorTag[];
  stock: number | 'unlimited';
  isSpecial: boolean;
  icon: string;
  flavorImpact: {
    sweet: number;
    sour: number;
    bitter: number;
    strength: number;
  };
}

export interface SelectedMaterial {
  material: Material;
  quantity: Quantity;
}

export interface Glass {
  id: string;
  name: string;
  capacity: string;
  icon: string;
}

export interface Technique {
  id: string;
  name: string;
  description: string;
  icon: string;
}
