<!--
  - /*
  -  * Copyright 2018-2021 Antoniazzi Holding BV
  -  *
  -  * This program is free software: you can redistribute it and/or modify it
  -  * under the terms of the GNU General Public License as published by
  -  * the Free Software Foundation, either version 3 of the License,
  -  * or (at your option) any later version.
  -  *
  -  * This program is distributed in the hope that it will be useful,
  -  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  -  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  -  * GNU General Public License for more details.
  -  *
  -  * You should have received a copy of the GNU General Public License
  -  * along with this program. If not, see <https://www.gnu.org/licenses/>.
  -  */
  -->

<template>
  <div class="container-fluid">

    <div class="d-flex justify-content-between mb-3 search-banner">
      <div class="p-2" style="width:70%">
        <simple-search @onSearch="searchDeliveryMethod"></simple-search>
      </div>
      <div class="p-4">
        <button tag="button" data-toggle="modal" data-target="#deliveryMethodsModal" class="btn btn-primary float-right create-button" @click="resetDeliveryMethod">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newDeliveryMethod')}}</span>
        </button>
      </div>
    </div>

    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="$props.active"
      :table="'deliveryMethod'"
      :noDataLabel="'labels.noData'"
      @onEdit="editDeliveryMethod"
      @onDelete="removeDeliveryMethod"
      :service="deliveryMethodService"/>
    <div class="modal" data-backdrop="static" data-keyboard="false" id="deliveryMethodsModal" tabindex="-1" role="dialog" ref="deliveryMethodsModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <form name="editForm" role="form" novalidate @submit.prevent.stop="save()">
            <div class="modal-header">
              <h5 v-if="deliveryMethod && deliveryMethod.id === undefined">{{$t('labels.newDeliveryMethod')}}</h5>
              <h5 v-if="deliveryMethod && deliveryMethod.id > 0">{{$t('labels.editDeliveryMethod')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left">
              <div class="mt-4">
                <div class="form-group">
                  <multi-language-component
                    :config="multiLangConfig"
                    :value="deliveryMethod.deliveryMethodLanguages"
                    @onAdd="addNewDeliveryMethodLang"
                    @onChange="changeNewDeliveryMethodLang"
                    name="deliveryMethodLang"
                    @onRemove="removeDeliveryMethodLang"></multi-language-component>
                </div>
                <div class="form-group">
                  <label>{{$t('labels.deliveryMethodType')}}</label>
                  <select :class="{'form-control':true, invalid: errors.has('methodType')}" name="methodType" v-validate="'required'" v-model="deliveryMethod.deliveryMethodType">
                    <option v-for="(item, inde) in deliveryMethodOptions" :key="inde" :value="item.value">
                      {{item.label}}
                    </option>
                  </select>
                  <span class="text-danger">{{ errors.first('methodType') }}</span>
                </div>
                <div v-if="deliveryMethod.deliveryMethodType === 'DIGITAL'">
                  <div class="form-group">
                    <multi-language-component
                      :config="multiLangConfigDigital"
                      :value="digitalConfig.subject"
                      @onAdd="addNewDigitalSubject"
                      @onChange="changeNewDigitalSubject"
                      @onRemove="removeDigitalSubject"></multi-language-component>
                  </div>
                  <div class="form-group">
                    <label>{{$t('labels.fromAddress')}}</label>
                    <input type="email" v-validate="'required|email'" name="fromAddress"
                           v-model="digitalConfig.fromAddress" :class="{'form-control':true, invalid: errors.has('fromAddress')}"/>
                    <span class="text-danger">{{ errors.first('fromAddress') }}</span>
                  </div>
                  <div class="form-group">
                    <label>{{$t('labels.fromName')}}</label>
                    <input type="text" v-model="digitalConfig.fromName" class="form-control">
                  </div>
                  <div class="form-group">
                    <label>{{$t('labels.replyToAddress')}}</label>
                    <input v-validate="'email'" name="toAddress" type="email" v-model="digitalConfig.replyToAddress"
                           :class="{'form-control':true, invalid: errors.has('toAddress')}">
                    <span class="text-danger">{{ errors.first('toAddress') }}</span>
                  </div>
                  <div class="form-group">
                    <label>{{$t('labels.replyToName')}}</label>
                    <input type="email" v-model="digitalConfig.replyToName" class="form-control">
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">{{$t('labels.content')}}</label>
                    <MultiLanguageHtmlEditorComponent
                      :availableLangs="availableLangs"
                      :content.sync="digitalConfig.content"
                      @contentChanged="updateDigitalContent"></MultiLanguageHtmlEditorComponent>
                  </div>
                </div>
                <div v-if="deliveryMethod.deliveryMethodType === 'INHOUSE'">
                  <div class="form-group">
                    <label>{{$t('labels.notifyMe')}}</label>
                    <select type="notifyMe" v-model="inHouseConfig.notifyMe" class="form-control">
                      <option value="NO_ACTION">{{$t('labels.noAction')}}</option>
                      <option value="NOTIFICATION_PER_ORDER">{{$t('labels.notificationPerOrder')}}</option>
                      <option value="DAILY_DELIVERY_LIST">{{$t('labels.dailyDeliveryList')}}</option>
                      <option value="WEEKLY_DELIVERY_LIST">{{$t('labels.weeklyDeliveryList')}}</option>
                      <option value="MONTHLY_DELIVERY_LIST">{{$t('labels.monthlyDeliveryList')}}</option>
                    </select>
                  </div>
                </div>
                <div v-if="deliveryMethod.deliveryMethodType === 'OTHER_PARTY'">
                  <div class="form-group">
                    <label>{{$t('labels.deliverer')}}</label>
                    <select  v-model="thirdPartyConfig.deliverer" class="form-control">
                      <option value="PakjesFabriek">PakjesFabriek</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>{{$t('labels.apiKey')}}</label>
                    <input type="apiKey" v-model="thirdPartyConfig.apiKey" class="form-control">
                  </div>
                  <div class="form-group">
                    <label>{{$t('labels.accountName')}}</label>
                    <input type="accountNme" v-model="thirdPartyConfig.accountName" class="form-control">
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  @click="closeModal">{{$t('buttons.close')}}</button>
              <button type="submit" class="btn btn-primary">{{$t('buttons.save')}}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./deliveryMethods.component.ts"></script>
