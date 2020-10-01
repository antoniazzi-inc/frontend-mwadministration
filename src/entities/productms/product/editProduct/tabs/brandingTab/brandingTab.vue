<template>
  <div class="tab-form-panel">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item tab-nav smaller-tab" @click="currentTab = 'general'">
        <a :class="{'nav-link': true, 'active': currentTab === 'general'}" id="general-tab" data-toggle="tab"
           href="#general" role="tab" aria-controls="general" aria-selected="true">{{$t('labels.general')}}</a>
      </li>
      <li class="nav-item tab-nav smaller-tab" @click="currentTab = 'tabUSP'">
        <a :class="{'nav-link': true, 'active': currentTab === 'tabUSP'}" id="tabUSP-tab" data-toggle="tab"
           href="#tabUSP" role="tab" aria-controls="tabUSP" aria-selected="false">{{$t('labels.tabUSP')}}</a>
      </li>
      <li class="nav-item tab-nav smaller-tab" @click="currentTab = 'tabTestimonials'">
        <a :class="{'nav-link': true, 'active': currentTab === 'tabTestimonials'}" id="tabTestimonials-tab" data-toggle="tab"
           href="#tabTestimonials" role="tab" aria-controls="tabTestimonials" aria-selected="false">{{$t('labels.tabTestimonials')}}</a>
      </li>
      <li class="nav-item tab-nav smaller-tab" @click="currentTab = 'tabDiscounts'">
        <a :class="{'nav-link': true, 'active': currentTab === 'tabDiscounts'}" id="tabDiscounts-tab"
           data-toggle="tab" href="#tabDiscounts" role="tab" aria-controls="tabDiscounts" aria-selected="false">
          {{$t('labels.tabDiscounts')}}</a>
      </li>
      <li class="nav-item tab-nav smaller-tab" @click="currentTab = 'tabSuggestions'">
        <a :class="{'nav-link': true, 'active': currentTab === 'tabSuggestions'}" id="tabSuggestions-tab" data-toggle="tab"
           href="#tabSuggestions" role="tab" aria-controls="tabSuggestions" aria-selected="false">{{$t('labels.tabSuggestions')}}</a>
      </li>
      <li class="nav-item tab-nav smaller-tab" @click="currentTab = 'tabThankyou'">
        <a :class="{'nav-link': true, 'active': currentTab === 'tabThankyou'}" id="tabThankyou-tab" data-toggle="tab"
           href="#tabThankyou" role="tab" aria-controls="tabThankyou"
           aria-selected="false">{{$t('labels.tabThankyou')}}</a>
      </li>
      <li class="nav-item tab-nav smaller-tab" @click="currentTab = 'tabSocialAff'">
        <a :class="{'nav-link': true, 'active': currentTab === 'tabSocialAff'}" id="tabSocialAff-tab" data-toggle="tab"
           href="#tabSocialAff" role="tab" aria-controls="tabSocialAff" aria-selected="false">{{$t('labels.tabSocialAff')}}</a>
      </li>
      <li class="nav-item tab-nav smaller-tab" @click="currentTab = 'images'">
        <a :class="{'nav-link': true, 'active': currentTab === 'images'}" id="images-tab" data-toggle="tab"
           href="#images" role="tab" aria-controls="images"
           aria-selected="false">{{$t('labels.images')}}</a>
      </li>
    </ul>
    <div class="tab-content text-left">
      <div :class="{'tab-pane': true, 'active': currentTab === 'general'}" id="general" role="tabpanel" aria-labelledby="general-tab">
        <form>
          <div class="row mt-4">
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.salesPageUrl')}}</label>
              <input @blur="checkForHttp" name="Sales Page Url" v-validate="'url'" type="url" :class="{'form-control':true}" v-model="salesPageUrl"/>
              <small class="text-danger">{{errors.first('Sales Page Url')}}</small>
            </div>
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.selectInvoiceTemplate')}}</label>
              <searchable-select-component :config="singleSelectConfig"
                                           :options="allInvoiceTemplates"
                                           :value="selectedInvoiceTemplate"
                                           @onSelected="addInvoiceTemplate"
                                           @onDelete="removeInvoiceTemplate"/>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12">
              <label class="form-control-label">{{$t('labels.backToCallingPage')}}</label>
              <toggle-switch :on-text="$t('labels.yes')"
                             :off-text="$t('labels.no')"
                             :value.sync="backToCallingPage"></toggle-switch>
            </div>
          </div>
          <div class="form-buttons-w text-right">
            <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
            <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
      <div :class="{'tab-pane': true, 'active': currentTab === 'tabUSP'}" id="tabUSP" role="tabpanel" aria-labelledby="tabUSP-tab">
        <form>
          <div class="form-group mt-4">
            <label class="form-control-label">{{$t('labels.tabUSP')}}</label>
            <trumbowyg v-model="upsellCart1" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
          </div>
          <div class="form-buttons-w text-right">
            <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
            <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
      <div :class="{'tab-pane': true, 'active': currentTab === 'tabTestimonials'}" id="tabTestimonials" role="tabpanel" aria-labelledby="tabTestimonials-tab">
        <form>
          <div class="form-group mt-4">
            <label class="form-control-label">{{$t('labels.tabTestimonials')}}</label>
            <trumbowyg v-model="upsellCart2" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
          </div>
          <div class="form-buttons-w text-right">
            <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
            <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
      <div :class="{'tab-pane': true, 'active': currentTab === 'tabDiscounts'}" id="tabDiscounts" role="tabpanel" aria-labelledby="tabDiscounts-tab">
        <form>
          <div class="form-group mt-4">
            <label class="form-control-label">{{$t('labels.tabDiscounts')}}</label>
            <trumbowyg v-model="upsellCart3" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
          </div>
          <div class="form-buttons-w text-right">
            <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
            <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
      <div :class="{'tab-pane': true, 'active': currentTab === 'tabSuggestions'}" id="tabSuggestions" role="tabpanel" aria-labelledby="tabSuggestions-tab">
        <form>
          <div class="form-group mt-4">
            <label class="form-control-label">{{$t('labels.tabSuggestions')}}</label>
            <trumbowyg v-model="checkoutUpsell" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
          </div>
          <div class="form-buttons-w text-right">
            <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
            <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
      <div :class="{'tab-pane': true, 'active': currentTab === 'tabThankyou'}" id="tabThankyou" role="tabpanel" aria-labelledby="tabThankyou-tab">
        <form>
          <div class="form-group mt-4">
            <label class="form-control-label">{{$t('labels.thankYouRedirect')}}</label>
            <input type="text" class="form-control" v-model="thankYouRedirect"/>
          </div>
          <div class="form-group">
            <label class="form-control-label">{{$t('labels.thankYouContent')}}</label>
            <trumbowyg v-model="thankYouContent" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
          </div>
          <div class="form-buttons-w text-right">
            <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
            <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
      <div :class="{'tab-pane': true, 'active': currentTab === 'tabSocialAff'}" id="tabSocialAff" role="tabpanel" aria-labelledby="tabSocialAff-tab">
        <form>
          <div class="form-group mt-4">
            <label class="form-control-label">{{$t('labels.tabSocialAff')}}</label>
            <trumbowyg v-model="socialAffiliates" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
          </div>
          <div class="form-buttons-w text-right">
            <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
            <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
      <div :class="{'tab-pane': true, 'active': currentTab === 'images'}" id="images" role="tabpanel" aria-labelledby="images-tab">
        <div class="row">
          <div class="form-group mt-4 col-md-12">
            <button class="btn btn-outline-primary mb-2" @click="loadImageGallery(false)">{{$t('labels.openMediaLibrary')}}</button>
            <upload-widget @onError="imageUploadError" @changeFeaturedImage="changeFeaturedImage" :showFeaturedFlag="true" :allFiles="allMediaFiles" @onUpload="imageLoaded" @onRemove="onImageRemove" :multiple="true"/>
          </div>
        </div>
        <div class="form-buttons-w text-right">
          <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
          <button class="btn btn-primary" @click.prevent="saveMedia" :disabled="isSaving">{{$t('buttons.save')}}</button>
        </div>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" id="editImageUploaded" tabindex="-1" role="dialog" ref="editImageUploaded">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <form @submit.prevent="saveEditedImage">
                <div class="modal-body">
                  <div class="form-group">
                    <label for="name">{{$t('labels.name')}}:</label>
                    <input type="text" class="form-control" required id="name"  placeholder="Please enter a file name" v-model="editFile.name">
                  </div>
                  <div class="form-group">
                    <label>{{$t('labels.image')}}: </label>
                    <div class="edit-image">
                      <img :src="editFile.blob" :ref="'editImageRef'" />
                    </div>

                    <div class="edit-image-tool">
                      <div class="btn-group" role="group">
                        <button type="button" class="btn btn-primary" @click="rotateLeft" title="cropper.rotate(-90)"><i class="fa fa-undo" aria-hidden="true"></i></button>
                        <button type="button" class="btn btn-primary" @click="rotateRight"  title="cropper.rotate(90)"><i class="fa fa-repeat" aria-hidden="true"></i></button>
                      </div>
                      <div class="btn-group" role="group">
                        <button type="button" class="btn btn-primary" @click="crop" title="cropper.crop()"><i class="fa fa-check" aria-hidden="true"></i></button>
                        <button type="button" class="btn btn-primary" @click="clear" title="cropper.clear()"><i class="fa fa-remove" aria-hidden="true"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.prevent="editFile.show = false">{{$t('buttons.close')}}</button>
                  <button type="submit" class="btn btn-primary">{{$t('buttons.save')}}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    <media-library ref="mediaLib" :items="allMedia" @onSearch="searchMedia" @retrieveItems="loadImageGallery(false)" @onUploadGallery="uploadFromGallery" @onUpload="uploadImgGallery" @onFilter="filterMedia" @onRemove="removeImage" :isLoading="isMediaLoading" mediaLibraryType="images"></media-library>
  </div>
