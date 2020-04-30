<template>
    <div>
        <div class="fixed-table-toolbar" style="height:50px;">
            <div class="pull-right search">
                <input class="form-control" type="text" v-model="filter" @keyup="dofilter" placeholder="Search" v-show="!confirmDelete">
            </div>
        </div>
        <div id="searchtable">
            <table class="table table-light table-hover gutter" v-show="!confirmDelete">
                <tr v-for="p in filteredprofiles" :key="p._id">
                    <td width="90%"><h4>{{p.name}}</h4><span class="text-muted">{{p.description}}</span></td>
                    <td><button class="btn blue-madison btn-sm" data-query="1" @click="doselect(p)"> Use </button></td>
                    <td><button class="btn red btn-sm" @click="askdelete(p)" > <i class="fa fa-times"></i> </button></td>
                </tr>
            </table>
            <div v-show="confirmDelete">
                <h3>{{$t('delete_it', { 0: profileToDelete.name})}} ?</h3>
                <p style="font-size:0.9em;">{{profileToDelete.description}}</p>
                <button @click="dodelete" class="btn blue-madison">Remove</button>
                <button @click="confirmDelete = false" class="btn">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./complexSearchQueries.component.ts">
</script>
<style scoped>

</style>
