import React, { forwardRef } from 'react'

const ContentLayout = forwardRef(({ headerContent, children, scrollRef }, ref) => {
    return (
        <div className="bg-theme-bgSecondary card rounded-lg h-full flex flex-col shadow-sm overflow-hidden">
            {/* Sticky Header Section */}
            <header className="sticky top-0  p-4 py-2 bg-theme-bgSecondary border-b border-theme-borderSecondary">
                <div className="max-w-[1300px] mx-auto">
                    {headerContent}
                </div>
            </header>
       
            {/* Divider */}
            <div className="bg-primaryBg h-1 flex-shrink-0"></div>

            {/* Scrollable Main Content Section */}
            <section 
                ref={ref || scrollRef} 
                className="flex-1 overflow-y-auto bg-theme-bgPrimary"
            >
                <div className="max-w-[1300px] mx-auto h-full p-4">
                    {children}
                </div>
            </section>
        </div>
    )
})

ContentLayout.displayName = 'ContentLayout'

export default ContentLayout 