<template>
  <div class="container-fluid table-spacing" style="">

    <div class="row m-3 mt-4 pagination-v">
      <div class="col-md-12" v-if="!isLoading">
        <pagination @update="rerenderPage" :totalPages="totalPages" :table="$props.table" :page="currentPage"
                    @changePage="onChangePage" :total="totalItems"  :key="'pagination-top'" :perPage="itemsPerPage"
                    location="top" :tableFields="tableFields"></pagination>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="loader" v-if="isLoading">
          <div class="spinner-border text-primary" role="status" v-if="isLoading">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <h4 class="text-center mt-3" v-if="allData.length === 0">{{$t($props.noDataLabel)}}</h4>
        <table v-else class="table table-striped" style="margin-top:1em;">
          <thead>
          <tr>
            <th v-if="$props.table === 'relation'">
              <input type="checkbox" class="form-control" @input="selectAllVisible" v-model="selectAll"/>
            </th>
            <template v-for="(item, index) in tables[$props.table].cols">
              <th v-if="hasAuthority(item.authorities)" :key="index" v-show="checkVisibility(item)">
                <span>{{$t(item.name)}}</span>
              </th>
            </template>
            <th class="text-right">
              <span>{{$t('labels.actions')}}</span>
            </th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item, ind) in allData" :key="ind" @click="toggleSelectRow(item.id, ind)" :class="{selected: selectedRows.findIndex(e=> e.id === item.id) > -1}">
              <td v-if="$props.table === 'relation'">
                <input type="checkbox" class="form-control" :checked="selectedRows.findIndex(e=> e.id === item.id) > -1" @input="selectRow($event, item.id, ind)"/>
              </td>
              <template v-for="(col, index) in tables[$props.table].cols">
                <td :key="index" v-if="hasAuthority(col.authorities)" v-show="checkVisibility(col)">
                  <span class="colorField" v-if="col.type === 'color'" :style="{'width':'50px', 'border-radius': '50%', 'background': item[col.field]}">&nbsp;</span>
                  <span v-else-if="col.method != null"> {{col.method(item)}}</span>
                  <span v-else-if="col.type === 'date'">{{item[col.field] | formatDate}}</span>
                  <span v-else-if="col.type === 'boolean'">
                    {{item[col.field] === true ? $t('labels.yes') : $t('labels.no')}}
                  </span>
                  <span v-else-if="col.type === 'money'">
                    {{$store.state.currency}} {{item[col.field]}}
                  </span>
                  <span v-else-if="col.type === 'percentage'">
                    {{item[col.field]}}%
                  </span>
                  <span v-else-if="col.type === 'subField'">
                    {{item[col.field][col.subField]}}
                  </span>
                  <span v-else>
                    {{!item[col.field] ? '-' : item[col.field]}}
                  </span>
                </td>
              </template>
              <td class="text-right">
                <div class="btn-group flex-btn-group-container text-center justify-content-center">
                  <div v-if="$props.table === 'group'"
                       @click.prevent="itemAction('onViewMembers', item)" class="ml-3 text-primary cursor-pointer" style="font-size:1.2em;">
                    <i class="fas fa-users"></i>
                  </div>
                  <div v-if="tables[$props.table].actions.edit"
                    @click.prevent="itemAction('onEdit', item)" class="ml-3 text-primary cursor-pointer" style="font-size:1.2em;">
                    <i class="os-icon os-icon-ui-49"></i>
                  </div>
                  <div v-if="tables[$props.table].actions.copy" @click.prevent="itemAction('onCopy', item)" class="ml-3 text-success cursor-pointer" style="font-size:1.2em;">
                    <i class="os-icon os-icon-grid-10"></i>
                  </div>
                  <div v-if="tables[$props.table].actions.info" class="ml-3 cursor-pointer"  @click.prevent="itemAction('onInfo', item)">
                    <i class="fa fa-info-circle"></i>
                  </div>
                  <div v-if="tables[$props.table].actions.delete" class="text-danger ml-3 cursor-pointer" data-toggle="modal"
                       :data-target="'#deleteModal_'+$props.table"
                       @click.prevent="prepareRemove(item)">
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row m-3 mt-4 pagination-v">
      <div class="col-md-12" v-if="!isLoading">
        <pagination @update="rerenderPage" :totalPages="totalPages" :table="$props.table" :page="currentPage"
                    @changePage="onChangePage" :total="totalItems" :key="'pagination-bottom'" :perPage="itemsPerPage"
                    location="bottom" :tableFields="tableFields"></pagination>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" :id="'deleteModal_' + $props.table" tabindex="-1" role="dialog" ref="deleteModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{$t('labels.confirmDelete')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mt-4">
              <h5>{{$t('labels.areYouSureToDelete')}}</h5>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="itemAction('onDelete', itemToDelete)">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./paginationTable.component.ts"></script>
<style scoped>
  .colorField{
    width: 100%;
    min-height: 25px;
    display: flex;
  }
  .pagination-v{
    display: flex;
    align-items: center;
    padding:0!important;
  }
  .loader{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
  }
  .m-3 {
    margin:0px!important;
  }
  thead th {
    font-size: 0.9em!important;
    font-weight: 600;
    text-align: left;
  }
  .table td {
    font-size: 1.1em;
    text-align: left;
  }
  .selected{
    background-color: rgba(109, 221, 0, 0.1) !important;
  }
</style>
