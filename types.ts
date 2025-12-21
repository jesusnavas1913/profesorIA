export enum ModuleStatus {
  LOCKED = 'locked',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface LessonStep {
  id: string;
  tag: string;
  title: string;
  explanation: string;
  instruction: string;
  exampleSnippet: string; // Demostración visual para el alumno
  xpReward: number;
}

export interface ModuleData {
  id: number;
  title: string;
  description: string;
  status: ModuleStatus;
  steps: LessonStep[];
  theory: {
    text: string; 
    exampleCode: string;
    cleanCode: string;
    visualIcon: string; 
    historyFact?: string;
    proTip?: string;
  };
  xpReward: number;
}

export interface GeminiFeedback {
  correct: boolean;
  message: string;
  tips: string[];
}

export interface UserState {
  username: string | null;
  currentModuleId: number | null;
  currentStepIndex: number;
  xp: number;
  completedModules: number[];
  streak: number;
}