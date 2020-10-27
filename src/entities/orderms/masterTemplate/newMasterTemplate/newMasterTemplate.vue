<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span v-if="masterTemplate.id">{{$t('labels.editMasterTemplates')}}</span>
      <span v-else>{{$t('labels.newMasterTemplates')}}</span>
      <button tag="button" data-toggle="modal" data-target="#masterTemplateModal" class="btn btn-primary float-right">
        <i class="fas fa-"/>  <router-link to="/maintenance/master-templates" class="text-white text-decoration-none">
        {{$t('buttons.back')}}</router-link>
      </button>
    </h2>
    <div class="mt-4">
      <div class="form-group">
        <label>{{$t('labels.name')}}</label>
        <input type="text" v-model="masterTemplate.name" class="form-control">
      </div>
      <div class="form-group">
        <HtmlEditorComponent
          :content.sync="masterTemplate.html"
          @contentChanged="updateMasterTemplate"/>
      </div>
    </div>
    <div class="row mt-5">
      <button type="submit" :disabled="errors.any()" class="btn btn-primary mt-4" @click="saveMasterTemplate">{{$t('buttons.save')}}</button>
    </div>
  </div>
</template>
<script type="ts" src="./newMasterTemplate.component.ts"></script>
