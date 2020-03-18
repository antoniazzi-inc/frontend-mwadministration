<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-8">
    <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
      <h2 v-text="$t('labels.newHelpCategory')"></h2>
      <div>
        <div class="form-group">
          <multi-language-component
            :config="multiLangConfig"
            :value="helpCategoryLanguages"
            @onAdd="addNewHelpCategoryLanguage"
            @onChange="changeNewHelpCategoryLanguage"
            @onRemove="removeHelpCategoryLanguage"></multi-language-component>
        </div>
        <div class="form-group col-md-4 p-0 m-0 text-left">
          <label class="form-control-label">{{$t('labels.color')}}</label><br/>
          <div class="dropdown">
            <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true"
                    :style="{'background-color': newHelpCategory.color, width: '100%', height: '20px'}" aria-expanded="false"> &nbsp;
            </button>
            <div class="dropdown-menu" aria-labelledby="dLabel">
              <form>
                <chrome-picker :value="colors" @input="updateColor"></chrome-picker>
              </form>
            </div>
          </div>
        </div>
        <div class="form-group text-left">
          <label v-text="$t('labels.parent')">Tag</label>
          <searchable-select-component :config="searchableConfig"
                                       :options="helpCategories"
                                       :value="parentHelpCategory"
          @onChange="changeSelectedHelpCat"
          @onSelected="selectSelectedHelpCat"
          @onDelete="removeSelectedHelpCat"
          ></searchable-select-component>
        </div>
      <div>
        <button type="button" id="cancel-save" class="btn btn-secondary mr-2" v-on:click="cancel()">
          <span v-text="$t('buttons.cancel')">Cancel</span>
        </button>
        <button type="submit" id="save-entity" class="btn btn-primary ml-2" :disabled="helpCategoryLanguages.length > 0 && helpCategoryLanguages[0].name === ''">
          <span v-text="$t('buttons.save')">Save</span>
        </button>
      </div>
      </div>
    </form>
  </div>
    </div>
  </div>
</template>
<script type="ts" src="./newHelpCategory.component.ts"></script>
