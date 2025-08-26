import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ResizableImageView from './ResizableImageView';

export const ResizableImage = Node.create({
  name: 'resizableImage',
  
  group: 'block',
  
  inline: false,
  
  draggable: true,
  
  atom: true,
  
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: '100%',
      },
      height: {
        default: 'auto',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: (node) => {
          if (typeof node === 'string') return {};
          
          const element = node;
          
          return {
            src: element.getAttribute('src'),
            alt: element.getAttribute('alt'),
            title: element.getAttribute('title'),
            width: element.getAttribute('width') || '100%',
            height: element.getAttribute('height') || 'auto',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },

  addCommands() {
    return {
      setResizableImage: (attrs) => ({ chain, commands }) => {
        // First try using commands directly
        try {
          return commands.insertContent({
            type: this.name,
            attrs: attrs,
          });
        } catch (error) {
          console.error('Error inserting with commands:', error);
          // Fallback to chain
          return chain().insertContent({
            type: this.name,
            attrs: attrs,
          }).run();
        }
      },
    };
  },
});

export default ResizableImage; 