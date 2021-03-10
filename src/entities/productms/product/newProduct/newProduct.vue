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
  <div class="container-fluid text-left">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.newProduct')}}</span>
      <router-link to="/products" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-secondary float-right create-tag">
          <span>{{$t('labels.backToProducts')}}</span>
        </button>
      </router-link>
    </h2>
    <div class="wizard-panel">
      <form-wizard @on-complete="onComplete"
         :title="''"
         :subtitle="''"
         shape="circle"
         @on-change="changeTab"
         :start-index="startIndex"
         color="#0a7cf8"
         error-color="#ff4949">
      <tab-content @click="step = 0" :title="product.productType.toLowerCase() + ' ' + $t('labels.product')" icon="fas fa-user-tie">
        <div class="row justify-content-center">
          <div class="profile-tile profile-tile-inlined col-md-2 col-xs-4">
            <router-link @click.native.prevent="changeProductType('DIGITAL')" to="" :class="{'profile-tile-box': true, active: product.productType === 'DIGITAL'}">
              <div>
                <i class="productIcon dashicons dashicons-download"></i>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.digital')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-2 col-xs-4">
            <router-link @click.native.prevent="changeProductType('COURSE')" to="" :class="{'profile-tile-box': true, active: product.productType === 'COURSE'}">
              <div>
                <i class="productIcon dashicons dashicons-book-alt"></i>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.course')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-2 col-xs-4">
            <router-link @click.native.prevent="changeProductType('PHYSICAL')" to="" :class="{'profile-tile-box': true, active: product.productType === 'PHYSICAL'}">
              <div>
                <i class="productIcon fa fa-truck"></i>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.physical')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-2 col-xs-4">
            <router-link @click.native.prevent="changeProductType('SERVICE')" to="" :class="{'profile-tile-box': true, active: product.productType === 'SERVICE'}">
              <div>
                <i class="productIcon fa fa-cogs"/>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.service')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-2 col-xs-4">
            <router-link @click.native.prevent="changeProductType('VOUCHER')" to="" :class="{'profile-tile-box': true, active: product.productType === 'VOUCHER'}">
              <div>
                <i class="productIcon fa fa-ticket-alt"/>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.voucher')}}
              </div>
            </router-link>
          </div>
        </div>
      </tab-content>
      <tab-content  @click="step = 1" :title="$t('labels.productDetails')" icon="fas fa-tags" :before-change="validateStep">
        <form>

          <div class="form-group">
            <multi-language-component
              :config="multiLangConfig"
              :value="product.productLanguages"
              :isValidating="isValidatingStep2"
              @onAdd="addProductLang"
              @onChange="changeProductLang"
              @onRemove="removeProductLang"/>
          </div>

          <div>
            <product-price @priceChanged="changePrice"/>
          </div>

          <div class="form-row align-items-left">
            <div class="form-group col-auto">
              <label>{{$t('labels.validFrom')}}</label>
              <div class="dateHolder date-input">
                <flat-pickr :config="validFromConfig" class="single-daterange form-control" id="validFromDate" v-model="availableFrom"/>
              </div>
            </div>
            <div class="form-group col-auto">
              <label>{{$t('labels.validTo')}}</label>
              <div class="dateHolder date-input">
                <flat-pickr :config="validToConfig" v-model="availableTo" class="single-daterange form-control" id="validToDate"/>
                <i class="fa fa-times clearDate cursor-pointer" @click="availableTo=null">
                  <span aria-hidden="true" class="sr-only">X</span>
                </i>
              </div>
              <span class="small text-danger" v-if="isValidatingStep2 && availableTo !== null && validateAvailableTo">{{$t('labels.validToMustBeAfterValidFrom')}}</span>
            </div>
            <div class="col-auto" style="margin-left:100px;" v-if="product.productType === 'SERVICE'">
              <div class="form-group">
                <label class="control-label">{{$t('labels.priceType')}}</label>
                <select :class="{'form-control': true}" v-model="product.typeService.priceType">
                  <option value="FIXED">{{$t('labels.fixed')}}</option>
                  <option value="MINUTES_15">{{$t('labels.15minutes')}}</option>
                  <option value="MINUTES_30">{{$t('labels.30minutes')}}</option>
                  <option value="MINUTES_45">{{$t('labels.45minutes')}}</option>
                  <option value="HOUR">{{$t('labels.hourly')}}</option>
                  <option value="DAY">{{$t('labels.daily')}}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-row align-items-left price-row">
            <div class="col-auto" style="margin-right:30px;">
              <label class="control-label">{{$t('labels.isSubscription')}}</label>
              <toggle-switch id="repeatSubscription"
                             :on-text="$t('labels.yes')"
                             :off-text="$t('labels.no')"
                             :value.sync="isSubscription"/>
            </div>
            <div class="form-group col-auto" v-if="isSubscription && product.productSubscription">
              <label class="control-label">{{$t('labels.startDate')}}</label>
              <select :class="{'form-control':true, invalid: errors.has('Start Date')}" v-validate="'required'"
                      v-model="product.productSubscription.startDate" name="Start Date">
                <option value="firstOfCurrentMonth">{{$t('labels.startAtBeginningOfCurrentMonth')}}</option>
                <option value="firstOfNextMonth">{{$t('labels.beginningOfNextMonth')}}</option>
                <option value="now">{{$t('labels.atThisMoment')}}</option>
                <option value="paymentDone">{{$t('labels.startAfterPaymentIsDone')}}</option>
              </select>
              <span class="small text-danger">{{errors.first('Start Date')}}</span>
            </div>
            <div class="form-group col-auto" v-if="isSubscription && product.productSubscription">
              <label class="control-label">{{$t('labels.period')}}</label>
              <select :class="{'form-control':true, invalid: errors.has('period')}" v-validate="'required'"
                      v-model="product.productSubscription.period" name="period">
                <option value="weekly">{{$t('labels.weekly')}}</option>
                <option value="bi-weekly">{{$t('labels.bi-weekly')}}</option>
                <option value="month">{{$t('labels.month')}}</option>
                <option value="quarter">{{$t('labels.quarter')}}</option>
                <option value="half-Year">{{$t('labels.halfYear')}}</option>
                <option value="year">{{$t('labels.year')}}</option>
              </select>
              <span class="small text-danger">{{errors.first('period')}}</span>
            </div>
            <div class="form-group col-auto" v-if="isSubscription && product.productSubscription">
              <label class="form-control-label">{{$t('labels.subscriptionMaxTerms')}}</label>
              <input :class="{'form-control':true}"
                     type="number" name="Subscription Max Terms" style="max-width:100px" v-model="product.productSubscription.maxTimes"/>
            </div>
          </div>

        </form>
      </tab-content>

      <tab-content  @click="step = 2" :title="$t('labels.thumbnail')" icon="fas fa-receipt" >
        <upload-widget @onError="imageUploadError" @onUpload="imageLoaded" @newImageAdded="imageUploaded" @onRemove="onImageRemove" :all-files="allImages" v-if="step === 2"/>
      </tab-content>

      <tab-content  @click="step = 3" :title="$t('labels.finalStep')" icon="fas fa-receipt" :before-change="validateStep">
        <h5 class="text-danger" v-if="product.productType === 'DIGITAL' && isSaving === false">{{$t('labels.pleaseUploadAfileOrProvideALink')}}</h5>
        <div class="row m-5" v-if="isSaving">
          <div class="col-md-12 m-5 p-5 text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <p class="mt-5">{{$t('labels.pleaseWait')}}</p>
            <div class="progress mt-2">
              <div class="progress-bar" role="progressbar" :style="{width: `${progress}%`}" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">{{progress}}%</div>
            </div>
          </div>
        </div>
        <form v-else>
          <div class="form-group" v-if="product.productType === 'DIGITAL'">
            <label class="control-label">{{$t('labels.uploadFile')}}</label>
            <toggle-switch
                           :on-text="$t('labels.yes')"
                           :off-text="$t('labels.no')"
                           :value.sync="notUrl"></toggle-switch>
          </div>
          <div class="form-group" v-if="product.productType === 'DIGITAL' && !notUrl">
            <label class="control-label">{{$t('labels.provideLink')}}</label>
            <input type="url" @blur="checkForHttp" v-model="product.typeDigital.url" :class="{'form-control': true, invalid: errors.has('url')}"
                   name="url" v-validate="'required|url'"/>
            <span class="small text-danger">{{errors.first('url')}}</span>
          </div>
          <div class="form-group" v-if="product.productType === 'DIGITAL' && notUrl && step === 3">
            <label class="control-label">{{$t('labels.orUploadFile')}}</label>
            <upload-widget @onError="digitalUploadError" @onUpload="digitalLoaded" @newImageAdded="digitalUploaded" :accept="'application/*'" :extensions="'pdf,xls,zip,rar'" @onRemove="digitalRemove" :all-files="allDigitalFiles"/>
          </div>
          <div class="form-group" v-if="product.productType === 'COURSE'">
            <label class="col-md-6 control-label">{{$t('labels.selectCourse')}}</label>
            <searchable-select-component :config="searchableConfigCourses"
                                         :options="$store.state.lookups.courses"
                                         :value="selectedCourse"
                                         @onCreate="addNewCourse"
                                         @onSelected="updateCourse"
                                         @onDelete="removeCourse"
            ></searchable-select-component>
          </div>
          <div class="form-group text-center" v-if="product.productType === 'PHYSICAL' || product.productType=== 'SERVICE'">
            <h3>{{$t('labels.clickSaveToProceed')}}</h3>
          </div>
        </form>
      </tab-content>
        <div class="row">
          <div class="col-md-12 text-right">
            <span class="small text-danger pull-right" v-if="errors.all().length">{{$t('labels.thereAreSomeErrors')}}</span>
          </div>
        </div>
      <button @click="stepBack" slot="prev" class="btn btn-primary btn-lg" :disabled="isSaving" style="min-width:140px;">{{$t('buttons.back')}}</button>
      <button @click="stepForward" slot="next" class="btn btn-primary" style="min-width:140px;" :disabled="isSaving">{{$t('buttons.next')}}</button>
      <button slot="finish" class="btn btn-primary btn-lg" style="min-width:140px;" :disabled="isSaving">{{$t('buttons.finish')}}</button>
    </form-wizard>
    </div>
  </div>
</template>
<script type="ts" src="./newProduct.component.ts"></script>

<style scoped>
  .profile-tile .profile-tile-box {
    width: 210px!important;
  }
  .productIcon{
    font-size: 4.5rem;
  }
  .price-row {
    margin-top: 2em;
    margin-bottom: 2em;
  }
  .price-row .col-auto {
    margin-right: 20px;
  }
  .profile-tile-box:hover{
    -webkit-box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
    -moz-box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
    box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
  }
  .profile-tile-box.active{
    -webkit-box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
    -moz-box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
    box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
  }
  .switch-label:before{
    right: 0!important;
  }
  .generateCode{
    padding: 10px;
  }
  .profile-tile{
    border-bottom: none;
  }

</style>
