class CreateEditors < ActiveRecord::Migration[8.0]
  def change
    create_table :editors do |t|
      t.string :title
      t.jsonb :draft_body

      t.timestamps
    end
  end
end
