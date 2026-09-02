import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  computed,
  nextTick,
  toRaw,
  Ref,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import * as echarts from "echarts";
import { vue3ScrollSeamless } from "vue3-scroll-seamless";
import 甲_1 from "@/assets/images/AVG/A_1.png";
import 甲_2 from "@/assets/images/AVG/A_2.png";
import 甲_3 from "@/assets/images/AVG/A_3.png";
import 甲_4 from "@/assets/images/AVG/A_4.png";
import 乙_1 from "@/assets/images/AVG/B_1.png";
import 乙_2 from "@/assets/images/AVG/B_2.png";
import 乙_3 from "@/assets/images/AVG/B_3.png";
import 乙_4 from "@/assets/images/AVG/B_4.png";
import 丙_1 from "@/assets/images/AVG/C_1.png";
import 丙_2 from "@/assets/images/AVG/C_2.png";
import 丙_3 from "@/assets/images/AVG/C_3.png";
import 丙_4 from "@/assets/images/AVG/C_4.png";
import 丁_1 from "@/assets/images/AVG/D_1.png";
import 丁_2 from "@/assets/images/AVG/D_2.png";
import 丁_3 from "@/assets/images/AVG/D_3.png";
import 丁_4 from "@/assets/images/AVG/D_4.png";

export default defineComponent({
  name: "WMSMFOSMS",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    vue3ScrollSeamless,
  },
  methods: {},
  setup() {
    /** 画面显示的罐总数*/
    const efFormInfo = ref<{ [key: string]: any }>({});
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    let formPartition: string;
    const initializeFlag = ref(0);

    const old_count = ref();
    const old_wt = ref();
    const now_count = ref();
    const now_wt = ref();
    const old_count1 = ref();
    const old_wt1 = ref();
    const now_count1 = ref();
    const old_count2 = ref();
    const now_count2 = ref();
    const now_wt1 = ref();
    const total_wt = ref();

    var datetime = new Date();
    var now_m = datetime.getMonth() + 1;
    var last_m = datetime.getMonth();
    const time_Now = ref();
    const textarea2 = ref("请输入冶炼要点......");

    const list = ref();
    const data_s = reactive([{}]);

    const db_name = ref();
    const db_num = ref();
    const db_name1 = ref();
    const db_num1 = ref();

    const aod_1 = ref();
    const aod_2 = ref();
    const aod_3 = ref();
    const aod_4 = ref();
    const aod_1_n = ref();
    const aod_2_n = ref();
    const aod_3_n = ref();
    const aod_4_n = ref();

    const IF_1 = ref();
    const IF_2 = ref();
    const IF_3 = ref();
    const IF_4 = ref();
    const IF_1_n = ref();
    const IF_2_n = ref();
    const IF_3_n = ref();
    const IF_4_n = ref();

    //主表查询

    const queryData = async () => {
      //clearTimeout(main_tout); //清除定时器
      const eiInfo = new EI.EIInfo();

      const outInfo = await erFormHelper.callService(
        "wmsmfosms_inq",
        eiInfo,
        true,
        true,
        true
      );
      console.log("fghjklS;", outInfo);
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("错误:" + outInfo.sys.msg);
      } else {
        data_s.length = 0;
        data_s.push(outInfo.getBlock(0).data);
        console.log("iuhbjkops", data_s);

        db_name.value = outInfo
          .getBlock(0)
          .data.filter((item) => String(item.WORK_CODE) === "01")[0].BACKC1;
        db_num.value = outInfo
          .getBlock(0)
          .data.filter((item) => String(item.WORK_CODE) === "01")[0].WORK_VALUE;
        db_name1.value = outInfo
          .getBlock(0)
          .data.filter((item) => String(item.WORK_CODE) === "03")[0].BACKC1;
        db_num1.value = outInfo
          .getBlock(0)
          .data.filter((item) => String(item.WORK_CODE) === "03")[0].WORK_VALUE;
        console.log("iuhbjkops", db_name, db_num);
        //AOD当月平均炉数imageUrl1
        {
          aod_1.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "02" && String(item.BACKC2) === "1"
            )[0].BACKC1;
          aod_1_n.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "02" && String(item.BACKC2) === "1"
            )[0].WORK_VALUE;
          if (aod_1.value === "甲") imageUrl1.value = 甲_1;
          if (aod_1.value === "乙") imageUrl1.value = 乙_1;
          if (aod_1.value === "丙") imageUrl1.value = 丙_1;
          if (aod_1.value === "丁") imageUrl1.value = 丁_1;

          aod_2.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "02" && String(item.BACKC2) === "2"
            )[0].BACKC1;
          aod_2_n.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "02" && String(item.BACKC2) === "2"
            )[0].WORK_VALUE;
          if (aod_2.value === "甲") imageUrl2.value = 甲_2;
          if (aod_2.value === "乙") imageUrl2.value = 乙_2;
          if (aod_2.value === "丙") imageUrl2.value = 丙_2;
          if (aod_2.value === "丁") imageUrl2.value = 丁_2;

          aod_3.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "02" && String(item.BACKC2) === "3"
            )[0].BACKC1;
          aod_3_n.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "02" && String(item.BACKC2) === "3"
            )[0].WORK_VALUE;
          if (aod_3.value === "甲") imageUrl3.value = 甲_3;
          if (aod_3.value === "乙") imageUrl3.value = 乙_3;
          if (aod_3.value === "丙") imageUrl3.value = 丙_3;
          if (aod_3.value === "丁") imageUrl3.value = 丁_3;

          aod_4.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "02" && String(item.BACKC2) === "4"
            )[0].BACKC1;
          aod_4_n.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "02" && String(item.BACKC2) === "4"
            )[0].WORK_VALUE;
          if (aod_4.value === "甲") imageUrl4.value = 甲_4;
          if (aod_4.value === "乙") imageUrl4.value = 乙_4;
          if (aod_4.value === "丙") imageUrl4.value = 丙_4;
          if (aod_4.value === "丁") imageUrl4.value = 丁_4;
        }

        //合金熔化炉当月平均炉数imageUrl1
        {
          IF_1.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "04" && String(item.BACKC2) === "1"
            )[0].BACKC1;
          IF_1_n.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "04" && String(item.BACKC2) === "1"
            )[0].WORK_VALUE;
          if (IF_1.value === "甲") imageUrlZ1.value = 甲_1;
          if (IF_1.value === "乙") imageUrlZ1.value = 乙_1;
          if (IF_1.value === "丙") imageUrlZ1.value = 丙_1;
          if (IF_1.value === "丁") imageUrlZ1.value = 丁_1;

          IF_2.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "04" && String(item.BACKC2) === "2"
            )[0].BACKC1;
          IF_2_n.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "04" && String(item.BACKC2) === "2"
            )[0].WORK_VALUE;
          if (IF_2.value === "甲") imageUrlZ2.value = 甲_2;
          if (IF_2.value === "乙") imageUrlZ2.value = 乙_2;
          if (IF_2.value === "丙") imageUrlZ2.value = 丙_2;
          if (IF_2.value === "丁") imageUrlZ2.value = 丁_2;

          IF_3.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "04" && String(item.BACKC2) === "3"
            )[0].BACKC1;
          IF_3_n.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "04" && String(item.BACKC2) === "3"
            )[0].WORK_VALUE;
          if (IF_3.value === "甲") imageUrlZ3.value = 甲_3;
          if (IF_3.value === "乙") imageUrlZ3.value = 乙_3;
          if (IF_3.value === "丙") imageUrlZ3.value = 丙_3;
          if (IF_3.value === "丁") imageUrlZ3.value = 丁_3;

          IF_4.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "04" && String(item.BACKC2) === "4"
            )[0].BACKC1;
          IF_4_n.value = outInfo
            .getBlock(0)
            .data.filter(
              (item) =>
                String(item.WORK_CODE) === "04" && String(item.BACKC2) === "4"
            )[0].WORK_VALUE;
          if (IF_4.value === "甲") imageUrlZ4.value = 甲_4;
          if (IF_4.value === "乙") imageUrlZ4.value = 乙_4;
          if (IF_4.value === "丙") imageUrlZ4.value = 丙_4;
          if (IF_4.value === "丁") imageUrlZ4.value = 丁_4;
        }
      }

      setTimeout(queryData, 10 * 60 * 1000);
    };

    onMounted(() => {
      queryData();

      initializeFlag.value = 1;
    });

    onMounted(() => {
      //scroll(tableRef.value.$refs.bodyWrapper) //设置滚动
    });
    function hexToRgb(hex: string): string {
      // 去除 # 号
      hex = hex.replace("#", "");

      // 如果是缩写形式的颜色值（如 #FFF），则进行转换
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      // 将 16 进制颜色值转换为 RGB 格式
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      return `rgba(${r}, ${g}, ${b},0.3)`;
    }
    const hexColor1 = "#30b2fb";
    const hexColor2 = "#fbe660";
    const hexColor3 = "#59e2fb";
    const hexColor4 = "#40efb6";
    const rgbColor1 = hexToRgb(hexColor1);
    const rgbColor2 = hexToRgb(hexColor2);
    const rgbColor3 = hexToRgb(hexColor3);
    const rgbColor4 = hexToRgb(hexColor4);
    console.log("iuygfcvghjiopokjhb", rgbColor1);

    const classOptions = {
      step: 0.1,
    };
    const imageUrl1 = ref(甲_1);
    const imageUrl2 = ref(丙_2);
    const imageUrl3 = ref(乙_3);
    const imageUrl4 = ref(丁_4);

    const imageUrlZ1 = ref(甲_1);
    const imageUrlZ2 = ref(丙_2);
    const imageUrlZ3 = ref(乙_3);
    const imageUrlZ4 = ref(丁_4);
    let fir_col = "#2ebaff";
    let sec_col = "#08eeff";
    let tir_col = "#3aefbb";
    let fou_col = "#f4d74a";
    let startColor1 = "#02c2fe";
    let endColor1 = "#0f3352";
    let startColor2 = "#fedc33";
    let endColor2 = "#524d1f";
    let startColor3 = "#2bf7fe";
    let endColor3 = "#1c4452";
    let startColor4 = "#18f290";
    let endColor4 = "#12463b";

    return {
      time_Now,
      old_count,
      old_wt,
      now_count,
      now_wt,
      old_count1,
      old_wt1,
      now_count1,
      now_wt1,
      total_wt,
      initializeFlag,
      textarea2,
      old_count2,
      now_count2,
      classOptions,
      list,
      imageUrl1,
      imageUrl2,
      imageUrl3,
      imageUrl4,
      fou_col,
      fir_col,
      sec_col,
      tir_col,
      startColor1,
      endColor1,
      startColor2,
      endColor2,
      startColor3,
      endColor3,
      startColor4,
      endColor4,
      rgbColor1,
      rgbColor2,
      rgbColor3,
      rgbColor4,
      hexColor1,
      hexColor2,
      hexColor3,
      hexColor4,
      data_s,
      db_name,
      db_num,
      db_name1,
      db_num1,
      aod_1,
      aod_1_n,
      aod_2,
      aod_2_n,
      aod_3,
      aod_3_n,
      aod_4,
      aod_4_n,
      imageUrlZ1,
      imageUrlZ2,
      imageUrlZ3,
      imageUrlZ4,
      IF_1,
      IF_1_n,
      IF_2,
      IF_2_n,
      IF_3,
      IF_3_n,
      IF_4,
      IF_4_n,
    };
  },
});
