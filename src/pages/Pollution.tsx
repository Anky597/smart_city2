import React, { useState, useEffect } from "react";
import { Wind, Droplet, Sun, AlertTriangle } from "lucide-react";

const Pollution = () => {
  const [pollutionData, setPollutionData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const apiKey = "d7ead364-237f-4ad7-b285-cb039e0f011c"; // Replace with your actual API key
  const city = "Los Angeles"; // Specify the city you want data for
  const country = "USA"; // Specify the country of the city

  useEffect(() => {
    const fetchPollutionData = async () => {
      try {
        const response = await fetch(
          `https://api.airvisual.com/v2/city?city=${city}&state=California&country=${country}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setPollutionData(data.data.current.pollution);
        } else {
          console.error("Error fetching data:", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pollution data:", error);
        setLoading(false);
      }
    };

    fetchPollutionData();
  }, [apiKey, city, country]);

  // Load the IQAir widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.iqair.com/script/widget_v3.0.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const pollutionMetrics = [
    { title: 'AQI (US)', key: 'aqius', unit: '', icon: Wind },
    { title: 'PM2.5', key: 'pm2_5', unit: 'µg/m³', icon: Wind },
    { title: 'PM10', key: 'pm10', unit: 'µg/m³', icon: Wind },
  ];

  const getStatus = (value: number) => {
    if (value <= 50) return "Good";
    if (value <= 100) return "Moderate";
    if (value <= 150) return "Unhealthy for Sensitive Groups";
    if (value <= 200) return "Unhealthy";
    if (value <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Air Quality Monitor</h1>
        <p className="text-gray-600">Real-time pollution levels across the city</p>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : pollutionData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pollutionMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className="h-6 w-6 text-blue-500" />
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  getStatus(pollutionData[metric.key]) === 'Good' ? 'bg-green-100 text-green-800' :
                  getStatus(pollutionData[metric.key]) === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {getStatus(pollutionData[metric.key])}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{metric.title}</h3>
              <p className="text-2xl font-bold mt-2">
                {pollutionData[metric.key] ?? 'N/A'} {metric.unit}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available for this location.</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Pollution Heat Map</h2>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Pollution Heat Map Widget Here</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {[
              { area: 'Industrial Zone', level: 'High', pollutant: 'PM2.5' },
              { area: 'City Center', level: 'Moderate', pollutant: 'NO2' },
              { area: 'Residential Area', level: 'Low', pollutant: 'O3' },
            ].map((alert, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <AlertTriangle className={`h-5 w-5 ${
                  alert.level === 'High' ? 'text-red-500' :
                  alert.level === 'Moderate' ? 'text-yellow-500' : 'text-green-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.area}</p>
                  <p className="text-sm text-gray-500">{alert.pollutant} Alert</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  alert.level === 'High' ? 'bg-red-100 text-red-800' :
                  alert.level === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {alert.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IQAir Widget */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">IQAir Widget</h2>
        <div name="airvisual_widget" key="6731af55fc907c5aca71acf5"></div>
      </div>
    </div>
  );
};

export default Pollution;