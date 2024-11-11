import React, { useState } from "react";
import { Truck, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GarbageCollection = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<{ area: string; slot: string } | null>(null);

  const availableSlots = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM"];
  const areas = ["North Zone", "South Zone", "East Zone", "West Zone", "Central Park", "Market Square", "Harbor View"];

  const handleSlotBooking = () => {
    if (selectedSlot && selectedArea) {
      // Store booking details
      setBookingDetails({ area: selectedArea, slot: selectedSlot });
      
      // Reset selections after booking
      setSelectedSlot(null);
      setSelectedArea(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Waste Management</h1>
        <p className="text-gray-600">Track garbage collection vehicles and book pickup slots</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Vehicle Locations</h2>
          <div className="aspect-video bg-gray-100 rounded-lg">
            <MapContainer center={[19.9975, 73.7898]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[19.9975, 73.7898]}>
                <Popup>Garbage Truck 1</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Book a Pickup Slot</h2>
            <div className="space-y-4">
              {/* Area Selector */}
              <label className="block text-sm font-medium text-gray-700">Select Area</label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedArea || ""}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="" disabled>Select an area</option>
                {areas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>

              {/* Time Slot Selector */}
              <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedSlot || ""}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="" disabled>Select a slot</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>

              {/* Book Slot Button */}
              <button
                onClick={handleSlotBooking}
                className="mt-2 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Book Slot
              </button>

              {/* Display Booking Confirmation */}
              {bookingDetails && (
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-green-800 font-medium">Booking Confirmed!</p>
                  <p className="text-sm text-green-700">Area: {bookingDetails.area}</p>
                  <p className="text-sm text-green-700">Time Slot: {bookingDetails.slot}</p>
                </div>
              )}
            </div>
          </div>

          {/* Existing Active Vehicles Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Active Vehicles</h2>
            <div className="space-y-4">
              {[
                { id: 'GC-001', area: 'North Zone', status: 'On Route' },
                { id: 'GC-002', area: 'South Zone', status: 'Loading' },
                { id: 'GC-003', area: 'East Zone', status: 'Returning' },
              ].map((vehicle, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{vehicle.id}</p>
                    <p className="text-sm text-gray-500">{vehicle.area}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    {vehicle.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Existing Collection Points Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Collection Points</h2>
            <div className="space-y-4">
              {[
                { location: 'Central Park', time: '08:00 AM', status: 'Completed' },
                { location: 'Market Square', time: '09:30 AM', status: 'Pending' },
                { location: 'Harbor View', time: '11:00 AM', status: 'Scheduled' },
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{point.location}</p>
                    <p className="text-sm text-gray-500">{point.time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    point.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    point.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {point.status}
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

export default GarbageCollection;