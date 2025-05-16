require "application_system_test_case"

class CompaniesTest < ApplicationSystemTestCase
  setup do
    @company = companies(:one)
  end

  test "visiting the index" do
    visit companies_url
    assert_selector "h1", text: "Companies"
  end

  test "should create company" do
    visit companies_url
    click_on "Add New Company"

    fill_in "Address", with: @company.address
    fill_in "Industry", with: @company.industry
    fill_in "Name", with: @company.name
    fill_in "Website", with: @company.website
    fill_in "Year", with: @company.year
    click_on "Create Company"

    assert_text "Company was successfully created"
    # After creation, we're redirected to the show page which doesn't have a Cancel button
  end

  test "should update Company" do
    visit company_url(@company)
    click_on "Edit", match: :first

    fill_in "Address", with: @company.address
    fill_in "Industry", with: @company.industry
    fill_in "Name", with: @company.name
    fill_in "Website", with: @company.website
    fill_in "Year", with: @company.year
    click_on "Update Company"

    assert_text "Company was successfully updated"
    # After update, we're redirected to the show page which doesn't have a Cancel button
  end

  test "should destroy Company" do
    visit company_url(@company)
    page.accept_confirm do
      click_on "Destroy this company", match: :first
    end

    # After destroy, we're redirected to the index page
    assert_current_path companies_path
    assert_text "Company was successfully destroyed"
  end
end
