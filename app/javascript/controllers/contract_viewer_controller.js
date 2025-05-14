import { Controller } from "@hotwired/stimulus"
import { generateHTML } from "@tiptap/html"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"

export default class extends Controller {
  static values = { content: String }

  connect() {
    console.log("connect to contract viewer")
    try {
      const defaultContent = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "No content available"
              }
            ]
          }
        ]
      }
      
      let parsedContent
      try {
        if (this.contentValue) {
          console.log("Raw content value:", this.contentValue)
          
          if (typeof this.contentValue === 'string') {
            try {
              parsedContent = JSON.parse(this.contentValue)
              console.log("Successfully parsed content value:", parsedContent)
            } catch (parseError) {
              console.error("Error parsing content value as JSON:", parseError)
              if (this.contentValue.startsWith('"') && this.contentValue.endsWith('"')) {
                try {
                  const unescaped = JSON.parse(this.contentValue)
                  parsedContent = typeof unescaped === 'string' ? JSON.parse(unescaped) : unescaped
                  console.log("Successfully parsed double-encoded content:", parsedContent)
                } catch (doubleParseError) {
                  console.error("Error parsing double-encoded content:", doubleParseError)
                  parsedContent = defaultContent
                }
              } else {
                parsedContent = defaultContent
              }
            }
          } else {
            parsedContent = this.contentValue
          }
        } else {
          parsedContent = defaultContent
        }
        
        let hasValidContent = false
        if (parsedContent && parsedContent.content && parsedContent.content.length > 0) {
          for (const node of parsedContent.content) {
            if (node.content && node.content.length > 0) {
              for (const textNode of node.content) {
                if (textNode.type === 'text' && textNode.text && textNode.text.trim() !== '') {
                  hasValidContent = true
                  break
                }
              }
            }
            if (hasValidContent) break
          }
        }
        
        if (!hasValidContent) {
          console.log("No valid content found, using default")
          parsedContent = defaultContent
        }
        
        console.log("Final parsed content:", parsedContent)
        
        const html = generateHTML(parsedContent, [
          StarterKit,
          Link
        ])
        
        console.log("Generated HTML:", html)
        this.element.innerHTML = html || "<p>No content available</p>"
        
      } catch (e) {
        console.error("Error processing content:", e)
        this.element.innerHTML = "<p>Error processing content</p>"
      }
    } catch (e) {
      console.error("Error in connect:", e)
      this.element.innerHTML = "<p>Error rendering content</p>"
    }
  }
}
