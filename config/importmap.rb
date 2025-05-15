# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "@tiptap/core", to: "https://ga.jspm.io/npm:@tiptap/core@2.1.12/dist/index.js"
pin "@tiptap/starter-kit", to: "https://ga.jspm.io/npm:@tiptap/starter-kit@2.1.12/dist/index.js"
pin "@tiptap/extension-link", to: "https://ga.jspm.io/npm:@tiptap/extension-link@2.1.12/dist/index.js"
pin "@tiptap/extension-image", to: "https://ga.jspm.io/npm:@tiptap/extension-image@2.1.12/dist/index.js"
pin "@tiptap/extension-placeholder", to: "https://ga.jspm.io/npm:@tiptap/extension-placeholder@2.1.12/dist/index.js"
