class ArticlesController < ApplicationController
  def show
    @article = Article.find params[:id]
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)
    @article.body_html = @article.parse_body_markdown_to_html

    @article.save!

    redirect_to @article
  end

  def edit
    @article = Article.find params[:id]
  end

  def update
    @article = Article.find params[:id]
    @article.attributes = article_params
    @article.body_html = @article.parse_body_markdown_to_html

    @article.save!

    redirect_to @article
  end

  private

  def article_params
    params.require(:article).permit(:title, :body)
  end
end
