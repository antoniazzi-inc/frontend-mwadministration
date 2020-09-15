<template>
    <div class="vue-query-builder" :class="{ 'vue-query-builder-styled': true}">
        <group-component name="groupComp"
            :index="-1"
            :query="query"
            :rules="mergedRules"
            :maxDepth="maxDepth"
            :depth="depth"
            :styled="true"
            :onlyActiveEntities="onlyActiveEntities"
            type="group"
        ></group-component>
    </div>
</template>
<script lang="ts" src="./queryBuilder.component.ts">
</script>
<style>
    .vue-query-builder-styled .vqb-rule {
        margin-top: 15px;
        /* background-color: #f5f5f5; */
        /* background-color: #5C9BD1; */
        color: white;
        border-color: #ddd;
        padding: 15px;
    }

    .vue-query-builder-styled .vqb-rule label {
        margin-right: 10px;
    }

    .vue-query-builder-styled .vqb-group.depth-1 .vqb-rule,
    .vue-query-builder-styled .vqb-group.depth-2 {
        /* border-left: 2px solid #8bc34a; */
    }

    .vue-query-builder-styled .vqb-group.depth-2 .vqb-rule,
    .vue-query-builder-styled .vqb-group.depth-3 {
        /* border-left: 2px solid #00bcd4; */
    }

    .vue-query-builder-styled .vqb-group.depth-3 .vqb-rule,
    .vue-query-builder-styled .vqb-group.depth-4 {
        /* border-left: 2px solid #ff5722; */
    }

    .vue-query-builder-styled .close {
        opacity: 1;
        color: rgb(150,150,150);
    }

    @media (min-width: 768px) {
        .vue-query-builder-styled .vqb-rule.form-inline .form-group {
            display: block;
        }
    }
</style>
