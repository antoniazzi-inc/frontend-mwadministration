<template>
  <div class="p-3">
    <label>{{$t('labels.chooseTags')}}</label>
    <searchable-select-component :config="searchableConfig"
                                 :options="$store.state.lookups.tags"
                                 :value="selectedTags"
                                 @onChange="tagsChanged"
                                 @onSelected="tagsChanged"
    ></searchable-select-component>
  </div>
</template>
<script type="ts" src="./tagsSubTab.component.ts"></script>
