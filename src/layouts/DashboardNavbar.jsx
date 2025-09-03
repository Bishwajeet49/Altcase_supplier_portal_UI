import React, { useState, useRef, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { FiBell, FiSearch, FiX } from 'react-icons/fi'
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import apiClient from '../api/apiClient'

export default function DashboardNavbar({ showMiniSidebar, setShowMiniSidebar }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    // Track if screen is xl and above to determine sidebar open state logic
    const [isXlUp, setIsXlUp] = useState(() => {
        if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
            return window.matchMedia('(min-width: 1280px)').matches;
        }
        return false;
    });

    // Load user data from localStorage
    useEffect(() => {
        const user = localStorage.getItem('user_data');
        if (user) {
            try {
                setUserData(JSON.parse(user));
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    // Listen for breakpoint changes to keep icon direction correct
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
            const mq = window.matchMedia('(min-width: 1280px)');
            const handler = (e) => setIsXlUp(e.matches);
            if (typeof mq.addEventListener === 'function') {
                mq.addEventListener('change', handler);
            } else if (typeof mq.addListener === 'function') {
                mq.addListener(handler);
            }
            return () => {
                if (typeof mq.removeEventListener === 'function') {
                    mq.removeEventListener('change', handler);
                } else if (typeof mq.removeListener === 'function') {
                    mq.removeListener(handler);
                }
            };
        }
    }, []);

    // Close dropdown and search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Clear all authentication data using apiClient
        apiClient.clearAuth();
        
        // Close dropdown
        setIsDropdownOpen(false);
        
        // Redirect to home page
        navigate('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            // Focus the search input when opening
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        } else {
            // Clear search when closing
            setSearchQuery('');
        }
        // Close dropdown if open
        setIsDropdownOpen(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Handle search logic here
            console.log('Searching for:', searchQuery);
            // You can navigate to search results page or filter current page
            // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleSearchToggle();
        }
    };

    // Get display name and role
    const displayName = userData?.username || 'User';
    const email = userData?.email || '';
    const role = userData?.roleDetails?.[0]?.display_name || 'Event Organizer';
    // Determine if the sidebar is currently open for the active breakpoint
    const isSidebarOpen = isXlUp ? !showMiniSidebar : showMiniSidebar;

    return (
        <div className='h-full w-full bg-theme-bgPrimary py-1'>
            <div className='flex h-full w-full items-center gap-1'>

                <div className='w-12 md:w-20 h-full flex items-center justify-center  z-[46]  '>
                    {/* this button will be used to toggle the sidebar */}
                    <button
                        className='group text-xl p-1 rounded-full hover:bg-theme-bgSecondary transition-colors duration-200 active:bg-theme-bgTertiary bg-theme-bgSecondary border border-theme-borderSecondary'
                        onClick={() => setShowMiniSidebar(!showMiniSidebar)}
                    >
                        {isSidebarOpen ?
                            <MdOutlineKeyboardDoubleArrowLeft className='text-theme-textSecondary group-hover:text-theme-textPrimary transition-colors h-5 w-5' /> :
                            <MdOutlineKeyboardDoubleArrowRight className='text-theme-textSecondary group-hover:text-theme-textPrimary transition-colors h-5 w-5' />
                        }
                    </button>
                </div>

                <div className="flex-1 h-full flex justify-between pr-4">
                    {/* logo */}
                    <div className='h-full w-auto  flex items-center justify-center z-[46] '>
                        <img src={"/svg/altCaseNavLogo.svg"} alt="logo" className='h-[28px] w-auto' />
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center relative" ref={searchRef}>
                        {/* Search Bar - Expanded State */}
                        {isSearchOpen && (
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center bg-theme-bgSecondary rounded-lg border border-theme-borderSecondary shadow-lg z-50 transition-all duration-300 ease-out animate-in slide-in-from-right-4">
                                <form onSubmit={handleSearchSubmit} className="flex items-center">
                                    <div className="flex items-center px-3 py-2">
                                        <FiSearch size={18} className="text-theme-textSecondary mr-2" />
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={handleSearchKeyDown}
                                            className="bg-transparent text-theme-textPrimary placeholder-theme-textSecondary focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none border-0 outline-0 w-64 sm:w-80 text-sm"
                                            style={{ outline: 'none', boxShadow: 'none' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSearchToggle}
                                            className="ml-2 p-1 text-theme-textSecondary hover:text-theme-textPrimary transition-colors"
                                        >
                                            <FiX size={16} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Default Icons - Hidden when search is open */}
                        <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            {/* Search Icon */}
                            <button 
                                onClick={handleSearchToggle}
                                className="xxsm:hidden relative p-2 text-theme-textSecondary hover:text-primary focus:outline-none transition-colors"
                            >
                                <FiSearch size={20} />
                            </button>

                            {/* Bell Icon */}
                            <button 
                                onClick={() => navigate('/notifications')}
                                className="xxsm:hidden relative p-2 text-theme-textSecondary hover:text-primary focus:outline-none transition-colors ml-1"
                            >
                                <FiBell size={20} />
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
                            </button>
                            
                            {/* User Profile Dropdown */}
                            <div className="ml-4 relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center focus:outline-none"
                                >
                                    <div className="text-right mr-3 hidden sm:block">
                                        <p className="text-sm font-medium text-theme-textPrimary">{displayName}</p>
                                        <p className="text-xs text-theme-textSecondary">{'supplier'}</p>
                                    </div>
                                    <FaUserCircle size={32} className="text-primary hover:text-secondary-600 transition-colors" />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-theme-bgSecondary rounded-md shadow-lg border border-theme-borderSecondary py-1 z-50">
                                        <div className="px-4 py-2 border-b border-theme-borderSecondary">
                                            <p className="text-sm font-medium text-theme-textPrimary">{displayName}</p>
                                            <p className="text-xs text-theme-textSecondary">{email}</p>
                                        </div>
                                        
                                        <button 
                                            onClick={() => {
                                                navigate('/profile');
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-theme-textSecondary hover:bg-theme-bgTertiary flex items-center"
                                        >
                                            <FiUser className="mr-3" size={16} />
                                            Profile
                                        </button>
                                        
                                        <button className="w-full text-left px-4 py-2 text-sm text-theme-textSecondary hover:bg-theme-bgTertiary flex items-center">
                                            <FiSettings className="mr-3" size={16} />
                                            Settings
                                        </button>
                                        
                                        <div className="border-t border-theme-borderSecondary my-1"></div>
                                        
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 flex items-center"
                                        >
                                            <FiLogOut className="mr-3" size={16} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}