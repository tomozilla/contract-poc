
document.addEventListener('turbo:load', () => {
  const element = document.getElementById('tiptap-editor');
  
  if (element) {
    if (element.getAttribute('data-editor-initialized') === 'true') {
      return;
    }
    
    element.setAttribute('data-editor-initialized', 'true');
    element.setAttribute('contenteditable', 'true');
    element.innerHTML = '<h1>Simple Editor with Importmap</h1><p>This editor uses importmap instead of bundling.</p>';
    
    const style = document.createElement('style');
    style.textContent = `
      .tiptap-editor {
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        padding: 1rem;
        min-height: 300px;
      }
      .tiptap-editor:focus {
        outline: none;
        border-color: #86b7fe;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
      }
      .editor-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
        padding: 0.5rem;
        background-color: #f8f9fa;
        border-radius: 0.25rem;
      }
      .editor-toolbar button {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 0.2rem;
        border: 1px solid #ced4da;
        background-color: #fff;
        cursor: pointer;
      }
      .editor-toolbar button:hover {
        background-color: #e9ecef;
      }
    `;
    document.head.appendChild(style);
    
    const toolbar = document.createElement('div');
    toolbar.className = 'editor-toolbar';
    element.parentNode.insertBefore(toolbar, element);
    
    const buttons = [
      { name: 'Bold', action: () => document.execCommand('bold', false, null) },
      { name: 'Italic', action: () => document.execCommand('italic', false, null) },
      { name: 'Heading', action: () => document.execCommand('formatBlock', false, '<h2>') }
    ];
    
    buttons.forEach(button => {
      const btn = document.createElement('button');
      btn.textContent = button.name;
      btn.onclick = button.action;
      toolbar.appendChild(btn);
    });
    
    element.addEventListener('input', () => {
      console.log('Content updated:', element.innerHTML);
    });
  }
});
