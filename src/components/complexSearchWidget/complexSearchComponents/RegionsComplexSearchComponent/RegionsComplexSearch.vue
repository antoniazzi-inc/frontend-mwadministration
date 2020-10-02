<template>
  <form>
    <div class="form-group">
      <searchable-select-component :config="regionsSingleSelectConfig"
                                   :options="$store.state.lookups.regions"
                                   :value="selectedRegion"
                                   @onSelected="addRegion"
                                   @onDelete="removeRegion"/>
    </div>
  </form>
</template>
<script src="./RegionsComplexSearch.component.ts"/>
