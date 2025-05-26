import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="docuseal"
export default class extends Controller {
  connect() {
    this.element.addEventListener("send", e => console.log("Sent:", e.detail))
    this.element.addEventListener("save", e => console.log("Saved:", e.detail))
    this.element.addEventListener("upload", e => console.log("Upload:", e.detail))
  }
}
