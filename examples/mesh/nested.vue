<template>
  <div class="wrapper">
    <mesh class="mesh" width="640" column="4" :layout="layout" gap="2" v-once>
      <div class="box"><text class="text">A</text></div>
      <div class="box"><text class="text">B</text></div>
      <mesh class="mesh" column="2" layout="2,1|1,1|1,1" gap="2">
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
    align-items: center;
    background-color: #F5F5F5;
  }
  .mesh {
    background-color: #DDDDDD;
  }
  .box {
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
  }
  .text {
    color: #1B90F7;
    font-size: 60px;
  }
</style>
