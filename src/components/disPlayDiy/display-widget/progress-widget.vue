<template>
    <div class="progress">

        <div class="title_1">{{ title }}</div>
        <div style="padding: 30px 0;">
            <div style="" v-for="item in v_data">
                <div style="display: flex;flex-direction: row;position: relative;">
                    <div class="s_tag" :style="{ 'background': `${item.RGBCOLOR}` }">
                        <div class="s_tag_1" :style="{ 'background': `${item.HEXCOLOR}` }">
                        </div>
                        <p style="color: #fff;text-align: center;">NO.{{ item.rank }}</p>
                    </div>
                    <div class="title_2" style="margin-left: 10px;">{{ item.name }}</div>
                    <img v-if="item.rank===1" src="../../../assets/images/元素2.png" alt="Dynamic Image"
                        style="position: absolute;bottom: 10px;left: 400px;width: 40px;">
                    <div class="title_2" style="left: 450px;position: absolute;">{{ item.value }}%</div>
                </div>
                <div class="g-progress"
                    :style="{ '--progress': `${item.value}` + '%', 'background': `linear-gradient(90deg, ${item.ECOLOR}, ${item.SCOLOR} var(--progress), transparent 0)` }">
                    <div class="circle"
                        :style="{ 'background': `radial-gradient(circle, ${item.SCOLOR}, ${item.ECOLOR})`, 'margin-left': `${item.value}` + '%' }">
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script lang="ts">
import { hexToRgb, progress_color, progress_hex_color } from '@/components/utils/util'
import { reactive, ref } from 'vue'
export default {
    name: 'ProgressWidget',
    props: {
        designer: Object,

    },
    setup(props) {

        const title = props.designer?.desc

        // 1. 将对象转为键值对数组并按值降序排序
        const sortedEntries = Object.entries(props.designer?.DATA[0]).sort((a, b) => {
            // 使用类型断言明确指定值的类型
            const valueA = a[1] as number;
            const valueB = b[1] as number;
            return valueB - valueA;
        });

        // 2. 添加排名并转换为目标格式
        let v_data = sortedEntries.map(([name, value], index) => ({
            name,
            value,
            rank: index + 1, // 排名从1开始
            SCOLOR: '' ,
             ECOLOR: '' ,
            HEXCOLOR: '',
            RGBCOLOR: ''
        }));
        
        for (let item in v_data) {
          
            v_data[item].SCOLOR = progress_color(v_data[item].rank).startColor;
             v_data[item].ECOLOR = progress_color(v_data[item].rank).endColor;
            v_data[item].HEXCOLOR = progress_hex_color(v_data[item].rank);
            v_data[item].RGBCOLOR = hexToRgb(v_data[item].HEXCOLOR)
          
        }
      


        return {
            title,
            v_data,
        }
    }
}
</script>

<style lang="scss" scoped>
.progress {
    width: 100%;
    height: 100%;
    //background:blue;
      container-type: inline-size;
}
.title_1 {
    font-family: 'AlibabaPuHuiTiMedium', sans-serif;
    font-size: 6cqw;

    color: #ffffff;

}
.title_2 {
    text-align: center;
    font-family: 'AlibabaPuHuiTiMedium', sans-serif;
    font-size: 3cqw;
    color: #ffffff;
}

.g-progress {
    width: 90%;
    height: 7px;
    margin: 10px;
    position: relative;


    //background: linear-gradient(90deg, #0f0, #0ff var(--progress), transparent 0);
    background-color: #11305F;
    border: 1px solid;
}

.circle {
    height: 12px;
    width: 12px;
    top: -3px;
    left: -2px;
    border-radius: 50%;
    position: absolute;
    //background: radial-gradient(#ffffff 0%, cyan 50%, transparent 100%);
}

.s_tag_1 {
    width: 3px;
    height: 15px;
    left: -2px;
    top: 2px;
    position: absolute;
}
</style>