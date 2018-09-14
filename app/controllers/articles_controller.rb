class ArticlesController < ApplicationController
  def show
    @article = Article.find params[:id]
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.create!(article_params)

    redirect_to @article
  end

  def edit
    @article = Article.find params[:id]
  end

  def update
    @article = Article.find params[:id]

    @article.update_attributes!(article_params)

    redirect_to @article
  end

  private

  def article_params
    params.require(:article).permit(:title, :body)
  end
end
