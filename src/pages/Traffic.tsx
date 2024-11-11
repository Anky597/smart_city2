import React, { useState, useEffect } from 'react';
import { Car } from 'lucide-react';
import TrafficMap from '../components/TrafficMap';
import TrafficIncident from '../components/TrafficIncident';

const Traffic = () => {
  const [roads, setRoads] = useState<any[]>([]);

  useEffect(() => {
    const fetchRoadData = async () => {
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];area[name="Nashik"];way(area)[highway];out geom;`;

      try {
        const response = await fetch(overpassUrl);
        const data = await response.json();

        const processedRoads = data.elements.map((element: any) => ({
          id: element.id,
          name: element.tags.name || 'Unnamed Road',
          type: element.tags.highway || 'road',
          geometry: element.geometry,
        }));

        setRoads(processedRoads);
      } catch (error) {
        console.error('Error fetching road data:', error);
      }
    };

    fetchRoadData();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Traffic Monitoring - Nashik Roads</h1>
        <p className="text-gray-600">Road data and infrastructure analysis for Nashik</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Traffic Map</h2>
          <div className="h-[600px]">
            <TrafficMap roads={roads} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Roads Information</h2>
            <Car className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-4 max-h-[540px] overflow-y-auto">
            {roads.length > 0 ? (
              roads.map((road) => (
                <TrafficIncident
                  key={road.id}
                  road={road.name}
                  type={road.type}
                  description={`OSM Road ID: ${road.id}`}
                />
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No roads data available for Nashik
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traffic;