import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AlertTriangle, Home, Shield, Lock } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const Report: React.FC = () => {
  const { reportId } = useParams();
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        
        if (!reportId) {
          setError('Invalid report ID');
          return;
        }

        // Try to get data from localStorage
        const storedData = localStorage.getItem(`assessment_${reportId}`);
        if (storedData) {
          const data = JSON.parse(storedData);
          setAssessmentData(data);
        } else {
          setError('Report not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load report.');
        console.error('Error fetching report:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [reportId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Report</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!assessmentData) {
    return null;
  }

  const chartData = {
    labels: ['Fall Risk'],
    datasets: [
      {
        data: [assessmentData.fall_probability || 0, 100 - (assessmentData.fall_probability || 0)],
        backgroundColor: ['#ef4444', '#f3f4f6'],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Fall Risk Assessment Report</h1>
              <p className="mt-2 text-gray-600">Generated on {new Date(assessmentData.created_at).toLocaleDateString()}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Risk Level</h2>
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <Doughnut data={chartData} options={chartOptions} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900">
                          {assessmentData.risk_level || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500">Risk Level</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-lg text-gray-900">{assessmentData.first_name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-lg text-gray-900 break-words">{assessmentData.email || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Relationship</dt>
                    <dd className="mt-1 text-lg text-gray-900">{assessmentData.relation}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="p-6 filter blur-sm">
                  <h2 className="text-xl font-bold mb-4">Detailed Assessment Results</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3">Physical Assessment</h3>
                      <ul className="space-y-2">
                        <li>Balance Score: 85/100</li>
                        <li>Strength Score: 78/100</li>
                        <li>Mobility Score: 82/100</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3">Risk Factors</h3>
                      <ul className="space-y-2">
                        <li>Environmental Hazards</li>
                        <li>Medication Effects</li>
                        <li>Medical Conditions</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <ul className="space-y-2">
                        <li>Daily Exercise Program</li>
                        <li>Home Safety Modifications</li>
                        <li>Regular Health Check-ups</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                      <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Get Your Full Assessment Report
                    </h3>
                    <p className="text-white/90 mb-6 max-w-lg mx-auto">
                      Join our program to receive a comprehensive assessment report, personalized fall prevention plan, and ongoing support from our healthcare professionals.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-white text-lg">✓ Detailed Risk Analysis</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-white text-lg">✓ Personalized Prevention Plan</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-white text-lg">✓ Professional Support</p>
                      </div>
                    </div>
                    <a 
                      href="mailto:business@gofa.co?subject=Fall Prevention Program Inquiry"
                      className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                      Learn More About Our Program
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;