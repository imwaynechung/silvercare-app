export interface LessonPlan {
  id: string;
  planName: string;
  planDescription: string;
  targetAreas: string[];
  tags: string[];
  planImage: string;
  description: {
    zh_Hans: string;
    en: string;
    zh_Hant: string;
  };
  title: {
    zh_Hans: string;
    en: string;
    zh_Hant: string;
  };
  clientId: string;
  lessons: string[];
  duration: number;
  modifyDatetime: {
    _nanoseconds: number;
    _seconds: number;
  };
  createDatetime: {
    _nanoseconds: number;
    _seconds: number;
  };
  lessonsData?: LessonData[];
}

export interface LessonData {
  groupByTypes: string[];
  modifyDatetime: {
    _nanoseconds: number;
    _seconds: number;
  };
  description: {
    en: string;
    zh: string;
  };
  isIndividual: boolean;
  videoURLs: string[];
  title: {
    en: string;
    zh: string;
  };
  groupByGoals: string[];
  duration: number;
  groupByEquipments: string[];
  groupByIntensity: string;
  imageUrl: string;
  modifiedBy: string;
  uniqueID: string;
  algorithm: string;
  groupByStyles: string[];
  batch: number;
  sync: boolean;
  thumbImageUrl: string;
  intensity: string | number;
  createDatetime: {
    _nanoseconds: number;
    _seconds: number;
  };
  groupByMuscles: string[];
  createdBy: string;
  groupByTrainers: string[];
  MET: number;
  status: string;
  subtitleUrl: {
    en: string;
    zh: string;
  };
  videoId: string;
  clientId: string;
  id?: string;
}