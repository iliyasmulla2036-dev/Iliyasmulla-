export type Category = 
  | 'Content Creation'
  | 'Business'
  | 'Education'
  | 'Productivity'
  | 'Image Generation';

export type Tone = 
  | 'Professional'
  | 'Friendly'
  | 'Creative'
  | 'Simple';

export type OutputLength = 
  | 'Short'
  | 'Medium'
  | 'Detailed';

export interface GeneratedPrompt {
  role: string;
  context: string;
  task: string;
  constraints: string[];
  outputFormat: string;
  tips: string[];
  suggestedVariables?: string[];
  negativePrompt?: string;
  parameterFlags?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  formattedDate: string;
  userIdea: string;
  category: Category;
  tone: Tone;
  length: OutputLength;
  prompt: GeneratedPrompt;
}

export interface QuickSample {
  id: string;
  label: string;
  icon: string;
  task: string;
  category: Category;
  tone: Tone;
  length: OutputLength;
}
