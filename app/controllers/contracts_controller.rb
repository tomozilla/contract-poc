class ContractsController < ApplicationController
  before_action :set_contract, only: %i[show edit update]

  def index
    @contracts = Contract.all
  end

  def show
  end

  def new
    @contract = Contract.new
  end

  def create
    @contract = Contract.new(contract_params)
    if @contract.save
      redirect_to @contract, notice: "Contract created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @contract.update(contract_params)
      redirect_to @contract, notice: "Contract updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_contract
    @contract = Contract.find(params[:id])
  end

  def contract_params
    params.require(:contract).permit(:title, :status, :content)
  end
end
