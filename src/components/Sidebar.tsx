import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Car, Wind, Truck, AlertTriangle, Building2 } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/traffic", icon: Car, label: "Traffic" },
    { to: "/pollution", icon: Wind, label: "Pollution" },
    { to: "/garbage", icon: Truck, label: "Garbage Collection" },
    { to: "/disasters", icon: AlertTriangle, label: "Disasters" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 px-3 py-4 flex flex-col">
      <div className="flex items-center gap-2 px-2 mb-8">
        <Building2 className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-800">SmartCity Hub</span>
      </div>
      <nav className="space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;