class Article < ApplicationRecord
  def parse_body_markdown_to_html
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, tables: true)

    markdown.render(body).strip
  end
end
