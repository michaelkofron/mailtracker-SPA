class CreateNumbers < ActiveRecord::Migration[6.0]
  def change
    create_table :numbers do |t|
      t.string :number
    end
  end
end
