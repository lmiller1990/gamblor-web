require 'rails_helper'

describe 'edits an article', type: :system do

  let!(:user) { create(:user) }
  let!(:article) { create(:article) }

  it 'edits an article' do
    sign_in user

    visit edit_article_path({ id: article.id })

    fill_in 'article_title', with: 'new_title'
    fill_in 'article_body', with: 'new_body'
    click_on 'Update Article'

    article.reload

    expect(article.title).to eq 'new_title' 
    expect(article.body).to eq 'new_body' 
  end
end
