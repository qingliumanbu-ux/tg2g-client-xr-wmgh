<template>
    <div class="quarter">
        <div class="title_1" style="height: 10%;">{{ title }}</div>
        <div class="grid-container" style="width: 90%;height: 90%;">

            <div :class="grid_item">
                <img :src="imageUrl1" alt="Dynamic Image" class="griditemimg">
                <img src="../../../assets/images/元素2.png" alt="Dynamic Image" :class="griditemglod">
                <div :class="c_per" style="position: absolute;">{{ v_value1 }}</div>
                <div :class="c_num_per" style="position: absolute;">{{ v_value1_n }}</div>
            </div>
            <div :class="grid_item">
                <img :src="imageUrl2" alt="Dynamic Image" class="griditemimg">
                <div :class="c_per" style="position: absolute;">{{ v_value2 }}</div>
                <div :class="c_num_per" style="position: absolute;">{{ v_value2_n }}</div>
            </div>
            <div :class="grid_item">
                <img :src="imageUrl3" alt="Dynamic Image" class="griditemimg">
                <div :class="c_per" style="position: absolute;">{{ v_value3 }}</div>
                <div :class="c_num_per" style="position: absolute;">{{ v_value3_n }}</div>
            </div>
            <div :class="grid_item">
                <img :src="imageUrl4" alt="Dynamic Image" class="griditemimg">
                <div :class="c_per" style="position: absolute;">{{ v_value4 }}</div>
                <div :class="c_num_per" style="position: absolute;">{{ v_value4_n }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { shift_name_Color, shift_Cname } from '@/components/utils/util'
import { ref } from 'vue';
export default {
    name: 'ListWidget',
    props: {
        designer: Object,

    },
    setup(props) {
       
        const title = props.designer?.desc
        const getAssetUrl = (name: string, name1: string) => {
            return new URL(`../../../assets/images/QUAR/${name}_${name1}.png`, import.meta.url).href;
        };
        const getTypeNumber = (name: string, name1: string) => {
            let newTypeNumber = '';
            if (name === 'BOR')
                newTypeNumber = name1 + '1';
             if (name === 'CIR')
                newTypeNumber = name1 + '2';
             if (name === 'CAP')
                newTypeNumber = name1 + '3';
            return newTypeNumber;
        };
        let imageUrl1: any = getAssetUrl(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[0]);
        let imageUrl2: any = getAssetUrl(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[1]);
        let imageUrl3: any = getAssetUrl(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[2]);
        let imageUrl4: any = getAssetUrl(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[3]);

       

        let v_value1 = shift_Cname(Object.keys(props.designer?.DATA[0])[0]);
        let v_value2 = shift_Cname(Object.keys(props.designer?.DATA[0])[1]);
        let v_value3 = shift_Cname(Object.keys(props.designer?.DATA[0])[2]);
        let v_value4 = shift_Cname(Object.keys(props.designer?.DATA[0])[3]);
        let v_value1_n = Object.values(props.designer?.DATA[0])[0];
        let v_value2_n = Object.values(props.designer?.DATA[0])[1];
        let v_value3_n = Object.values(props.designer?.DATA[0])[2];
        let v_value4_n = Object.values(props.designer?.DATA[0])[3];

        let grid_item = getTypeNumber(props.designer?.CON_INFO.BACK_COL_8,'grid_item');
        let c_per = getTypeNumber(props.designer?.CON_INFO.BACK_COL_8,'c_per');
        let c_num_per = getTypeNumber(props.designer?.CON_INFO.BACK_COL_8,'c_num_per');
        let griditemglod=getTypeNumber(props.designer?.CON_INFO.BACK_COL_8,'griditemglod');

        return {
            title,
            imageUrl1,
            imageUrl2,
            imageUrl3,
            imageUrl4,

            v_value1,
            v_value2,
            v_value3,
            v_value4,
            v_value1_n,
            v_value2_n,
            v_value3_n,
            v_value4_n,
            grid_item,
            c_per,
            c_num_per,
            griditemglod
        }
    }

}
</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'AlibabaPuHuiTiBold';
    src: url('../../assets/font/Alibaba-PuHuiTi-Bold.otf') format('truetype');
}

@font-face {
    font-family: 'AlibabaPuHuiTiMedium';
    src: url('../../assets/font/Alibaba-PuHuiTi-Medium.otf') format('truetype');
}

@font-face {
    font-family: '优设';
    src: url('../../assets/font/优设标题黑.ttf') format('truetype');
}

@font-face {
    font-family: 'DIN';
    src: url('../../assets/font/DIN.TTF') format('truetype');
}

.quarter {
    width: 100%;
    height: 100%;
    //background:brown;
    container-type: inline-size;
}

.title_1 {
    font-family: 'AlibabaPuHuiTiMedium', sans-serif;
    font-size: 5cqw;

    color: #ffffff;

}

.title_2 {

    font-family: 'DIN', sans-serif;
    font-size: 24pt;
    color: #ffffff;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 5%;
    /* 设置网格间隔 */
}

.grid_item1 {
    position: relative;
    width: 90%;
    height: 70%;
    padding: 20px;
}

.grid_item2 {
    position: relative;
    width: 70%;
    height: 90%;
    padding: 20px;
}

.grid_item3 {
    position: relative;
    width: 50%;
    height: 70%;
    padding: 0px;
    margin: auto;
}

.griditemimg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 10px；
}

.c_num_per1 {
    text-align: center;
    font-family: '优设', sans-serif;
    font-size: 8cqw;
    background: linear-gradient(#ffffff, #00aeff);
    -webkit-background-clip: text;
    color: transparent;
    left: 20%;
    bottom: -10%;
}

.c_num_per2 {
    text-align: center;
    font-family: '优设', sans-serif;
    font-size: 8cqw;
    background: linear-gradient(#ffffff, #00aeff);
    -webkit-background-clip: text;
    color: transparent;
    left: 80%;
    top: 10%;
}

.c_num_per3 {
    text-align: center;
    font-family: '优设', sans-serif;
    font-size: 8cqw;
    background: linear-gradient(#ffffff, #00aeff);
    -webkit-background-clip: text;
    color: transparent;
    left: 35%;
    bottom: 70%;
}

.c_per1 {
    text-align: center;
    font-family: 'AlibabaPuHuiTiMedium', sans-serif;
    font-size: 6cqw;
    background: #ffffff;
    -webkit-background-clip: text;
    color: transparent;
    left: 20%;
    top: 25px;
}

.c_per2 {
    text-align: center;
    font-family: 'AlibabaPuHuiTiMedium', sans-serif;
    font-size: 6cqw;
    background: #ffffff;
    -webkit-background-clip: text;
    color: transparent;
    left: 80%;
    top: 50%;
}

.c_per3 {
    text-align: center;
    font-family: 'AlibabaPuHuiTiMedium', sans-serif;
    font-size: 6cqw;
    background: #ffffff;
    -webkit-background-clip: text;
    color: transparent;
    left: 40%;
   
    bottom: -40%;
}

.griditemglod1 {
    position: absolute;
    top: 20%;
    width: 20%;
    right: 10%;
}

.griditemglod2 {
    display: none;
}

.griditemglod3 {
    position: absolute;
    bottom:  -35%;
   width: 25%;
   left: 10%;
}
</style>