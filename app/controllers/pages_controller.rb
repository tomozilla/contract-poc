class PagesController < ApplicationController
  before_action :set_page, only: %i[show edit update destroy]

  def index
    @pages = Page.all.order(:created_at)
  end

  def show
  end

  def new
    @page = Page.new
  end

  def create
    @page = Page.new(page_params)
    if @page.save
      redirect_to @page, notice: "Page created"
    else
      render :new
    end
  end

  def edit
  end

  def update
    @page.assign_attributes(page_params)
    if @page.save
      respond_to do |format|
        if @page.body_previously_changed?
          # blank Turbo Stream so we don't reload on every keystroke
          format.turbo_stream { render :update }
        else
          format.html { redirect_to @page, notice: "Page updated" }
        end
      end
    else
      render :edit
    end
  end

  def destroy
    @page.destroy
    redirect_to pages_path, notice: "Page deleted"
  end

  private

  def set_page
    @page = Page.find(params[:id])
  end

  def page_params
    params.require(:page).permit(:title, :body)
  end
end
