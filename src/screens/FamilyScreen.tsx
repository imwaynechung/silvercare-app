import React, { useState } from 'react';
import { Users, MessageCircle, Bell, Shield, Phone, Video, Plus } from 'lucide-react';

const FamilyScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'family' | 'caregivers'>('family');

  return (
    <div className="min-h-full bg-gray-50">
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Family & Care Team</h1>
          <p className="text-gray-600">Stay connected with your support network</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-lg p-1 mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab('family')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'family'
                ? 'bg-blue-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Family
          </button>
          <button
            onClick={() => setActiveTab('caregivers')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'caregivers'
                ? 'bg-blue-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Care Team
          </button>
        </div>

        {activeTab === 'family' ? (
          <>
            {/* Family Members */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Family Members</h2>
                <button className="p-2 bg-blue-100 rounded-full">
                  <Plus className="w-4 h-4 text-blue-900" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-semibold text-blue-900">D</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">David Chen</p>
                      <p className="text-sm text-gray-600">Son • Primary contact</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-green-100 rounded-full">
                      <Phone className="w-4 h-4 text-green-600" />
                    </button>
                    <button className="p-2 bg-blue-100 rounded-full">
                      <MessageCircle className="w-4 h-4 text-blue-900" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-semibold text-purple-600">S</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Sarah Chen</p>
                      <p className="text-sm text-gray-600">Daughter-in-law</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-green-100 rounded-full">
                      <Phone className="w-4 h-4 text-green-600" />
                    </button>
                    <button className="p-2 bg-blue-100 rounded-full">
                      <MessageCircle className="w-4 h-4 text-blue-900" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-semibold text-green-600">L</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Lisa Wong</p>
                      <p className="text-sm text-gray-600">Neighbor • Emergency contact</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-green-100 rounded-full">
                      <Phone className="w-4 h-4 text-green-600" />
                    </button>
                    <button className="p-2 bg-blue-100 rounded-full">
                      <MessageCircle className="w-4 h-4 text-blue-900" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Shield className="w-4 h-4 text-blue-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">David checked your progress</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Sarah sent an encouraging message</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Bell className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Weekly report sent to family</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-red-50 rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-red-900 mb-4">Emergency Contacts</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-red-100 rounded-lg">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-red-600 mr-3" />
                    <span className="font-medium text-red-900">Emergency Services</span>
                  </div>
                  <span className="text-red-600 font-bold">999</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-900">David Chen</span>
                  </div>
                  <span className="text-gray-600">+852 9123 4567</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Care Team */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Professional Care Team</h2>
                <button className="p-2 bg-blue-100 rounded-full">
                  <Plus className="w-4 h-4 text-blue-900" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Dr. Emily Wong</p>
                      <p className="text-sm text-gray-600">Primary Care Physician</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-green-100 rounded-full">
                      <Phone className="w-4 h-4 text-green-600" />
                    </button>
                    <button className="p-2 bg-blue-100 rounded-full">
                      <Video className="w-4 h-4 text-blue-900" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Mark Thompson</p>
                      <p className="text-sm text-gray-600">Physical Therapist</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-green-100 rounded-full">
                      <Phone className="w-4 h-4 text-green-600" />
                    </button>
                    <button className="p-2 bg-blue-100 rounded-full">
                      <Video className="w-4 h-4 text-blue-900" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">SilverCare Support</p>
                      <p className="text-sm text-gray-600">24/7 Support Team</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-green-100 rounded-full">
                      <Phone className="w-4 h-4 text-green-600" />
                    </button>
                    <button className="p-2 bg-blue-100 rounded-full">
                      <MessageCircle className="w-4 h-4 text-blue-900" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Physical Therapy Session</p>
                    <p className="text-sm text-gray-600">Tomorrow, 2:00 PM</p>
                    <p className="text-sm text-blue-900">with Mark Thompson</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium">
                    Join
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Monthly Check-up</p>
                    <p className="text-sm text-gray-600">Jan 25, 10:00 AM</p>
                    <p className="text-sm text-gray-600">with Dr. Emily Wong</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                    Scheduled
                  </button>
                </div>
              </div>
            </div>

            {/* Care Plan */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Care Plan</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Daily balance exercises</p>
                    <p className="text-sm text-gray-600">Prescribed by Mark Thompson</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Weekly progress monitoring</p>
                    <p className="text-sm text-gray-600">Reviewed by Dr. Emily Wong</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Family updates</p>
                    <p className="text-sm text-gray-600">Automated weekly reports</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FamilyScreen;