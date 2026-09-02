/* eslint-disable no-use-before-define */
import {
  defineComponent,
  inject,
  onMounted,
  provide,
  reactive,
  ref,

} from "vue";
import { ER } from "ERX/Er";
import { EI } from "EIX/ei";
import xrEfForm from "EFX/xrEfForm";
import ListTabs from "../../components/disPlayDiy/ListTabs.vue"
import DisFosm from "../../components/disPlayDiy/DisFosm.vue"



export default defineComponent({
  name: 'WMSMFORMS2N',
  components: {
    xrEfForm, ListTabs, DisFosm
  },


  setup: () => {
    //画面初始化变量
    const efFormInfo = ref<any>();
    const formPartition = ref<any>();
    const efFormIsReady = ref(false);
    //低代码初始化变量
    const formName = "WMSMFORMS2N";
    const erFormHelper = new ER.FormHelper();
    const initializeService = "wm00_form_get";
    const initializeFlag = ref(0);
    let initFormParas: any;
    const dataSource = reactive(new EI.EIInfo());
    const childData = ref();
    const inschildData = ref();
    const DataLabel = ref<Object>();
    let v_Label: any;

    //#region 初始化
    //画面初始化
    const efFormReady = (e: any) => {
      
      efFormInfo.value = e.formInfo;
      formPartition.value = efFormInfo.value.formPartition;
      efFormIsReady.value = true;


      getEPESPara();
      initializePage();
    };

    //子母画面获取参数
    const getEPESPara = () => {
      const para = efFormInfo.value.formParams;
    };
    const handleChildClick = (dataFromChild: any) => {
      childData.value = dataFromChild
    };
    const Expose_Label = (dataLabel: any, label: any) => {


      // label.value.CONDITIONS=JSON.stringify(dataLabel)
      DataLabel.value = dataLabel.value
      v_Label = label
      
    };

    const refresh = async () => {
      const eiInfo = new EI.EIInfo();
      const outBlock = await erFormHelper.callService('wmsmform_inq', eiInfo, true, true);
     
      for (let i = 0; i < Object.keys(outBlock.blocks).length; i++) {
        const blk_name = outBlock.getBlock(i).name;

        if (dataSource.contains(blk_name)) {
          dataSource.remove(blk_name);
        }
        dataSource.addBlock(outBlock.getBlock(i), outBlock.getBlock(i).name);
      }
    }

    provide('handleChildClick', handleChildClick);
    provide('Expose_Label', Expose_Label);
    const drag_con_end = (e: any) => {
      inschildData.value = e
    }
    provide('drag_con_end', drag_con_end);
    provide('refresh', refresh);
    //读低代码配置并初始化
    const initializePage = async () => {
      await erFormHelper.Initialize(
        formPartition.value,
        formName,
        '',
        initializeService,
        initFormParas
      );

      const eiInfo = new EI.EIInfo();

      const outBlock = await erFormHelper.callService('wmsmform_inq', eiInfo, true, true);
      for (let i = 0; i < Object.keys(outBlock.blocks).length; i++) {
        const blk_name = outBlock.getBlock(i).name;
        if (dataSource.contains(blk_name)) {
          dataSource.remove(blk_name);
        }
        dataSource.addBlock(outBlock.getBlock(i), outBlock.getBlock(i).name);
      }
      console.log('kjhgfdxsz',dataSource)
      initializeFlag.value = 1;
      
    };
    //#endregion

    const form_conf_save = async () => {
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(erFormHelper.buildEiBlock([{ IDX_REQ: v_Label.IDX_REQ, FORM_DESC: v_Label.FORM_DESC, CONDITIONS: JSON.stringify(DataLabel.value) }]));
      inInfo.addBlock(erFormHelper.buildEiBlock([{ OP_TYPE: 'I' }]), 'TPYE')
      const outInfo = await erFormHelper.callService('wmsm_form_save', inInfo, true, true, true);
       refresh();
    }

    onMounted(() => {


    });




    return {
      efFormReady,
      initializeFlag, dataSource, childData, inschildData, form_conf_save
    };
  }
});
