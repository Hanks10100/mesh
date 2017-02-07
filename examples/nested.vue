<template>
  <div class="wrapper">
    <mesh width="640" column="4" layout="4,1|1,3|3,3">
      <div class="box"><text class="text">A</text></div>
      <div class="box"><text class="text">B</text></div>
      <mesh column="2" layout="2,1|1,1|1,1">
        <div class="box"><text class="text">C</text></div>
        <div class="box"><text class="text">D</text></div>
        <div class="box"><text class="text">E</text></div>
      </mesh>
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
    justify-content: center;
    align-items: center;
      border-width: 2px;
      border-style: solid;
      border-color: #BBB;
  }
  .text {
    color: #1B90F7;
    font-size: 80px;
    text-align: center;
  }
</style>
