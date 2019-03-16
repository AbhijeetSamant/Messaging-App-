json.extract! message, :id, :to, :from, :mess, :status, :created_at, :updated_at
json.url message_url(message, format: :json)
