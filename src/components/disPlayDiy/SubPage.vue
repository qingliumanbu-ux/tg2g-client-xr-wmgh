<template>
    <div ref="SubPage" class="SubPage">
        <div class="head_s" style="display: flex;flex-direction: row;">
            <div class="border"> </div>
            <div class="title_s">{{ form_title }}</div>
        </div>
        <grid-layout class="gridlayout" ref="gridlayout" :layout.sync="grid_list" :col-num="12" :row-height="10"
            :is-draggable="false" :is-resizable="false">

            <grid-item class="griditem" :key="item.i" v-for="item in grid_list" :x="item.x" :y="item.y" :w="item.w"
                :h="item.h" :i="item.i">
                <display-widget v-if="item.displayFlag" :designer="item" :displayMode="item.CON_INFO.CHARTS_TYPE" />


            </grid-item>
        </grid-layout>
    </div>
</template>

<script lang="ts">
import { EI } from 'EIX/ei';
import { reactive, ref } from 'vue';
import VueGridLayout from "vue-grid-layout";
import DisplayWidget from './display-widget/index.vue';

export default {
    name: "SubPage",
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        DisplayWidget
    },
    props: {
        form_conf: { type: Object, default: reactive(new EI.EIInfo()) },
        form_data: { type: Object, default: reactive(new EI.EIInfo()) },
    },
    watch: {
        'form_data': {
            deep: true,
            handler(props) {

                if (this.SubPage) {

                    this.createDesigner();
                }
            },
        },
    },
    setup(props) {
console.log('hgfdfguiop',props)
        const SubPage = ref<HTMLElement | null>(null);
        const form_title = ref(props.form_conf?.FORM_DESC)
        const grid_list = ref(props.form_conf?.CONDITIONS);
        const designer = ref<Array<Object>>([]);
        //designer.value=props.form_data
        //const displayMode = ref(props.form_conf?.CONDITIONS.CON_INFO.BACK_COL_6)
        const displayFlag = ref(false)

        const createDesigner = () => {

            for (let i = 0; i < grid_list.value.length; i++) {
                grid_list.value[i].DATA = []
                grid_list.value[i].COL = []
                for (let j = 0; j < props.form_data.length; j++) {

                    if (grid_list.value[i].i === props.form_data[j].name) {
                        grid_list.value[i].DATA = props.form_data[j].data;
                        grid_list.value[i].COL = props.form_data[j].columns;
                        grid_list.value[i].displayFlag=true
                    }
                }
            }

            displayFlag.value = true
        }
        return {
            SubPage, grid_list, form_title, displayFlag, designer, createDesigner
        }
    }
}
</script>

<style>
.SubPage {
    width: 1920px;
    height: 980px;
    padding: 25px;
}

.head_s {
    background: linear-gradient(to right, #0E4085, #0D2B5F);
}

.border {
    width: 55px;
    height: 55px;
    margin-left: 30px;
    /* background-color: white; */
    background: url(../../assets/images/边框元素.png) no-repeat center center;
    background-size: cover;

}

.title_s {
    font-family: 'AlibabaPuHuiTiBold', sans-serif;
    font-size: 28pt;
    font-weight: bold;
    background: linear-gradient(#ffffff, #00aeff);
    -webkit-background-clip: text;
    color: transparent;
}

.griditem {
    background: transparent !important;
    border: 0 !important;
}
</style>