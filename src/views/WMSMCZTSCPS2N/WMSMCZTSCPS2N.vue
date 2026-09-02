<template>
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO">
        <!-- <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'layout1'"></er-layout> -->

        <div style="display: flex;flex-direction: row;margin-left: 20px;margin-top: 5px;" @dblclick="fullsc">
            <div id="miaoshu"
                style="text-align: left;align-self: center; margin-right: 10px;width: 870px;font-size: 18pt; ">

            </div>
            <!-- <div
                style="border: 1px solid black;text-align: center;align-self: center;margin-right: 10px;width: 100px;font-size: 13pt; user-select: none;">
                {{ heat_now }}
            </div> -->
            <div style="border: 1px solid black;text-align: center;align-self: center; margin-right: 10px;width: 100px;font-size: 13pt; user-select: none;"
                @click="font_plus">
                字体&plus;
            </div>
            <div style="border: 1px solid black;text-align: center;align-self: center; margin-right: 10px;width: 100px;font-size: 13pt; user-select: none;"
                @click="font_minus">
                字体&minus;
            </div>
            <div id="highlightButton"
                style="border: 1px solid black;text-align: center;align-self: center; margin-right: 10px;width: 100px;font-size: 13pt; user-select: none;">
                字号 {{ v_font_size }}
            </div>
            <input type="color" style="align-self: center;" @input="handleColorChange">

            <div id="time"
                style="text-align: center;align-self: center; margin-right: 10px;width: 250px;font-size: 15pt; right: 50px;position: absolute;">
                {{ time_Now }}
            </div>
        </div>
        <div id="xxxxxx" style="display: flex;flex-direction: row;height: 94%;" @dblclick="fullsc">

            <div style="display: flex; flex-direction: column; height: 100%;width: 20%;">
                <!-- 调度排产钢种 -->
                <div style="height: 50%;"> <xr-ef-panel :title="'排产钢种'" padding="5px" style="height: 100%;">
                        <template #customButtonSlot> </template>
                        <template #contentSlot>
                            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                :config-id="'GridView1'" :toolbar-style="'both'" style="height: 100%;"
                                @erGridReady="erGrid1Ready"
                                @focus-changed= "GridView1FocusChanged">
                            </er-grid>
                        </template>
                    </xr-ef-panel></div>
                <!-- 成品内控成分 -->
                <div style="height: 50%;"> <xr-ef-panel :title="'内控成分'" padding="5px" style="height: 100%;">
                        <template #customButtonSlot> </template>
                        <template #contentSlot>
                            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                :config-id="'GridView2'" :toolbar-style="'both'">
                            </er-grid>
                        </template>
                    </xr-ef-panel></div>
                <!-- 左下角判定信息
                <div id="tsxx" :style="{ fontSize: v_font_size + 'px', color: v_font_color, font: numberStyle }">
                </div> --> 
            </div>
            <a-tabs v-model:activeKey="tabActiveKey" type="card"
                style="height: 100%;width: 80%;">
                <a-tab-pane class="tab" v-if="STA_1 !== ''" key="tab1" :tab="`${STA_1}`" style="height: 100%;">

                    <div class="screen" style="height: 100%;width: 100%; display: flex;flex-direction: row;">

                        <div class="guicheng">
                            <div id="textArea" readonly class="textAreaxx"
                                :style="{ fontSize: v_font_size + 'px', color: v_font_color, font: numberStyle, height: if_xs_height + '%' }">
                            </div>
                            <!-- 事故案例 -->
                            <div class="cuowu" style="height: 40%; width: 100%;padding: 10px;">
                                <div id="textArea2" readonly class="textAreax1"
                                    :style="{ fontSize: v_font_size + 'px', color: v_font_color, font: numberStyle }">
                                </div>
                            </div>
                            <!-- <RichTextEditor v-show="if_xianshi" :inputxx="guicheng" :v_xs="false"
                                style="width: 100%;position: absolute;bottom: 0px;" /> -->

                        </div> 
                         <div style="height: 100%;  width: 40%;display: flex;flex-direction: column;">
                           <!-- <div class="tishi" style="height: 60%; width: 100%;padding: 10px;">
                                <div id="textArea2" readonly class="textAreax1"
                                    :style="{ fontSize: v_font_size-2 + 'px', color: v_font_color, font: numberStyle }">
                                </div>

                            </div> -->
                            <!-- 作业区要点 -->
                            <div class="cuowu" style="height: 100%; width: 100%;padding: 10px;">
                                <div id="textArea3" readonly class="textAreax1"
                                    :style="{ fontSize: v_font_size + 'px', color: v_font_color, font: numberStyle }">
                                </div>
                            </div>
                        </div> 
                    </div>
                <!-- <a-tab-pane class="tab" v-if="STA_2 !== ''" key="tab2" :tab="`${STA_2}`">
                    <div class="screen" style="height: 100%;width: 100%; display: flex;flex-direction: row;">

                        <div class="guicheng">
                            <div id="textArea1" readonly class="textAreaxx"
                                :style="{ fontSize: v_font_size + 'px', color: v_font_color, font: numberStyle, height: if_xs_height + '%' }">
                            </div>
                            <RichTextEditor v-show="if_xianshi" :inputxx="guicheng" :v_xs="false"
                                style="width: 100%;position: absolute;bottom: 0px;" />

                        </div>
                        <div style="height: 100%;  width: 40%;display: flex;flex-direction: column;">
                            <div class="tishi" style="height: 60%; width: 100%;padding: 10px;">
                                <div id="textArea3" readonly class="textAreax1"
                                    :style="{ fontSize: v_font_size-2 + 'px', color: v_font_color, font: numberStyle }">
                                </div>

                            </div>
                            <div class="cuowu" style="height: 40%; width: 100%;padding: 10px;">
                                <div id="textArea5" readonly class="textAreax1"
                                    :style="{ fontSize: v_font_size + 'px', color: v_font_color, font: numberStyle }">
                                </div>

                            </div>

                        </div>
                    </div>-->
                </a-tab-pane> 

            </a-tabs>
        </div>



    </xr-ef-form>
</template>

<script lang="ts" src="./WMSMCZTSCPS2N"></script>

<style scoped>
@import "./WMSMCZTSCPS2N.scss";
</style>