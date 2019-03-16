json.extract! user, :id, :name, :company, :email, :password, :image, :group, :created_at, :updated_at
json.url user_url(user, format: :json)
