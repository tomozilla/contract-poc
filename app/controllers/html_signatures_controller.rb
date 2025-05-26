class HtmlSignaturesController < ApplicationController
  def new
    # Renders the static HTML with two signers and a button
  end

  def create
    html_content = render_to_string(partial: "sign_template", formats: [ :html ])
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
end
