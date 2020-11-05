<template>
  <div class="tab-form-panel">
    <p>{{$t('labels.voucherSettings')}}</p>
    <form>
      <div class="form-row mt-4">
        <div class="form-group col-md-6">
          <label class="form-control-label">{{$t('labels.fulfilmentParty')}}</label>
          <select class="form-control" v-model="voucherSettings.type">
            <option value="money">{{$t('labels.money')}}</option>
            <option value="time">{{$t('labels.timeMinutes')}}</option>
            <option value="points">{{$t('labels.points')}}</option>
          </select>
        </div>
      </div>
        <div class="form-row mt-4">
          <div class="form-group col-md-6">
            <div class="row">
              <div class="form-group col-md-6" v-if="voucherSettings.type === 'time'">
                <label class="form-control-label">{{$t('labels.numberOfMinutes')}}</label>
                <input  type="number" class="form-control" v-model="voucherSettings.numberOfMinutes"/>

              </div>
              <div class="form-group col-md-6"  v-if="voucherSettings.type === 'points'">
                <label class="form-control-label">{{$t('labels.numberOfPoints')}}</label>
                <input  type="number" class="form-control" v-model="voucherSettings.numberOfPoints"/>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label class="form-control-label">{{$t('labels.daysValid')}}</label>
                <input type="number" class="form-control" v-model="voucherSettings.daysValid"/>

              </div>
            </div>
          </div>
        </div>
        <div class="form-buttons-w text-right">
          <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
          <button class="btn btn-outline-primary" @click.prevent="cancel">{{$t('buttons.cancel')}}</button>
          <button class="btn btn-primary ml-2" @click.prevent="save">{{$t('buttons.save')}}</button>
        </div>
      </form>
  </div>
</template>
<script lang="ts" src="./voucherTab.component.ts"></script>
