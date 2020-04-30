<template>
    <div>
        <query-builder :rules="rules" :onlyActiveEntities="true" :initialQuery="$props.complexFilter" :maxDepth="2" @queryUpdated="queryUpdated" @descUpdated="humanDescriptionUpdated"></query-builder>
        <div v-if="myerrors" class="alert alert-danger"><strong>Error!</strong>{{myerrors}}</div>
        <div class="justify-content-center" style="margin-top:1em;">
            <button @click="loadQueries" class="btn btn-outline-primary" v-if="!saving">{{$t('buttons.savedQueries')}}</button>
            <button @click="dosave" v-if="showsave && !saving" class="btn btn-outline-primary ml-2" v-html="$t('buttons.saveSearch')">Save Search</button>
            <button @click="dosearch" class="btn btn-primary ml-2" v-if="!saving" v-html="$t('buttons.search')">Search</button>
        </div>
        <form v-if="saving" class="form-horizontal" style="margin-top:1em;" role="form">
            <div class="form-group">
                <label for="name" class="col-md-2 control-label">Name</label>
                <div class="col-md-8"><input type="text" v-model="newQueryName" class="form-control" id="name" @keyup="checkError">
                    <span style="color:red;" v-if="saveErrors">Please provide a name</span>
                </div>
            </div>
            <div class="form-group">
                <label for="desc" class="col-md-2 control-label">Description</label>
                <div class="col-md-8"><textarea class="form-control" v-model="newQueryDesc" id="desc" cols="80" rows="3"></textarea></div>
            </div>
            <div class="form-group">
                <div class="col-md-offset-2 col-md-10">
                    <button type="submit" @click.prevent="saveQuery" class="btn blue">Save</button>
                    <button @click.prevent="cancelQuery" class="btn">Cancel</button>
                </div>
            </div>
        </form>

        <p style="margin:1em; border: 1px solid #009090; padding:1em;">{{queryDesc}}</p>

        <p style="margin:1em; border: 1px solid #909000; padding:1em;overflow-wrap: break-word;">{{searchQuery}}</p>

    </div>
</template>

<script lang="ts" src="./complexSearch.component.ts">
</script>
<style scoped>

</style>