</template>
<script lang="ts" src="./brandingTab.component.ts"></script>
<style>
  .smaller-tab {
    font-size:1.1em;
  }
    .deleteImage{
        position: absolute;
        top: -8px;
        right: -5px;
    }
    .rightMenu{
      position: fixed;
      background: white;
      -webkit-box-shadow: 0px 6px 12px -5px rgba(0,0,0,0.75);
      -moz-box-shadow: 0px 6px 12px -5px rgba(0,0,0,0.75);
      box-shadow: 0px 6px 12px -5px rgba(0,0,0,0.75);
    }
    .upload{
      background-color: #f8f8f8;
      outline: 1px dashed #ccc!important;
      padding: 20px;
      margin-bottom: 15px;
      outline-offset: -10px;
      transition: all .4s;
    }
    .file-input{
      cursor: pointer;
      font-size: 1.2em;
    }

    .example-drag label.btn {
      margin-bottom: 0;
      margin-right: 1rem;
    }

    .example-drag .drop-active {
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      position: fixed;
      z-index: 9999;
      opacity: .6;
      text-align: center;
      background: #000;
    }

    .example-drag .drop-active h3 {
      margin: -.5em 0 0;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      font-size: 40px;
      color: #fff;
      padding: 0;
    }
    .file-uploads.file-uploads-html5 label{
      cursor: pointer;
    }
    .cursor{
      cursor: pointer;
    }
    .media-thumb{
      margin: 5px;
      position: relative;
      float: left;
      border: 2px inset transparent;
    }
    .preview{
      display: table;
    }
    .image-info.activeImage{
      background-color: black;
      color: white;
    }
    .image-holder{
      font-size: 3em;
      padding-top: 1%;
      text-align: center;
      width: 80px;
      background-size: contain!important;
      background-repeat: no-repeat!important;
      height: 70px;
      background-position: center!important;
      border: 2px solid #eee;
    }
    .media-thumb.active{
      border: 2px inset black;
    }
    .previewImage{
      position: relative;
      float: left;
      width: 80px;
      height: 100%;
      cursor: pointer;
      border: 2px solid #eee;
      transition: border-color .4s;
      overflow: hidden;
      padding: 5px;
    }
    .image-info{
      font-size: 0.7em;
      background-color: #eee;
      transition: background-color .4s;
    }
    .name{
      text-overflow: ellipsis;
      overflow: hidden;
      width: 80px;
      height: 1.2em;
      white-space: nowrap;
    }
</style>
