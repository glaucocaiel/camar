export interface ProjectGroup {
  id: string; // unique ID e.g., "g1", "g2"
  classCode: string; // e.g., "EMERE01MA", "EMERE01MB", etc.
  advisor: string; // orientador(a)
  groupNumber: number; // 1 to 60
  participants: string[]; // List of students
  title: string; // Project title
  evaluators: string[]; // Evaluator IDs e.g., ["5", "6"]
  x: number; // Percentage coordinate X (0 - 100)
  y: number; // Percentage coordinate Y (0 - 100)
  width: number; // Width of the table (percentage or relative size)
  height: number; // Height of the table
  rotation: number; // Rotation in degrees (0, 90, 180, 270)
  colorTheme: string; // e.g. "teal", "blue", "indigo", "violet", "emerald", "amber"
  isActive: boolean; // toggle visibility on map
}

export interface ParentComment {
  id: string;
  groupId: string;
  authorName: string;
  relationship: "Pai/Mãe" | "Familiar" | "Colega" | "Avaliador" | "Professor" | "Visitante";
  content: string;
  timestamp: string; // ISO date or localized string
}

export interface TableInteraction {
  groupId: string;
  claps: number;
  visits: number;
}
