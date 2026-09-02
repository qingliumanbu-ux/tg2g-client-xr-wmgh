import { computed, defineComponent, onMounted, reactive, ref, watch, toRaw, nextTick, Ref } from 'vue';
import { EI, EIManager, buildEIInfo } from 'EIX/ei';
import { ER } from 'ERX/Er';
import { SiUtils } from 'ERX/SiUtils';
import { FiUtils } from 'ERX/FiUtils';
import xrEfForm from 'EFX/xrEfForm';
import xrEfPanel from 'EFX/xrEfPanel';
import erLayout from 'ERX/ErLayout';
import erGrid from 'ERX/ErGrid';
import xrEfDialog from 'EFX/xrEfDialog';
import ErPopFree from 'ERX/ErPopFree';
import { PopQueryReturnInfo, PopFreeReturnInfo } from 'ERX/er-type';
import { Console, log } from 'console';

export default defineComponent({
  name: 'WMSMYRYTSS2N',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
    ErPopFree
  },

  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const efFormInfo = ref<{ [key: string]: any }>({});
    const efFormIsReady = ref(false);
    let formPartition: string;
    let formName: '';
    let UserName: '';
    const editable = ref(false);
    let PROGRAM_NAME: string;
    let i_form_ename = ''; // 低代码配置画面布局名
    let grid_main!: any;
    const gridView_tab1 = ref('GridView1');
    let LayoutGroupFilter = 'layoutControlGroup1';
    let F5_Status = 0; // F7按钮状态，0: 未进入多步，1: 进入多步

    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const subGridData = ref<any>([]);

    const initializeService = '';
    //const tabActiveKey = ref('tab1');
    let i_proc_div = '';
    let cs_OkClick = '';
    let table_name = '';
    let popFreeEdit: ER.PopFreeHelper;
    let grid_tab = '';

    // xr-ef-form提供了ready事件, 在这里获取画面配置信息
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      console.log('efFormInfo', formName);
      UserName = efFormInfo.value.UserName; // 当前用户名
      console.log('efFormInfo', UserName);
      if (efFormInfo.value.formParams?.PROGRAM_NAME) {
        PROGRAM_NAME = efFormInfo.value.formParams['PROGRAM_NAME'];
      }
      initializePage();
    };
    // const erFormHelper: ER.FormHelper = reactive(new ER.FormHelper()) as any;

    // 变量定义
    const initializeFlag = ref(0);
    let dt_key = new EI.EiBlock();

    const saveMainGridData = async () => {
      console.log('1111', );

      if (erFormHelper.hasDataChange("GridView1")) {
        const eiinfo = new EI.EIInfo();

        const created = erFormHelper.getGridRowsAsBlock('GridView1', "add");
        eiinfo.addBlock(created, "ADD");
        const updated= erFormHelper.getGridRowsAsBlock('GridView1', "modify");
        eiinfo.addBlock(updated, "UPD");
        const deleted = erFormHelper.getGridRowsAsBlock('GridView1', "delete");
        eiinfo.addBlock(deleted, "DEL");
        const pro_div = erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
        pro_div.addColumn('PRO_DIV', 'TS'); //传
        eiinfo.addBlock(pro_div,"PRO_DIV")

        console.log('eiinfo', eiinfo);
        // const para =
        //   erFormHelper.getAllControlValueAsEiBlock("layoutControlGroup1");
        // eiinfo.addBlock(para, "PARA");
        erFormHelper.callService("wmsmyry_upd", eiinfo, true, true, true).then((res) => {
          subGridData.value = res.getBlock('Table0').data;
        });
      }
    };

    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(formPartition, formName, i_form_ename, initializeService);
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;

        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {});
      } else {
        erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
      }
    };

    onMounted(() => {});
    //grid实例
    const erGrid1Ready = () => {
      grid_main = erFormHelper.getGrid(gridView_tab1.value);
      erFormHelper.setGridEditable(gridView_tab1.value, false); // 设置grid不可编辑
      erFormHelper.setGridToolbarVisible(gridView_tab1.value, {
        excel: true
      });
    };

    //自定义模板参数
    // const popFreeEdit_pars = async (Click_name: string) => {
    //     if (cs_OkClick === 'F3') {
    //       popFreeEdit = new ER.PopFreeHelper(formPartition, 'WMSM_DIALOG', 'WMSMCZTS_LAYOUT_DIALOG2');
    //     }else if (cs_OkClick === 'F4') {
    //       popFreeEdit = new ER.PopFreeHelper(formPartition, 'WMSM_DIALOG', 'WMSMCZTS_LAYOUT_DIALOG3');
    //     }
    // }

    const query_main = async () => {
      const eiInfo = new EI.EIInfo();
      //efFormInfo.value.formParams["service"]
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
      eiBlock.addColumn('table_name', 'TWMSMYRYTS'); //传表名
      eiInfo.addBlock(eiBlock, '');
      const outInfo = await erFormHelper.callService("mmsmdr_inq", eiInfo);

      //播放语音
      // const msg = new SpeechSynthesisUtterance();
      //     msg.text = mainData[0]["REMARK"] as string;
      //     window.speechSynthesis.speak(msg);
      
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo.sys.msg);
        return;
      } else {
        erFormHelper.mergeDataToGrid(outInfo, gridView_tab1.value);
      }
    };

    const F2_DO = async () => {
      query_main();
    };

    //F3点击事件：维护

    const F3_PRE_DO = (e: any) => {
       editable.value = true;
       erFormHelper.setGridToolbarVisible("GridView1", {
         addrow: true,
         copyrow: true,
         delete: true,
       });
 
       erFormHelper.setGridEditable("GridView1", true);
     };
    const F3_DO = async (e: any) => {
      console.log('123');

      // const grid1 = erFormHelper.getGridAllRowsAsBlock('GridView1'); //获取所有行数据
      // let row_id = 0;
      let strnull=false;
      // for (row_id = 0; row_id < grid1.data.length; row_id++) 
      // {
      //   //if (grid2ds.data[row_id]['LINE_DESC']?.toString().trim()==''||grid2ds.data[row_id]['RESPONSIBILITY_PLANT_3T']?.toString().trim()=='') 
      //    // {
      //    // strnull=true;
      //    // }
      // }
      if (strnull) 
      {
        erFormHelper.messageWarning('必填信息有空值！');
        return false;
      }
      else
      {
        console.log('123');

        erFormHelper.stopGridEditing("GridView1", async () => {
        erFormHelper.setGridToolbarVisible("GridView1", {
          addrow: false,
          copyrow: false,
          delete: false,
        });
        return await saveMainGridData()
          .then((res: any) => {
            erFormHelper.messageSuccess('操作成功！');
            editable.value = false;
            erFormHelper.setGridEditable("GridView1", false);
          })
          .catch((error) => {
            erFormHelper.messageError(error);
            return false;
          });
        });
      }
    };

    const F3_CANCEL = (e: any) => {
      erFormHelper.setGridToolbarVisible("GridView1", {
        addrow: false,
        copyrow: false,
        delete: false,
      });

      erFormHelper.setGridEditable("GridView1", false);
    };

    return {
      erFormHelper,
      editable,
      initializeFlag,
      efFormReady,
      LayoutGroupFilter,
      gridView_tab1,
      F2_DO,
      erGrid1Ready,
      //erGrid5Ready,
      F3_PRE_DO,
      F3_DO,
      F3_CANCEL,
    };
  }
});
