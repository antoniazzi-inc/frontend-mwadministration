<template>
  <div>
    <form>
      <template v-for="(item, index) in social">
      <div class="form-row" :key="index">
        <div class="col-2 mr-auto">
        <label>{{item.name}}</label>
        <toggle-switch :on-text="$t('labels.yes')"
                       :off-text="$t('labels.no')"
                       :value.sync="item.visible"></toggle-switch>
        </div>
        <div class="col">
          <label>{{$t('labels.url')}}</label>
          <input type="url" v-validate="'url'" v-model="item.url" :name="item.name"
                 @blur="validateUrl(index, item.name)" :class="{'form-control': true, invalid: errors.has(item.name)}">
          <span class="text-danger small">{{errors.first(item.name)}}</span>
        </div>
      </div>
      </template>
    </form>
  </div>
</template>
<script type="ts" src="./defaultTextsSocial.component.ts"></script>
