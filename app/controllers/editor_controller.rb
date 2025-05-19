class EditorController < ApplicationController
  before_action :set_editor, only: [ :show, :edit, :update ]

  def index
    @editors = Editor.all
  end

  def show
  end

  def new
    @editor = Editor.new
  end

  def create
    @editor = Editor.new(editor_params)

    if @editor.save
      redirect_to @editor, notice: "Editor was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    @editor.assign_attributes(editor_params)

    if @editor.changed == [ "draft_body" ]
      @editor.save(validate: false)
      head :no_content        # keeps cursor, zero redirect
    elsif @editor.save
      redirect_to @editor, notice: "Saved!"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_editor
    @editor = Editor.find(params[:id])
  end

  def editor_params
    params.require(:editor).permit(:title, :draft_body)
  end
end
