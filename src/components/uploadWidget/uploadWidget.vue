<template>
  <div class="example-full">
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Drop files to upload</h3>
    </div>
    <div class="upload">
      <div class="table-responsive" style="min-height: 300px">
        <table class="table table-hover">
          <thead>
          <tr>
            <th>#</th>
            <th>{{$t('labels.thumb')}}</th>
            <th>{{$t('labels.name')}}</th>
            <th>{{$t('labels.size')}}</th>
            <th>{{$t('labels.status')}}</th>
            <th>{{$t('labels.action')}}</th>
            <th v-if="showFeaturedFlag">{{$t('labels.featuredImage')}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="!files.length">
            <td colspan="7">
              <div class="text-center p-5">
                <h4>{{$t('labels.dropFilesAnywhere')}}<br/>{{$t('labels.or')}}</h4>
                <label :for="name" class="btn btn-lg btn-primary">{{$t('labels.selectFiles')}}</label>
              </div>
            </td>
          </tr>
          <tr v-for="(file, index) in files" :key="file.id" :class="{'text-danger': maxFileSizeExceedError}">
            <td>{{index}}</td>
            <td>
              <img v-if="file.thumb" :src="file.thumb" width="40" height="auto" />
              <span v-else>{{$t('labels.noImage')}}</span>
            </td>
            <td>
              <div class="filename">
                {{file.name}}
              </div>
              <div class="progress" v-if="file.active || file.progress !== '0.00'">
                <div :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}" role="progressbar" :style="{width: file.progress + '%'}">{{file.progress}}%</div>
              </div>
            </td>
            <td>{{file.size | formatSize}}</td>
            <td v-if="file.success">{{$t('labels.success')}}</td>
            <td v-else-if="file.active">{{$t('labels.active')}}</td>
            <td v-else-if="maxFileSizeExceedError">{{$t('labels.maxFileSizeExceedError')}}</td>
            <td v-else>{{$t('labels.success')}}</td>
            <td>
              <div class="btn-group">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button">
                  {{$t('buttons.action')}}
                </button>
                <div class="dropdown-menu">
                  <a :class="{'dropdown-item': true, disabled: file.active || file.success || file.error === 'compressing'}" data-toggle="modal" data-target="#modal-edit-file" href="#" @click.prevent="file.active || file.success || file.error === 'compressing' ? false :  onEditFileShow(file)">{{$t('buttons.edit')}}</a>
                  <a :class="{'dropdown-item': true, disabled: !file.active}" href="#" @click.prevent="file.active ? $refs.upload.update(file, {error: 'cancel'}) : false">{{$t('buttons.cancel')}}</a>

                  <a class="dropdown-item" href="#" v-if="file.active" @click.prevent="$refs.upload.update(file, {active: false})">Abort</a>
                 <!-- <a class="dropdown-item" href="#" v-else-if="file.error && file.error !== 'compressing' && $refs.upload.features.html5" @click.prevent="$refs.upload.update(file, {active: true, error: '', progress: '0.00'})">{{$t('labels.re')}}</a>
                  <a :class="{'dropdown-item': true, disabled: file.success || file.error === 'compressing'}" href="#" v-else @click.prevent="file.success || file.error === 'compressing' ? false : $refs.upload.update(file, {active: true})">Upload</a>
