# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true

pin_all_from "app/javascript/controllers", under: "controllers"

# TipTap is now bundled with esbuild
pin "tiptap_bundle", to: "tiptap_bundle.js"

# lodash.debounce via jsDelivr ESM
pin "lodash.debounce", to: "https://cdn.jsdelivr.net/npm/lodash.debounce@4.0.8/+esm"
