import { Controller } from "@hotwired/stimulus"
import { Editor } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import debounce from "lodash.debounce"

import Underline from "@tiptap/extension-underline"
import Highlight from "@tiptap/extension-highlight"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"
import BubbleMenu from "@tiptap/extension-bubble-menu"

export default class extends Controller {
  static targets = ["content", "input", "bubble", "fileInput"]

  connect() {
    this.editor = new Editor({
      element: this.contentTarget,
      extensions: [
        StarterKit,
        Underline,
        Highlight,
        TaskList,
        TaskItem,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Typography,
        Link.configure({
          openOnClick: true,
          HTMLAttributes: { class: "text-primary" }
        }),
        Image.configure({
          allowBase64: true,
          HTMLAttributes: {
            class: 'img-fluid rounded',
          },
        }),
        BubbleMenu.configure({
          element: this.bubbleTarget,
          shouldShow: ({ editor, view, state, oldState, from, to }) => {
            return from !== to
          },
        }),
      ],
      content: this.initialContent(),
      onUpdate: debounce(({editor}) => {
        this.inputTarget.value = JSON.stringify(editor.getJSON())
        this.saveDraft()
      }, 800)  // 0.8s idle
    })

    this.isDarkMode = false
    if (localStorage.getItem('editorTheme') === 'dark') {
      this.toggleTheme()
    }
  }

  disconnect() {
    this.editor.destroy()
  }

  toggleBold() { this.editor.chain().focus().toggleBold().run() }
  toggleItalic() { this.editor.chain().focus().toggleItalic().run() }
  toggleUnderline() { this.editor.chain().focus().toggleUnderline().run() }
  toggleHighlighter() { this.editor.chain().focus().toggleHighlight().run() }
  
  toggleBullet() { this.editor.chain().focus().toggleBulletList().run() }
  toggleOrdered() { this.editor.chain().focus().toggleOrderedList().run() }
  toggleTask() { this.editor.chain().focus().toggleTaskList().run() }
  
  alignLeft() { this.editor.chain().focus().setTextAlign('left').run() }
  alignCenter() { this.editor.chain().focus().setTextAlign('center').run() }
  alignRight() { this.editor.chain().focus().setTextAlign('right').run() }
  alignJustify() { this.editor.chain().focus().setTextAlign('justify').run() }
  
  setHeading(event) {
    const level = parseInt(event.target.dataset.level)
    this.editor.chain().focus().toggleHeading({ level }).run()
  }
  
  setLink() {
    const url = prompt('URL', 'https://')
    if (url) {
      this.editor.chain().focus().setLink({ href: url }).run()
    }
  }
  
  removeLink() {
    this.editor.chain().focus().unsetLink().run()
  }
  
  handleImageUpload(event) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.editor.chain().focus().setImage({ src: e.target.result }).run()
      }
      reader.readAsDataURL(file)
    }
  }
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode
    
    if (this.isDarkMode) {
      document.querySelector('.tiptap-editor').classList.add('dark-mode')
      document.querySelector('.tiptap-toolbar').classList.add('dark-mode')
      localStorage.setItem('editorTheme', 'dark')
    } else {
      document.querySelector('.tiptap-editor').classList.remove('dark-mode')
      document.querySelector('.tiptap-toolbar').classList.remove('dark-mode')
      localStorage.setItem('editorTheme', 'light')
    }
  }
  
  initialContent() {
    try { 
      const value = this.inputTarget.value;
      if (typeof value === 'object') return value;
      return JSON.parse(value);
    } catch { 
      return "<p>Start writing…</p>" 
    }
  }
  
  saveDraft() {
    fetch(this.inputTarget.form.action, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content
      },
      body: JSON.stringify({
        editor: { draft_body: this.inputTarget.value }
      })
    })
  }
}
