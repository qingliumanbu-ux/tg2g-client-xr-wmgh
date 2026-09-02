<template>
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
        <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'layout1'"></er-layout>


        <div ref="editor" style="height: 100%;padding: 10px;">
            <RichTextEditor :inputxx="guicheng" @wangchange="wangchange" :v_xs="true" />
            <!-- <wanged /> -->
        </div>

    </xr-ef-form>
</template>

<script lang="ts" src="./WMSMGCLRS2N"></script>

<style scoped>
@import "./WMSMGCLRS2N.scss";
</style>
