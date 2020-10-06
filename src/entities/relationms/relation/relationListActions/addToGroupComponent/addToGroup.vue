<template>
  <div class="container-fluid">
    <form>
      <div class="form-group" v-if="!addNewGroup">
        <label class="form-control-label">{{$t('labels.chooseGroup')}}</label>
        <searchable-select-component :config="groupsSelectConfig"
                                     :options="$store.state.lookups.groups"
                                     :value="selectedGroup"
                                     @onCreate="createNewGroup"
                                     @onChange="updateGroup"
                                     @onDelete="removeGroup"/>
      </div>
      <div class="form-group" v-else>
        <label class="form-control-label">{{$t('labels.groupName')}}</label>
        <div class="input-group">
          <input type="text" class="form-control"  aria-label="Input group example" aria-describedby="btnGroupAddon" v-model="newGroupName">
          <div class="input-group-append">
            <div class="input-group-text cursor-pointer" id="btnGroupAddon" @click.prevent.stop="cancelNewGroup">
              <span>{{$t('buttons.close')}}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script src="./addToGroup.component.ts" lang="ts"></script>

<style scoped>
</style>
