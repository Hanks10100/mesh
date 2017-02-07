<template>
  <div class="wrapper">
    <mesh class="mesh" width="640" column="10" layout="10,2|3,3|3,3|4,2|4,3|6,2">
      <div class="box"><text class="text">1</text></div>
      <div class="box"><text class="text">2</text></div>
      <div class="box"><text class="text">3</text></div>
      <div class="box"><text class="text">4</text></div>
      <div class="box"><text class="text">5</text></div>
      <div class="box"><text class="text">6</text></div>
    </mesh>
  </div>
</template>

<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .box {
    border-width: 2px;
    border-style: solid;
    border-color: #BBB;
    justify-content: center;
    align-items: center;
  }
  .text {
    color: #1B90F7;
    font-size: 60px;
    text-align: center;
  }
</style>
