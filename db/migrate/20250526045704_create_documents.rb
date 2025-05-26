class CreateDocuments < ActiveRecord::Migration[8.0]
  def change
    create_table :documents do |t|
      t.string :name
      t.string :pdf_url

      t.timestamps
    end
  end
end
