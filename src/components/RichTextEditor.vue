<template>
  <div>
    <div style="border: 1px solid #ccc;width: 100%;">
      <Toolbar v-show="xianshi" style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
        :mode="mode" />
      <Editor class="editor" :style="{ height: v_rh + 'vh', 'overflow-y': 'hidden'}" v-model="valueHtml"
        :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" @onChange="handleChange" />
    </div>
  </div>
</template>

<script lang="ts">
import '@wangeditor-next/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue'
import { ER } from "ERX/Er";
import axios from 'axios';
import { IEditorConfig } from '@wangeditor-next/editor';
import { UppyFile } from '@uppy/core';

export default {
  components: { Editor, Toolbar },
  props: {
    inputxx: String,
     v_xs: Boolean,
    // v_sy: Boolean,
  },
  setup(props, { emit }) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const erFormHelper: ER.FormHelper = new ER.FormHelper();

    // 内容 HTML
    const valueHtml = ref('<p>请输入...</p>')
    const xianshi = ref(true);
 
    const v_rh=ref(25)

    // 模拟 ajax 异步获取内容
    onMounted(() => {
 
      // let sqlstr = `select GUICHENG from TWMSMCZTS where GRADE_TYPE2='取向硅钢' and C_DIV='碳钢' and FACTORY_2='R' `;
      // const out = await erFormHelper.querySql('', sqlstr);

      // valueHtml.value = String(out.getBlock(0).data[0].GUICHENG)
  
      
      valueHtml.value = String(props.inputxx);
       xianshi.value = props.v_xs;
   
      if(xianshi.value)
      {
          v_rh.value += 50;
      }
    })
    watch(() => props, (newValue) => {
   
      // 当 formData 变化时更新 formInline
   
      valueHtml.value = String(newValue.inputxx);
      // xianshi.value = props.v_xs;
     
      //如果画面显示，则查看后台是否有对应的图片

    }, { deep: true });

    const toolbarConfig = {}
    type InsertFnType = (url: string, alt: string, href: string) => void;
    const editorConfig:Partial<IEditorConfig> = {
      placeholder: '请输入内容...',
      MENU_CONF: {
        uploadImage: {
          server: 'http://10.162.72.16:10004/GUICHENG',
          fieldName: 'file',
          customInsert(res: any, insertFn: InsertFnType) {
            // TS 语法
            // customInsert(res, insertFn) {                  // JS 语法
            // res 即服务端的返回结果
     
            // 从 res 中找到 url alt href ，然后插入图片
            insertFn('http://10.162.72.16:10004/GUICHENG/' + res.data.filename, " ", " ");


          },
          base64LimitSize: 0,
          metaWithUrl: false,
          onSuccess: function (file: UppyFile<{}, {}>, response: any): void {
            //throw new Error('Function not implemented.');
          },
          onFailed: function (file: UppyFile<{}, {}>, response: any): void {
            //throw new Error('Function not implemented.');
          },
          onError: function (file: UppyFile<{}, {}>, error: any, res: any): void {
            //throw new Error('Function not implemented.');
          }
        }

      } 
    }


    async function upload(formData: FormData) {
      try {
        const response = await axios.post('http://10.162.72.16:10004/GUICHENG', formData);
        return response.data;
      } catch (error) {
        console.error('上传文件出错:', error);
        return null;
      }
    }
    

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor: any) => {

      editorRef.value = editor // 记录 editor 实例，重要！
     
    }

    const handleChange = (editor: { getHtml: () => any; }) => {
      console.log('change:', editor.getHtml());
      emit("wangchange", editor.getHtml());
    };

    const handlefouse = (editor: { getHtml: () => any; }) => {
      console.log('fouse:', editor.getHtml());
      
    };

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated, handleChange, xianshi, v_rh,  handlefouse
    }
  },
}


</script>

<style>
.editor-container {
  border: 1px solid #ccc;
  height: 600px;
}

.editor{
  font-size: 20px;
}
</style>
