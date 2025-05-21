import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

document.addEventListener('turbo:load', () => {
  const element = document.getElementById('tiptap-editor');
  
  if (element) {
    const editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        Image,
        TaskItem,
        TaskList,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Typography,
        Underline,
        Highlight,
        Link,
        Placeholder.configure({
          placeholder: 'Write something...',
        }),
      ],
      content: '<h1>Simple Editor with Importmap</h1><p>This editor uses importmap instead of bundling.</p>',
      onUpdate: ({ editor }) => {
        console.log(editor.getHTML());
      },
    });
    
    const toolbar = document.createElement('div');
    toolbar.className = 'editor-toolbar d-flex flex-wrap gap-2 mb-3 p-2 bg-light rounded';
    element.parentNode.insertBefore(toolbar, element);
    
    const buttons = [
      { name: 'bold', icon: '<i class="fas fa-bold"></i>', action: () => editor.chain().focus().toggleBold().run() },
      { name: 'italic', icon: '<i class="fas fa-italic"></i>', action: () => editor.chain().focus().toggleItalic().run() },
      { name: 'heading', icon: '<i class="fas fa-heading"></i>', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
      { name: 'bullet-list', icon: '<i class="fas fa-list-ul"></i>', action: () => editor.chain().focus().toggleBulletList().run() },
      { name: 'ordered-list', icon: '<i class="fas fa-list-ol"></i>', action: () => editor.chain().focus().toggleOrderedList().run() },
      { name: 'link', icon: '<i class="fas fa-link"></i>', action: () => {
        const url = window.prompt('URL');
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      }},
      { name: 'image', icon: '<i class="fas fa-image"></i>', action: () => {
        const url = window.prompt('Image URL');
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      }},
    ];
    
    buttons.forEach(button => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-sm btn-outline-secondary';
      btn.innerHTML = button.icon;
      btn.title = button.name;
      btn.onclick = button.action;
      toolbar.appendChild(btn);
    });
    
    const style = document.createElement('style');
    style.textContent = `
      .tiptap-editor {
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        padding: 1rem;
        min-height: 300px;
      }
      .tiptap-editor:focus {
        outline: none;
        border-color: #86b7fe;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
      }
    `;
    document.head.appendChild(style);
  }
});
