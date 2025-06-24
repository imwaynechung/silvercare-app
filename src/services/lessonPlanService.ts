import { LessonPlan } from '../types/lessonPlan';

const API_BASE_URL = 'https://www.uat.gofa.app/api';
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
      console.warn('API request failed:', error);
      // Return mock data for development when API fails
      return this.getMockData();
    }
  }

  static async getLessonDetails(lessonId: string): Promise<LessonData | null> {
    try {
      const url = `${API_BASE_URL}/lessons/${lessonId}?clientId=${CLIENT_ID}`;
      console.log(`Fetching lesson details for: ${lessonId}`);
      const result = await this.makeRequest(url);
      
      if (result) {
        console.log(`Successfully fetched lesson: ${result.title?.zh || result.title?.en || lessonId}`);
      }
      
      return result || null;
    } catch (error) {
      console.error('Failed to fetch lesson details:', error);
      return null;
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
      
      if (result) {
        // If lessonsData is not populated, fetch individual lesson details
        if (!result.lessonsData && result.lessons && result.lessons.length > 0) {
          console.log('Fetching detailed lesson data for plan:', lessonPlanId);
          const lessonsData: LessonData[] = [];
          
          // Fetch details for each lesson
          for (const lessonId of result.lessons) {
            const lessonDetail = await this.getLessonDetails(lessonId);
            if (lessonDetail) {
              lessonsData.push(lessonDetail);
            }
          }
          
          // Add the detailed lesson data to the plan
          result.lessonsData = lessonsData;
          console.log(`Fetched ${lessonsData.length} lesson details for plan ${lessonPlanId}`);
        }
        
        return result;
      }
      
      return this.getMockData()[0];
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
      
      // Filter plans by specific Chinese names
      const level1Plan = allPlans.find(plan => 
        plan.planName === '階段一：基礎坐式訓練' ||
        plan.title?.zh_Hant === '階段一：基礎坐式訓練' ||
        plan.title?.zh_Hans === '阶段一：基础坐式训练'
      );
      
      const level2Plan = allPlans.find(plan => 
        plan.planName === '階段二：坐站過渡訓練' ||
        plan.title?.zh_Hant === '階段二：坐站過渡訓練' ||
        plan.title?.zh_Hans === '阶段二：坐站过渡训练'
      );
      
      const level3Plan = allPlans.find(plan => 
        plan.planName === '階段三：站立穩定性訓練' ||
        plan.title?.zh_Hant === '階段三：站立穩定性訓練' ||
        plan.title?.zh_Hans === '阶段三：站立稳定性训练'
      );
      
      // Fetch detailed lesson data for each plan if needed
      const enhancedLevel1 = level1Plan ? await this.getLessonPlan(level1Plan.id) : null;
      const enhancedLevel2 = level2Plan ? await this.getLessonPlan(level2Plan.id) : null;
      const enhancedLevel3 = level3Plan ? await this.getLessonPlan(level3Plan.id) : null;
      
      return {
        level1: enhancedLevel1,
        level2: enhancedLevel2,
        level3: enhancedLevel3
      };
    } catch (error) {
      console.error('Failed to fetch level-based plans:', error);
      return this.getMockLevelPlans();
    }
  }

  private static getMockData(): LessonPlan[] {
    return [
      {
        id: "mock-stage-1",
        planName: "階段一：基礎坐式訓練",
        planDescription: "基礎坐式平衡和穩定性訓練，適合初學者建立基本運動習慣",
        targetAreas: ["平衡", "核心", "下肢"],
        tags: ["初級", "坐式", "基礎"],
        planImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
        description: {
          zh_Hans: "专为初学者设计的基础坐式训练计划，帮助建立基本平衡能力和运动习惯。",
          en: "Basic seated training program designed for beginners to build fundamental balance skills and exercise habits.",
          zh_Hant: "專為初學者設計的基礎坐式訓練計劃，幫助建立基本平衡能力和運動習慣。"
        },
        title: {
          zh_Hans: "阶段一：基础坐式训练",
          en: "Stage 1: Basic Seated Training",
          zh_Hant: "階段一：基礎坐式訓練"
        },
        clientId: "gofa",
        lessons: ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5", "lesson6", "lesson7", "lesson8", "lesson9", "lesson10", "lesson11", "lesson12"],
        duration: 12,
        lessonsData: [
          {
            groupByTypes: ["平衡訓練"],
            modifyDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) },
            description: {
              en: "Basic seated balance training to improve core stability and postural control",
              zh: "基礎坐式平衡訓練，提升核心穩定性和姿勢控制能力"
            },
            isIndividual: true,
            videoURLs: ["https://example.com/video1.mp4"],
            title: {
              en: "Seated Balance Foundation",
              zh: "坐式平衡基礎訓練"
            },
            groupByGoals: ["平衡改善", "核心強化"],
            duration: 15,
            groupByEquipments: ["椅子"],
            groupByIntensity: "低",
            imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
            modifiedBy: "system",
            uniqueID: "lesson1",
            algorithm: "balance_training_v1",
            groupByStyles: ["坐式訓練"],
            batch: 1,
            sync: true,
            thumbImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
            intensity: "3",
            createDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) },
            groupByMuscles: ["核心肌群", "背部肌群"],
            createdBy: "system",
            groupByTrainers: ["AI教練"],
            MET: 2.5,
            status: "active",
            subtitleUrl: {
              en: "https://example.com/subtitle_en.vtt",
              zh: "https://example.com/subtitle_zh.vtt"
            },
            videoId: "video1",
            clientId: "gofa"
          },
          {
            groupByTypes: ["核心訓練"],
            modifyDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) },
            description: {
              en: "Core strengthening exercises for better stability",
              zh: "核心強化運動，提升身體穩定性"
            },
            isIndividual: true,
            videoURLs: ["https://example.com/video2.mp4"],
            title: {
              en: "Core Strengthening",
              zh: "核心強化訓練"
            },
            groupByGoals: ["核心強化", "穩定性提升"],
            duration: 12,
            groupByEquipments: ["椅子"],
            groupByIntensity: "低",
            imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop",
            modifiedBy: "system",
            uniqueID: "lesson2",
            algorithm: "core_training_v1",
            groupByStyles: ["坐式訓練"],
            batch: 1,
            sync: true,
            thumbImageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop",
            intensity: "2",
            createDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) },
            groupByMuscles: ["核心肌群", "腹部肌群"],
            createdBy: "system",
            groupByTrainers: ["AI教練"],
            MET: 2.0,
            status: "active",
            subtitleUrl: {
              en: "https://example.com/subtitle_en.vtt",
              zh: "https://example.com/subtitle_zh.vtt"
            },
            videoId: "video2",
            clientId: "gofa"
          },
          {
            groupByTypes: ["柔韌性訓練"],
            modifyDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) },
            description: {
              en: "Gentle stretching exercises to improve flexibility",
              zh: "溫和伸展運動，改善身體柔韌性"
            },
            isIndividual: true,
            videoURLs: ["https://example.com/video3.mp4"],
            title: {
              en: "Gentle Stretching",
              zh: "溫和伸展運動"
            },
            groupByGoals: ["柔韌性改善", "放鬆"],
            duration: 10,
            groupByEquipments: ["椅子"],
            groupByIntensity: "極低",
            imageUrl: "https://images.unsplash.com/photo-1506629905607-c28b47e8d3b3?w=400&h=200&fit=crop",
            modifiedBy: "system",
            uniqueID: "lesson3",
            algorithm: "flexibility_training_v1",
            groupByStyles: ["坐式訓練"],
            batch: 1,
            sync: true,
            thumbImageUrl: "https://images.unsplash.com/photo-1506629905607-c28b47e8d3b3?w=200&h=200&fit=crop",
            intensity: "1",
            createDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) },
            groupByMuscles: ["全身肌群"],
            createdBy: "system",
            groupByTrainers: ["AI教練"],
            MET: 1.5,
            status: "active",
            subtitleUrl: {
              en: "https://example.com/subtitle_en.vtt",
              zh: "https://example.com/subtitle_zh.vtt"
            },
            videoId: "video3",
            clientId: "gofa"
          }
        ],
        modifyDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) },
        createDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) }
      },
      {
        id: "mock-stage-2",
        planName: "階段二：坐站過渡訓練",
        planDescription: "坐站轉換動作訓練，提升功能性動作能力和下肢力量",
        targetAreas: ["坐站轉換", "下肢力量", "功能性動作"],
        tags: ["中級", "坐站", "過渡"],
        planImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop",
        description: {
          zh_Hans: "中级坐站过渡训练计划，专注于提升坐站转换能力和下肢功能性力量。",
          en: "Intermediate sit-to-stand transition training program focusing on improving transfer abilities and lower limb functional strength.",
          zh_Hant: "中級坐站過渡訓練計劃，專注於提升坐站轉換能力和下肢功能性力量。"
        },
        title: {
          zh_Hans: "阶段二：坐站过渡训练",
          en: "Stage 2: Sit-to-Stand Transition Training",
          zh_Hant: "階段二：坐站過渡訓練"
        },
        clientId: "gofa",
        lessons: ["lesson13", "lesson14", "lesson15", "lesson16", "lesson17", "lesson18", "lesson19", "lesson20", "lesson21", "lesson22", "lesson23", "lesson24"],
        duration: 12,
        modifyDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) },
        createDatetime: { _nanoseconds: 0, _seconds: Math.floor(Date.now() / 1000) }
      },
      {
        id: "mock-stage-3",
        planName: "階段三：站立穩定性訓練",
        planDescription: "進階站立平衡和穩定性訓練，提升動態平衡和協調能力",
        targetAreas: ["站立平衡", "動態穩定", "協調"],
        tags: ["進階", "站立", "穩定性"],
        planImage: "https://images.unsplash.com/photo-1506629905607-c28b47e8d3b3?w=400&h=200&fit=crop",
        description: {
          zh_Hans: "高级站立稳定性训练计划，结合动态平衡和协调性训练，提升整体稳定能力。",
          en: "Advanced standing stability training program combining dynamic balance and coordination exercises to enhance overall stability.",
          zh_Hant: "高級站立穩定性訓練計劃，結合動態平衡和協調性訓練，提升整體穩定能力。"
        },
        title: {
          zh_Hans: "阶段三：站立稳定性训练",
          en: "Stage 3: Standing Stability Training",
          zh_Hant: "階段三：站立穩定性訓練"
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