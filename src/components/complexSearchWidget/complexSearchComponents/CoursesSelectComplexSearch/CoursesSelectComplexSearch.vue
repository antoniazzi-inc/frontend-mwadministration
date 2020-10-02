<template>
  <form>
    <div class="form-group">
      <searchable-select-component :config="courseSingleSelectConfig"
                                   :options="$store.state.lookups.courses"
                                   :value="selectedCourse"
                                   @onSelected="addCourse"
                                   @onDelete="removeCourse"/>
    </div>
    <div class="form-group" v-if="allEvents && allEvents.length">
      <searchable-select-component :config="eventSingleSelectConfig"
                                   :options="allEvents"
                                   :value="selectedEvent"
                                   @onSelected="addCourseStep"
                                   @onDelete="removeCourseStep"/>
    </div>
    <div class="form-group">
      <searchable-select-component :config="operatorsSingleSelectConfig"
                                   :options="allOperators"
                                   :value="selectedOperator"
                                   @onSelected="addOperator"
                                   @onDelete="removeOperator"/>
    </div>
    <div class="form-group" v-if="selectedOperator && selectedOperator.labelValue.match('before') || selectedOperator && selectedOperator.labelValue.match('after')">
      <div class="dateHolder date-input">
        <flat-pickr :config="dateConfig" class="single-daterange form-control" v-model="dateValue"/>
        <i class="fa fa-times clearDate cursor-pointer" @click="dateValue=null">
          <span aria-hidden="true" class="sr-only">X</span>
        </i>
      </div>
    </div>
  </form>
</template>
<script src="./CoursesSelectComplexSearch.component.ts"/>
