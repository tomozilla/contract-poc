class CreateContracts < ActiveRecord::Migration[8.0]
  def change
    create_table :contracts do |t|
      t.string :title
      t.jsonb :content
      t.integer :status
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
