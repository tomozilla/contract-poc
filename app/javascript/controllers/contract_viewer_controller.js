import { Controller } from "@hotwired/stimulus"

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
      
      let json
      try {
        json = JSON.parse(this.contentValue || JSON.stringify(defaultContent))
        console.log("Parsed JSON:", json)
      } catch (e) {
        console.error("Error parsing JSON:", e)
        json = defaultContent
      }
      
      const renderedContent = this.renderContent(json)
      console.log("Rendered content:", renderedContent)
      this.element.innerHTML = renderedContent
    } catch (e) {
      console.error("Error rendering content:", e)
      this.element.innerHTML = "<p>Error rendering content</p>"
    }
  }
  
  renderContent(json) {
    if (!json || !json.content || json.content.length === 0) {
      return "<p>No content available</p>"
    }
    
    console.log("Processing JSON content:", JSON.stringify(json.content));
    let html = ""
    
    try {
      for (const node of json.content) {
        console.log("Processing node:", node);
        
        if (node.type === "paragraph") {
          let paragraphContent = "";
          
          if (node.content && node.content.length > 0) {
            for (const textNode of node.content) {
              console.log("Processing text node:", textNode);
              
              if (textNode.type === "text") {
                paragraphContent += textNode.text || "";
              }
            }
          }
          
          console.log("Paragraph content:", paragraphContent);
          
          html += `<p>${paragraphContent}</p>`;
        }
      }
      
      console.log("Final HTML:", html);
      return html || "<p>No content available</p>";
    } catch (e) {
      console.error("Error in renderContent:", e);
      return "<p>Error rendering content</p>";
    }
  }
}
