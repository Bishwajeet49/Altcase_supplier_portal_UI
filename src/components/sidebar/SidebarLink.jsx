import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ item, isActive }) => {
  return (
    <Link
      to={item.path}
      className={`flex items-center px-3 py-2.5 rounded-lg text-sm group ${
        isActive 
          ? 'bg-primary text-white' 
          : 'text-theme-textSecondary hover:bg-theme-bgSecondary hover:text-primary'
      }`}
    >
      <div className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${isActive ? 'text-white' : 'text-theme-textSecondary group-hover:text-primary'}`}>
        <item.icon className="w-5 h-5" />
      </div>
      <span className={`font-medium ${!isActive && 'group-hover:text-primary'}`}>{item.label}</span>
    </Link>
  );
};

export default SidebarLink; 