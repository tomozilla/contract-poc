require "net/http"
require "json"
require "securerandom"

class DocumentsController < ApplicationController
  before_action :authenticate_user!

  def new
    @document = Document.new
  end

  def create
    # 1) Build payload
    payload = {
      name: params[:name],
      external_id: SecureRandom.uuid,
      document_urls: [params[:pdf_url]].compact
    }

    # 2) Call DocuSeal's Create Template endpoint
    api_key = Rails.application.credentials.docuseal&.[](:api_key) || "test_key_for_ci"
    uri = URI("https://api.docuseal.com/v1/templates")
    req = Net::HTTP::Post.new(uri, "Content-Type" => "application/json")
    req.basic_auth api_key, ""
    req.body = payload.to_json

    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(req)
    end

    if res.is_a?(Net::HTTPSuccess)
      template = JSON.parse(res.body)
      # 3) Redirect to show, passing template_id and signer_email
      redirect_to document_path(id: template["id"], 
                               template_id: template["id"],
                               signer_email: params[:signer_email])
    else
      flash.now[:alert] = "DocuSeal error: #{res.body}"
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @document = Document.find_by(id: params[:id]) || Document.new(name: "New Template")
    @template_id = params[:template_id] || params[:id]
    @signer_email = params[:signer_email] || current_user.email

    payload = {
      user_email: current_user.email,
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
end
