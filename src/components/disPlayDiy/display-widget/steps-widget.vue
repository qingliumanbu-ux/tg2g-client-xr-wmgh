<template>
    <div class="steps">
        <div class="title_1">{{ title }}</div>
        <div id="t_s_2" style="width: 100%;height: 85%; display: flex;">
            <div style="width: 4%;height: 100%;position: relative;"></div>
            <div style="width: 24%;height: 100%;position: relative;">
                <div class="title_2" style="bottom: 50%;position: absolute;text-align: center;width: 100%;">{{ v_value4
                }}</div>
                <img :src="imageUrl4" alt="Dynamic Image"
                    style="position: absolute;bottom: 50px;width: 100%;height: 28%;">
                <div class="title_3" style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                    :style="{ color: fir_col }">{{ v_value4_n }}</div>
            </div>
            <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                <div class="title_2" style="bottom: 60%;position: absolute;text-align: center;width: 100%;">{{ v_value3
                }}</div>
                <img :src="imageUrl3" alt="Dynamic Image"
                    style="position: absolute;bottom: 50px;width: 100%;height: 39.5%;">
                <div class="title_3" style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                    :style="{ color: sec_col }">{{ v_value3_n }}</div>
            </div>
            <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                <div class="title_2" style="bottom: 70%;position: absolute;text-align: center;width: 100%;">{{ v_value2
                }}</div>
                <img :src="imageUrl2" alt="Dynamic Image"
                    style="position: absolute;bottom: 50px;width: 100%;height: 51.5%;">
                <div class="title_3" style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                    :style="{ color: tir_col }">{{ v_value2_n }}</div>
            </div>
            <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                <div class="title_2" style="bottom: 80%;position: absolute;text-align: center;width: 100%;">{{ v_value1
                }}
                    <img src="../../../assets/images/元素2.png" alt="Dynamic Image"
                        style="position: absolute;bottom: 20px;width: 60px;">
                </div>
                <img :src="imageUrl1" alt="Dynamic Image"
                    style="position: absolute;bottom: 50px;width: 100%;height: 65%;">
                <div class="title_3" style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                    :style="{ color: fou_col }">{{ v_value1_n }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { shift_name_Color,shift_Cname } from '@/components/utils/util'
export default {
    name: 'BarWidget',
    props: {
        designer: Object,

    },
    setup(props) {
        
        const title = props.designer?.desc
        const getAssetUrl = (name: string, name1: string, name2: string) => {
            return new URL(`../../../assets/images/STEP/${name}_${name1}_${name2}.png`, import.meta.url).href;
        };
        let imageUrl1: any = getAssetUrl(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[0], '1');
        let imageUrl2: any = getAssetUrl(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[1], '2');
        let imageUrl3: any = getAssetUrl(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[2], '3');
        let imageUrl4: any = getAssetUrl(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[3], '4');

       
        let fir_col = shift_name_Color(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[0]);
        let sec_col = shift_name_Color(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[1]);
        let tir_col = shift_name_Color(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[2]);
        let fou_col = shift_name_Color(props.designer?.CON_INFO.BACK_COL_8, Object.keys(props.designer?.DATA[0])[3]);

        let v_value1 = shift_Cname(Object.keys(props.designer?.DATA[0])[0]);
        let v_value2 = shift_Cname(Object.keys(props.designer?.DATA[0])[1]);
        let v_value3 = shift_Cname(Object.keys(props.designer?.DATA[0])[2]);
        let v_value4 = shift_Cname(Object.keys(props.designer?.DATA[0])[3]);
        let v_value1_n = Object.values(props.designer?.DATA[0])[0];
        let v_value2_n = Object.values(props.designer?.DATA[0])[1];
        let v_value3_n = Object.values(props.designer?.DATA[0])[2];
        let v_value4_n = Object.values(props.designer?.DATA[0])[3];

        return {
            title,
            imageUrl1,
            imageUrl2,
            imageUrl3,
            imageUrl4,
            fir_col,
            sec_col,
            tir_col,
            fou_col,
            v_value1,
            v_value2,
            v_value3,
            v_value4,
            v_value1_n,
            v_value2_n,
            v_value3_n,
            v_value4_n
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

.steps {
    width: 100%;
    height: 100%;
    //background: yellow;
    container-type: inline-size;
    /* 定义容器 */
}

.title_1 {
    font-family: 'AlibabaPuHuiTiMedium', sans-serif;
    font-size: 7cqw;

    color: #ffffff;

}

.title_2 {
    text-align: center;
    font-family: 'AlibabaPuHuiTiMedium', sans-serif;
    font-size: 6cqw;
    color: #ffffff;
}

.title_3 {

    font-family: 'DIN', sans-serif;
    font-size: 6cqw;
    color: #ffffff;
}
</style>