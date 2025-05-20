import { Controller } from "@hotwired/stimulus"
import {
  Editor,
  StarterKit,
  Link,
  Image,
  Placeholder,
  Underline,
  Highlight,
  TaskList,
  TaskItem,
  TextAlign,
  Typography,
  BubbleMenu
} from "../tiptap_bundle"

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
        BubbleMenu.configure({ element: this.bubbleTarget })
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

  toggleBold()        { this.editor.chain().focus().toggleBold().run() }
  toggleItalic()      { this.editor.chain().focus().toggleItalic().run() }
  toggleBullet()      { this.editor.chain().focus().toggleBulletList().run() }
  toggleOrdered()     { this.editor.chain().focus().toggleOrderedList().run() }
  toggleTask()        { this.editor.chain().focus().toggleTaskList().run() }
  toggleUnderline()   { this.editor.chain().focus().toggleUnderline().run() }
  toggleHighlighter() { this.editor.chain().focus().toggleHighlight().run() }
}
