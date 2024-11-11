import React from 'react';
import { AlertTriangle, Cloud, Wind, Thermometer } from 'lucide-react';

const Disasters = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Natural Disaster Warnings</h1>
        <p className="text-gray-600">Early warning system and emergency alerts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Flood Risk', level: 'Moderate', icon: Cloud },
          { title: 'Storm Alert', level: 'Low', icon: Wind },
          { title: 'Heat Warning', level: 'High', icon: Thermometer },
          { title: 'Air Quality', level: 'Good', icon: Wind },
        ].map((warning, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <warning.icon className="h-6 w-6 text-blue-500" />
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                warning.level === 'High' ? 'bg-red-100 text-red-800' :
                warning.level === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {warning.level}
              </span>
            </div>
            <h3 className="text-lg font-semibold">{warning.title}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Emergency Map</h2>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Emergency Response Map Widget Here</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Active Alerts</h2>
            <div className="space-y-4">
              {[
                { type: 'Flash Flood', area: 'Riverside District', severity: 'High' },
                { type: 'Thunderstorm', area: 'City Center', severity: 'Moderate' },
                { type: 'Heat Wave', area: 'All Districts', severity: 'High' },
              ].map((alert, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.severity === 'High' ? 'text-red-500' : 'text-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.type}</p>
                    <p className="text-sm text-gray-500">{alert.area}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    alert.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Emergency Resources</h2>
            <div className="space-y-4">
              {[
                { name: 'Emergency Response Teams', status: 'Available', count: 5 },
                { name: 'Evacuation Centers', status: 'Ready', count: 3 },
                { name: 'Medical Units', status: 'Deployed', count: 8 },
              ].map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{resource.name}</p>
                    <p className="text-sm text-gray-500">Units: {resource.count}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                    {resource.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disasters;