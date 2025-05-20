# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true

pin_all_from "app/javascript/controllers", under: "controllers"

# Tiptap via jsDelivr ESM (recommended to avoid ProseMirror version issues)
pin "@tiptap/core", to: "https://cdn.jsdelivr.net/npm/@tiptap/core@2.2.2/+esm"
pin "@tiptap/starter-kit", to: "https://cdn.jsdelivr.net/npm/@tiptap/starter-kit@2.2.2/+esm"
pin "@tiptap/extension-link", to: "https://cdn.jsdelivr.net/npm/@tiptap/extension-link@2.2.2/+esm"
pin "@tiptap/extension-image", to: "https://cdn.jsdelivr.net/npm/@tiptap/extension-image@2.2.2/+esm"
pin "@tiptap/extension-placeholder", to: "https://cdn.jsdelivr.net/npm/@tiptap/extension-placeholder@2.2.2/+esm"
pin "@tiptap/extension-underline", to: "https://cdn.jsdelivr.net/npm/@tiptap/extension-underline@2.2.2/+esm"
pin "@tiptap/extension-highlight", to: "https://cdn.jsdelivr.net/npm/@tiptap/extension-highlight@2.2.2/+esm"
pin "@tiptap/extension-task-list", to: "https://cdn.jsdelivr.net/npm/@tiptap/extension-task-list@2.2.2/+esm"
pin "@tiptap/extension-task-item", to: "https://cdn.jsdelivr.net/npm/@tiptap/extension-task-item@2.2.2/+esm"
pin "@tiptap/extension-text-align", to: "https://cdn.jsdelivr.net/npm/@tiptap/extension-text-align@2.2.2/+esm"
pin "@tiptap/extension-typography", to: "https://cdn.jsdelivr.net/npm/@tiptap/extension-typography@2.2.2/+esm"
pin "@tiptap/extension-bubble-menu", to: "https://cdn.jsdelivr.net/npm/@tiptap/extension-bubble-menu@2.2.2/+esm"

# lodash.debounce via jsDelivr ESM
pin "lodash.debounce", to: "https://cdn.jsdelivr.net/npm/lodash.debounce@4.0.8/+esm"
