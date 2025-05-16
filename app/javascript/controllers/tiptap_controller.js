import { Controller } from "@hotwired/stimulus"
import { Editor } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"

import Underline from "@tiptap/extension-underline"
import Highlight from "@tiptap/extension-highlight"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"
import BubbleMenu from "@tiptap/extension-bubble-menu"

export default class extends Controller {
  static targets = ["content", "input", "bubble"]

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
        Link.configure({ openOnClick: true }),
        Image,
        BubbleMenu.configure({
          element: this.bubbleTarget,
          shouldShow: ({ editor, view, state, oldState, from, to }) => {
            return from !== to
          },
        }),
      ],
      content: this.inputTarget.value || "<p>Start writing…</p>",
      onUpdate: ({ editor }) => {
        this.inputTarget.value = editor.getHTML()
      }
    })
  }

  disconnect() {
    this.editor.destroy()
  }

  toggleBold() { this.editor.chain().focus().toggleBold().run() }
  toggleItalic() { this.editor.chain().focus().toggleItalic().run() }
  toggleBullet() { this.editor.chain().focus().toggleBulletList().run() }
  toggleOrdered() { this.editor.chain().focus().toggleOrderedList().run() }
  toggleTask() { this.editor.chain().focus().toggleTaskList().run() }
  toggleUnderline() { this.editor.chain().focus().toggleUnderline().run() }
  toggleHighlighter() { this.editor.chain().focus().toggleHighlight().run() }
}
