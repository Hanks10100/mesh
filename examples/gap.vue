<template>
  <div class="wrapper">
    <mesh class="mesh" width="640" gap="15" layout="5,4|4,4|3,7|3,6|6,3|9,3">
      <div class="box"><text class="text">A</text></div>
      <div class="box"><text class="text">B</text></div>
      <div class="box"><text class="text">C</text></div>
      <div class="box"><text class="text">D</text></div>
      <div class="box"><text class="text">E</text></div>
      <div class="box"><text class="text">F</text></div>
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
