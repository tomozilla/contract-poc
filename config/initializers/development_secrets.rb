# Set fake secret_key_base in development mode to bypass credentials
Rails.application.config.secret_key_base = "development_secret_key_base_for_testing_only" if Rails.env.development?
