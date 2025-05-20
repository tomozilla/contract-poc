require "test_helper"

class EditorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get editors_index_url
    assert_response :success
  end

  test "should get show" do
    get editors_show_url
    assert_response :success
  end

  test "should get new" do
    get editors_new_url
    assert_response :success
  end

  test "should get edit" do
    get editors_edit_url
    assert_response :success
  end

  test "should get create" do
    get editors_create_url
    assert_response :success
  end

  test "should get update" do
    get editors_update_url
    assert_response :success
  end

  test "should get destroy" do
    get editors_destroy_url
    assert_response :success
  end
end