-->
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" @click.prevent="$refs.upload.remove(file)">{{$t('buttons.remove')}}</a>
                </div>
              </div>
            </td>
            <td v-if="showFeaturedFlag">
              <toggle-switch :on-text="$t('labels.yes')"
                             :off-text="$t('labels.no')"
                             @clicked="changeFeaturedImage({event: $event, index: index})"
                             :value="file.isFeatured"></toggle-switch>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="example-foorer">
        <div class="btn-group">
          <file-upload
            class="btn btn-primary dropdown-toggle"
            :post-action="postAction"
            :put-action="putAction"
            :extensions="extensions"
            :accept="accept"
            :multiple="multiple"
            :directory="directory"
            :size="size || 0"
            :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
            :headers="headers"
            :data="data"
            :drop="drop"
            :drop-directory="dropDirectory"
            :add-index="addIndex"
            v-model="files"
            @input-filter="inputFilter"
            @input-file="inputFile"
            ref="upload">
            <i class="fa fa-plus"></i>
            Select
          </file-upload>
          <div class="dropdown-menu">
            <label class="dropdown-item" :for="name">{{$t('buttons.add')}}</label>
            <a class="dropdown-item" href="#" v-if="directory" @click="onAddFolader">{{$t('labels.addFolder')}}</a>
            <a class="dropdown-item" href="#" v-if="directory" @click.prevent="addData.show = true">{{$t('labels.addData')}}</a>
          </div>
        </div>
        <button type="button" class="btn btn-success" v-if="directUpload && (!$refs.upload || !$refs.upload.active)" @click.prevent="$refs.upload.active = true">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          {{$t('labels.startUpload')}}
        </button>
        <button type="button" class="btn btn-danger"  v-else-if="directUpload" @click.prevent="$refs.upload.active = false">
          <i class="fa fa-stop" aria-hidden="true"></i>
          {{$t('labels.stopUpload')}}
        </button>
      </div>
    </div>

    <div data-backdrop="static" data-keyboard="false" :class="{modal: true}" id="modal-add-data" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add data</h5>
            <button type="button" class="close"  @click.prevent="addData.show = false">
              <span>&times;</span>
            </button>
          </div>
          <form @submit.prevent="onAddData">
            <div class="modal-body">
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" required id="name1"  placeholder="Please enter a file name" v-model="addData.name">
                <small class="form-text text-muted">Such as <code>filename.txt</code></small>
              </div>
              <div class="form-group">
                <label for="type">Type:</label>
                <input type="text" class="form-control" required id="type"  placeholder="Please enter the MIME type" v-model="addData.type">
                <small class="form-text text-muted">Such as <code>text/plain</code></small>
              </div>
              <div class="form-group">
                <label for="content">Content:</label>
                <textarea class="form-control" required id="content" rows="3" placeholder="Please enter the file contents" v-model="addData.content"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click.prevent="addData.show = false">Close</button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div data-backdrop="static" ref="editImageModal" data-keyboard="false" :class="{modal: true}" id="modal-edit-file" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{$t('labels.edit')}}</h5>
            <button type="button" data-dismiss="modal" class="close"  @click.prevent="editFile.show = false">
              <span >&times;</span>
            </button>
          </div>
          <form @submit.prevent="onEditorFile">
            <div class="modal-body">
              <div class="form-group">
                <label for="name">{{$t('labels.name')}}:</label>
                <input type="text" class="form-control" required id="name"  placeholder="Please enter a file name" v-model="editFile.name">
              </div>
              <div class="form-group" v-if="editFile.show && editFile.blob && editFile.type && editFile.type.substr(0, 6) === 'image/'">
                <label>{{$t('labels.image')}}: </label>
                <div class="edit-image">
                  <img :src="editFile.blob" ref="editImage" />
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
  </div>
</template>
<script src="./uploadWidget.js"/>
<style>
  .example-full .btn-group .dropdown-menu {
    display: block;
    visibility: hidden;
    transition: all .2s
  }
  .example-full .btn-group:hover > .dropdown-menu {
    visibility: visible;
  }
  .example-full label.dropdown-item {
    margin-bottom: 0;
  }
  .example-full .btn-group .dropdown-toggle {
    margin-right: .6rem
  }
  .example-full .filename {
    margin-bottom: .3rem
  }
  .example-full .btn-is-option {
    margin-top: 0.25rem;
  }
  .example-full .example-foorer {
    padding: .5rem 0;
    border-top: 1px solid #e9ecef;
    border-bottom: 1px solid #e9ecef;
  }
  .example-full .edit-image img {
    max-width: 100%;
  }
  .example-full .edit-image-tool {
    margin-top: .6rem;
  }
  .example-full .edit-image-tool .btn-group{
    margin-right: .6rem;
  }
  .example-full .footer-status {
    padding-top: .4rem;
  }
  .example-full .drop-active {
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
  .example-full .drop-active h3 {
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
</style>
