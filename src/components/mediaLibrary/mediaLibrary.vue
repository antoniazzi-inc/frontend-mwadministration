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
  <div class="modal" data-backdrop="static" data-keyboard="false" id="mediaLibrary" tabindex="-1" role="dialog"
       ref="mediaLibrary">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <form name="editForm" role="form">
          <div class="modal-header">
            <h5>{{$t('labels.mediaLibrary')}}</h5>
          </div>
          <div class="modal-body text-left">
            <div class="mt-4">
              <div class="row library mr-0 pr-0">
                <div class="col-md-8 pr-0 mr-0">
                  <div class="row library-filters">
                    <div class="col-md-4 text-left">
                      <div class="form-group">
                        <label class="form-control-label">{{$t('labels.mediaType')}}</label>
                        <select class="form-control" v-model="searchMediaType" @change="filterMedia">
                          <option value="all">{{$t('labels.allTypes')}}</option>
                          <option value="video">{{$t('labels.video')}}</option>
                          <option value="application">{{$t('labels.documents')}}</option>
                          <option value="other">{{$t('labels.other')}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4 text-left">
                      <div class="form-group pr-2">
                        <label class="form-control-label">{{$t('labels.search')}}</label>
                        <input type="text" class="form-control" v-model="searchMedia" @input="searchMediaByName"/>
                      </div>
                    </div>
                    <div class="col-md-4 text-left">
                      <div class="form-group">
                        <label class="form-control-label">{{$t('labels.category')}}</label>
                        <select class="form-control" v-model="mediaCategory" @change="changeMediaCategory">
                          <option value="products">{{$t('labels.products')}}</option>
                          <option value="emails">{{$t('labels.emails')}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <v-infinite-scroll :loading="mediaIsLoading" @top="prevPage" @bottom="nextPage" :offset='20' style="height: 55vh; overflow-x: hidden; overflow-y: scroll;">
                  <div class="row media-wrapper" v-if="allItems.length > 0">
                    <div @click="selected = index" :class="{media: true, active: selected === index}"
                         v-for="(item, index) in allItems" :key="index">
                      <div :style="{'background': 'url('+getImageUrl(item)+')'}" class="libraryImage"></div>
                      <i v-if="selected === index" class="fa fa-check"></i>
                    </div>
                  </div>
                    <div v-if="mediaIsLoading && !isLastPage">
                      <div class="row">
                        <div class="col-md-12 text-center">
                          <div class="loader">
                            <div class="spinner-border text-primary" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="isLastPage && mediaIsLoading">
                      <div class="row">
                        <div class="col-md-12 text-center">
                          <p>{{$t('labels.youHaveReachedTheEnd')}}</p>
                        </div>
                      </div>
                    </div>
                  </v-infinite-scroll>
                  <div v-if="allItems.length === 0 && !mediaIsLoading" class="text-center">
                    <h4>{{$t('emptyGallery')}}</h4>
                  </div>
                </div>
                <div class="col-md-4 pr-0 mr-0 image-info" v-if="selectedItem">
                  <div class="row">
                    <div class="col-md-5 image-info-s">
                      <div class="libraryImage" :style="{'background': 'url('+getImageUrl(selectedItem)+')'}"></div>
                    </div>
                    <div class="col-md-7 text-left mt-2">
                      <span>{{$t('name')}}: {{selectedItem.name}}</span><br/>
                      <span>{{$t('updatedOn')}}: {{selectedItem.updatedOn | formatDate}}</span><br/>
                      <span>{{$t('createdOn')}}: {{selectedItem.createdOn | formatDate}}</span><br/>
                    </div>
                    <div class="row delete">
                      <div class="col-md-12">
                        <span v-if="!removeImageConfirm" class="cursor-pointer text-danger ml-3"
                              @click="removeImageConfirm=true">{{$t('labels.deletePermanently')}}</span>
                        <span v-if="removeImageConfirm" class="cursor-pointer text-danger ml-3" @click="removeImage">{{$t('labels.confirmDelete')}}</span>
                        <span v-if="removeImageConfirm" class="cursor-pointer text-danger ml-3"
                              @click="removeImageConfirm=false">{{$t('buttons.cancel')}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="form-control-label">{{$t('labels.name')}}</label>
                        <input type="text" class="form-control" v-model="selectedItem.name"/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="form-control-label">{{$t('labels.caption')}}</label>
                        <input type="text" class="form-control" v-model="itemCaption"/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group text-right">
                        <button type="button" class="btn btn-secondary ml-2" @click="cancelUpdateImage">{{$t('buttons.cancel')}}
                        </button>
                        <button type="button" class="btn btn-primary ml-2" @click="updateImage">{{$t('buttons.save')}}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" v-text="$t('buttons.cancel')"
                    v-on:click="closeMediaLibrary()">{{$t('buttons.cancel')}}
            </button>
            <button type="button" class="btn btn-primary" v-on:click="uploadThumbnail()">{{$t('choose')}}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./mediaLibrary.component.ts"></script>
<style>
  .modal-body {
    padding-top: 0;
    padding-bottom: 0;
  }

</style>
<style scoped>
  .media-wrapper {
    position: relative;
  }

  .media {
    position: relative;
    margin: 1.5%;
    width: 120px;
    height: 120px;
    float: left;
  }

  .media img {
    background-size: contain;
    width: 120px;
    height: 120px;
    cursor: pointer;
  }

  .library .active {
    border: 3px solid dodgerblue;
    position: relative;
    margin: 1.5%;
  }

  .active i {
    right: -15px;
    position: absolute;
    font-size: 2em;
    top: -5px;
    color: dodgerblue;
  }

  .image-info {
    background-color: aliceblue;
    font-size: .8em;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    max-height: 600px;
  }

  .image-info-s {
    position: relative;
    width: 150px;
    height: 150px;
  }

  .libraryImage {
    background-size: contain !important;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat !important;
    background-position: center !important;
  }
</style>

