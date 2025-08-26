import React, { useState, useEffect, useRef } from 'react'

/**
 * ContentBodyLayout - A flexible body layout component with conditional header, content, and footer
 * @param {Object} props
 * @param {React.ReactNode} props.head - Header content for the body section (optional)
 * @param {React.ReactNode} props.children - Main content (optional)
 * @param {React.ReactNode} props.foot - Footer content for the body section (optional)
 * @param {boolean} props.smartPanel - Enable smart panel behavior (scroll up/down to show/hide header)
 * @param {React.RefObject} props.scrollContainerRef - Reference to the scroll container element
 */
export default function ContentBodyLayout({ 
    head, 
    children, 
    foot,
    smartPanel = true,
    scrollContainerRef
}) {
    console.log('ContentBodyLayout mounted with:', { head: !!head, smartPanel, hasChildren: !!children, hasScrollRef: !!scrollContainerRef })
    
    const [isHeaderVisible, setIsHeaderVisible] = useState(true)
    const lastScrollY = useRef(0)

    useEffect(() => {
        if (!smartPanel || !head) {
            console.log('Smart panel disabled or no head')
            return
        }

        console.log('Setting up scroll listener')

        const handleScroll = () => {
            const scrollContainer = scrollContainerRef?.current || window
            const currentScrollY = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop
            console.log('🔥 SCROLL EVENT FIRED:', { currentScrollY, lastScrollY: lastScrollY.current, container: scrollContainer === window ? 'window' : 'container' })
            
            // Always show header at top
            if (currentScrollY <= 10) {
                setIsHeaderVisible(true)
                lastScrollY.current = currentScrollY
                return
            }

            // Simple logic: hide on scroll down, show on scroll up
            if (currentScrollY > lastScrollY.current) {
                // Scrolling down
                console.log('⬇️ SCROLLING DOWN - HIDING HEADER')
                setIsHeaderVisible(false)
            } else {
                // Scrolling up
                console.log('⬆️ SCROLLING UP - SHOWING HEADER')
                setIsHeaderVisible(true)
            }

            lastScrollY.current = currentScrollY
        }

        // Listen to the correct scroll container
        const scrollContainer = scrollContainerRef?.current || window
        console.log('Adding scroll listener to:', scrollContainer === window ? 'window' : 'scroll container')
        
        scrollContainer.addEventListener('scroll', handleScroll)
        
        return () => {
            console.log('Cleaning up scroll listener')
            scrollContainer.removeEventListener('scroll', handleScroll)
        }
    }, [smartPanel, head, scrollContainerRef])

    // Debug the header visibility state
    console.log('Header visibility state:', isHeaderVisible)

    return (
        <div 
            className="flex flex-col min-h-full relative"
        >
            {/* Conditional Header */}
            {head && (
                <header 
                    className={`sticky top-0 left-0 right-0 border-b border-theme-borderSecondary flex justify-center items-center bg-theme-bgSecondary bg-opacity-80 backdrop-blur-sm z-10 ${
                        smartPanel 
                            ? `transform transition-transform duration-300 ease-in-out ${
                                isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
                              }`
                            : ''
                    }`}
                    style={{
                        transform: smartPanel 
                            ? isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)'
                            : 'none'
                    }}
                >
                    <div className="w-full">
                        {head}
                    </div>
                </header>
            )}

            {/* Main Content */}
            {children && (
                <main className="flex-1 w-full pt-4">
                    {children}
                </main>
            )}

            {/* Conditional Footer */}
            {foot && (
                <div 
                    className="sticky bottom-0 left-0 right-0 bg-theme-bgSecondary text-theme-textSecondary text-sm leading-6 flex justify-center items-center text-center z-10"
                >
                    <div className="w-full">
                        {foot}
                    </div>
                </div>
            )}
        </div>
    )
}


