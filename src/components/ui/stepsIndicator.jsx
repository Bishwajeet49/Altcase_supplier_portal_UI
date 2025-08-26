// Modern Step Indicator Component with Animation
import { useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

 const StepIndicator = ({ steps, currentStep, onStartOver, title = "Create Event", onTabClick }) => {

    
    // Function to determine if a step is completed
    const isStepCompleted = (index) => index < currentStep;
    
    // Function to determine if a step is current
    const isCurrentStep = (index) => index === currentStep;
    
    // Function to get appropriate colors and styles based on step status
    const getStepStyles = (index) => {
        if (isStepCompleted(index)) {
            return {
                circle: "bg-primary text-white shadow-card",
                label: "text-primary font-medium",
                line: "bg-primary"
            };
        }
        if (isCurrentStep(index)) {
            return {
                circle: "bg-secondary-200 text-primary border-2 border-primary shadow-card",
                label: "text-dark-700 font-medium",
                line: "bg-dark-200"
            };
        }
        return {
            circle: "bg-dark-100 text-dark-400 border border-dark-200",
            label: "text-dark-400",
            line: "bg-dark-200"
        };
    };

    // Add keyframes for the ping animation to the document if not already added
    useEffect(() => {
        const styleId = 'tailwind-ping-animation-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
                @keyframes tailwind-ping {
                    75%, 100% {
                        transform: scale(1.6);
                        opacity: 0;
                    }
                }
                
                .tw-ping {
                    animation: tailwind-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

  

    // Tab UI for Edit mode
    if ( title === 'Edit Event') {
        return (
            <div className="w-full z-[1] relative rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 sm:mb-6 ">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0 ml-5">Edit Event</h1>
                </div>
                <div className="overflow-x-auto pb-[2px]">
                    <div className="flex border-gray-200 gap-2 min-w-max border-b border-gray-200">
                        {steps.map((step, index) => (
                            <button
                                key={step.step}
                                type="button"
                                onClick={() => onTabClick && onTabClick(index)}
                                className={`px-6 py-3 text-sm font-medium focus:outline-none transition-colors border-b-2 -mb-[2px] text-[16px] whitespace-nowrap ${
                                    index === currentStep
                                        ? 'border-primary text-primary bg-white'
                                        : 'border-transparent text-gray-500 hover:text-primary hover:bg-gray-50'
                                }`}
                            >
                                {step.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="w-full h-full z-[1] relative rounded-lg"
            key={currentStep}
        >
            {/* Desktop Version (Horizontal Steps) */}
            <div className='hidden md:block p-0'>
                {/* Header with Start Over button */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</span>
                        </div>
                    </div>
                    {currentStep > 0 && onStartOver && (
                        <button
                            type="button"
                            onClick={onStartOver}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Start Over
                        </button>
                    )}
                </div>
                
                {/* Simplified approach with exact positioning */}
                <div className="w-full">
                    {/* Steps with titles */}
                    <div className="relative">
                        {/* Connecting lines first (in background) */}
                        <div className="absolute top-[24px] left-0 w-full h-[2px] bg-gray-200 z-0"></div>
                        
                        {/* Step circles and titles */}
                        <div className="flex justify-between relative z-10">
                            {steps.map((step, index) => {
                                const styles = getStepStyles(index);
                                const isCurrent = isCurrentStep(index);
                                const isCompleted = isStepCompleted(index);
                                
                                return (
                                    <div key={step.step} className="flex flex-col items-center">
                                        {/* Circle */}
                                        <div className="flex flex-col items-center mb-0">
                                            {/* Ping effect for current step */}
                                            {isCurrent && (
                                                <div className="absolute w-12 h-12 rounded-full bg-primary opacity-30 tw-ping"></div>
                                            )}
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${styles.circle} relative`}>
                                                {isCompleted ? (
                                                    <FaCheck className="w-4 h-4" />
                                                ) : (
                                                    <span>{index + 1}</span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Title */}
                                        <p className={`text-sm font-medium ${styles.label} text-center mt-2 mb-1`}>
                                            {step.title}
                                        </p>
                                        
                                      
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* Completed progress line (overlay) */}
                        <div 
                            className="absolute top-[24px] left-0 h-[1px] bg-primary z-0 transition-all duration-500"
                            style={{ 
                                width: `${(currentStep / (steps.length - 1)) * 100}%`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            {/* Mobile Version (Vertical Steps) */}
           

          
        </div>
    );
};


export default StepIndicator;