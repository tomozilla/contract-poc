require "test_helper"

class DocumentsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  test "should get show" do
    sign_in users(:one)
    get document_url(documents(:one))
    assert_response :success
  end
end
