import { Controller } from "@hotwired/stimulus"
import { generateHTML } from "@tiptap/html"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"

export default class extends Controller {
  static values = { content: String }

  connect() {
    console.log("connect to contract viewer")
    console.log(this.contentValue)
    const json = JSON.parse(this.contentValue || "{}")
    console.log(json)
    try {
      const html = generateHTML(json, [
        Document,
        Paragraph,
        Text,
        Link,
      ])
      this.element.innerHTML = html
    } catch (e) {
      console.error("Tiptap generateHTML error:", e, json)
      this.element.innerHTML = "<p>Error rendering content</p>"
    }
  }
}
