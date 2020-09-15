<template>
  <div class="tab-form-panel" style="padding:5em; padding-left:1em;">
    <!-- <label>{{$t('labels.chooseTags')}}</label> -->
    <searchable-select-component :config="searchableConfig"
                                 :options="$store.state.lookups.tags"
                                 :value="selectedTags"
                                 @onSelected="addTag"
                                 @onDelete="removeTag"
    ></searchable-select-component>
  </div>
</template>
<script type="ts" src="./tagsSubTab.component.ts"></script>
