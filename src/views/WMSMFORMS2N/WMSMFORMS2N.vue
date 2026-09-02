<template>
    <xr-ef-form @ready="efFormReady">
        <div v-if="initializeFlag === 1" style="height: 100%;background: #181818;display: flex; flex-direction: row;">
            <ListTabs :dataSource="dataSource" />
            <div class="display" style="width: 100%;">
                <DisFosm id="content" :ins_con_conf="inschildData" :form_conf="childData" :if_visable="true" 
                    style="height: 45vw;" />
                <el-button type="primary" @click="form_conf_save">保存</el-button>
            </div>

        </div>


    </xr-ef-form>
</template>

<script lang="ts" src="./WMSMFORMS2N.ts"></script>

<style scoped></style>