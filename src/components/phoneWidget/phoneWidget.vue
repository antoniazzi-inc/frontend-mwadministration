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
  <div>

    <div class="pipeline-item" v-if="!editMode && !newPhone" style="margin-bottom:12px;">
      <div class="pi-body">
        <div class="avatar">
          <i class="fa fa-home" v-if="phoneCopy.phoneType === phoneTypes.home"></i>
          <i class="fa fa-mobile" v-if="phoneCopy.phoneType === phoneTypes.mobile"></i>
          <i class="fa fa-question" v-if="phoneCopy.phoneType === phoneTypes.other"></i>
          <i class="fa fa-building" v-if="phoneCopy.phoneType === phoneTypes.work"></i>
        </div>
        <div class="pi-info">
          <div class="h6 pi-name">
            {{phoneCopy.number}}
          </div>
          <div class="pi-sub">
            {{phoneCopy.phoneType}}
          </div>
        </div>
      </div>
      <div class="pi-foot" style="padding:0px;">
        <div class="tags">
          <i class="text-success fas fa-edit m-2" @click="edit" style="cursor: pointer"></i>
          <div class="fas fa-trash-alt m-2 text-danger" @click="remove" style="cursor: pointer"></div>
        </div>
      </div>
    </div>

    <div v-else class="pipeline-item">
      <div class="pi-body">
        <div class="row" style="width:100%">
          <div class="col sm-4">
            <div class="dropdown">
              <button class="btn btn-outline-white dropdown-toggle" type="button" id="dropdownMenuButton"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="height:34px; border: 1px solid #e2e4e8">
                {{phoneCopy.phoneType}}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" v-on:click="phoneCopy.phoneType=phoneTypes.home" href="#">{{phoneTypes.home}}</a>
                <a class="dropdown-item" v-on:click="phoneCopy.phoneType=phoneTypes.mobile"
                   href="#">{{phoneTypes.mobile}}</a>
                <a class="dropdown-item" v-on:click="phoneCopy.phoneType=phoneTypes.work" href="#">{{phoneTypes.work}}</a>
                <a class="dropdown-item" v-on:click="phoneCopy.phoneType=phoneTypes.other" href="#">{{phoneTypes.other}}</a>
              </div>
            </div>
          </div>
          <div class="col sm-8">
            <input type="text" v-validate="'required'" name="number"
                   :placeholder="$t('labels.phoneNumberOrSocialMedia')" :class="{'form-control': true, invalid: errors.has('number')}"
                   v-model="phone.number" style="width:100%"/>
          </div>
        </div>
      </div>
      <div class="pi-foot" style="padding:10px;">
        <button class="btn btn-outline-primary" @click="cancel">{{$t('buttons.cancel')}}</button>
        <span class="text-danger">{{errors.first('number')}}</span>
        <button class="btn btn-primary" @click="save" v-if="newPhone">{{$t('buttons.create')}}</button>
        <button class="btn btn-primary" @click="save" v-else>{{$t('buttons.save')}}</button>

      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./phoneWidget.component.ts"></script>
<style>
  .avatar i {
    font-size: 2em;
  }
</style>
