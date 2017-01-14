<template>
  <div class="wrapper">
    <mesh class="mesh" column="3" layout="2,1|1,2|2,1" v-once>
      <div class="box"><text class="text">A</text></div>
      <div class="box"><text class="text">B</text></div>
      <div class="box"><text class="text">C</text></div>
    </mesh>
  </div>
</template>

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
