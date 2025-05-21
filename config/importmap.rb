# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@rails/activestorage", to: "activestorage.esm.js"
pin "@rails/ujs"
pin "local-time"
pin "bootstrap"

# TipTap dependencies
pin "@tiptap/core"
pin "@tiptap/starter-kit"
pin "@tiptap/extension-image"
pin "@tiptap/extension-task-item"
pin "@tiptap/extension-task-list"
pin "@tiptap/extension-text-align"
pin "@tiptap/extension-typography"
pin "@tiptap/extension-underline"
pin "@tiptap/extension-highlight"
pin "@tiptap/extension-link"
pin "@tiptap/extension-placeholder"

# Controllers
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/channels", under: "channels"
