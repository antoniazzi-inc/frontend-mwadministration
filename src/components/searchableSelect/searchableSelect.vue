<template>
  <div class="input-group mb-3">
    <div class="pull-left" style="flex: 1;">
    <multiselect
                 :multiple="$props.config.multiple"
                 v-model="val"
                 :options="options"
                 :class="{invalid: $props.config.required ? val ? false : true : false}"
                 :searchable="true"
                 :close-on-select="!$props.config.multiple"
                 :show-labels="false"
                 :track-by="$props.config.trackBy"
                 :internalSearch="true"
                 :allow-empty="$props.config.allowEmpty"
                 :placeholder="$t($props.config.placeholder)"
                 :label="$props.config.trackBy"
                 @input="valueChanged"
                 @select="valueAdded"
                 @remove="valueRemoved"
                 @search-change="search">
    </multiselect>
  </div>
    <div v-if="$props.config.enableAdd" class="input-group-append pl-2" style="cursor: pointer" @click="createNew">
      <span class="input-group-text">{{$t($props.config.addCaption)}}</span>
    </div>
  </div>
</template>
<script type="ts" src="./searchableSelect.component.ts"></script>
