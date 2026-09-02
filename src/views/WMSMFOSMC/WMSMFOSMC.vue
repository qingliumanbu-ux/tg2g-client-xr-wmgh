<template>
    <div id="root_c" class="backGround_c">
        <div class="head_c" style="display: flex;flex-direction: row;">
            <div class="border"> </div>
            <div class="title_c">碳钢</div>
        </div>
        <div style="height: 825px;">
            <div style="display: flex;flex-direction: row;height: 50%;">
                <div style="width: 33%; padding: 20px;position: relative;">


                    <div id="t_c_1" style="width: 100%;height: 100%;">

                    </div>
                    <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                        style="position: absolute;bottom: 280px;left: 520px; width: 40px;">
                </div>
                <div style="width: 33%;padding: 20px;position: relative;">
                    <div id="t_c_2" style="width: 100%;height: 100%;">
                    </div>
                    <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                        style="position: absolute;bottom: 280px;left: 520px; width: 40px;">
                </div>
                <div style="width: 34%;padding: 20px;position: relative;">
                    <div class="c_title_1" style="height: 10%;">当月班组BOF冶炼周期比较</div>
                    <div style="height: 90%; display: flex;flex-direction: row;">
                        <div style="width: 24%;height: 100%;position: relative;">
                            <div class="c_title_3"
                                style="bottom: 160px;position: absolute;text-align: center;width: 100%;">{{ bof_4 }}
                            </div>
                            <img :src="imageUrl4" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="c_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: fir_col }">{{ bof_4_n }}</div>
                        </div>
                        <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                            <div class="c_title_3"
                                style="bottom: 200px;position: absolute;text-align: center;width: 100%;">{{ bof_3 }}
                            </div>
                            <img :src="imageUrl3" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="c_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: sec_col }">{{ bof_3_n }}</div>
                        </div>
                        <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                            <div class="c_title_3"
                                style="bottom: 240px;position: absolute;text-align: center;width: 100%;">{{ bof_2 }}
                            </div>
                            <img :src="imageUrl2" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="c_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: tir_col }">{{ bof_2_n }}</div>
                        </div>
                        <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                            <div class="c_title_3"
                                style="bottom: 280px;position: absolute;text-align: center;width: 100%;">{{ bof_1 }}
                                <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                                    style="position: absolute;bottom: 20px;width: 60px;">
                            </div>
                            <img :src="imageUrl1" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="c_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: fou_col }">{{ bof_1_n }}</div>
                        </div>
                    </div>
                </div>
            </div>




            <div style=" height: 50%;display: flex;flex-direction: row;">
                <div style="width: 33%;margin-left: 10px;">
                    <div class="c_title_1" style="height: 10%;">转炉溅渣结束到兑铁间隔时间比较</div>
                    <div class="grid-container" style="width: 30%;">

                        <div class="grid-item">
                            <img :src="imageUrlB1" alt="Dynamic Image"
                                style="width: 260px;height: 130px;left: 10px;position: absolute;">
                            <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                                style="position: absolute;top: 20px;width: 60px;right: 30px;">
                            <div class="c_per" style="position: absolute;">{{ jz_1 }}</div>
                            <div class="c_num_per" style="position: absolute;">{{ jz_1_n }}</div>
                        </div>
                        <div class="grid-item">
                            <img :src="imageUrlB2" alt="Dynamic Image"
                                style="width: 260px;height: 130px;left: 10px;position: absolute;">
                            <div class="c_per" style="position: absolute;">{{ jz_2 }}</div>
                            <div class="c_num_per" style="position: absolute;">{{ jz_2_n }}</div>
                        </div>
                        <div class="grid-item">
                            <img :src="imageUrlB3" alt="Dynamic Image"
                                style="width: 260px;height: 130px;left: 10px;position: absolute;">
                            <div class="c_per" style="position: absolute;">{{ jz_3 }}</div>
                            <div class="c_num_per" style="position: absolute;">{{ jz_3_n }}</div>
                        </div>
                        <div class="grid-item">
                            <img :src="imageUrlB4" alt="Dynamic Image"
                                style="width: 260px;height: 130px;left: 10px;position: absolute;">
                            <div class="c_per" style="position: absolute;">{{ jz_4 }}</div>
                            <div class="c_num_per" style="position: absolute;">{{ jz_4_n }}</div>
                        </div>
                    </div>
                </div>
                <div style="width: 33%;">
                    <div class="c_title_1" style="height: 10%;">LF精炼时间比较</div>
                    <div style="height: 90%; display: flex;flex-direction: column;">

                        <div class="c_tag" style="position: relative;">
                            <img :src="rgbColor1" alt="Dynamic Image" style="width: 90%;height: 80px;margin: 0 auto;">
                            <div class="c_title_5" style="left: 400px;position: absolute;bottom: 25px;">{{ lf_1_n }}
                            </div>
                            <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                                style="position: absolute;bottom: 30px;left: 300px;width: 40px;">
                        </div>
                        <div class="c_tag" style="position: relative;">
                            <img :src="rgbColor2" alt="Dynamic Image" style="width: 90%;height: 80px;margin: 0 auto;">
                            <div class="c_title_5" style="left: 400px;position: absolute;bottom: 25px;">{{ lf_2_n }}
                            </div>

                        </div>
                        <div class="c_tag" style="position: relative;">
                            <img :src="rgbColor3" alt="Dynamic Image" style="width: 90%;height: 80px;margin: 0 auto;">
                            <div class="c_title_5" style="left: 400px;position: absolute;bottom: 25px;">{{ lf_3_n }}
                            </div>

                        </div>
                        <div class="c_tag" style="position: relative;">
                            <img :src="rgbColor4" alt="Dynamic Image" style="width: 90%;height: 80px;margin: 0 auto;">
                            <div class="c_title_5" style="left: 400px;position: absolute;bottom: 25px;">{{ lf_4_n }}
                            </div>

                        </div>
                    </div>
                </div>
                <div style="width: 34%;">
                    <div class="c_title_1" style="height: 10%;">保连铸温度命中率比较</div>
                    <div class="grid-container" style="height: 90%; ">
                        <div class="grid-item1">
                            <img src="../../assets/images/CAP_A.png" alt="Dynamic Image"
                                style="width: 150px;height: 120px;position: absolute;margin-left: 40px;">
                            <div class="c_num_per" style="position: absolute;margin-left: 50px;bottom: 120px;">95%</div>
                            <div class="c_per1">甲</div>
                            <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                                style="position: absolute;bottom: 10px;left: 40px;width: 40px;">
                        </div>
                        <div class="grid-item1">
                            <img src="../../assets/images/CAP_B.png" alt="Dynamic Image"
                                style="width: 150px;height: 120px;position: absolute;margin-left: 40px;">
                            <div class="c_num_per" style="position: absolute;margin-left: 50px;bottom: 120px;">93%</div>
                            <div class="c_per1">乙</div>
                        </div>
                        <div class="grid-item1">
                            <img src="../../assets/images/CAP_C.png" alt="Dynamic Image"
                                style="width: 150px;height: 120px;position: absolute;margin-left: 40px;">
                            <div class="c_num_per" style="position: absolute;margin-left: 50px;bottom: 120px;">90%</div>
                            <div class="c_per1">丙</div>
                        </div>
                        <div class="grid-item1">
                            <img src="../../assets/images/CAP_D.png" alt="Dynamic Image"
                                style="width: 150px;height: 120px;position: absolute;margin-left: 40px;">
                            <div class="c_num_per" style="position: absolute;margin-left: 50px;bottom: 120px;">85%</div>
                            <div class="c_per1">丁</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./WMSMFOSMC.ts"></script>

<style scoped>
@import "./WMSMFOSMC.scss";
</style>
