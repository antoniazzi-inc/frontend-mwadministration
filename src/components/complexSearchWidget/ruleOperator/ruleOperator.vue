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
