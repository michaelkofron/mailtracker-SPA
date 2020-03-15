class CreateNumbers < ActiveRecord::Migration[6.0]
  def change
    create_table :numbers do |t|
      t.string :number
      t.integer :user_id
    end
  end
end
