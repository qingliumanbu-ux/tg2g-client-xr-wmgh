<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady">
      <div class="screen" style="width: 100%; height: 100%">
        <div style="width: 100%; height: 25%; font-size: 70px; font-weight: bold; display: flex; align-items: center; justify-content: center; color: #FFFF00;">火车库石灰料仓仓位显示</div>


        <!-- <div style="width: 100%; height: 30%; display: inline-block;" class="Box1">
            <div style="width: 14%; height: 100%; clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);   
                margin: 0 2px; display: inline-block; vertical-align: top;" 
                v-for="(item, index) in bunker3.slice(0, 7)" :key="index">
                <div style="width: 100%; height: 100%; white-space: nowrap; overflow: hidden; justify-content: center;">
                    <div :style="{ width: '100%', height: BL_WT3[index] + '%' }">
                        <div :id="item" style="width: 100%; height: 100%; text-align: center; background: #E0E0E0; font-size: 25px; font-weight: bold;">
                            {{ bunker_mat_name3[index] }}<br />
                            {{ bunker_stock_wt3[index] }}<br />
                        </div>
                    </div>
                    <div :style="{ width: '100%', height: BS_WT3[index] + '%' }">
                        <div :id="item" style="width: 100%; height: 100%; text-align: center; background: #A5D6A7; font-size: 25px; font-weight: bold;">
                        </div>
                    </div>
                </div>
            </div>
        </div> -->


        <div style="width: 100%; height: 30%; display: inline-block;" class="Box1">
            <div style="width: 14%; height: 100%; clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);   
                margin: 0 2px; display: inline-block; vertical-align: top;" 
                v-for="(item, index) in bunker3.slice(0, 7)" :key="index">
                <div style="width: 100%; height: 100%; white-space: nowrap; overflow: hidden; justify-content: center;">
                    <div :style="{ width: '100%', height: BL_WT3[index] + '%' }">
                        <div :id="item" style="width: 100%; height: 100%; text-align: center; background: #333; font-size: 45px; font-weight: bold; color: #FFFF00;">
                            {{ bunker_mat_name3[index] }}<br />
                            二级混灰<br />
                            {{ bunker_stock_wt3[index] }}%<br />
                            
                        </div>
                    </div>
                    <div :style="{ width: '100%', height: BS_WT3[index] + '%',background: bunker_stock_wt3[index] >= 85 ? '#b30000' : '#046304' }">
                        <div :id="item" style="width: 100%; height: 100%; text-align: center; font-size: 25px; font-weight: bold;">
                        </div>
                    </div>
                </div>
                    <!-- <div :style="{ width: '100%', height: BS_WT3[index] + '%' }">
                        <div :id="item" style="width: 100%; height: 100%; text-align: center; background: #39FF14; font-size: 25px; font-weight: bold;">
                        </div>
                    </div>
                </div> -->
            </div>
        </div>

        <div style="height: 38%;"></div>

        <div style="width: 100%; height: 30%; display: inline-block;" class="Box2">
            <div style="width: 14%; height: 100%; clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);   
                margin: 0 2px; display: inline-block; vertical-align: top;" 
                v-for="(item, index) in bunker3.slice(7, 14)" :key="index + 7">
                <div style="width: 100%; height: 100%; white-space: nowrap; overflow: hidden; justify-content: center;">
                    <div :style="{ width: '100%', height: BL_WT3[index + 7] + '%' }">
                        <div :id="item" style="width: 100%; height: 100%; text-align: center; background: #333; font-size: 45px; font-weight: bold; color: #FFFF00;">
                            {{ bunker_mat_name3[index + 7] }}<br />
                            一级混灰<br />
                            {{ bunker_stock_wt3[index + 7] }}%<br />
                            
                        </div>
                    </div>
                    <div :style="{ width: '100%', height: BS_WT3[index + 7] + '%',background: bunker_stock_wt3[index + 7] >= 85 ? '#b30000' : '#046304'  }">
                        <div :id="item" style="width: 100%; height: 100%; text-align: center; font-size: 25px; font-weight: bold;">
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div style="width: 100%; height: 15%"></div>
      </div>
    </xr-ef-form>
</div>
</template>
<script lang="ts" src="./WMSMSHLCS2N.ts"></script>

<style lang="scss" scoped>
@import "./WMSMSHLCS2N.scss";
</style>
./WMSMSHLCS2N.js./WMSMSHLCS2N.js
