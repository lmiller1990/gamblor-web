# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_10_31_084243) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "body_html"
  end

  create_table "bank_accounts", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "balance_cents", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_bank_accounts_on_user_id"
  end

  create_table "bets", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "price_cents"
    t.string "market"
    t.bigint "game_id"
    t.bigint "user_id"
    t.boolean "won"
    t.float "odds"
    t.integer "team_bet_on_id"
    t.integer "payout_cents"
    t.index ["game_id"], name: "index_bets_on_game_id"
    t.index ["user_id"], name: "index_bets_on_user_id"
  end

  create_table "contracts", force: :cascade do |t|
    t.bigint "player_id"
    t.bigint "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "start", null: false
    t.datetime "end_date"
    t.index ["player_id"], name: "index_contracts_on_player_id"
    t.index ["team_id"], name: "index_contracts_on_team_id"
  end

  create_table "games", force: :cascade do |t|
    t.integer "first_blood_team_id"
    t.integer "first_turret_team_id"
    t.datetime "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "winner_id"
    t.integer "loser_id"
    t.integer "red_side_team_id", null: false
    t.integer "blue_side_team_id", null: false
    t.integer "first_baron_team_id"
    t.integer "first_dragon_team_id"
    t.integer "first_turret_player_id"
    t.integer "first_dragon_player_id"
    t.integer "first_baron_player_id"
    t.integer "first_blood_player_id"
    t.integer "first_turret_type"
    t.float "first_dragon_time"
    t.float "first_blood_time"
    t.float "first_turret_time"
    t.float "first_baron_time"
    t.integer "league_id"
    t.string "gameid"
    t.integer "split_id"
    t.float "fb_odds"
    t.float "ft_odds"
    t.float "fd_odds"
    t.float "fbaron_odds"
    t.float "red_side_team_fb_odds"
    t.float "red_side_team_ft_odds"
    t.float "red_side_team_fd_odds"
    t.float "red_side_team_fbaron_odds"
    t.float "red_side_team_win_odds"
    t.float "blue_side_team_fb_odds"
    t.float "blue_side_team_ft_odds"
    t.float "blue_side_team_fd_odds"
    t.float "blue_side_team_fbaron_odds"
    t.float "blue_side_team_win_odds"
    t.float "blue_side_win_odds"
    t.float "red_side_win_odds"
    t.integer "game_number"
    t.string "match_uuid"
    t.boolean "match_complete", default: false, null: false
  end

  create_table "leagues", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position_id"
  end

  create_table "positions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "splits", force: :cascade do |t|
    t.datetime "start_date"
    t.datetime "end_date"
    t.bigint "league_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["league_id"], name: "index_splits_on_league_id"
  end

  create_table "subscribers", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "bank_accounts", "users"
  add_foreign_key "bets", "games"
  add_foreign_key "bets", "users"
  add_foreign_key "splits", "leagues"
end
