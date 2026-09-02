<template>
    <div class="single">
        <div class="title_1">{{title}}</div>
        <div class="title_2">
            <p class="s_num">{{ v_value1_n  }}</p>
            <p class="s_text">{{ v_value1 }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { shift_name_Color, shift_Cname } from '@/components/utils/util'
import { ref } from 'vue';
export default {
    name: 'SingleWidget',
    props: {
        designer: Object,

    },
    setup(props) {
       
        const title = props.designer?.desc
      
       

       

        let v_value1 = shift_Cname(Object.keys(props.designer?.DATA[0])[0]);
     
        let v_value1_n = Object.values(props.designer?.DATA[0])[0];
       

        return {
            title,
            v_value1,
            v_value1_n,
           
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
.single {
    width: 100%;
    height: 100%;
    //background: orange;
       container-type: inline-size;
}
.title_2{
        height: 90%;
    background: url(../../../assets/images/元素1.png) no-repeat center center;
    background-size: contain;
}
.title_1 {
    font-family: 'AlibabaPuHuiTiMedium', sans-serif;
    font-size: 10cqw;

    color: #ffffff;

}
.s_num {
    text-align: center;
    font-family: '优设', sans-serif;
    font-size: 15cqw;
    background: linear-gradient(#ffffff, #00aeff);

    -webkit-background-clip: text;
    color: transparent;
}

.s_text {
    text-align: center;
    font-family: 'AlibabaPuHuiTiMedium', sans-serif;
    font-size: 7cqw;



    color: #ffffff;
}
</style>