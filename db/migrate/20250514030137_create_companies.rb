class CreateCompanies < ActiveRecord::Migration[8.0]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :address
      t.string :industry
      t.string :website
      t.integer :year

      t.timestamps
    end
  end
end
