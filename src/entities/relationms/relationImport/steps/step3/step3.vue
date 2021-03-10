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
    <div class="col-md-12">
      <p v-html="$t('labels.importInfo')"></p>
      <div class="row" style="margin-top:0em;">
        <div class="col-md-4 pre-scrollable">
          <div class="well" v-for="(cardinfo, ind) in $props.exampleCards" :key="ind">
            <template v-for="(card, index) in cardinfo">
              <dl :key="index">
                <dt>{{$t(`labels.${card.label}`)}}</dt>
                <dd>{{card.value}}
                  <v-gravatar v-if="card.label.toLowerCase() === 'email'" class="avatar-sm" :email="card.value"
                              :size="50"></v-gravatar>
                </dd>
              </dl>
            </template>
          </div>
        </div>

        <div class="col-md-8">
          <div class="tablos">
            <div class="row">
              <div class="col-sm-4">
                <a class="element-box el-tablo centered trend-in-corner padded bold-label" href="apps_support_index.html">
                  <div class="value">
                    {{$props.totalRows}}
                  </div>
                  <div class="label">
                    {{$t('labels.rowsInFile')}}
                  </div>
                </a>
              </div>
              <div class="col-sm-4">
                <a class="element-box el-tablo centered trend-in-corner padded bold-label" href="apps_support_index.html">
                  <div class="value">
                    {{$props.duplicateEmailsFound}}
                  </div>
                  <div class="label">
                    {{$t('labels.duplicates')}}
                  </div>
                </a>
              </div>
              <div class="col-sm-4">
                <a class="element-box el-tablo centered trend-in-corner padded bold-label" href="apps_support_index.html">
                  <div class="value">
                    {{$props.invalidEmails.length}}
                  </div>
                  <div class="label">
                    {{$t('labels.invalidEmails')}}
                  </div>
                </a>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4">
                <a class="element-box el-tablo centered trend-in-corner padded bold-label" href="apps_support_index.html">
                  <div class="value">
                    {{$props.numberOfExisingEmails}}
                  </div>
                  <div class="label">
                    {{$t('labels.existing')}}
                  </div>
                </a>
              </div>
              <div class="col-sm-4">
                <a class="element-box el-tablo centered trend-in-corner padded bold-label" href="apps_support_index.html">
                  <div class="value">
                    {{calculateImport()}}
                  </div>
                  <div class="label">
                    {{$t('labels.toBeImported')}}
                  </div>
                </a>
              </div>
              <div class="col-sm-4">

              </div>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <p style="margin: 1em;" v-if="$props.newGroup!==''">{{$t("labels.newGroupInfo")}} {{newGroup}}.</p>
          <br>
          <div v-if="$props.duplicateEmailsList && $props.duplicateEmailsList.length > 0">
            <div class="font-grey-mint font-sm" v-html="$t('labels.duplicateEmails')"></div>
            <div style="background-color:#fafafa; overflow: hidden; margin-top:0.5em; height:80px;">
              <ul class="list-group" style="overflow-y: scroll; margin:0.5em; height:100%">
                <li v-for="(duplicateEmail, ind) in $props.duplicateEmailsList" :key="ind">
                  {{duplicateEmail[$props.emailIndex]}}
                </li>
              </ul>
            </div>
          </div>
          <div v-if="$props.existingEmailsList && $props.existingEmailsList.length > 0" style="margin-top:2em;">
            <div v-if="$props.overwrite" class="font-grey-mint font-sm"
                 v-html="$t('labels.importrels_existing_emails')"></div>
            <div v-if="!$props.overwrite" class="font-grey-mint font-sm"
                 v-html="$t('labels.importrels_existing_emails_skip')"></div>
            <div style="background-color:#fafafa; overflow: hidden; margin-top:0.5em; height:80px;">
              <ul class="list-group" style="overflow-y: scroll; margin:0.5em; height:100%">
                <li v-for="(existingEmail, ind) in $props.existingEmailsList" :key="ind">{{existingEmail.email}}</li>
              </ul>
            </div>
          </div>
          <div v-if="$props.invalidEmails && $props.invalidEmails.length > 0" style="margin-top:2em;">
            <div v-if="$props.invalidEmails && $props.invalidEmails.length > 0" class="font-grey-mint font-sm"
                 v-html="$t('labels.invalidEmails')"></div>
            <div style="background-color:#fafafa; overflow: hidden; margin-top:0.5em; height:80px;">
              <ul class="list-group" style="overflow-y: scroll; margin:0.5em; height:100%">
                <li v-for="(invalidEmail, ind) in $props.invalidEmails" :key="ind">{{invalidEmail[$props.emailIndex]}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="tsx" lang="ts" src="./step3.component.ts"/>
