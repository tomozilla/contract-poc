class RemoveCompanyFromContracts < ActiveRecord::Migration[8.0]
  def change
    remove_reference :contracts, :company, foreign_key: true
  end
end
