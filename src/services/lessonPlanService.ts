import { LessonPlan } from '../types/lessonPlan';

const API_BASE_URL = 'https://uat.gofa.app/api';
const CLIENT_ID = 'gofa';

// Note: In a real implementation, you would need to handle authentication
// and provide the RevokableToken header
const REVOKABLE_TOKEN = '1f8ac10f23b833c5b5bce1167bda845cghij'; // Wayne's revokable token

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
      // Return mock data for development when API fails
      return this.getMockData();
    }
  }

  static async getAllLessonPlans(): Promise<LessonPlan[]> {
    try {
      const url = `${API_BASE_URL}/lesson-plans?clientId=${CLIENT_ID}`;
      const result = await this.makeRequest(url);
      
      // Handle both successful API response and mock data fallback
      if (Array.isArray(result)) {
        return result;
      } else if (result && typeof result === 'object') {
        // If single object returned, wrap in array
        return [result];
      } else {
        // Fallback to mock data
        return this.getMockData();
      }
    } catch (error) {
      console.error('Failed to fetch lesson plans:', error);
      return this.getMockData();
    }
  }

  static async getLessonPlan(lessonPlanId: string): Promise<LessonPlan> {
    try {
      const url = `${API_BASE_URL}/lesson-plans/${lessonPlanId}`;
      const result = await this.makeRequest(url);
      return result || this.getMockData()[0];
    } catch (error) {
      console.error('Failed to fetch lesson plan:', error);
      return this.getMockData()[0];
    }
  }

  static async getLevelBasedPlans(): Promise<{
    level1: LessonPlan | null;
    level2: LessonPlan | null;
    level3: LessonPlan | null;
  }> {
    try {
      const allPlans = await this.getAllLessonPlans();
      
      // Use first 3 plans from all available plans
      return {
        level1: allPlans[0] || null,
        level2: allPlans[1] || null,
        level3: allPlans[2] || null
      };
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
        planDescription: "Beginner balance and stability exercises for fall prevention",
        targetAreas: ["Balance", "Core", "Lower Body"],
        tags: ["Beginner", "Balance", "Fall Prevention"],
        planImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
        description: {
          zh_Hans: "专为初学者设计的平衡训练计划，帮助建立基础稳定性和预防跌倒。",
          en: "Beginner-friendly balance training program designed to build foundational stability and prevent falls.",
          zh_Hant: "專為初學者設計的平衡訓練計劃，幫助建立基礎穩定性和預防跌倒。"
        },
        title: {
          zh_Hans: "平衡训练 - 初级",
          en: "Balance Training - Beginner Level",
          zh_Hant: "平衡訓練 - 初級"
        },
        clientId: "gofa",
        lessons: ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5", "lesson6", "lesson7", "lesson8", "lesson9", "lesson10", "lesson11", "lesson12"],
        duration: 12,
        modifyDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) },
        createDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) }
      },
      {
        id: "mock-level-2",
        planName: "Balance Training Level 2",
        planDescription: "Intermediate balance and coordination exercises with dynamic movements",
        targetAreas: ["Balance", "Coordination", "Strength"],
        tags: ["Intermediate", "Dynamic", "Coordination"],
        planImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop",
        description: {
          zh_Hans: "中级平衡训练计划，包含动态动作和协调性训练，提升整体稳定性。",
          en: "Intermediate balance training program featuring dynamic movements and coordination exercises to enhance overall stability.",
          zh_Hant: "中級平衡訓練計劃，包含動態動作和協調性訓練，提升整體穩定性。"
        },
        title: {
          zh_Hans: "平衡训练 - 中级",
          en: "Balance Training - Intermediate Level",
          zh_Hant: "平衡訓練 - 中級"
        },
        clientId: "gofa",
        lessons: ["lesson13", "lesson14", "lesson15", "lesson16", "lesson17", "lesson18", "lesson19", "lesson20", "lesson21", "lesson22", "lesson23", "lesson24"],
        duration: 12,
        modifyDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) },
        createDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) }
      },
      {
        id: "mock-level-3",
        planName: "Balance Training Level 3",
        planDescription: "Advanced balance and functional movement exercises for optimal stability",
        targetAreas: ["Balance", "Functional Movement", "Agility"],
        tags: ["Advanced", "Functional", "Complex"],
        planImage: "https://images.unsplash.com/photo-1506629905607-c28b47e8d3b3?w=400&h=200&fit=crop",
        description: {
          zh_Hans: "高级平衡训练计划，结合功能性动作和复杂平衡挑战，达到最佳稳定性。",
          en: "Advanced balance training program combining functional movements and complex balance challenges for optimal stability.",
          zh_Hant: "高級平衡訓練計劃，結合功能性動作和複雜平衡挑戰，達到最佳穩定性。"
        },
        title: {
          zh_Hans: "平衡训练 - 高级",
          en: "Balance Training - Advanced Level",
          zh_Hant: "平衡訓練 - 高級"
        },
        clientId: "gofa",
        lessons: ["lesson25", "lesson26", "lesson27", "lesson28", "lesson29", "lesson30", "lesson31", "lesson32", "lesson33", "lesson34", "lesson35", "lesson36"],
        duration: 12,
        modifyDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) },
        createDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) }
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