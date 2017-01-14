<template>
  <div class="wrapper">
    <mesh class="mesh" column="4" :layout="layout" v-once>
      <div class="box"><text class="text">A</text></div>
      <div class="box"><text class="text">B</text></div>
      <mesh class="mesh" column="2" layout="2,1|1,1|1,1" v-once>
        <div class="box"><text class="text">C</text></div>
        <div class="box"><text class="text">D</text></div>
        <div class="box"><text class="text">E</text></div>
      </mesh>
    </mesh>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        layout: [[4,1],[1,3],[3,3]]
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
