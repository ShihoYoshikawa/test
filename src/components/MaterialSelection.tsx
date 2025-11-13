import React, { useState, useRef } from 'react';
import { Material, AmountLevel, SelectedMaterial, Glass, Technique } from '../types';
import { CurrentDrinkArea } from './CurrentDrinkArea';
import { MaterialListArea } from './MaterialListArea';
import { ActionArea } from './ActionArea';
import { Modal, SelectableItem } from './Modal';

interface MaterialSelectionProps {
  materials: Material[];
  glasses: Glass[];
  techniques: Technique[];
}

const MAX_MATERIALS = 4;

export const MaterialSelection: React.FC<MaterialSelectionProps> = ({
  materials,
  glasses,
  techniques,
}) => {
  const [selectedMaterials, setSelectedMaterials] = useState<SelectedMaterial[]>([]);
  const [selectedGlass, setSelectedGlass] = useState<Glass | undefined>();
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | undefined>();
  const [isGlassModalOpen, setIsGlassModalOpen] = useState(false);
  const [isTechniqueModalOpen, setIsTechniqueModalOpen] = useState(false);
  const [shakeWarning, setShakeWarning] = useState(false);
  const materialsAreaRef = useRef<HTMLDivElement>(null);

  const handleMaterialSelect = (material: Material, amount: AmountLevel) => {
    const existingIndex = selectedMaterials.findIndex((sm) => sm.material.id === material.id);

    if (existingIndex !== -1) {
      // Material already selected - update amount
      const updated = [...selectedMaterials];
      updated[existingIndex] = { material, amount };
      setSelectedMaterials(updated);
    } else {
      // New material selection
      if (selectedMaterials.length >= MAX_MATERIALS) {
        // Show shake warning
        setShakeWarning(true);
        setTimeout(() => setShakeWarning(false), 300);
        return;
      }

      setSelectedMaterials([...selectedMaterials, { material, amount }]);
    }
  };

  const handleReset = () => {
    setSelectedMaterials([]);
    setSelectedGlass(undefined);
    setSelectedTechnique(undefined);
  };

  const handleBack = () => {
    console.log('Back button clicked');
  };

  const handleNext = () => {
    console.log('Proceeding with:', {
      materials: selectedMaterials,
      glass: selectedGlass,
      technique: selectedTechnique,
    });
  };

  const canProceed = selectedMaterials.length > 0;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 noise-texture">
      {/* Current Drink Area - Top 20% */}
      <div className="h-[20%] min-h-[180px] p-4">
        <CurrentDrinkArea
          selectedMaterials={selectedMaterials}
          glass={selectedGlass}
          technique={selectedTechnique}
        />
      </div>

      {/* Material List Area - Middle 65% */}
      <div
        ref={materialsAreaRef}
        className={`flex-1 overflow-hidden ${shakeWarning ? 'shake' : ''}`}
      >
        <MaterialListArea
          materials={materials}
          selectedMaterials={selectedMaterials}
          onMaterialSelect={handleMaterialSelect}
        />
      </div>

      {/* Action Area - Bottom 15% */}
      <div className="h-auto">
        <ActionArea
          onBack={handleBack}
          onReset={handleReset}
          onGlassSelect={() => setIsGlassModalOpen(true)}
          onTechniqueSelect={() => setIsTechniqueModalOpen(true)}
          onNext={handleNext}
          canProceed={canProceed}
        />
      </div>

      {/* Glass Selection Modal */}
      <Modal
        isOpen={isGlassModalOpen}
        onClose={() => setIsGlassModalOpen(false)}
        title="グラスを選択"
      >
        <div className="space-y-2">
          {glasses.map((glass) => (
            <SelectableItem
              key={glass.id}
              icon={glass.icon}
              title={glass.name}
              subtitle={glass.capacity}
              selected={selectedGlass?.id === glass.id}
              onClick={() => {
                setSelectedGlass(glass);
                setIsGlassModalOpen(false);
              }}
            />
          ))}
        </div>
      </Modal>

      {/* Technique Selection Modal */}
      <Modal
        isOpen={isTechniqueModalOpen}
        onClose={() => setIsTechniqueModalOpen(false)}
        title="技法を選択"
      >
        <div className="space-y-2">
          {techniques.map((technique) => (
            <SelectableItem
              key={technique.id}
              icon={technique.icon}
              title={technique.name}
              subtitle={technique.description}
              selected={selectedTechnique?.id === technique.id}
              onClick={() => {
                setSelectedTechnique(technique);
                setIsTechniqueModalOpen(false);
              }}
            />
          ))}
        </div>
      </Modal>

      {/* Max Materials Warning */}
      {shakeWarning && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="glassmorphism-strong rounded-2xl p-6 text-center border-2 border-red-500/60">
            <div className="text-4xl mb-2">⚠️</div>
            <div className="text-white font-bold">最大4種類まで</div>
            <div className="text-gray-300 text-sm">材料は4つまでしか選択できません</div>
          </div>
        </div>
      )}
    </div>
  );
};
