<template>
  <div class="row">
    <div class="col-md-12">
      <p v-html="$t('labels.importInfo')"></p>
      <div class="row" style="margin-top:2em;">
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
          <div class="row list-separated justify-content-center">
            <div class="col-md-3 col-sm-3 col-xs-3 text-center">
              <div class="font-grey-mint font-sm" v-html="$t('labels.rowsInFile')">rijen in bestand</div>
              <div class="uppercase font-hg text-success impsumm">{{$props.totalRows}}</div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-3 text-center">
              <div class="font-grey-mint font-sm" v-html="$t('labels.duplicates')"></div>
              <div v-if="$props.duplicateEmailsFound == 0" class="uppercase font-hg text-success impsumm">0</div>
              <div v-else class="uppercase font-hg text-danger impsumm">{{$props.duplicateEmailsFound}}</div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-3 text-center">
              <div class="font-grey-mint font-sm" v-html="$t('labels.invalidEmails')"></div>
              <div v-if="$props.invalidEmails.length === 0" class="uppercase font-hg text-success impsumm">0</div>
              <div v-else class="uppercase font-hg text-danger impsumm">{{$props.invalidEmails.length}}</div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-3 text-center">
              <div class="font-grey-mint font-sm" v-html="$t('labels.existing')"></div>
              <div class="uppercase font-hg text-success impsumm">{{$props.numberOfExisingEmails}}</div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-3 text-center">
              <div class="font-grey-mint font-sm" v-html="$t('labels.toBeImported')"></div>
              <div class="uppercase font-hg text-success impsumm">{{calculateImport()}}</div>
            </div>
          </div>
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
