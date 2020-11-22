<template>
  <div class="form-row align-items-left price-row">
    <div class="col-auto">
      <div class="form-group">
        <label class="control-label">{{ $t('labels.exclusivePrice') }}</label>
        <div class="input-group mb-3" style="padding-bottom:0; margin-bottom:0">
          <money style="max-width:150px; height:40px;" v-model="price"
                 :class="{'form-control': true, 'invalid': price <= 0.1}" v-bind="moneyConfig"
          :disabled="isInclusiveActive"/>
          <div class="input-group-append">
                    <span class="btn btn-rounded btn-success input-group-text cursor-pointer" id="basic-addon2" @click="isInclusiveActive = !isInclusiveActive">
                      <span v-if="!isInclusiveActive">{{ $t('labels.useInclPrice') }}</span>
                      <span v-if="isInclusiveActive">{{ $t('labels.useExclPrice') }}</span>
                    </span>
          </div>
        </div>
        <span v-if="price <= 0.1" class="text-danger small">{{ $t('labels.priceIsRequired') }}</span>
        <p style="padding-top:2px;">{{ $t('labels.inclusivePriceIs') }}:
          {{ $store.state.currency }} {{ getInclusivePrice() }}</p>
      </div>
    </div>
    <div class="col-auto">
      <div class="form-group" v-show="isInclusiveActive">
        <label class="control-label">{{ $t('labels.inclusivePrice') }}</label>
        <div class="input-group mb-3">
          <money style="max-width:150px; height:40px;" v-model="inclusivePrice" @input="changeInclusivePrice" :class="{'form-control': true}"
                 name="priceAmount" v-bind="moneyConfig"></money>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <div class="form-group">
        <label class="control-label">{{ $t('labels.taxRate') }}</label>
        <select :class="{'form-control': true, invalid: errors.has('tax')}" style="min-width:100px; height:40px;"
                v-model="tax" v-validate="'required'" name="tax" @change="taxChanged">
          <option v-for="(item, index) in allTaxRates" :key="index" :value="item.rate">{{ item.rate }}%</option>
        </select>
        <span class="small text-danger">{{ errors.first('tax') }}</span>
      </div>
    </div>
    <div class="col-auto">
      <label class="control-label">{{ $t('labels.roundedTotal') }}</label>
      <toggle-switch
        :on-text="$t('labels.yes')"
        :off-text="$t('labels.no')"
        :value.sync="priceRounding"/>
      <p><small>{{ $t('labels.finalCalculatedTotalMustBeRoundedTo5Cents') }}</small></p>
    </div>
  </div>
</template>
<script src="./productPrice.component.ts" lang="ts"></script>
<style scoped>

</style>
