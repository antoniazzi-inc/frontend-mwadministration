<template>
  <div class="container-fluid group-operator">
    <div class="row">
      <div class="col-md-12 mt-4">
        <toggle-switch
                       :on-text="$t('labels.yes')"
                       :off-text="$t('labels.no')"
                       :value.sync="initalValue"/>
      </div>
    </div>
  </div>
</template>
<script src="./ToggleSwitchComplexSearch.component.ts"/>
