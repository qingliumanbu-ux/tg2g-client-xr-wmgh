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
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import xrEfDialog from "EFX/xrEfDialog";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import { ER } from "ERX/Er";

// import MMSM50ADDS2N from "../MMSM50ADDS2N/MMSM50ADDS2N.vue";
export default defineComponent({
  name: "WMSMSHLCS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service

    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});

    const initializeService = "";
    const bunker = reactive(new Array());

    const parentInfo = ref({});
    let flag: any;
    const dialogFormName = ref(""); // 弹出画面的画面名
    const dialogVisible = ref(false);
    const detailTabsRef = ref<any>(null);

    let formName: string;
    let formPartition: string;
    let PROGRAM_NAME: string;
    // let popFreeEdit: ErPopFreeHelper;
    const formlayout: Ref<any[]> = ref([]);

    const bunker3 = reactive(new Array());
    const bunker_mat_name3 = reactive(new Array());
    const bunker_stock_wt3 = reactive(new Array());
    const buiker_stock_wt3 = reactive(new Array());
    const bunker_color_status3 = reactive(new Array());
    const BL_WT3 = reactive(new Array());
    const BS_WT3 = reactive(new Array());

    const initializeFlag = ref(0);

    const bunker_stk_no3 = reactive(new Array());
    // let gridView1!: kendo.ui.Grid;
    // let gridView2!: kendo.ui.Grid;
    let gridView1: any;
    let gridView2: any;

    var t = setTimeout(time, 1000); //開始运行
        function time() {
            clearTimeout(t); //清除定时器
            var dt = new Date();

            t = setTimeout(time, 1000); //设定定时器，循环运行
        }
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      console.log("efFormInfo.value.formPartition", efFormInfo.value.formPartition);
      console.log("efFormInfo.value.formName", efFormInfo.value.formName);
      initializePage();
    };

    // 变量定义

    // 画面相关数据初始化
    const initializePage = async () => {
      // const initialResult = await erFormHelper.Initialize(
      //   efFormInfo.value.formPartition,"WMSMSHLCS2N","", "");
      const initialResult = await erFormHelper.Initialize(
                formPartition,
                formName,
                '',
                initializeService
            );
      console.log("产线sql_mat_kind");
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          QueryBunker();
        });
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" + initialResult.msg + "]!"
        );
      }
    };

    const QueryBunker = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      // bunker.length = 0;
      // bunker_flag.length = 0;

      bunker3.length = 0;
      bunker_mat_name3.length = 0;
      bunker_stock_wt3.length = 0;
      buiker_stock_wt3.length = 0;
      bunker_color_status3.length = 0;

      EIManager.callService(efFormInfo.value.formPartition,"wmsmshlc_inq",inInfo).then((res: EI.EIInfo) => {
        console.log("res123", res);
        for (let i = 0; i < res.getBlock(0).data.length; i++) {

            bunker3.push(res.getBlock(0).data[i]["BUNKER_NO"]);
            BS_WT3.push(res.getBlock(0).data[i]["STOCK_RATE"]);
            BL_WT3.push(res.getBlock(0).data[i]["STOCK_RATE_1"]);
            bunker_mat_name3.push(res.getBlock(0).data[i]["BUNKER_NO"]);
            bunker_stock_wt3.push(res.getBlock(0).data[i]["STOCK_RATE"]);
            bunker_color_status3.push(false);
        }
      });
    };

    onMounted(() => {
            setStartTimer();
    });
    let timeId: any;
    const setStartTimer = () => {
        console.log('定时器触发');
        timeId = setInterval(QueryBunker, 1000 * 60 * 3);
    };

    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      gridView1,
      gridView2,
      bunker,
      bunker3,
      bunker_mat_name3,
      bunker_stock_wt3,
      buiker_stock_wt3,
      bunker_color_status3,
      BS_WT3,
      BL_WT3,

      parentInfo,
      dialogFormName,
      dialogVisible,
    };
  },
});
