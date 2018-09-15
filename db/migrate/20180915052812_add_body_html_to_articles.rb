class AddBodyHtmlToArticles < ActiveRecord::Migration[5.2]
  def change
    add_column :articles, :body_html, :text
  end
end
