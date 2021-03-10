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
  <div class="row">
    <div class="col-md-5">
      <vueDropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                   :duplicateCheck="true"
                   @vdropzone-file-added="handleFile"
                   @vdropzone-removed-file="handleRemove">
      </vueDropzone>
    </div>
    <div class="col-md-7">
      <div v-if="hasDelimiterFields">
        <div class="row">
          <div class="col-xs-3">
            <label v-html="$t('labels.delimiter')"></label>
            <input type="text" class="form-control" v-model="csvDelimiter">
          </div>
        </div>
        <div class="row">
          <div class="col-xs-3">
            <label v-html="$t('labels.escChar')"></label>
            <input type="text" class="form-control" v-model="csvEscChar">
          </div>
        </div>
      </div>
      <div class="row" v-if="hasHeaderField">
        <div class="col-md-8">
          <div class="mt-checkbox-inline">
            <span class="help-block" v-html="$t('labels.hasHeaderInfo')"></span><br/>
            <label>{{$t('labels.hasHeaderChk')}}</label>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="hasHeader"/>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="row" v-if="limitError">
        <div class="col-md-8">
          <span class="text-danger">{{$t('labels.maxRowsLimit', {rows: rawRows.length})}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="tsx" lang="ts" src="./step1.component.ts"/>
