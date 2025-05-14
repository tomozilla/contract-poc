import { Controller } from "@hotwired/stimulus"
import { Editor } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"

// Connects to data-controller="tiptap"
export default class extends Controller {
  static targets = ["content", "input"]

  connect() {
    this.editor = new Editor({
      element: this.contentTarget,
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: true,
          HTMLAttributes: { class: "cursor-pointer" }
        }),
        Image
      ],
      content: this.inputTarget.value.presence || "<p>Start writing…</p>",
      onUpdate: ({ editor }) => {
        this.inputTarget.value = editor.getHTML()
      }
    })
  }

  disconnect() {
    this.editor.destroy()
  }
}
