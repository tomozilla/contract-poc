require "test_helper"

class ContractsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @contract = contracts(:one)
  end

  test "should get index" do
    get contracts_url
    assert_response :success
  end

  test "should get show" do
    get contract_url(@contract)
    assert_response :success
  end

  test "should get new" do
    get new_contract_url
    assert_response :success
  end

  test "should get edit" do
    get edit_contract_url(@contract)
    assert_response :success
  end

  test "should create contract" do
    assert_difference("Contract.count") do
      post contracts_url, params: { contract: { title: "New Contract", content: @contract.content, status: @contract.status } }
    end

    assert_redirected_to contract_url(Contract.last)
  end

  test "should update contract" do
    patch contract_url(@contract), params: { contract: { title: "Updated Contract" } }
    assert_redirected_to contract_url(@contract)
  end
end
