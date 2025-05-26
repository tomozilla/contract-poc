import { Controller } from "@hotwired/stimulus"
import { Editor } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"

export default class extends Controller {
  static targets = ["editor", "content"]

  connect() {
    this.editor = new Editor({
      element: this.editorTarget,
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
        }),
        Placeholder.configure({
          placeholder: "Start writing your contract content here...",
        }),
      ],
      content: "",
      editorProps: {
        attributes: {
          class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-3 border rounded",
        },
      },
      onUpdate: ({ editor }) => {
        this.contentTarget.value = editor.getHTML()
      },
    })
  }

  disconnect() {
    if (this.editor) {
      this.editor.destroy()
    }
  }

  getContent() {
    return this.editor.getHTML()
  }

  setContent(content) {
    this.editor.commands.setContent(content)
  }
}
