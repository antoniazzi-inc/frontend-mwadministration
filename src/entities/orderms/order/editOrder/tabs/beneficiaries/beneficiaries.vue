<template>
    <div class="p-3 text-left">
        <div class="row justify-content-center">
            <div class="col-12">
                    <div>
                        <div class="row">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>{{$t('labels.fullName')}}</th>
                                    <th>{{$t('labels.email')}}</th>
                                    <th>{{$t('labels.product')}}</th>
                                    <th>{{$t('labels.quantity')}}</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in orderCopy.orderLines" :key="index">
                                        <td>{{item.orderLineBeneficiary ? item.orderLineBeneficiary.fullName : orderCopy.orderCustomer.fullName}}</td>
                                        <td>{{item.orderLineBeneficiary ? item.orderLineBeneficiary.email : orderCopy.orderCustomer.email}}</td>
                                        <td>{{item.orderProduct.productName}}</td>
                                        <td>{{item.quantity}}</td>
                                        <td class="text-center">
                                            <div class="btn-group flex-btn-group-container">
                                                <div @click.prevent="editBeneficiary(item)" data-target="#editBeneficiary" data-toggle="modal"  class="ml-3 text-primary cursor-pointer">
                                                    <i class="fas fa-edit"></i>
                                                </div>
                                                <div class="text-danger ml-3 cursor-pointer" data-target="#removeBeneficiary" data-toggle="modal" @click.prevent="prepareRemove(item, index)">
                                                    <i class="fas fa-trash-alt"></i>
                                                </div>
                                                <div class="ml-3 cursor-pointer" data-target="#copyBeneficiary" data-toggle="modal" @click.prevent="copyBeneficiary(item, index)">
                                                    <i class="fas fa-copy"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </div>
      <div class="modal" data-backdrop="static" data-keyboard="false" id="removeBeneficiary" tabindex="-1" role="dialog" ref="removeBeneficiary">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5>{{$t('labels.confirmDelete')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mt-4">
                <h5>{{$t('labels.areYouSureToDelete')}}</h5>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="removeBeneficiary">
                {{$t('buttons.confirm')}}
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal" data-backdrop="static" data-keyboard="false" id="copyBeneficiary" tabindex="-1" role="dialog" ref="copyBeneficiary">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5>{{$t('labels.copy')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row">
                  <div class="col-md-12">
                    <label class="form-control-label">{{$t('labels.chooseBeneficiary')}}</label>
                    <searchable-select-component :config="singleSelectConfig"
                                                 :options="allRelations"
                                                 :value="selectedCopyBeneficiary"
                                                 @onChange="addCopyBeneficiary"
                                                 @onDelete="removeCopyBeneficiary"/>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="copyBenef">
                {{$t('buttons.copy')}}
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal" data-backdrop="static" data-keyboard="false" id="editBeneficiary" tabindex="-1" role="dialog" ref="editBeneficiary">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5>{{$t('labels.edit')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row" v-if="selectedBeneficiary">
                  <div class="col-md-3">
                    <div class="form-group">
                      <label class="form-control-label">{{$t('labels.title')}}</label>
                      <input type="text" v-model="selectedBeneficiary.title" class="form-control"/>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="form-group">
                      <label class="form-control-label">{{$t('labels.fullName')}}</label>
                      <input type="text" v-model="selectedBeneficiary.fullName" class="form-control"/>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label class="form-control-label">{{$t('labels.email')}}</label>
                      <input type="email" v-model="selectedBeneficiary.email" class="form-control"/>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <label class="form-control-label">{{$t('labels.address')}}</label>
                    <form class="form-inline">
                      <label class="sr-only"> {{$t('labels.street')}}</label>
                      <input v-model="selectedBeneficiaryAddress.street" class="form-control mb-2 mr-sm-2 mb-sm-0" :placeholder="$t('labels.street')" type="text">
                      <label class="sr-only"> {{$t('labels.houseNumber')}}</label>
                      <input v-model="selectedBeneficiaryAddress.houseNumber" class="form-control mb-2 mr-sm-2 mb-sm-0" :placeholder="$t('labels.houseNumber')" type="text">
                      <label class="sr-only"> {{$t('labels.city')}}</label>
                      <input v-model="selectedBeneficiaryAddress.city" class="form-control mb-2 mr-sm-2 mb-sm-0" :placeholder="$t('labels.city')" type="text">
                      <label class="sr-only"> {{$t('labels.postalCode')}}</label>
                      <input v-model="selectedBeneficiaryAddress.postalCode" class="form-control mb-2 mr-sm-2 mb-sm-0" :placeholder="$t('labels.postalCode')" type="text">
                      <label class="sr-only"> {{$t('labels.country')}}</label>
                      <searchable-select-component :config="multiSelectConfigCountry"
                                                   :options="$store.state.allCountries"
                                                   :value="selectedCountry"
                                                   @onChange="addCountry"
                                                   @onDelete="removeCountry"/>
                    </form>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <label class="form-control-label">{{$t('labels.quantity')}}</label>
                    <input type="number" min="0" class="form-control" v-model="selectedOrderLine.quantity"/>
                  </div>
                </div>
                <div class="row" v-if="selectedOrderLine.orderProduct ? selectedOrderLine.orderProduct.productType === 'COURSE' : false">
                  <div class="col-md-12">
                    <p>TODO: When courses are implemented implement this too</p>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="saveBeneficiary">
                {{$t('buttons.save')}}
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script lang="ts" src="./beneficiaries.component.ts">
</script>
<style scoped>

</style>
