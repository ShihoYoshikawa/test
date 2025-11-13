export type MaterialCategory = 'spirit' | 'citrus' | 'syrup' | 'bitter' | 'liqueur' | 'other';

export type FlavorTag = 'sweet' | 'sour' | 'bitter' | 'aromatic' | 'strong' | 'refreshing';

export type AmountLevel = 'less' | 'normal' | 'more';

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  icon: string; // emoji or icon identifier
  tags: FlavorTag[];
  isSpecial: boolean;
  stockCount?: number; // undefined means unlimited
  flavorProfile: {
    sweet: number;    // 0-100
    sour: number;     // 0-100
    bitter: number;   // 0-100
    strong: number;   // 0-100 (alcohol strength)
  };
}

export interface SelectedMaterial {
  material: Material;
  amount: AmountLevel;
}

export interface Glass {
  id: string;
  name: string;
  icon: string;
  capacity: string;
}

export interface Technique {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface CurrentDrink {
  selectedMaterials: SelectedMaterial[];
  glass?: Glass;
  technique?: Technique;
}
