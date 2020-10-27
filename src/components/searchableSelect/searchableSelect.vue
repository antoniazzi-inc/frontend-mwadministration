<template>
  <div class="input-group">
    <div class="pull-left my-multiselect">
      <multiselect v-if="config.hasGroups"
                   v-model="val"
                   :options="options"
                   :multiple="$props.config.multiple"
                   group-values="groupValues"
                   group-label="groupLabel"
                   :allow-empty="$props.config.allowEmpty"
                   :deselect-label="$t('Can\'t remove this value')"
                   :group-select="false"
                   :placeholder="$t($props.config.placeholder)"
                   :track-by="$props.config.trackBy" :internalSearch="true"
                   :label="$props.config.trackBy"
                   :preselectFirst="$props.config.preselectFirst"
                   @input="valueChanged"
                   @select="valueAdded"
                   @remove="valueRemoved"
                   @search-change="search">
        <template slot="option" slot-scope="props">
          <span v-if="props.option.$isLabel">{{ props.option.$groupLabel }}</span>
          <span v-else>{{ props.option.label }}</span>
        </template>
      </multiselect>

      <multiselect v-else
        :multiple="$props.config.multiple"
        v-model="val"
        :options="options"
        :class="{invalid: $props.config.required ? val ? false : true : false}"
        :searchable="true"
        :close-on-select="true"
        :deselect-label="'Can\'t remove this value'"
        :show-labels="true"
        :preselectFirst="$props.config.preselectFirst"
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

<style scoped>
.my-multiselect {
  flex: 1;
  min-width: 250px;
}
.multiselect >>> .multiselect__tags {
  font-size:16px!important;

}
.multiselect >>> .multiselect__tag {
  padding: 5px 26px 5px 10px!important;
  background-color: #5c9bd1!important;
  font-size:16px!important;
}
.multiselect >>> .multiselect__tag-icon:hover{
  background-color: #5c9bd1!important;
}
.multiselect >>> .multiselect__tag-icon:after{
  content:"\D7";
  color:#fff!important;
  background-color: #5c9bd1!important;
  font-size:22px!important;
}

</style>
