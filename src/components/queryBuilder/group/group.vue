<template>
    <div class="vqb-group" :class="{...classObject, 'mt-3': true}">
        <div class="vqb-group-body" :class="{ 'panel-body': styled }" v-show="showDesc">
            {{ queryDesc }}
        </div>

        <div class="vqb-group-body" :class="{ 'panel-body': styled }" v-show="!showDesc">
          <div class="card">
            <div class="card-header">
              <div v-if="index >= 0" @click="collapseAccordion(index)">
                <span class="cursor-pointer text-info">{{$t('labels.title')}} - {{index}}</span>
                <button :class="{ 'close pull-right': true }" v-if="query.children" @click="remove">&times;</button>
                <div class="match-type-container" :class="{ 'form-inline': true }">
                  <div :class="{ 'form-group': styled }" v-show="query.children && query.children.length < 2">
                    &nbsp;
                  </div>
                  <a href="javascript:;" v-show="index == -1" class="btn btn-sm white pull-right" style="margin-top:-4px;" @click="toggleDesc"><i :class="{ 'fa fa-comment': !showDesc, 'fa fa-cogs': showDesc }"></i></a>
                </div>
              </div>
              <div class="rule-actions mb-0">
                <div class="form-group" v-if="$props.rules">
                  <searchable-select-component :config="multiSelectConfig"
                                               :options="$props.rules"
                                               :value="selectedRules"
                                               @onSelected="addRule"
                                               @onDelete="removeRule"
                  ></searchable-select-component>
                  <button :class="{ 'btn btn-outline-primary': styled }" v-if="this.depth < this.maxDepth" @click="addGroup" v-html="$t('labels.addGroup')"></button>
                </div>
              </div>
              <div :class="{ 'form-group': true, 'mt-2': true }" v-show="query.children && query.children.length > 1">
                <label for="vqb-match-type1">{{ $t('labels.matchType') }}</label>
                <select id="vqb-match-type1" :class="{ 'form-control': true }" v-model="query.logicalOperator">
                  <option value="and">{{$t('labels.all') }}</option>
                  <option value="or">{{$t('labels.any') }}</option>
                </select>
              </div>
            </div>
            <div class="card-body">
              <div class="accordion" :id="'accordion-' + index">
                <div class="card">
                  <div class="card-header" :id="'accordion-label-' + index">
                    <h2 class="mb-0" data-toggle="collapse" :data-target="`#accordion-${index}`"
                        aria-expanded="true" aria-controls="collapseOne">
                    </h2>
                  </div>

                  <div :id="'accordion-' + index" class="collapse show" :aria-labelledby="'accordion-label-' + index" data-parent="#accordionExample">
                    <div class="card-body">
                      <component
                        v-for="(child, index) in query.children"
                        :key="index"
                        :name="'comp'+index"
                        :is="child.type"
                        :type="child.type"
                        :query="child.query"
                        :rules="rules"
                        :rule="ruleById(child.query.rule)"
                        :index="index"
                        :maxDepth="maxDepth"
                        :depth="depth + 1"
                        :styled="styled"
                        v-on:child-deletion-requested="removeChild">
                      </component>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script lang="ts" src="./group.component.ts">
</script>
<style>
    .card-body{
        padding: 9px!important;
    }
</style>
