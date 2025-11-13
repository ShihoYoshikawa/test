import React from 'react';
import { Material, AmountLevel, SelectedMaterial } from '../types';
import { MaterialCard } from './MaterialCard';

interface MaterialListAreaProps {
  materials: Material[];
  selectedMaterials: SelectedMaterial[];
  onMaterialSelect: (material: Material, amount: AmountLevel) => void;
}

export const MaterialListArea: React.FC<MaterialListAreaProps> = ({
  materials,
  selectedMaterials,
  onMaterialSelect,
}) => {
  const getSelectedAmount = (materialId: string): AmountLevel | undefined => {
    const selected = selectedMaterials.find((sm) => sm.material.id === materialId);
    return selected?.amount;
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-2 space-y-3 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
          selectedAmount={getSelectedAmount(material.id)}
          onSelect={(amount) => onMaterialSelect(material, amount)}
          disabled={false}
        />
      ))}
    </div>
  );
};
