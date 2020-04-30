<template>
    <div class="vqb-rule panel panel-default">
        <div class="form-group">
            <div class="row">
                <div class="col-md-12">
                    <label style="font-size:1.1em;" class="form-control-label pull-left">{{ rule.label }}</label>
                    <button class="close pull-right" @click="remove">&times;</button>
                </div>
            </div>
            <div v-if="rule">
                <div v-if="rule.conditions.length" class="mt-1">
                  <searchable-select-component :config="singleSelectConfig"
                                               :options="rule.conditions"
                                               :value="selectedCondition"
                                               @onChange="addCondition"
                                               @onDelete="removeCondition"
                  ></searchable-select-component>
                </div>
                <div v-if="selectedCondition !== null" class="mt-1">
                    <!--if there is a condition render the condition and check if there is second level condition or output Element-->
                    <div v-if="selectedCondition.operator !== null">
                        <!--If there is rule condition-->
                        <condition-component
                            :componentType="selectedCondition.operator.type"
                            @showSecondLvl="showSecondLvlOption"
                            @updateValue="updateConditionOperator"
                            :value="finalQuery.op"
                            :operator="rule.operator"
                            :options="selectedCondition.operator.options"></condition-component>
                    </div>
                    <div v-if="selectedCondition.secondLvlCondition !== null  && selectedCondition.secondLvlCondition.outputElement && selectedCondition.secondLvlCondition.outputElement.options.length" class="mt-1">
                        <!--If there is condition second level condition-->
                        <condition-component
                            :componentType="selectedCondition.secondLvlCondition.outputElement.type"
                            :operator="rule.operator"
                            @updateValue="updateConditionSecondLevelCond"
                            :isSecondLvl="true"
                            :value="finalQuery.attr"
                            :options="selectedCondition.secondLvlCondition.outputElement.options"></condition-component>
                    </div>
                    <div v-if="selectedCondition.outputElement !== null && localQuery.op && !localQuery.op.value.id.match('empty')" class="mt-1">
                        <!--If there is output Element in selected condition-->
                        <condition-component
                            :componentType="selectedCondition.outputElement.type"
                            @showSecondLvl="showSecondLvlOption"
                            @updateValue="updateConditionOutput"
                            :value="finalQuery.value"
                            :operator="rule.operator"
                            :options="selectedCondition.outputElement.options"></condition-component>
                    </div>
                </div>
                <div v-if="rule.operator !== null && localQuery" class="mt-1">
                    <!--If there is rule operator check render the operator and check if there is second level condition in to the operator-->
                    <div v-if="rule.operator.secondLvlOperatorCondition !== null && rule.operator.secondLvlOperatorCondition.outputElement.options.length" class="mt-1">
                        <!--If there is second level operator condition-->
                        <condition-component
                            :componentType="rule.operator.secondLvlOperatorCondition.outputElement.type"
                            @showSecondLvl="showSecondLvlOption"
                            @updateValue="updateOperatorSecondLevelCond"
                            :operator="rule.operator.secondLvlOperatorCondition.operator"
                            :value="finalQuery.attr"
                            :options="rule.operator.secondLvlOperatorCondition.outputElement.options"></condition-component>
                    </div>
                    <!--Rendering of the operator itself-->
                    <condition-component class="mt-1"
                                         :componentType="rule.operator.type"
                                         :operator="rule.operator"
                                         @showSecondLvl="showSecondLvlOption"
                                         @updateValue="updateOperator"
                                         :value="finalQuery.op"
                                         :options="rule.operator.options"></condition-component>
                </div>
                <div v-if="(rule.outputElement !== null && !hideValue)" class="mt-1">
                    <!--If there is output element in to the rule-->
                    <condition-component
                        :componentType="rule.outputElement.type"
                        :value="finalQuery.value"
                        @showSecondLvl="showSecondLvlOption"
                        @updateValue="updateRuleOutputEl"
                        :operator="rule.operator"
                        :options="rule.outputElement.options"></condition-component>
                </div>
            </div>
        </div>
        <!-- {{ query }} -->
    </div>
</template>
<script lang="ts" src="./rule.component.ts"></script>
