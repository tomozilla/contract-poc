require "net/http"
require "json"
require "securerandom"
require "docuseal"
require "base64"

class DocumentsController < ApplicationController
  before_action :authenticate_user!

  def new
    @document = Document.new
  end

  def create
    @document = Document.new(document_params)

    file_param = params[:document][:pdf_file]
    file_url = params[:document][:pdf_url]

    file_value =
      if file_param.present?
        Base64.encode64(file_param.read)
      elsif file_url.present?
        file_url
      else
        nil
      end

    if file_value.nil?
      flash.now[:alert] = "Please provide a PDF file or URL."
      render :new, status: :unprocessable_entity
      return
    end

    begin
      docuseal_payload = {
        name: params[:document][:name],
        documents: [
          {
            name: params[:document][:name],
            file: file_value
          }
        ]
      }
      Rails.logger.info "DOCUSEAL REQUEST PAYLOAD: #{docuseal_payload.inspect}"

      result = Docuseal.create_template_from_pdf(docuseal_payload)
      Rails.logger.info "DOCUSEAL RESPONSE: #{result.inspect}"

      redirect_to document_path(id: result["id"],
                               template_id: result["id"],
                               signer_email: params[:document][:signer_email])
    rescue => e
      Rails.logger.error "DOCUSEAL ERROR: #{e.class} - #{e.message}"
      Rails.logger.error e.backtrace.join("\n")
      flash.now[:alert] = "DocuSeal error: #{e.message}"
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @document = Document.find_by(id: params[:id]) || Document.new(name: "New Template")
    @template_id = params[:template_id] || params[:id]
    @signer_email = params[:signer_email] || current_user.email

    payload = {
      user_email: "mitani.work+test@gmail.com",
      integration_email: @signer_email,
      external_id: @template_id,
      template_id: @template_id,
      exp: 10.minutes.from_now.to_i
    }

    api_key = Rails.application.credentials.docuseal&.[](:api_key) || "test_key_for_ci"
    @docuseal_token = JWT.encode(
      payload,
      api_key,
      "HS256"
    )
  end

  private

  def document_params
    params.fetch(:document, {}).permit(:name, :pdf_url)
  end
end
