import React from 'react';
import { Users, Cloud, Car, Building, Wind } from 'lucide-react';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">City Overview</h1>
        <p className="text-gray-600">Real-time monitoring and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Population"
          value="2.4M"
          icon={Users}
          trend={1.2}
          color="bg-blue-500"
        />
        <StatCard
          title="Temperature"
          value="24°C"
          icon={Cloud}
          color="bg-orange-500"
        />
        <StatCard
          title="Traffic Density"
          value="Medium"
          icon={Car}
          color="bg-green-500"
        />
        <StatCard
          title="Air Quality"
          value="Good"
          icon={Wind}
          color="bg-purple-500"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {[
              { time: '2 hours ago', message: 'Traffic congestion on Main Street' },
              { time: '4 hours ago', message: 'Air quality warning in Industrial Zone' },
              { time: '6 hours ago', message: 'Weather alert: Heavy rain expected' },
            ].map((alert, index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-sm text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">City Infrastructure Status</h2>
          <div className="space-y-4">
            {[
              { name: 'Power Grid', status: 'Operational', percentage: 98 },
              { name: 'Water Supply', status: 'Optimal', percentage: 95 },
              { name: 'Public Transport', status: 'Normal', percentage: 92 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-600">{item.status}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;