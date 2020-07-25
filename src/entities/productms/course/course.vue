<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.courses')}}</span>
      <router-link to="/course/new" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newCourse')}}</span>
        </button>
      </router-link>
    </h2>
    <div class="row text-left">
      <div class="col-md-3">
        <form onsubmit.prevent.stop="search">
          <div class="form-group mt-3">
            <label>{{$t('labels.searchByName')}}</label>
            <input type="text" class="form-control" v-model="nameSearch">
          </div>
          <div class="form-group mt-3">
            <label>{{$t('labels.searchByStartDate')}}</label>
            <div class="date-input">
              <flat-pickr :config="dateConfigStart" v-model="eventStart" class="single-daterange form-control"/>
            </div>
          </div>
          <div class="form-group mt-3">
            <label>{{$t('labels.searchByEndDate')}}</label>
            <div class="date-input">
              <flat-pickr :config="dateConfigStart" v-model="eventStart" class="single-daterange form-control"/>
            </div>
          </div>
          <div class="text-right">
            <button type="button" class="btn btn-outline-primary" @click="clear()">{{$t('buttons.clear')}}</button>
            <button type="submit" class="btn btn-primary ml-2" @click="search">{{$t('buttons.search')}}</button>
          </div>
        </form>
      </div>
      <div class="col-md-9">
        <PaginationTableComponent
          :ref="'paginationTable'"
          :active="active"
          :table="'course'"
          :noDataLabel="'labels.noCourses'"
          @onEdit="editCourse"
          @onDelete="deleteCourse"
          :service="courseService"/>
      </div>
    </div>
  </div>
</template>
<script src="./course.component.ts" lang="ts"></script>
