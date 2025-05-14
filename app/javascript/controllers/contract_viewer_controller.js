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
        if (typeof this.contentValue === 'string') {
          json = JSON.parse(this.contentValue || JSON.stringify(defaultContent))
        } else {
          json = this.contentValue || defaultContent
        }
        
        let hasValidContent = false;
        if (json && json.content && json.content.length > 0) {
          for (const node of json.content) {
            if (node.content && node.content.length > 0) {
              for (const textNode of node.content) {
                if (textNode.type === 'text' && textNode.text && textNode.text.trim() !== '') {
                  hasValidContent = true;
                  break;
                }
              }
            }
            if (hasValidContent) break;
          }
        }
        
        if (!hasValidContent) {
          json = defaultContent;
        }
        
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
      if (json.content.length === 1 && 
          json.content[0].type === "paragraph" && 
          (!json.content[0].content || json.content[0].content.length === 0)) {
        return "<p>No content available</p>";
      }
      
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
          
          if (paragraphContent.trim() === "") {
            html += "<p><br></p>";
          } else {
            html += `<p>${paragraphContent}</p>`;
          }
        }
      }
      
      console.log("Final HTML:", html);
      if (html) {
        return html;
      } else {
        return "<p>No content available</p>";
      }
    } catch (e) {
      console.error("Error in renderContent:", e);
      return "<p>Error rendering content</p>";
    }
  }
}
