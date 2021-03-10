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
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="alert alert-danger" role="alert" v-if="showAlert">
          {{$t('labels.cannotBeChanged')}}
        </div>
        <form @submit.prevent.stop="saveInvoicing">
          <div class="form-group">
            <label>{{$t('labels.mechanism')}}</label>
            <select class="form-control" v-model="invoiceStrategy.mechanism" :disabled="showAlert">
              <option value="TEXT">{{$t('labels.text')}}</option>
              <option value="TEXT_YEAR">{{$t('labels.textYear')}}</option>
              <option value="TEXT_YEAR_MONTH">{{$t('labels.textYearMonth')}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{$t('labels.startText')}}</label>
            <input type="text" class="form-control" v-model="invoiceStrategy.text" :disabled="showAlert"/>
          </div>
          <div class="form-group">
            <label>{{$t('labels.offset')}}</label>
            <input type="number" name="offset" class="form-control" v-validate="'min_value:0'" v-model="invoiceStrategy.offset" :disabled="showAlert"/>
            <span>{{errors.first('offset')}}</span>
          </div>
          <div class="row text-right mt-4 mb-4">
            <div class="col-md-12">
              <button type="button" id="cancel-save" class="btn btn-secondary mr-2" :disabled="showAlert" v-on:click="cancel()">
                <span v-text="$t('buttons.cancel')">Cancel</span>
              </button>
              <button type="submit" id="save-entity" class="btn btn-primary ml-2" :disabled="showAlert">
                <span v-text="$t('buttons.save')">Save</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./invoicing.component.ts"></script>
