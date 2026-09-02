import { computed, defineComponent, onMounted, ref, watch, toRaw, nextTick, Ref } from 'vue';
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
import { CellValueChangedEvent, Logger } from '@ag-grid-community/core';
import { PopQueryReturnInfo, PopFreeReturnInfo } from 'ERX/er-type';
import { Console, log } from 'console';

export default defineComponent({
  name: 'WMSMYRYS2N',
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
    let PROGRAM_NAME: string;
    let i_form_ename = ''; // 低代码配置画面布局名
    let grid_main!: any;
    let gridApi: any;
    let gridView3!: any;
    var t = setTimeout(time, 60000); //開始运行
    function time() {
      clearTimeout(t); //清除定时器
      
      t = setTimeout(time, 60000); //设定定时器，循环运行
    }
    const subGridData = ref<any>([]);
    // const gridView_tab0 = ref('GridView0');
    // const gridView_tab1 = ref('GridView1');
    // const gridView_tab2 = ref('GridView2');
    const gridView_tab3 = ref('GridView3');
    // const gridView_tab4 = ref('GridView4');
    // const gridView_tab5 = ref('GridView5');
    // const gridView_tab6 = ref('GridView6');
    let LayoutGroupFilter = 'layoutControlGroup1';
    let F5_Status = 0; // F7按钮状态，0: 未进入多步，1: 进入多步


    const initializeService = '';
    //const tabActiveKey = ref('tab1');
    let i_proc_div = '';
    let cs_OkClick = '';
    let popFreeEdit: ER.PopFreeHelper;
    let grid_tab = '';
    const editable = ref(false);
    let tongzhi_aod = '';
    let tongzhi1 = '';


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
    const erFormHelper: ER.FormHelper = new ER.FormHelper();


    // 变量定义
    const initializeFlag = ref(0);
    let dt_key = new EI.EiBlock();
    // 自定义grid工具栏按钮是否可用
    const setToolbarVisible1 = (configId: string, visible: boolean) => {
      erFormHelper.setGridToolbarVisible(configId, {
        import: true,
        excel: true
      });
    };
    const setToolbarVisible2 = (configId: string, visible: boolean) => {
      erFormHelper.setGridToolbarVisible(configId, {
        import: false,
        excel: true
      });
    };

    const saveMainGridData3 = async () => {
        if (erFormHelper.hasDataChange("GridView3")) {
          const eiinfo = new EI.EIInfo();

          const created = erFormHelper.getGridRowsAsBlock('GridView3', "add");
          eiinfo.addBlock(created, "ADD");
          const updated= erFormHelper.getGridRowsAsBlock('GridView3', "modify");
          eiinfo.addBlock(updated, "UPD");
          const deleted = erFormHelper.getGridRowsAsBlock('GridView3', "delete");
          eiinfo.addBlock(deleted, "DEL");
          const pro_div = erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
          pro_div.addColumn('PRO_DIV', 'A0'); //传
          eiinfo.addBlock(pro_div,"PRO_DIV")
          console.log('eiinfo', eiinfo);

          erFormHelper.callService("wmsmyry_upd", eiinfo, true, true, true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
        }
      };

      const saveMainGridData4 = async () => {
        if (erFormHelper.hasDataChange("GridView4")) {
          const eiinfo = new EI.EIInfo();

          const created = erFormHelper.getGridRowsAsBlock('GridView4', "add");
          eiinfo.addBlock(created, "ADD");
          const updated= erFormHelper.getGridRowsAsBlock('GridView4', "modify");
          eiinfo.addBlock(updated, "UPD");
          const deleted = erFormHelper.getGridRowsAsBlock('GridView4', "delete");
          eiinfo.addBlock(deleted, "DEL");
          
          const pro_div = erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
          pro_div.addColumn('PRO_DIV', 'A1'); //传
          eiinfo.addBlock(pro_div,"PRO_DIV")
          console.log('eiinfo', eiinfo);

          erFormHelper.callService("wmsmyry_upd", eiinfo, true, true, true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
        }
      };

      const saveMainGridData5 = async () => {
        if (erFormHelper.hasDataChange("GridView5")) {
          const eiinfo = new EI.EIInfo();

          const created = erFormHelper.getGridRowsAsBlock('GridView5', "add");
          eiinfo.addBlock(created, "ADD");
          const updated= erFormHelper.getGridRowsAsBlock('GridView5', "modify");
          eiinfo.addBlock(updated, "UPD");
          const deleted = erFormHelper.getGridRowsAsBlock('GridView5', "delete");
          eiinfo.addBlock(deleted, "DEL");
          
          const pro_div = erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
          pro_div.addColumn('PRO_DIV', 'A2'); //传
          eiinfo.addBlock(pro_div,"PRO_DIV")
          console.log('eiinfo', eiinfo);

          erFormHelper.callService("wmsmyry_upd", eiinfo, true, true, true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
        }
      };

      const saveMainGridData7 = async () => {
        if (erFormHelper.hasDataChange("GridView7")) {
          const eiinfo = new EI.EIInfo();

          const created = erFormHelper.getGridRowsAsBlock('GridView7', "add");
          eiinfo.addBlock(created, "ADD");
          const updated= erFormHelper.getGridRowsAsBlock('GridView7', "modify");
          eiinfo.addBlock(updated, "UPD");
          const deleted = erFormHelper.getGridRowsAsBlock('GridView7', "delete");
          eiinfo.addBlock(deleted, "DEL");
          
          const pro_div = erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
          pro_div.addColumn('PRO_DIV', 'F1'); //传
          eiinfo.addBlock(pro_div,"PRO_DIV")
          console.log('eiinfo', eiinfo);

          erFormHelper.callService("wmsmyry_upd", eiinfo, true, true, true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
        }
      };

      const saveMainGridData8 = async () => {
        if (erFormHelper.hasDataChange("GridView8")) {
          const eiinfo = new EI.EIInfo();

          const created = erFormHelper.getGridRowsAsBlock('GridView8', "add");
          eiinfo.addBlock(created, "ADD");
          const updated= erFormHelper.getGridRowsAsBlock('GridView8', "modify");
          eiinfo.addBlock(updated, "UPD");
          const deleted = erFormHelper.getGridRowsAsBlock('GridView8', "delete");
          eiinfo.addBlock(deleted, "DEL");
          
          const pro_div = erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
          pro_div.addColumn('PRO_DIV', 'F2'); //传
          eiinfo.addBlock(pro_div,"PRO_DIV")
          console.log('eiinfo', eiinfo);

          erFormHelper.callService("wmsmyry_upd", eiinfo, true, true, true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
        }
      };

      const saveMainGridData9 = async () => {
        if (erFormHelper.hasDataChange("GridView9")) {
          const eiinfo = new EI.EIInfo();

          const created = erFormHelper.getGridRowsAsBlock('GridView9', "add");
          eiinfo.addBlock(created, "ADD");
          const updated= erFormHelper.getGridRowsAsBlock('GridView9', "modify");
          eiinfo.addBlock(updated, "UPD");
          const deleted = erFormHelper.getGridRowsAsBlock('GridView9', "delete");
          eiinfo.addBlock(deleted, "DEL");
          
          const pro_div = erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
          pro_div.addColumn('PRO_DIV', 'F3'); //传
          eiinfo.addBlock(pro_div,"PRO_DIV")
          console.log('eiinfo', eiinfo);

          erFormHelper.callService("wmsmyry_upd", eiinfo, true, true, true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
        }
      };

      const saveMainGridData10 = async () => {
        if (erFormHelper.hasDataChange("GridView10")) {
          const eiinfo = new EI.EIInfo();

          const created = erFormHelper.getGridRowsAsBlock('GridView10', "add");
          eiinfo.addBlock(created, "ADD");
          const updated= erFormHelper.getGridRowsAsBlock('GridView10', "modify");
          eiinfo.addBlock(updated, "UPD");
          const deleted = erFormHelper.getGridRowsAsBlock('GridView10', "delete");
          eiinfo.addBlock(deleted, "DEL");
          
          const pro_div = erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
          pro_div.addColumn('PRO_DIV', 'F4'); //传
          eiinfo.addBlock(pro_div,"PRO_DIV")
          console.log('eiinfo', eiinfo);

          erFormHelper.callService("wmsmyry_upd", eiinfo, true, true, true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
        }
      };

      const saveMainGridData12 = async () => {
        if (erFormHelper.hasDataChange("GridView12")) {
          const eiinfo = new EI.EIInfo();

          const created = erFormHelper.getGridRowsAsBlock('GridView12', "add");
          eiinfo.addBlock(created, "ADD");
          const updated= erFormHelper.getGridRowsAsBlock('GridView12', "modify");
          eiinfo.addBlock(updated, "UPD");
          const deleted = erFormHelper.getGridRowsAsBlock('GridView12', "delete");
          eiinfo.addBlock(deleted, "DEL");
          
          const pro_div = erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
          pro_div.addColumn('PRO_DIV', 'E1'); //传
          eiinfo.addBlock(pro_div,"PRO_DIV")
          console.log('eiinfo', eiinfo);

          erFormHelper.callService("wmsmyry_upd", eiinfo, true, true, true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
        }
      };

      const saveMainGridData13 = async () => {
        if (erFormHelper.hasDataChange("GridView13")) {
          const eiinfo = new EI.EIInfo();

          const created = erFormHelper.getGridRowsAsBlock('GridView13', "add");
          eiinfo.addBlock(created, "ADD");
          const updated= erFormHelper.getGridRowsAsBlock('GridView13', "modify");
          eiinfo.addBlock(updated, "UPD");
          const deleted = erFormHelper.getGridRowsAsBlock('GridView13', "delete");
          eiinfo.addBlock(deleted, "DEL");
          
          const pro_div = erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
          pro_div.addColumn('PRO_DIV', 'E2'); //传
          eiinfo.addBlock(pro_div,"PRO_DIV")
          console.log('eiinfo', eiinfo);

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
        nextTick(() => {
          //erFormHelper.setAllControlReadOnly(['Layout_aod', 'Layout_amf', 'Layout_eaf'], true)
          query();
          query_ccm();
         });
      } else {
        erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
      }
    };

    onMounted(() => {
      setStartTimer();
     });
      let timeId_ccm: any;
      let timeId: any;
      const setStartTimer = () => {
          console.log('定时器触发');
          timeId_ccm = setInterval(query_ccm, 1000 * 60 * 15);
          timeId = setInterval(query, 1000 * 60 * 15);
      }

    // const erGrid3Ready = (e: any) => {
    //   gridApi = e.api;
    //   gridApi.addEventListener('cellValueChanged', cellValueChangedHandler);
    //   // gridView3 = erFormHelper.getGrid("GridView3");
    //   // gridView3.gridOptions.getRowStyle = (params: any) => {
    //   //   const nextTime1 = new Date(params.data.OUT_STEEL_TIME + 90 * 60000)
    //   //   params.data.OUT_STEEL_TIME=String(nextTime1);
    //   // };
    // }

    function parseCompactDate(dateString:any) {
      if (!dateString || dateString.length !== 14) {
        console.error('日期格式不正确，需要14位无分隔符字符串');
        return null;
      }
      
      // 提取各部分时间
      const year = parseInt(dateString.substring(0, 4), 10);
      const month = parseInt(dateString.substring(4, 6), 10) - 1; // 月份从0开始
      const day = parseInt(dateString.substring(6, 8), 10);
      const hour = parseInt(dateString.substring(8, 10), 10);
      const minute = parseInt(dateString.substring(10, 12), 10);
      const second = parseInt(dateString.substring(12, 14), 10);
      
      // 创建日期对象
      return new Date(year, month, day, hour, minute, second);
    }
    
    // // 辅助函数：将Date对象格式化为紧凑日期字符串
    // function formatDateToCompact(date: Date): string {
    //   const year = date.getFullYear();
    //   const month = String(date.getMonth() + 1).padStart(2, '0');
    //   const day = String(date.getDate()).padStart(2, '0');
    //   const hour = String(date.getHours()).padStart(2, '0');
    //   const minute = String(date.getMinutes()).padStart(2, '0');
    //   const second = String(date.getSeconds()).padStart(2, '0');
      
    //   return `${year}${month}${day}${hour}${minute}${second}`;
    // }


    const cellValueChanged = (e: any) => {
      if (e.colDef.field === 'HEAT_NO') {
        let xx=90;
        // HEAT_NO_NEW = ;
        const allRows = erFormHelper.getGridRows('GridView3', 'all');
        const currentRowIndex = e.rowIndex;
        console.log('currentRowIndex', currentRowIndex);
        console.log('HEAT_NO', e.data['HEAT_NO']);
        // 如果新值为空，不做处理
        if (!e.newValue) {
          console.log('新值为空，不做处理');
          return;
        }
        allRows.forEach((item: ER.Model, rowIndex: any) => {
          if (rowIndex > e.rowIndex! && rowIndex - e.rowIndex! <= 5) {
            item.set('HEAT_NO', xx)
          }
        })
      }
    };
    

    // // 修改时事件回调的函数
    // const cellValueChangedHandler = (e: CellValueChangedEvent) => {
    //   gridApi.removeEventListener('cellValueChanged', cellValueChangedHandler);
      
    //   if (e.colDef.field == 'OUT_STEEL_TIME') {

    //     const currentRowIndex = e.rowIndex;
    //     console.log('currentRowIndex', currentRowIndex);
    //     // 如果新值为空，不做处理
    //     if (!e.newValue) {
    //       return;
    //     }

    //     // 计算后续行的时间
    //     if (currentRowIndex!= null) 
    //     {
    //       // 遍历后续行，设置时间为前一行加90分钟
    //       for (let i = currentRowIndex + 1; i < 6; i++) {
    //         const grid3 = erFormHelper.getGridAllRowsAsBlock('GridView3');
    //         console.log('grid3', grid3);
    //         console.log('该行时间不为空');
    //         // 计算新时间：前一行时间 + 90分钟  
    //         const qqq = grid3.data[i-1]['OUT_STEEL_TIME'];
    //         console.log('qqq', qqq);
    //         // const heat_no_sub = grid3.data[i-1]['HEAT_NO']?.toString().substring(0,4);
    //         // const heat_no_s = grid3.data[i-1]['HEAT_NO']?.toString().substring(5,4);
    //         // console.log('heat_no_sub', heat_no_sub);
    //         // console.log('heat_no_s', heat_no_s);
    //         // const dateString = ;
    //         const prevTime = parseCompactDate(qqq);
    //         console.log('prevTime', prevTime);
    //         // const prevTime = new Date(qqq);

    //         if (prevTime!= null) 
    //         {
    //           const nextTime = new Date(prevTime.getTime() + 90 * 60000); // 90分钟 = 90 * 60 * 1000毫秒
            
    //           console.log('nextTime', nextTime);
    //           console.log('i', i);

    //           // 将日期对象转换回紧凑格式
    //           const formattedDate = formatDateToCompact(nextTime);
    //           console.log('formattedDate', formattedDate);

    //           // 更新网格数据
    //           if (i < grid3.data.length) {
    //             grid3.data[i]['OUT_STEEL_TIME'] = formattedDate;
    //             // e.node.setDataValue('PLAN_TIME', time_3);
    //             // grid3.data
    //             console.log(`已更新第 ${i+1} 行的时间为: ${formattedDate}`);
    //           }
    //           const currentRow = grid3.data[i];
    //           console.log('当前行对象:', currentRow);
    //           // const asd = erFormHelper.addRowToGrid('GridView3', true);       
    //           // const nextrow = all   
    //           // 更新网格显示
    //           // erFormHelper.setGridRowData('GridView3', grid3.data[i], { OUT_STEEL_TIME: formattedDate });
    //           // erFormHelper.setGridData('GridView3', grid3);
    //           // gridView_tab3.gridOptions.getRowStyle = (params: any) => {}
    //           // 更新当前行的时间 - 使用正确的setGridRowData方法
    //           try {
    //             // 更新单行数据
    //             const asd = erFormHelper.getGridCurrentRow('GridView3');
    //             erFormHelper.setGridRowData(
    //               'GridView3',                  // 网格ID
    //               currentRow,                            // 行索引
    //               { OUT_STEEL_TIME: formattedDate,
    //                 // HEAT_NO: heat_no
    //                }, // 要更新的字段和值
    //               //false                         // 是否忽略已存在的值
    //             );
    //             // console.log('grid333', grid3);
    //             const gridqwe = erFormHelper.getGridAllRowsAsBlock('GridView3');
    //             console.log('gridqwe', gridqwe);
    //             console.log(`已更新第 ${i+1} 行的时间`);
    //             erFormHelper.setControlValue
    //           } catch (error) {
    //             console.error(`更新第 ${i+1} 行数据失败:`, error);
    //           }

    //         }
    //       }
          
    //     }
    //   }
    //   // 重新添加事件监听器
    //   gridApi.addEventListener('cellValueChanged', cellValueChangedHandler);
    // };

    // const cellValueChangedHandler = (e: CellValueChangedEvent) => {
    //   // 临时移除事件监听器，防止递归
    //   gridApi.removeEventListener('cellValueChanged', cellValueChangedHandler);
      
    //   try {
    //     if (e.colDef.field === 'OUT_STEEL_TIME') {
    //       const currentRowIndex = e.rowIndex;
    //       console.log('currentRowIndex', currentRowIndex);
          
    //       // 如果新值为空，不做处理
    //       if (!e.newValue) {
    //         return;
    //       }
    
    //       // 计算后续行的时间
    //       if (currentRowIndex !== null) {
    //         // 获取当前行数据
    //         const currentRowData = e.data;
            
    //         // 收集所有需要更新的行数据
    //         const rowsToUpdate = [];
            
    //         // 遍历后续行，设置时间为前一行加90分钟
    //         for (let i = currentRowIndex + 1; i < Math.min(currentRowIndex + 6, gridApi.getDisplayedRowCount()); i++) {
    //           // 获取前一行的行节点
    //           const prevRowNode = gridApi.getDisplayedRowAtIndex(i-1);
    //           if (!prevRowNode) continue;
              
    //           // 获取前一行的时间值
    //           const prevTimeStr = prevRowNode.data.OUT_STEEL_TIME;
    //           console.log(`前一行(${i})时间:`, prevTimeStr);
              
    //           // 解析时间
    //           const prevTime = parseCompactDate(prevTimeStr);
    //           if (!prevTime) continue;
              
    //           // 计算新时间
    //           const nextTime = new Date(prevTime.getTime() + 90 * 60000);
    //           const formattedDate = formatDateToCompact(nextTime);
    //           console.log(`计算新时间(${i+1}):`, formattedDate);
              
    //           // 获取当前行节点
    //           const currentRowNode = gridApi.getDisplayedRowAtIndex(i);
    //           console.log(`currentRowNode`, currentRowNode);
    //           if (!currentRowNode) continue;
              
    //           // 方案1：使用 AG Grid 原生的 setDataValue 方法
    //           try {
    //             // 直接设置单元格值
    //             currentRowNode.setDataValue('OUT_STEEL_TIME', formattedDate);
    //             console.log(`已通过 setDataValue 更新第 ${i+1} 行`);
    //           } catch (error) {
    //             console.error(`通过 setDataValue 更新第 ${i+1} 行失败:`, error);
    //           }
              
    //           // // 方案2：收集需要更新的行，稍后批量更新
    //           // const rowData = { ...currentRowNode.data };
    //           // rowData.OUT_STEEL_TIME = formattedDate;
    //           // rowsToUpdate.push(rowData);
    //         }
            
    //         // // 方案3：使用 applyTransaction 更新多行数据
    //         // if (rowsToUpdate.length > 0) {
    //         //   try {
    //         //     const updateResult = gridApi.applyTransaction({ update: rowsToUpdate });
    //         //     console.log(`已通过 applyTransaction 更新 ${rowsToUpdate.length} 行`);
    //         //   } catch (error) {
    //         //     console.error('通过 applyTransaction 更新行数据失败:', error);
    //         //   }
    //         // }
            
    //         // 强制刷新网格视图
    //         try {
    //           // 刷新指定列的所有单元格
    //           gridApi.refreshCells({
    //             force: true,
    //             columns: ['OUT_STEEL_TIME']
    //           });
              
    //           // 刷新所有行
    //           // gridApi.refreshRows();s
              
    //           // 重置行高以触发重绘
    //           gridApi.resetRowHeights();
              
    //           // 异步刷新
    //           setTimeout(() => {
    //             gridApi.onFilterChanged();
    //             gridApi.onSortChanged();
    //             console.log('已强制刷新网格视图');
    //           }, 100);
    //         } catch (error) {
    //           console.error('刷新网格视图失败:', error);
    //         }
    //       }
    //     }
    //   } finally {
    //     // 确保事件监听器在操作完成后重新添加
    //     gridApi.addEventListener('cellValueChanged', cellValueChangedHandler);
        
    //     // 确保DOM更新
    //     setTimeout(() => {
    //       gridApi.sizeColumnsToFit();
    //       console.log('已调整列宽以触发重绘');
    //     }, 300);
    //   }
    // };

    

    // currentRowIndex.data[i]["OUT_STEEL_TIME"] = nextTime.toISOString();
    
    // const GridView3FocusChanged = async (e: any) => {
    //   if (e) {
    //     if (e.rowChanged && e.data) {
    //       const inInfo = new EI.EIInfo();
    //       inInfo.addBlock(
    //         erFormHelper.convertModelAsBlock(e.data, {
    //           IDCARD: e.data.get('IDCARD'),
    //         })
    //       );
    //       console.log('qwert',e.data);
    //       const currentRowIndex = e.rowIndex;
    //       console.log('currentRowIndex', currentRowIndex);
    //       console.log('OUT_STEEL_TIME', e.data.get('OUT_STEEL_TIME'));
    //       const prevTime1 = new Date(e.data.get('OUT_STEEL_TIME'))
    //       console.log('prevTime1', prevTime1);
    //       const nextTime1 = new Date(new Date(e.data.get('OUT_STEEL_TIME')).getTime() + 90 * 60000)
    //       console.log('nextTime1', nextTime1);   // 90分钟 = 90 * 60 * 1000毫秒
    //       console.log('gridView_tab3.value', "GridView3");

    //       // 如果时间为空，不做处理
    //       if (!e.data.get('OUT_STEEL_TIME')) {
    //         console.log('该行时间为空');
    //         return;
    //       }

          
    //       // 遍历后续行，设置时间为前一行加90分钟
    //       for (let i = currentRowIndex + 1; i < 6; i++) {
    //         const grid3 = erFormHelper.getGridAllRowsAsBlock('GridView3');
    //         console.log('grid3', grid3);
    //         console.log('该行时间不为空');
    //         // 计算新时间：前一行时间 + 90分钟
            
    //         const qqq = grid3.data[i-1]['OUT_STEEL_TIME'];
    //         console.log('qqq', qqq);
        
    //         function parseCompactDate(dateString:any) {
    //           if (!dateString || dateString.length !== 14) {
    //             console.error('日期格式不正确，需要14位无分隔符字符串');
    //             return null;
    //           }
              
    //           // 提取各部分时间
    //           const year = parseInt(dateString.substring(0, 4), 10);
    //           const month = parseInt(dateString.substring(4, 6), 10) - 1; // 月份从0开始
    //           const day = parseInt(dateString.substring(6, 8), 10);
    //           const hour = parseInt(dateString.substring(8, 10), 10);
    //           const minute = parseInt(dateString.substring(10, 12), 10);
    //           const second = parseInt(dateString.substring(12, 14), 10);
              
    //           // 创建日期对象
    //           return new Date(year, month, day, hour, minute, second);
    //         }
            
    //         // const dateString = ;
    //         const prevTime = parseCompactDate(qqq);
    //         console.log('prevTime', prevTime);
    //         // const prevTime = new Date(qqq);

    //         if (prevTime!= null) 
    //         {
    //           const nextTime = new Date(prevTime.getTime() + 90 * 60000); // 90分钟 = 90 * 60 * 1000毫秒
            
    //           console.log('nextTime', nextTime);
    //         // 更新数据
    //           currentRowIndex.data[i]["OUT_STEEL_TIME"] = nextTime.toISOString();

    //           // }
    //         }
    //       }
          
    //     }
    //   }


    //   // if (e) {
    //   //   if (e.data && e.rowChanged) {
    //   //       if (e.data) {
    //   //           const currentRow = erFormHelper.getGridCurrentRow('GridView1', true);
    //   //           console.log('currentRow', currentRow);
    //   //           // queryDetailInfo(currentRow);
    //   //       }
    //   //   }
    //   // }
    // };


    const query_ccm = async () => {
      let outInfo0: any = '';
      let outInfo1: any = '';
      let outInfo2: any = '';
      let outInfo6: any = '';
      tongzhi_aod = '';
      tongzhi1 = '';
      let i = 0;

      const eiInfo = new EI.EIInfo();
      const outInfo = await erFormHelper.callService('wmsmyryccm_inq', eiInfo);

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo.sys.msg);
        return;
      } else {
        console.log('outInfo', outInfo);
        outInfo0 = outInfo.getBlock(0);
        outInfo1 = outInfo.getBlock(1);
        outInfo2 = outInfo.getBlock(2);
        outInfo6 = outInfo.getBlock(6);

        erFormHelper.mergeDataToGrid(outInfo.getBlock(0), "GridView0");
        erFormHelper.mergeDataToGrid(outInfo.getBlock(1), "GridView1");
        erFormHelper.mergeDataToGrid(outInfo.getBlock(2), "GridView2");
        //DES三脱站信息
        erFormHelper.mergeDataToGrid(outInfo.getBlock(6), "GridView15");
        console.log('GridView15', outInfo.getBlock(6));
        // tongzhi_aod = String(outInfo.getBlock(3).data[0].MEMO_DETAIL);
        // console.log('tongzhi_aod', tongzhi_aod);
        // // tongzhi_aod = tongzhi_aod.replace(tongzhi_aod, `<span style="${numberStyle}">${tongzhi_aod}</span>`)
        // // `<span style="${numberStyle}">${bt_gj[index]}</span>`
        // const tongZhi = document.getElementById('tongzhi1') as HTMLTextAreaElement;
        // tongZhi.innerHTML = tongzhi_aod;
        // console.log('wdefrds111', document.getElementById('tongzhi1') );


        tongzhi1 = String(outInfo.getBlock(3).data[0].MEMO_DETAIL);
        console.log('tongzhi1', tongzhi1);
        erFormHelper.setControlValueEx('Layout_aod', outInfo.getBlock(3).data[0]);
        erFormHelper.setControlValueEx('Layout_amf', outInfo.getBlock(4).data[0]);
        erFormHelper.setControlValueEx('Layout_eaf', outInfo.getBlock(5).data[0]);
        // erFormHelper.mergeDataToGrid(outInfo.getBlock(3), "GridView_AOD");
        // const tongZhi1 = document.getElementById('aod') as HTMLTextAreaElement;
        // console.log('wdefrds111', document.getElementById('aod') as HTMLTextAreaElement);

        // tongZhi1.innerHTML = tongzhi1;


        // // 正则表达式替换回车换行
        // tongzhi_aod.innerHTML = tongzhi_aod.innerHTML.replace(numberRegex, (match) => {
        //   return `<span style="${numberStyle}">${match}</span>`;
        // });
        // tongzhi_aod.innerHTML = tongzhi_aod.innerHTML.replace(keywordRegex, (match) => {
        //   return `<span style="${keywordStyle}">${match}</span>`;
        // });
        // tongzhi1.innerHTML = tongzhi1.innerHTML.replace(';', '<br>');
      }
      

    };

    const query = async () => {
      let outInfo3: any = '';
      let outInfo4: any = '';
      let outInfo5: any = '';
      let outInfo7: any = '';
      let outInfo8: any = '';
      let outInfo9: any = '';
      let outInfo10: any = '';
      let outInfo12: any = '';
      let outInfo13: any = '';

      const eiInfo = new EI.EIInfo();
      const outInfo = await erFormHelper.callService('wmsmyry_inq', eiInfo);

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo.sys.msg);
        return;
      } else {
        console.log('outInfo', outInfo);
        outInfo3 = outInfo.getBlock(0);
        outInfo4 = outInfo.getBlock(1);
        outInfo5 = outInfo.getBlock(2);
        outInfo7 = outInfo.getBlock(3);
        outInfo8 = outInfo.getBlock(4);
        outInfo9 = outInfo.getBlock(5);
        outInfo10 = outInfo.getBlock(6);
        outInfo12 = outInfo.getBlock(7);
        outInfo13 = outInfo.getBlock(8);

        erFormHelper.mergeDataToGrid(outInfo.getBlock(0), "GridView3");
        erFormHelper.mergeDataToGrid(outInfo.getBlock(1), "GridView4");
        erFormHelper.mergeDataToGrid(outInfo.getBlock(2), "GridView5");
        erFormHelper.mergeDataToGrid(outInfo.getBlock(3), "GridView7");
        erFormHelper.mergeDataToGrid(outInfo.getBlock(4), "GridView8");
        erFormHelper.mergeDataToGrid(outInfo.getBlock(5), "GridView9");
        erFormHelper.mergeDataToGrid(outInfo.getBlock(6), "GridView10");
        erFormHelper.mergeDataToGrid(outInfo.getBlock(7), "GridView12");
        erFormHelper.mergeDataToGrid(outInfo.getBlock(8), "GridView13");
      }
    };

    const F2_DO = async () => {
      query_ccm();
      query();

      clearInterval(timeId_ccm);
      clearInterval(timeId);
      timeId_ccm = setInterval(query_ccm, 1000 * 60 * 15);
      timeId = setInterval(query, 1000 * 60 * 15);
    }

    const F3_PRE_DO = async (e: any) => {
      console.log('123');

        editable.value = true;
        erFormHelper.setGridToolbarVisible("GridView3", {
          addrow: true,
          copyrow: true,
          delete: true,
        });
        erFormHelper.setGridEditable("GridView3", true);

        erFormHelper.setGridToolbarVisible("GridView4", {
            addrow: true,
            copyrow: true,
            delete: true,
          });
        erFormHelper.setGridEditable("GridView4", true);

        erFormHelper.setGridToolbarVisible("GridView5", {
            addrow: true,
            copyrow: true,
            delete: true,
          });
        erFormHelper.setGridEditable("GridView5", true);

    };
    const F3_DO = async () => {
        // const grid3 = erFormHelper.getGridAllRowsAsBlock('GridView3'); //获取所有行数据
        // let row_id = 0;
        
        // for (row_id = 0; row_id < grid3.data.length; row_id++) 
        // {
        //   //if (grid2ds.data[row_id]['LINE_DESC']?.toString().trim()==''||grid2ds.data[row_id]['RESPONSIBILITY_PLANT_3T']?.toString().trim()=='') 
        //    // {
        //    // strnull=true;
        //    // }
        // }
        let strnull=false;
        if (strnull) 
        {
          erFormHelper.messageWarning('必填信息有空值！');
          return false;
        }
        else
        {
          console.log('F3');
          erFormHelper.stopGridEditing("GridView3", async () => {
          erFormHelper.setGridToolbarVisible("GridView3", {
            addrow: false,
            copyrow: false,
            delete: false,
          });
          if (erFormHelper.hasDataChange("GridView3")) {
            return await saveMainGridData3()
            .then((res: any) => {
              erFormHelper.messageSuccess('操作成功！');
              editable.value = false;
              erFormHelper.setGridEditable("GridView3", false);
            })
            .catch((error) => {
              erFormHelper.messageError(error);
              return false;
            });
          }
          query();
          });

          erFormHelper.stopGridEditing("GridView4", async () => {
          erFormHelper.setGridToolbarVisible("GridView4", {
            addrow: false,
            copyrow: false,
            delete: false,
          });
          if (erFormHelper.hasDataChange("GridView4")) {  
            return await saveMainGridData4()
            .then((res: any) => {
              // query();
              erFormHelper.messageSuccess('操作成功！');
              editable.value = false;
              erFormHelper.setGridEditable("GridView4", false);
              // query();
            })
            .catch((error) => {
              erFormHelper.messageError(error);
              return false;
            });
          }
          query();
          });

          erFormHelper.stopGridEditing("GridView5", async () => {
          erFormHelper.setGridToolbarVisible("GridView5", {
            addrow: false,
            copyrow: false,
            delete: false,
           });
           if (erFormHelper.hasDataChange("GridView5")) {
            return await saveMainGridData5()
            .then((res: any) => {
              erFormHelper.messageSuccess('操作成功！');
              editable.value = false;
              erFormHelper.setGridEditable("GridView5", false);
            })
            .catch((error) => {
              erFormHelper.messageError(error);
              return false;
            });
          }
          query();
          }); 
        }
    };
    const F3_CANCEL = async (e: any) => {
        editable.value = false;
        erFormHelper.setGridToolbarVisible("GridView3", {
          addrow: false,
          copyrow: false,
          delete: false,
        });
        erFormHelper.setGridEditable("GridView3", false);

        erFormHelper.setGridToolbarVisible("GridView4", {
            addrow: false,
            copyrow: false,
            delete: false,
        });
        erFormHelper.setGridEditable("GridView4", false);

        erFormHelper.setGridToolbarVisible("GridView5", {
            addrow: false,
            copyrow: false,
            delete: false,
        });
        erFormHelper.setGridEditable("GridView5", false);

        erFormHelper.setGridToolbarVisible("GridView6", {
            addrow: false,
            copyrow: false,
            delete: false,
        });
        erFormHelper.setGridEditable("GridView6", false);
    };
    const F4_PRE_DO = async (e: any) => {
      editable.value = true;
        erFormHelper.setGridToolbarVisible("GridView7", {
          addrow: true,
          copyrow: true,
          delete: true,
        });
        erFormHelper.setGridEditable("GridView7", true);

        erFormHelper.setGridToolbarVisible("GridView8", {
            addrow: true,
            copyrow: true,
            delete: true,
          });
        erFormHelper.setGridEditable("GridView8", true);

        erFormHelper.setGridToolbarVisible("GridView9", {
            addrow: true,
            copyrow: true,
            delete: true,
          });
        erFormHelper.setGridEditable("GridView9", true);

        erFormHelper.setGridToolbarVisible("GridView10", {
          addrow: true,
          copyrow: true,
          delete: true,
        });
      erFormHelper.setGridEditable("GridView10", true);
    };
    const F4_DO = async (e: any) => {
      let strnull=false;
        if (strnull) 
        {
          erFormHelper.messageWarning('必填信息有空值！');
          return false;
        }
        else
        {
          erFormHelper.stopGridEditing("GridView7", async () => {
          erFormHelper.setGridToolbarVisible("GridView7", {
            addrow: false,
            copyrow: false,
            delete: false,
          });
          if (erFormHelper.hasDataChange("GridView7")) {
          return await saveMainGridData7()
            .then((res: any) => {
              erFormHelper.messageSuccess('操作成功！');
              editable.value = false;
              erFormHelper.setGridEditable("GridView7", false);
            })
            .catch((error) => {
              erFormHelper.messageError(error);
              return false;
            });
          }
          query();
          });

          erFormHelper.stopGridEditing("GridView8", async () => {
            erFormHelper.setGridToolbarVisible("GridView8", {
              addrow: false,
              copyrow: false,
              delete: false,
            });
            if (erFormHelper.hasDataChange("GridView8")) {
            return await saveMainGridData8()
              .then((res: any) => {
                erFormHelper.messageSuccess('操作成功！');
                editable.value = false;
                erFormHelper.setGridEditable("GridView8", false);
                query();
              })
              .catch((error) => {
                erFormHelper.messageError(error);
                return false;
              });
            }
            query();
            });

            erFormHelper.stopGridEditing("GridView9", async () => {
              erFormHelper.setGridToolbarVisible("GridView9", {
                addrow: false,
                copyrow: false,
                delete: false,
              });
              if (erFormHelper.hasDataChange("GridView9")) {
              return await saveMainGridData9()
                .then((res: any) => {
                  erFormHelper.messageSuccess('操作成功！');
                  editable.value = false;
                  erFormHelper.setGridEditable("GridView9", false);
                  query();
                })
                .catch((error) => {
                  erFormHelper.messageError(error);
                  return false;
                });
              }
              query();
            });

            erFormHelper.stopGridEditing("GridView10", async () => {
              erFormHelper.setGridToolbarVisible("GridView10", {
                addrow: false,
                copyrow: false,
                delete: false,
              });
              if (erFormHelper.hasDataChange("GridView10")) {
              return await saveMainGridData10()
                .then((res: any) => {
                  erFormHelper.messageSuccess('操作成功！');
                  editable.value = false;
                  erFormHelper.setGridEditable("GridView10", false);
                  query();
                })
                .catch((error) => {
                  erFormHelper.messageError(error);
                  return false;
                });
              }
              query();
            });
          
        }
    };
    const F4_CANCEL = async (e: any) => {
      editable.value = false;
        erFormHelper.setGridToolbarVisible("GridView7", {
          addrow: false,
          copyrow: false,
          delete: false,
        });
        erFormHelper.setGridEditable("GridView7", false);

        erFormHelper.setGridToolbarVisible("GridView8", {
            addrow: false,
            copyrow: false,
            delete: false,
        });
        erFormHelper.setGridEditable("GridView8", false);

        erFormHelper.setGridToolbarVisible("GridView9", {
            addrow: false,
            copyrow: false,
            delete: false,
        });
        erFormHelper.setGridEditable("GridView9", false);

        erFormHelper.setGridToolbarVisible("GridView10", {
            addrow: false,
            copyrow: false,
            delete: false,
        });
        erFormHelper.setGridEditable("GridView10", false);
    };
    const F5_PRE_DO = async (e: any) => {
      editable.value = true;
        erFormHelper.setGridToolbarVisible("GridView12", {
          addrow: true,
          copyrow: true,
          delete: true,
        });
        erFormHelper.setGridEditable("GridView12", true);

        erFormHelper.setGridToolbarVisible("GridView13", {
            addrow: true,
            copyrow: true,
            delete: true,
          });
        erFormHelper.setGridEditable("GridView13", true);
    };
    const F5_DO = async (e: any) => {
      let strnull=false;
        if (strnull) 
        {
          erFormHelper.messageWarning('必填信息有空值！');
          return false;
        }
        else
        {
          erFormHelper.stopGridEditing("GridView12", async () => {
          erFormHelper.setGridToolbarVisible("GridView12", {
            addrow: false,
            copyrow: false,
            delete: false,
          });
          if (erFormHelper.hasDataChange("GridView12")) {
          return await saveMainGridData12()
            .then((res: any) => {
              erFormHelper.messageSuccess('操作成功！');
              editable.value = false;
              erFormHelper.setGridEditable("GridView12", false);
              query();
            })
            .catch((error) => {
              erFormHelper.messageError(error);
              return false;
            });
          }
          query();
          });

          erFormHelper.stopGridEditing("GridView13", async () => {
            erFormHelper.setGridToolbarVisible("GridView13", {
              addrow: false,
              copyrow: false,
              delete: false,
            });
            if (erFormHelper.hasDataChange("GridView13")) {
            return await saveMainGridData13()
              .then((res: any) => {
                erFormHelper.messageSuccess('操作成功！');
                editable.value = false;
                erFormHelper.setGridEditable("GridView13", false);
                query();
              })
              .catch((error) => {
                erFormHelper.messageError(error);
                return false;
              });
            }
            query();
            });
          }
    };
    const F5_CANCEL = async (e: any) => {
      erFormHelper.setGridToolbarVisible("GridView12", {
        addrow: false,
        copyrow: false,
        delete: false,
      });
      erFormHelper.setGridEditable("GridView12", false);

      erFormHelper.setGridToolbarVisible("GridView13", {
          addrow: false,
          copyrow: false,
          delete: false,
      });
      erFormHelper.setGridEditable("GridView13", false);
    };

    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      editable,
      // gridView_tab1,
      // erGrid0Ready,
      // erGrid1Ready,
    //   erGrid2Ready,
      // erGrid3Ready,
      F2_DO,
      F3_PRE_DO,
      F3_DO,
      F3_CANCEL,
      F4_PRE_DO,
      F4_DO,
      F4_CANCEL,
      F5_PRE_DO,
      F5_DO,
      F5_CANCEL,
      // GridView3FocusChanged,
      cellValueChanged,
    };
  }
});
