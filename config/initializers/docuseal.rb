Docuseal.key = Rails.application.credentials.docuseal&.[](:api_key) || ENV["DOCUSEAL_API_KEY"]
Docuseal.url = "https://api.docuseal.com"
