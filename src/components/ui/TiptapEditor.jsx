import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import { useField } from 'formik';
import ImageUploadModal from './ImageUploadModal';
import ResizableImage from './ResizableImageExtension';

const TiptapEditor = ({
  label,
  name,
  required = false,
  info,
  placeholder = '',
  className = '',
  disabled = false,
  note
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const [showImageModal, setShowImageModal] = useState(false);
  
  // Create a custom extension set instead of using StarterKit
  const extensions = [
    Document,
    Paragraph,
    Text,
    TextStyle,
    Bold,
    Italic,
    Underline,
    BulletList.configure({
      HTMLAttributes: {
        class: 'tiptap-bullet-list',
      },
      keepOnSplit: true,
    }),
    OrderedList.configure({
      HTMLAttributes: {
        class: 'tiptap-ordered-list',
      },
      keepOnSplit: true,
    }),
    ListItem.configure({
      HTMLAttributes: {
        class: 'tiptap-list-item',
      },
      nested: true,
    }),
    Link.configure({
      openOnClick: true,
      HTMLAttributes: {
        class: 'tiptap-link',
      },
    }),
    ResizableImage,
    Placeholder.configure({
      placeholder,
      emptyEditorClass: 'is-editor-empty',
    }),
  ];
  
  const editor = useEditor({
    extensions,
    content: field.value || '',
    editable: !disabled,
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[150px] max-h-[350px] overflow-y-auto px-4 py-3',
      },
    },
  });

  // Update editor content when field value changes externally
  useEffect(() => {
    if (editor && field.value !== editor.getHTML()) {
      editor.commands.setContent(field.value || '');
    }
  }, [editor, field.value]);

  // Update editor editable state when disabled prop changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [editor, disabled]);

  // Custom function to handle bullet list toggle
  const toggleBulletList = () => {
    if (!editor || disabled) return;
    
    try {
      // Check if selection is in an ordered list, if so lift it first
      if (editor.isActive('orderedList')) {
        editor.chain().focus().liftListItem('listItem').run();
      }
      
      // Toggle the bullet list
      editor.chain().focus().toggleBulletList().run();
    } catch (error) {
      console.error('Error toggling bullet list:', error);
      // Fallback to simpler approach if the above fails
      editor.chain().focus().toggleBulletList().run();
    }
  };
  
  // Custom function to handle ordered list toggle
  const toggleOrderedList = () => {
    if (!editor || disabled) return;
    
    try {
      // Check if selection is in a bullet list, if so lift it first
      if (editor.isActive('bulletList')) {
        editor.chain().focus().liftListItem('listItem').run();
      }
      
      // Toggle the ordered list
      editor.chain().focus().toggleOrderedList().run();
    } catch (error) {
      console.error('Error toggling ordered list:', error);
      // Fallback to simpler approach if the above fails
      editor.chain().focus().toggleOrderedList().run();
    }
  };

  const handleInsertImage = (imageAttrs) => {
    if (!editor) return;
    
    // Close the image modal before inserting to avoid React rendering conflicts
    setShowImageModal(false);
    
    // Use setTimeout to move insertion outside of the current React rendering cycle
    setTimeout(() => {
      try {
        // Method 1: Use the extension command directly
        editor.commands.setResizableImage(imageAttrs);
      } catch (error) {
        console.error('Error inserting image with command:', error);
        
        try {
          // Method 2: Insert content directly
          editor.chain()
            .focus()
            .insertContent({
              type: 'resizableImage',
              attrs: imageAttrs
            })
            .run();
        } catch (fallbackError) {
          console.error('Error inserting content directly:', fallbackError);
          
          // Method 3: Last resort - use HTML
          try {
            const { src, alt, title } = imageAttrs;
            editor.chain()
              .focus()
              .insertContent(`<img src="${src}" alt="${alt || ''}" title="${title || ''}" />`)
              .run();
          } catch (htmlError) {
            console.error('Failed to insert image with all methods:', htmlError);
          }
        }
      }
    }, 0);
  };

  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-dark-700 mb-1">
          {label} {required && <span className="text-primary">*</span>}
          {info && (
            <span className="ml-1 text-dark-400 cursor-help" title={info}>
              ⓘ
            </span>
          )}
        </label>
      )}
      
      <div className={`border border-dark-200 rounded-md overflow-hidden ${disabled ? 'bg-gray-200 opacity-70' : 'bg-white'}`}>
        <div className="border-b border-dark-200 bg-[#f9fafb] p-2 flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => {
              if (disabled) return;
              editor?.chain().focus().toggleBold().run();
            }}
            className={`p-1 rounded hover:bg-gray-200 ${editor?.isActive('bold') ? 'bg-gray-200' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Bold"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.613A4.5 4.5 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"/>
            </svg>
          </button>
          
          <button
            type="button"
            onClick={() => {
              if (disabled) return;
              editor?.chain().focus().toggleItalic().run();
            }}
            className={`p-1 rounded hover:bg-gray-200 ${editor?.isActive('italic') ? 'bg-gray-200' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Italic"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"/>
            </svg>
          </button>
          
          <button
            type="button"
            onClick={() => {
              if (disabled) return;
              editor?.chain().focus().toggleUnderline().run();
            }}
            className={`p-1 rounded hover:bg-gray-200 ${editor?.isActive('underline') ? 'bg-gray-200' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Underline"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"/>
            </svg>
          </button>
          
          <span className="h-6 w-px bg-gray-300 mx-1"></span>
          
          <button
            type="button"
            onClick={toggleBulletList}
            className={`p-1 rounded hover:bg-gray-200 ${editor?.isActive('bulletList') ? 'bg-gray-200' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Bullet List"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M8 4h13v2H8V4zm-5-.5h3v3H3v-3zm0 7h3v3H3v-3zm0 7h3v3H3v-3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/>
            </svg>
          </button>
          
          <button
            type="button"
            onClick={toggleOrderedList}
            className={`p-1 rounded hover:bg-gray-200 ${editor?.isActive('orderedList') ? 'bg-gray-200' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Ordered List"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/>
            </svg>
          </button>
          
          <span className="h-6 w-px bg-gray-300 mx-1"></span>
          
          <button
            type="button"
            onClick={() => {
              if (disabled) return;
              const url = window.prompt('URL');
              if (url) {
                editor?.chain().focus().setLink({ href: url }).run();
              } else if (editor?.isActive('link')) {
                editor?.chain().focus().unsetLink().run();
              }
            }}
            className={`p-1 rounded hover:bg-gray-200 ${editor?.isActive('link') ? 'bg-gray-200' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Link"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"/>
            </svg>
          </button>
          
          <button
            type="button"
            onClick={() => !disabled && setShowImageModal(true)}
            className={`p-1 rounded hover:bg-gray-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Image"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
            </svg>
          </button>
          
          <button
            type="button"
            onClick={() => {
              if (disabled) return;
              editor?.chain().focus().clearNodes().unsetAllMarks().run();
            }}
            className={`p-1 rounded hover:bg-gray-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Clear Formatting"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M12.651 14.065L11.605 20H9.574l1.35-7.661-7.41-7.41L4.93 3.515 20.485 19.07l-1.414 1.414-6.42-6.42zm-.878-6.535l.27-1.53h-1.8l-2-2H20v2h-5.927L13.5 9.257 11.773 7.53z"/>
            </svg>
          </button>
        </div>
        
        <EditorContent editor={editor} className="tiptap-editor" />
      </div>
      
      {/* {note && (
        <div className="flex items-center mt-2 text-dark-500 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{note}</span>
        </div>
      )} */}
      
      {meta.touched && meta.error ? (
        <div className="mt-1 text-sm text-primary">{meta.error}</div>
      ) : null}
      
      {showImageModal && (
        <ImageUploadModal 
          onClose={() => setShowImageModal(false)}
          onInsertImage={handleInsertImage}
        />
      )}
    </div>
  );
};

export default TiptapEditor; 