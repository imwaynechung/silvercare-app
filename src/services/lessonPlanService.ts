import { LessonPlan } from '../types/lessonPlan';

const API_BASE_URL = 'https://uat.gofa.app/api';
const CLIENT_ID = 'gofa';

// Note: In a real implementation, you would need to handle authentication
// and provide the RevokableToken header
const REVOKABLE_TOKEN = 'your-revokable-token-here'; // This should come from your auth system

export class LessonPlanService {
  private static async makeRequest(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'RevokableToken': REVOKABLE_TOKEN,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      // Return mock data for development
      return this.getMockData();
    }
  }

  static async getAllLessonPlans(): Promise<LessonPlan[]> {
    const url = `${API_BASE_URL}/lesson-plans?clientId=${CLIENT_ID}`;
    return await this.makeRequest(url);
  }

  static async getLessonPlan(lessonPlanId: string): Promise<LessonPlan> {
    const url = `${API_BASE_URL}/lesson-plans/${lessonPlanId}`;
    return await this.makeRequest(url);
  }

  static async getLevelBasedPlans(): Promise<{
    level1: LessonPlan | null;
    level2: LessonPlan | null;
    level3: LessonPlan | null;
  }> {
    try {
      const allPlans = await this.getAllLessonPlans();
      
      const level1 = allPlans.find(plan => 
        plan.planName.toLowerCase().includes('level 1') ||
        plan.title.en.toLowerCase().includes('level 1') ||
        plan.title.zh_Hant.toLowerCase().includes('初級') ||
        plan.title.zh_Hant.toLowerCase().includes('第一級')
      ) || null;

      const level2 = allPlans.find(plan => 
        plan.planName.toLowerCase().includes('level 2') ||
        plan.title.en.toLowerCase().includes('level 2') ||
        plan.title.zh_Hant.toLowerCase().includes('中級') ||
        plan.title.zh_Hant.toLowerCase().includes('第二級')
      ) || null;

      const level3 = allPlans.find(plan => 
        plan.planName.toLowerCase().includes('level 3') ||
        plan.title.en.toLowerCase().includes('level 3') ||
        plan.title.zh_Hant.toLowerCase().includes('高級') ||
        plan.title.zh_Hant.toLowerCase().includes('第三級')
      ) || null;

      return { level1, level2, level3 };
    } catch (error) {
      console.error('Failed to fetch level-based plans:', error);
      return this.getMockLevelPlans();
    }
  }

  private static getMockData(): LessonPlan[] {
    return [
      {
        id: "mock-level-1",
        planName: "Balance Training Level 1",
        planDescription: "Beginner balance and stability exercises",
        targetAreas: ["Balance", "Core"],
        tags: ["Beginner"],
        planImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
        description: {
          zh_Hans: "初级平衡训练计划",
          en: "Beginner balance training program",
          zh_Hant: "初級平衡訓練計劃"
        },
        title: {
          zh_Hans: "平衡训练 - 第一级",
          en: "Balance Training - Level 1",
          zh_Hant: "平衡訓練 - 第一級"
        },
        clientId: "gofa",
        lessons: ["lesson1", "lesson2", "lesson3"],
        duration: 12,
        modifyDatetime: { _nanoseconds: 0, _seconds: Date.now() / 1000 },
        createDatetime: { _nanoseconds: 0, _seconds: Date.now() / 1000 }
      },
      {
        id: "mock-level-2",
        planName: "Balance Training Level 2",
        planDescription: "Intermediate balance and coordination exercises",
        targetAreas: ["Balance", "Coordination"],
        tags: ["Intermediate"],
        planImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop",
        description: {
          zh_Hans: "中级平衡训练计划",
          en: "Intermediate balance training program",
          zh_Hant: "中級平衡訓練計劃"
        },
        title: {
          zh_Hans: "平衡训练 - 第二级",
          en: "Balance Training - Level 2",
          zh_Hant: "平衡訓練 - 第二級"
        },
        clientId: "gofa",
        lessons: ["lesson4", "lesson5", "lesson6"],
        duration: 12,
        modifyDatetime: { _nanoseconds: 0, _seconds: Date.now() / 1000 },
        createDatetime: { _nanoseconds: 0, _seconds: Date.now() / 1000 }
      },
      {
        id: "mock-level-3",
        planName: "Balance Training Level 3",
        planDescription: "Advanced balance and functional movement exercises",
        targetAreas: ["Balance", "Functional Movement"],
        tags: ["Advanced"],
        planImage: "https://images.unsplash.com/photo-1506629905607-c28b47e8d3b3?w=400&h=200&fit=crop",
        description: {
          zh_Hans: "高级平衡训练计划",
          en: "Advanced balance training program",
          zh_Hant: "高級平衡訓練計劃"
        },
        title: {
          zh_Hans: "平衡训练 - 第三级",
          en: "Balance Training - Level 3",
          zh_Hant: "平衡訓練 - 第三級"
        },
        clientId: "gofa",
        lessons: ["lesson7", "lesson8", "lesson9"],
        duration: 12,
        modifyDatetime: { _nanoseconds: 0, _seconds: Date.now() / 1000 },
        createDatetime: { _nanoseconds: 0, _seconds: Date.now() / 1000 }
      }
    ];
  }

  private static getMockLevelPlans() {
    const mockData = this.getMockData();
    return {
      level1: mockData[0],
      level2: mockData[1],
      level3: mockData[2]
    };
  }
}