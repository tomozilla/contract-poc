class AddGinIndexToEditorsDraftBody < ActiveRecord::Migration[8.0]
  def change
    add_index :editors, :draft_body, using: :gin
  end
end
