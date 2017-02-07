<template>
  <div class="wrapper">
    <mesh width="640" column="3" layout="2,1|1,2|2,1">
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
    font-size: 80px;
    text-align: center;
  }
</style>
