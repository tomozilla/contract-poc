import { Controller } from "@hotwired/stimulus"
import { Editor } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"

// Connects to data-controller="contract-editor"
export default class extends Controller {
  static targets = ["editor", "content"]

  connect() {
    console.log("connect to contract editor")
    const defaultContent = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Start writing your contract..."
            }
          ]
        }
      ]
    }
    
    let initialContent
    try {
      if (this.contentTarget.value) {
        try {
          if (typeof this.contentTarget.value === 'string') {
            initialContent = JSON.parse(this.contentTarget.value)
          } else {
            initialContent = this.contentTarget.value
          }
          
          if (initialContent && initialContent.content) {
            let hasTextContent = false
            
            for (const node of initialContent.content) {
              if (node.type === 'paragraph' && node.content && node.content.length > 0) {
                for (const textNode of node.content) {
                  if (textNode.type === 'text' && textNode.text && textNode.text.trim() !== '') {
                    hasTextContent = true
                    break
                  }
                }
              }
              if (hasTextContent) break
            }
            
            if (!hasTextContent) {
              initialContent = defaultContent
            }
          } else {
            initialContent = defaultContent
          }
        } catch (e) {
          console.error("Error parsing initial content:", e)
          initialContent = defaultContent
        }
      } else {
        initialContent = defaultContent
      }
    } catch (e) {
      console.error("Error setting up initial content:", e)
      initialContent = defaultContent
    }
    
    console.log("Initial content for editor:", initialContent)
    
    this.editor = new Editor({
      element: this.editorTarget,
      extensions: [
        StarterKit,
        Link.configure({ openOnClick: false }),
        Placeholder.configure({ placeholder: "Start writing your contract..." })
      ],
      content: initialContent,
      onUpdate: ({ editor }) => {
        this.contentTarget.value = JSON.stringify(editor.getJSON())
      }
    })
    
    // ensure value sync on form submit too
    this.element.addEventListener("submit", () => {
      this.contentTarget.value = JSON.stringify(this.editor.getJSON())
    })
  }

  disconnect() {
    this.editor.destroy()
  }
}
