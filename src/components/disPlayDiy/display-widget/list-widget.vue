<template>
    <div class="list">
          <div class="title_1" style="height: 10%;">{{title}}</div>
                    <div style="height: 90%; display: flex;flex-direction: column;">

                        <div class="c_tag" style="position: relative;">
                            <img :src="imageUrl1" alt="Dynamic Image" style="width: 90%;height: 80px;margin: 0 auto;">
                            <div class="title_2" style="left: 400px;position: absolute;bottom: 25px;">{{ v_value1_n }}
                            </div>
                            <img src="../../../assets/images/元素2.png" alt="Dynamic Image"
                                style="position: absolute;bottom: 30px;left: 300px;width: 40px;">
                        </div>
                        <div class="c_tag" style="position: relative;">
                            <img :src="imageUrl2" alt="Dynamic Image" style="width: 90%;height: 80px;margin: 0 auto;">
                            <div class="title_2" style="left: 400px;position: absolute;bottom: 25px;">{{ v_value2_n }}
                            </div>

                        </div>
                        <div class="c_tag" style="position: relative;">
                            <img :src="imageUrl3" alt="Dynamic Image" style="width: 90%;height: 80px;margin: 0 auto;">
                            <div class="title_2" style="left: 400px;position: absolute;bottom: 25px;">{{ v_value3_n }}
                            </div>

                        </div>
                        <div class="c_tag" style="position: relative;">
                            <img :src="imageUrl4" alt="Dynamic Image" style="width: 90%;height: 80px;margin: 0 auto;">
                            <div class="title_2" style="left: 400px;position: absolute;bottom: 25px;">{{ v_value4_n }}
                            </div>

                        </div>
                    </div>
    </div>
</template>

<script lang="ts">
import { shift_name_Color,shift_Cname } from '@/components/utils/util'
import { ref } from 'vue';
export default {
    name: 'ListWidget',
    props: {
        designer: Object,

    },
    setup(props) {
      
        const title = props.designer?.desc;
         const listContainer = ref<HTMLElement | null>(null);
        const getAssetUrl = (name: string) => {
            return new URL(`../../../assets/images/LF_${name}.png`, import.meta.url).href;
        };
        let imageUrl1: any = getAssetUrl( Object.keys(props.designer?.DATA[0])[0]);
        let imageUrl2: any = getAssetUrl( Object.keys(props.designer?.DATA[0])[1]);
        let imageUrl3: any = getAssetUrl( Object.keys(props.designer?.DATA[0])[2]);
        let imageUrl4: any = getAssetUrl( Object.keys(props.designer?.DATA[0])[3]);

       
       

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
.list {
    width: 100%;
    height: 100%;
    //background:grey;
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
</style>