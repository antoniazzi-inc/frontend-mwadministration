<template>
  <div class="row" v-if="$props.value">
    <div class="col-md-12">
      <div v-show="!editMode" class="pipeline-item" v-for="(item, index) in value" :key="index">
        <div class="pi-controls">
          <i class="fa fa-edit text-warning" @click="editContact(item)"></i>
          <i class="fa fa-trash-alt ml-2 text-danger" data-toggle="modal"
             data-target="#deleteModal" @click="deleteContact(item)"></i>
        </div>
        <div class="pi-body">
          <div class="avatar"><i style="font-size: 2.5rem" :class="getContactAvatar(item, index)"></i></div>
          <div class="ml-3 pi-info">
            <div class="h6 pi-name">{{item.title}}</div>
            <div class="pi-sub" v-html="item.contactInfo"></div>
            <div class="pi-sub">{{$t('labels.contactTime')}}: {{item.contactTime | formatDisplayDateTime}}</div>
          </div>
        </div>
        <div class="pi-foot">
          <div class="extra-info">{{$t('labels.createdOn')}}: {{item.createdOn | formatDisplayDateTime}}</div>
          <div class="extra-info">{{$t('labels.updatedOn')}}: {{item.updatedOn | formatDisplayDateTime}}</div>
        </div>
      </div>
      <div class="modal" data-backdrop="static" data-keyboard="false" id="deleteModal" tabindex="-1" role="dialog" ref="deleteModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5>{{$t('labels.confirmDelete')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mt-4">
                <h5>{{$t('labels.areYouSureToDelete')}}</h5>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="removeConfirmed">
                {{$t('buttons.confirm')}}
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
            </div>
          </div>
        </div>
      </div>
      <div v-show="editMode">
        <form novalidate>
          <div :class="{'form-group': true }">
            <label class="control-label">{{$t('labels.title')}}</label>
            <input type="text" class="form-control" v-model="valueToEdit.title" name="title"/>
          </div>
          <div :class="{'form-group': true }">
            <label class="control-label">{{$t('labels.type')}}</label>
            <select class="form-control" v-model="valueToEdit.contactType">
              <option :key="index" :value="item.value" v-for="(item, index) in contactTypes">{{item.label}}</option>
            </select>
          </div>
          <div :class="{'form-group': true}">
            <label class="control-label">{{$t('labels.time')}}</label>
            <flat-pickr :config="contactTimeConfig" v-model="contactDate" class="single-daterange form-control"></flat-pickr>
          </div>
          <div :class="{'form-group': true }">
            <label class="control-label">{{$t('labels.contactInfo')}}</label>
            <trumbowyg v-model="valueToEdit.info" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
          </div>
          <div class="buttons-w text-right mb-4">
            <button type="button" class="btn btn-outline-primary" @click.prevent="cancelContact">{{$t('buttons.cancel')}}</button>
            <button type="button" class="btn btn-primary" @click.prevent="saveContact">{{$t('buttons.submit')}}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./contactWidget.component.ts"></script>
<style>
  .pipeline-item{
    cursor: default!important;
  }
  .pi-controls i{
    cursor: pointer!important;
  }
  .pi-sub{
    max-height: 200px;
    overflow: hidden;
  }
</style>
