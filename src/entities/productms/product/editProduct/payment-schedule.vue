<template>
  <div class="content-w text-left" style="background-color: #fff; background: none">
    <div class="content-i">
        <div class="modal" data-backdrop="static" data-keyboard="false" id="removeEntityPaymentSchedule" tabindex="-1"
             role="dialog" ref="removeEntityPaymentSchedule">
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
                <button type="button" class="btn btn-primary" @click="removePaymentSchedule">
                  {{$t('buttons.confirm')}}
                </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal" data-backdrop="static" data-keyboard="false" id="removeEntityPaymentScheduleOption"
             tabindex="-1" role="dialog" ref="removeEntityPaymentScheduleOption">
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
                <button type="button" class="btn btn-primary" @click="RemoveScheduleOption">
                  {{$t('buttons.confirm')}}
                </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!editMode" style="background-color: #fff;">
          <div role="tablist" v-if="paymentSchedules.length" style="max-width:700px;">
            <div class="accordion" id="accordionFeatures">
              <template class="cursor-pointer pipeline-item mt-2" @click.prevent="selectedPaymentSchedule = item" v-for="(item, index) in paymentSchedules">
                <div class="card schedule" :key="index">
                  <div class="card-header row pl-0 ml-0 pr-0 mr-0 align-items-center" :id="'headingOne' + index" data-toggle="collapse" :data-target="'#collapseOne' + index" aria-expanded="false"
                       :aria-controls="'collapseOne' + index">
                    <h5 class="mb-0 col-md-10">
                      {{item.name}}
                      <span style="color:#909090; font-size:0.8em; text-align: right; padding-left:1em;">{{$t('labels.clickForOptions')}}...</span>
                    </h5>
                    <div class="col-md-2 text-right">
                      <i class="fas fa-edit text-success" @click="editPaymentSchedule(item)"/>
                      <i class="fas fa-trash-alt text-danger ml-2" data-toggle="modal"
                         data-target="#removeEntityPaymentSchedule" @click.prevent="prepareRemoveSchedule(item)"/>
                    </div>
                  </div>
                  <div :id="'collapseOne' + index" class="collapse show" :aria-labelledby="'headingOne' + index"
                       data-parent="#accordionFeatures">
                    <div class="card-body">
                      <table class="table table-striped">
                        <thead>
                        <th>{{$t('name')}}</th>
                        <th>{{$t('amount')}}</th>
                        <th>{{$t('action')}}</th>
                        </thead>
                        <tbody>
                        <tr v-for="(option, key) in item.paymentScheduleOptions" :key="key">
                          <td>{{option.name}}</td>
                          <td>{{option.price | formatAmount}}</td>
                          <td>
                            <div class="text-danger ml-3 cursor-pointer" data-toggle="modal"
                                 data-target="#removeEntityPaymentScheduleOption"
                                 @click.prevent="prepareRemoveScheduleOption(option)">
                              <i class="fas fa-trash-alt ml-2 text-danger"></i>
                            </div>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <!--
          <div class="justify-content-center text-center">
            <p>{{$t('labels.noData')}}</p>
          </div>
          -->
        </div>
        <div v-if="editMode || $props.addNewPayment" id="editScheduleForm">
          <div class="row">
            <div class="col-md-6">
              <form>
                <h3 class="title">{{$t('labels.editPaymentSchedule')}}</h3>
                <hr/>
                <div class="form-group">
                  <label class="form-control-label">{{$t('labels.name')}}</label>
                  <input class="form-control" type="text" v-model="selectedPaymentSchedule.name"/>
                </div>
                <div class="form-group">
                  <label class="form-control-label">{{$t('labels.period')}}</label>
                  <select class="form-control" v-model="selectedPaymentSchedule.period">
                    <option value="DAY">{{$t('labels.day')}}</option>
                    <option value="WEEK">{{$t('labels.week')}}</option>
                    <option value="BI_WEEK">{{$t('labels.biWeek')}}</option>
                    <option value="MONTH">{{$t('labels.month')}}</option>
                    <option value="QUARTER">{{$t('labels.quarter')}}</option>
                    <option value="HALF_YEAR">{{$t('labels.halfYear')}}</option>
                    <option value="YEAR">{{$t('labels.year')}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-control-label">{{$t('labels.availableForCustomers')}}</label>
                  <toggle-switch id="availableForCustomers"
                     :on-text="$t('labels.yes')"
                     :off-text="$t('labels.no')"
                     :value.sync="selectedPaymentSchedule.availableForCustomers"/>
                </div>
              </form>
            </div>
            <div class="col-md-6 scrollable-medium">
              <form>
                <button type="button" class="btn btn-primary ml-2" @click.prevent="addNewPaymentScheduleOption">
                  <i class="fas fa-plus"></i> {{$t('buttons.newPaymentScheduleOption')}}
                </button>
                <hr/>
                <div v-for="(option, key) in selectedPaymentSchedule.paymentScheduleOptions" :key="key">
                  <div class="form-row">
                    <div class="form-group col-auto">
                      <label class="form-control-label">{{$t('labels.name')}}</label>
                      <input type="text" class="form-control" v-model="option.name"/>
                    </div>
                    <div class="form-group col-auto">
                      <label class="form-control-label">{{$t('labels.priceAmount')}}</label>
                      <money v-model="option.price" style="max-width:100px;" class="form-control" name="priceAmount" v-bind="money"/>
                    </div>
                    <div class="form-group col-auto" style="padding-top:2em">
                      <button type="button" class="btn btn-sm" data-target="#removeEntityPaymentScheduleOption" data-toggle="modal" @click.prevent="prepareRemoveScheduleOption(option)">
                        <i class="fa fa-trash-alt" style="font-size:1.2em"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="form-buttons-w text-right">
            <button class="btn btn-outline-primary" @click.prevent="cancel">{{$t('buttons.cancel')}}</button>
            <button class="btn btn-primary ml-2" @click.prevent="save">{{$t('buttons.addPaymentSchedule')}}</button>
          </div>
        </div>
      </div>

  </div>
</template>
<script lang="ts" src="./payment-schedule.component.ts"></script>

<style scoped>
  #editScheduleForm {
    background-color: #f2f4f8;
    border: solid 1px #d0d0d0;
    margin:0.5em;
    margin-bottom:2em;
    border-radius: 10px;
    padding: 1em;
    box-shadow: 5px 20px 28px #aaa;
  }
  .schedule {
    margin-bottom:1em;
    padding:0px;
    border-radius: 16px;
    box-shadow: 4px 4px 4px #ccc;
    cursor: pointer;
  }
  .pipeline-item {
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 4px;
    position: relative;
    -webkit-box-shadow: 0px 5px 5px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0px 5px 5px 0 rgba(0, 0, 0, 0.2);
    border: 1px solid #e0e0e0;
  }
</style>
