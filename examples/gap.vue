<template>
  <div class="wrapper">
    <mesh class="mesh" width="640" gap="15" layout="5,4|4,4|3,7|3,6|6,3|9,3">
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
    background-color: #888888;
    justify-content: center;
    align-items: center;
  }
  .text {
    color: #FFFFFF;
    font-size: 60px;
    text-align: center;
  }
</style>
