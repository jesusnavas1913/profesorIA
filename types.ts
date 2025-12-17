
export enum ModuleStatus {
  LOCKED = 'locked',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface ModuleData {
  id: number;
  title: string;
  description: string;
  status: ModuleStatus;
  theory: {
    text: string; 
    exampleCode: string; // The "Anatomy" code with comments
    cleanCode: string;   // NEW: The "Pure" code without comments
    visualIcon: string; 
    // NEW EDUCATIONAL FIELDS
    historyFact?: string; // "Did you know?" context
    proTip?: string; // SEO/Accessibility tip
  };
  task: {
    instruction: string;
    initialCode: string;
    commonPitfall?: string; // Warning about common mistakes
  };
  xpReward: number;
}

export interface GeminiFeedback {
  correct: boolean;
  message: string;
  tips: string[];
}

export interface UserState {
  currentModuleId: number | null;
  xp: number;
  completedModules: number[];
  streak: number;
}
