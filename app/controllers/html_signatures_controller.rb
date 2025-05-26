class HtmlSignaturesController < ApplicationController
  def new
    # Renders the static HTML with two signers and a button
  end

  def create
    # Get contract content from TipTap editor
    contract_content = params[:contract_content]&.present? ? params[:contract_content] : default_contract_content

    # Create template with dynamic content
    html_content = render_to_string(
      partial: "sign_template",
      formats: [ :html ],
      locals: { contract_content: contract_content }
    )

    template = Docuseal.create_template_from_html({
      html: html_content,
      name: "Signature Template"
    })

    submission = Docuseal.create_submission({
      template_id: template["id"],
      send_email: false,
      submitters: [
        { email: params[:signer1_email] || "signer1@example.com", role: "Signer1" },
        { email: params[:signer2_email] || "signer2@example.com", role: "Signer2" }
      ]
    })

    slug = submission["submitters"].first["slug"]
    redirect_to sign_html_signatures_path(slug: slug, signer1_email: params[:signer1_email])
  rescue => e
    flash[:alert] = "DocuSeal error: #{e.message}"
    render :new, status: :unprocessable_entity
  end

  def sign
    @slug = params[:slug]
    @signer_email = params[:signer1_email] || "signer1@example.com"
  end

  private

  def default_contract_content
    "<h2>Agreement</h2><p>This Agreement is made and entered into by and between the parties listed below.</p>"
  end
end
