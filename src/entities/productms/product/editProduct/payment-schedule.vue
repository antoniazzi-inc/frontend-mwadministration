<template>
  <div class="content-w text-left">
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
        <div v-if="!editMode">
          <div role="tablist" v-if="paymentSchedules.length">
            <div class="accordion" id="accordionFeatures">
              <template @click.prevent="selectedPaymentSchedule = item" v-for="(item, index) in paymentSchedules">
                <div class="card schedule" :key="index">
                  <div class="card-header row pl-0 ml-0 pr-0 mr-0 align-items-center" :id="'headingOne' + index">
                    <h2 class="mb-0 col-md-10">
                      <button class="btn btn-link" type="button" data-toggle="collapse"
                              :data-target="'#collapseOne' + index" aria-expanded="false"
                              :aria-controls="'collapseOne' + index">
                        {{item.name}}
                      </button>
                    </h2>
                    <div class="col-md-2 text-right">
                      <i class="fas fa-edit text-warning" @click="editPaymentSchedule(item)"/>
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
                          <td>{{option.price}}</td>
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
                <h3 class="title">{{$t('labels.addEditPaymentSchedule')}}</h3>
                <hr/>
                <div class="form-group">
                  <label class="form-control-label">{{$t('labels.name')}}</label>
                  <input class="form-control" type="text" v-model="selectedPaymentSchedule.name"/>
                </div>
                <div class="form-group">
                  <label class="form-control-label">{{$t('labels.period')}}</label>
                  <select class="form-control" v-model="selectedPaymentSchedule.period">
                    <option value="day">{{$t('labels.day')}}</option>
                    <option value="week">{{$t('labels.week')}}</option>
                    <option value="month">{{$t('labels.month')}}</option>
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
                <button type="button" class="btn btn-outline-primary ml-2" @click.prevent="addNewPaymentScheduleOption">
                  <i class="fas fa-plus"></i> {{$t('buttons.newPaymentScheduleOption')}}
                </button>
                <hr/>
                <div v-for="(option, key) in selectedPaymentSchedule.paymentScheduleOptions" :key="key">
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label class="form-control-label">{{$t('labels.name')}}</label>
                      <input type="text" class="form-control" v-model="option.name"/>
                    </div>
                    <div class="form-group col-md-5">
                      <label class="form-control-label">{{$t('labels.priceAmount')}}</label>
                      <money v-model="option.price" class="form-control" name="priceAmount" v-bind="money"/>
                    </div>
                    <div class="form-group col-md-1 align-content-center">
                      <i class="fa fa-trash-alt ml-2 cursor-pointer" data-toggle="modal"
                         data-target="#removeEntityPaymentScheduleOption"
                         @click.prevent="prepareRemoveScheduleOption(option)"></i>
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
</style>
