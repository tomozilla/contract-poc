require "test_helper"

class EditorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get editors_path
    assert_response :success
  end

  test "should get show" do
    get editor_path(editors(:one))
    assert_response :success
  end

  test "should get new" do
    get new_editor_path
    assert_response :success
  end

  test "should get edit" do
    get edit_editor_path(editors(:one))
    assert_response :success
  end

  test "should create editor" do
    assert_difference("Editor.count") do
      post editors_path, params: { editor: { title: "New Editor", body: "Test body" } }
    end

    assert_redirected_to editor_path(Editor.last)
  end

  test "should update editor" do
    patch editor_path(editors(:one)), params: { editor: { title: "Updated Title", body: "Updated body" } }
    assert_redirected_to editor_path(editors(:one))
  end

  test "should destroy editor" do
    assert_difference("Editor.count", -1) do
      delete editor_path(editors(:one))
    end

    assert_redirected_to editors_path
  end
end
