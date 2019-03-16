class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :to
      t.integer :from
      t.string :mess
      t.string :status

      t.timestamps null: false
    end
  end
end
