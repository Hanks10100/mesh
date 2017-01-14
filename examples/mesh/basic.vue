<template>
  <div class="wrapper">
    <mesh class="mesh" column="3" :layout="layout" v-once>
      <div class="box"><text class="text">A</text></div>
      <div class="box"><text class="text">B</text></div>
      <div class="box"><text class="text">C</text></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        layout: [[2,1],[1,2],[2,1]]
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .box {
    border-width: 5px;
    border-style: solid;
    border-color: #DDD;
  }
  .text {
    color: #1B90F7;
    font-size: 60px;
  }
</style>
