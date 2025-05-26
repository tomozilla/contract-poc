class DocumentsController < ApplicationController
  before_action :authenticate_user!

  def show
    @document = Document.find(params[:id])

    payload = {
      user_email: current_user.email,
      integration_email: params[:signer_email] || current_user.email,
      name: @document.name,
      document_urls: [ @document.pdf_url ]
    }

    api_key = Rails.application.credentials.docuseal&.[](:api_key) || "test_key_for_ci"
    @docuseal_token = JWT.encode(
      payload,
      api_key,
      "HS256"
    )
  end
end
