export interface QuizState {
  // Step 1: Initial Screening
  fallenLastYear: boolean | null;
  takingPsychoactiveMeds: boolean | null;
  difficultyWithADL: boolean | null;
  fearfulOfFalling: boolean | null;
  useAssistiveDevice: boolean | null;

  // Step 2: Fall Severity
  gotInjuryFromFall: boolean | null;
  multipleLastYear: boolean | null;
  unableToGetUp: boolean | null;
  lostConsciousness: boolean | null;
  hasFrailty: boolean | null;

  // Step 3: Physical Tests
  tandemStance22: boolean | null;
  tandemStance30: boolean | null;
  tandemWalk: boolean | null;
  sitToStand12: boolean | null;
  sitToStand30: boolean | null;
  singleLimbStance: boolean | null;

  // Selected age group
  ageGroup: AgeGroup | null;
}

export type AgeGroup = 'under60' | '60to69' | '70to79' | '80plus';

export interface AgeGroupData {
  label: string;
  pretestProbability: number;
}

// Core metrics that MediaPipe Pose can track reliably
export interface PoseMetrics {
  // Angles between key landmarks in degrees
  angles: {
    hip: number;      // Hip flexion angle
    knee: number;     // Knee flexion angle
    ankle: number;    // Ankle dorsiflexion angle
    trunk: number;    // Trunk to vertical angle
  };
  
  // Vertical displacement of key points
  displacement: {
    hip: number;      // Hip vertical movement
    shoulder: number; // Shoulder vertical movement
    head: number;     // Head vertical movement
  };
  
  // Lateral movement tracking
  sway: {
    hipLateral: number;     // Side-to-side hip movement
    shoulderLateral: number; // Side-to-side shoulder movement
    headLateral: number;     // Side-to-side head movement
  };
}

// Specific metrics for each test that MediaPipe can measure
export interface TestMetrics {
  tandemStance: {
    // Track postural sway
    lateralSway: number;     // Side-to-side movement range (cm)
    anteriorSway: number;    // Forward-backward movement range (cm)
    trunkAngle: number;      // Average deviation from vertical (degrees)
  };
  
  sitToStand: {
    // Track movement dynamics
    trunkAngle: number;      // Forward lean angle during transition (degrees)
    verticalSpeed: number;   // Speed of upward movement (cm/s)
    symmetryScore: number;   // Left-right balance during movement (0-100)
  };
  
  singleLimbStance: {
    // Track stability
    swayArea: number;        // Total area of sway movement (cm²)
    trunkTilt: number;       // Average trunk tilt from vertical (degrees)
    stabilityTime: number;   // Time maintaining stable position (s)
  };
}

export interface MetricThresholds {
  low: number;
  moderate: number;
  high: number;
}

export const AGE_GROUPS: Record<AgeGroup, AgeGroupData> = {
  under60: { label: 'Under 60', pretestProbability: 0.20 },
  '60to69': { label: '60-69', pretestProbability: 0.30 },
  '70to79': { label: '70-79', pretestProbability: 0.40 },
  '80plus': { label: '80 or above', pretestProbability: 0.50 },
};