import { useState, useEffect } from 'react';
import { SelectedMaterial, Material, Glass, Technique, Quantity } from '../types';
import { materials, glasses, techniques } from '../data/materials';
import { MaterialCard } from '../components/MaterialCard';
import { CurrentDrinkDisplay } from '../components/CurrentDrinkDisplay';
import { SelectionModal } from '../components/SelectionModal';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { ArrowLeft, RotateCcw, ArrowRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Toaster } from '../components/ui/sonner';

const MAX_MATERIALS = 4;

interface DrinkMixerScreenProps {
  onBack?: () => void;
  onServeComplete?: () => void;
}

export function DrinkMixerScreen({ onBack, onServeComplete }: DrinkMixerScreenProps) {
  const [selectedMaterials, setSelectedMaterials] = useState<SelectedMaterial[]>([]);
  const [materialStocks, setMaterialStocks] = useState<Record<string, number>>(() => {
    const stocks: Record<string, number> = {};
    materials.forEach(m => {
      if (m.stock !== 'unlimited') {
        stocks[m.id] = m.stock;
      }
    });
    return stocks;
  });
  const [selectedGlass, setSelectedGlass] = useState<Glass | undefined>();
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | undefined>();
  const [isGlassModalOpen, setIsGlassModalOpen] = useState(false);
  const [isTechniqueModalOpen, setIsTechniqueModalOpen] = useState(false);
  const [shakeElement, setShakeElement] = useState<string | null>(null);
  const [pendingGlass, setPendingGlass] = useState<Glass | undefined>();
  const [pendingTechnique, setPendingTechnique] = useState<Technique | undefined>();

  // Debug: Track modal state changes
  useEffect(() => {
    console.log('[DEBUG] Glass Modal State:', isGlassModalOpen);
  }, [isGlassModalOpen]);

  useEffect(() => {
    console.log('[DEBUG] Technique Modal State:', isTechniqueModalOpen);
  }, [isTechniqueModalOpen]);

  const handleMaterialSelect = (material: Material, quantity: Quantity) => {
    const existingIndex = selectedMaterials.findIndex(sm => sm.material.id === material.id);

    if (existingIndex >= 0) {
      // Update existing material quantity
      const updated = [...selectedMaterials];
      updated[existingIndex] = { material, quantity };
      setSelectedMaterials(updated);
    } else {
      // Add new material
      if (selectedMaterials.length >= MAX_MATERIALS) {
        setShakeElement('current-display');
        toast.error('材料は最大4種類までです');
        setTimeout(() => setShakeElement(null), 300);
        return;
      }
      setSelectedMaterials([...selectedMaterials, { material, quantity }]);
    }
  };

  const handleReset = () => {
    setSelectedMaterials([]);
    setSelectedGlass(undefined);
    setSelectedTechnique(undefined);
    setPendingGlass(undefined);
    setPendingTechnique(undefined);
    toast.success('リセットしました');
  };

  const handleServe = () => {
    if (selectedMaterials.length === 0) {
      toast.error('材料を選択してください');
      return;
    }

    // Deduct stock for special materials
    const newStocks = { ...materialStocks };
    selectedMaterials.forEach(({ material }) => {
      if (material.isSpecial && materialStocks[material.id] !== undefined) {
        newStocks[material.id] = Math.max(0, newStocks[material.id] - 1);
      }
    });
    setMaterialStocks(newStocks);

    toast.success('🍹 カクテルを作成しました！', {
      description: 'お客様に提供しました'
    });

    // Navigate to rating screen after a short delay
    setTimeout(() => {
      setSelectedMaterials([]);
      setSelectedGlass(undefined);
      setSelectedTechnique(undefined);
      setIsGlassModalOpen(false);
      setIsTechniqueModalOpen(false);
      onServeComplete?.();
    }, 1500);
  };

  const getMaterialsWithStock = () => {
    return materials.map(m => ({
      ...m,
      stock: materialStocks[m.id] ?? m.stock
    }));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1637368783271-179aa5e1a4f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2l0eSUyMG5pZ2h0JTIwYm9rZWh8ZW58MXx8fHwxNzYzMDIwOTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-black/95" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Top: Current Drink Display (15-20%) */}
        <div className={`p-4 ${shakeElement === 'current-display' ? 'shake' : ''}`}>
          <CurrentDrinkDisplay
            selectedMaterials={selectedMaterials}
            selectedGlass={selectedGlass}
            selectedTechnique={selectedTechnique}
            onGlassClick={() => setIsGlassModalOpen(true)}
            onTechniqueClick={() => setIsTechniqueModalOpen(true)}
          />
        </div>

        {/* Middle: Materials List (60-70%) */}
        <div className="flex-1 overflow-hidden px-4">
          <ScrollArea className="h-full">
            <div className="space-y-3 pb-4">
              {getMaterialsWithStock().map((material) => {
                const selected = selectedMaterials.find(sm => sm.material.id === material.id);
                return (
                  <MaterialCard
                    key={material.id}
                    material={material}
                    selectedQuantity={selected?.quantity}
                    onSelect={(quantity) => handleMaterialSelect(material, quantity)}
                    disabled={material.stock === 0}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Bottom: Action Bar (Fixed) */}
        <div className="p-4 glassmorphism-strong border-t-2 border-white/10">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="glassmorphism hover:bg-white/10"
              onClick={() => onBack?.()}
            >
              <ArrowLeft className="w-5 h-5 text-gray-300" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="glassmorphism hover:bg-white/10"
              onClick={handleReset}
            >
              <RotateCcw className="w-5 h-5 text-gray-300" />
            </Button>

            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 glow-pulse flex-1"
              onClick={handleServe}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              提供する
            </Button>
          </div>
        </div>
      </div>

      {/* Glass Selection Modal */}
      <SelectionModal
        isOpen={isGlassModalOpen}
        onClose={() => setIsGlassModalOpen(false)}
        title="グラスを選択"
        onExitComplete={() => {
          console.log('[DEBUG] Glass modal exit complete, scheduling pending glass update');
          if (pendingGlass) {
            // Wait for AnimatePresence cleanup to fully complete (exit animation is 300ms)
            setTimeout(() => {
              console.log('[DEBUG] Applying pending glass after cleanup delay');
              setSelectedGlass(pendingGlass);
              toast.success(`${pendingGlass.name}を選択しました`);
              setPendingGlass(undefined);
            }, 100);
          }
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          {glasses.map((glass) => (
            <button
              key={glass.id}
              onClick={() => {
                console.log('[DEBUG] Glass button clicked, setting pending and closing modal');
                setPendingGlass(glass);
                setIsGlassModalOpen(false);
              }}
              className={`
                p-4 rounded-xl glassmorphism hover:bg-white/10 transition-all
                ${selectedGlass?.id === glass.id ? 'neon-border-blue' : ''}
              `}
            >
              <div className="text-4xl mb-2">{glass.icon}</div>
              <div className="text-sm text-white mb-1">{glass.name}</div>
              <div className="text-xs text-gray-400">{glass.capacity}</div>
            </button>
          ))}
        </div>
      </SelectionModal>

      {/* Technique Selection Modal */}
      <SelectionModal
        isOpen={isTechniqueModalOpen}
        onClose={() => setIsTechniqueModalOpen(false)}
        title="技法を選択"
        onExitComplete={() => {
          console.log('[DEBUG] Technique modal exit complete, scheduling pending technique update');
          if (pendingTechnique) {
            // Wait for AnimatePresence cleanup to fully complete (exit animation is 300ms)
            setTimeout(() => {
              console.log('[DEBUG] Applying pending technique after cleanup delay');
              setSelectedTechnique(pendingTechnique);
              toast.success(`${pendingTechnique.name}を選択しました`);
              setPendingTechnique(undefined);
            }, 100);
          }
        }}
      >
        <div className="space-y-3">
          {techniques.map((technique) => (
            <button
              key={technique.id}
              onClick={() => {
                console.log('[DEBUG] Technique button clicked, setting pending and closing modal');
                setPendingTechnique(technique);
                setIsTechniqueModalOpen(false);
              }}
              className={`
                w-full p-4 rounded-xl glassmorphism hover:bg-white/10 transition-all text-left
                ${selectedTechnique?.id === technique.id ? 'neon-border-purple' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">{technique.icon}</div>
                <div className="flex-1">
                  <div className="text-sm text-white mb-1">{technique.name}</div>
                  <div className="text-xs text-gray-400">{technique.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </SelectionModal>

      <Toaster position="top-center" />
    </div>
  );
}
