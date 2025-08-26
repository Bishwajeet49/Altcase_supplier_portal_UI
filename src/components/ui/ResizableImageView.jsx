import React, { useState, useRef, useEffect } from 'react';
import { NodeViewWrapper } from '@tiptap/react';

const ResizableImageView = ({ node, updateAttributes, deleteNode, editor, getPos, selected }) => {
  const [size, setSize] = useState({
    width: node.attrs.width,
    height: node.attrs.height,
  });
  const [resizing, setResizing] = useState(false);
  const [showControls, setShowControls] = useState(selected);
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Update controls visibility when selected changes
  useEffect(() => {
    setShowControls(selected);
  }, [selected]);
  
  // Initialize image size on mount
  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      initializeSize();
    } else if (imageRef.current) {
      imageRef.current.onload = initializeSize;
    }
    
    return () => {
      if (imageRef.current) {
        imageRef.current.onload = null;
      }
    };
  }, []);

  // Track mousemove and mouseup globally to handle resize more reliably
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (resizing) {
        handleResize(e);
      }
    };

    const handleGlobalMouseUp = () => {
      if (resizing) {
        handleResizeEnd();
      }
    };

    // Add global event listeners
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [resizing]);

  // Initialize size based on the image's natural dimensions
  const initializeSize = () => {
    if (!imageRef.current) return;
    
    // If width is percentage or auto, set a default pixel width
    if (size.width === '100%' || size.width === 'auto') {
      const naturalWidth = imageRef.current.naturalWidth;
      const containerWidth = wrapperRef.current?.offsetWidth || 800;
      const initialWidth = Math.min(naturalWidth, containerWidth * 0.9);
      
      setSize({
        width: `${initialWidth}px`,
        height: 'auto',
      });
      
      // Update the node attributes
      updateAttributes({
        width: `${initialWidth}px`,
        height: 'auto',
      });
    }
  };

  // Handle resize start
  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!imageRef.current) return;
    
    startXRef.current = e.clientX;
    startWidthRef.current = imageRef.current.clientWidth;
    
    setResizing(true);
  };

  // Handle resize during mouse move
  const handleResize = (e) => {
    // Skip if not resizing or no image ref
    if (!resizing || !imageRef.current) return;
    
    // Calculate new width based on mouse movement
    const deltaX = e.clientX - startXRef.current;
    const newWidth = Math.max(50, startWidthRef.current + deltaX);
    
    // Update the DOM directly to avoid React flush issues
    imageRef.current.style.width = `${newWidth}px`;
    imageRef.current.style.height = 'auto';
  };

  // Handle resize end
  const handleResizeEnd = () => {
    // Exit early if no image reference
    if (!imageRef.current) {
      setResizing(false);
      return;
    }
    
    // Get final width from DOM
    const finalWidth = imageRef.current.offsetWidth;
    
    // Prepare the update outside React's rendering cycle
    const widthToSet = `${finalWidth}px`;
    const heightToSet = 'auto';
    
    // Use requestAnimationFrame to schedule updates after rendering
    requestAnimationFrame(() => {
      // First, update local state
      setSize({
        width: widthToSet,
        height: heightToSet,
      });
      
      // Then update node attributes
      updateAttributes({
        width: widthToSet,
        height: heightToSet,
      });
      
      // Finally, turn off resizing mode
      setResizing(false);
    });
  };

  // Handle delete
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Try using the standard deleteNode function
      if (typeof deleteNode === 'function') {
        deleteNode();
        return;
      }
      
      // If that fails, try to delete by position
      if (typeof getPos === 'function' && editor) {
        const pos = getPos();
        editor.commands.deleteRange({ from: pos, to: pos + node.nodeSize });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <NodeViewWrapper className="resizable-image-wrapper" ref={wrapperRef}>
      <div 
        className="relative inline-block" 
        onMouseEnter={() => setShowControls(true)} 
        onMouseLeave={() => !selected && setShowControls(false)}
      >
        <img
          ref={imageRef}
          src={node.attrs.src}
          alt={node.attrs.alt || ''}
          title={node.attrs.title || ''}
          style={{
            width: size.width,
            height: size.height,
          }}
          className={`max-w-full ${resizing ? 'pointer-events-none' : ''} ${selected ? 'ring-2 ring-primary' : ''}`}
          draggable="false"
        />
        
        {/* Resize handle */}
        {showControls && (
          <div 
            className="absolute w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center right-0 bottom-0 transform translate-x-1/3 translate-y-1/3 cursor-se-resize shadow-md z-50 resize-control hover:bg-gray-100 transition-colors"
            onMouseDown={handleResizeStart}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M21 15v4a2 2 0 0 1-2 2h-4" />
              <path d="M15 3h4a2 2 0 0 1 2 2v4" />
              <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
              <path d="M3 9V5a2 2 0 0 1 2-2h4" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        )}
        
        {/* Delete button */}
        {showControls && (
          <button
            className="absolute top-0 right-0 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center transform translate-x-1/3 -translate-y-1/3 shadow-md z-50 delete-control hover:bg-red-600 transition-colors"
            onClick={handleDelete}
            type="button"
            aria-label="Delete image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default ResizableImageView; 