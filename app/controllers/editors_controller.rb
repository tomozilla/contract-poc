class EditorsController < ApplicationController
  before_action :set_editor, only: %i[ show edit update destroy ]

  def index
    @editors = Editor.all
  end

  def show
  end

  def new
    @editor = Editor.new
  end

  def edit
  end

  def create
    @editor = Editor.new(editor_params)

    if @editor.save
      redirect_to @editor, notice: "Editor was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @editor.update(editor_params)
      redirect_to @editor, notice: "Editor was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @editor.destroy
    redirect_to editors_url, notice: "Editor was successfully destroyed."
  end

  private

  def set_editor
    @editor = Editor.find(params[:id])
  end

  def editor_params
    params.require(:editor).permit(:title, :body)
  end
end
