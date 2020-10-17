<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12">

        {{ $t('labels.' + ruleName, {value: $props.ruleCtrl.ruleData ? $props.ruleCtrl.ruleData.value : ''}) }}
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12">
        <keep-alive>
        <component
          :is="$props.ruleCtrl.ruleComponent"
          :value="$props.ruleCtrl.ruleData"
          :query="$props.query"
          @input="$props.ruleCtrl.updateRuleData"
        />
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script src="./ruleOperator.component.ts"/>
