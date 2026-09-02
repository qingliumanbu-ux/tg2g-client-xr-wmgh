<template>

  <div class="display">
    <component :is="displayMode + '-widget'" :designer="designer" />
  </div>

</template>

<script lang="ts">
import LineWidget from './line-widget.vue';
import BarWidget from './bar-widget.vue';
import ListWidget from './list-widget.vue';
import BarxWidget from './barx-widget.vue';
import SingleWidget from './single-widget.vue';
import QuarterWidget from './quarter-widget.vue';
import StepsWidget from './steps-widget.vue';
import ProgressWidget from './progress-widget.vue';

export default {
  name: 'DisplayWidget',
  components: {
    LineWidget,BarWidget,ListWidget,BarxWidget,SingleWidget,QuarterWidget,StepsWidget,ProgressWidget
  },
  props: {
    designer: Object,
    displayMode: String,
  },
  setup(props) {
    
  }
}
</script>

<style lang="scss" scoped>
.display {
  width: 100%;
  height: 100%;
  display: block;

}
</style>