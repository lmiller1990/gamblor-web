require 'rails_helper'

RSpec.describe AppController, type: :controller do

  let!(:user) { create(:user) }

  describe "GET #index" do
    subject { get :index }

    context 'user is signed in' do
      it "returns http success" do
        sign_in user
        subject

        expect(response).to have_http_status(200)
      end
    end

    context 'user is not signed in' do
      it 'redirects to sign in path' do
        expect(subject).to redirect_to new_user_session_path
      end
    end
  end
end
