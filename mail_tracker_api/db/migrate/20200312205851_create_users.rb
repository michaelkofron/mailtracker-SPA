class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :home_marker_lat
      t.string :home_marker_lng
    end
  end
end
