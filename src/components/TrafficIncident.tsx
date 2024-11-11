import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface TrafficIncidentProps {
  road: string;
  type: string;
  description?: string;
}

const TrafficIncident: React.FC<TrafficIncidentProps> = ({ road, type, description }) => {
  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
      <AlertTriangle className="h-5 w-5 text-yellow-500" />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{road}</p>
        <p className="text-sm text-gray-500">Type: {type}</p>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default TrafficIncident;