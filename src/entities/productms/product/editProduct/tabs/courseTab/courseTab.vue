<template>
    <div class="row">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <div class="form-desc">{{$t('labels.productCoursesSettings')}}</div>
                <new-course-component :courseId="courseId"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./courseTab.component.ts"></script>
