<template>
  <div class="wrap">
    <header></header>
    <section>
      <tigerDraw ref="tigerDraw" :img="img"></tigerDraw>
    </section>
    <div class="btn" @click="startClick"><img src="@/assets/img/btn.png" alt="" /></div>
  </div>
</template>

<script>
import tigerDraw from '../../components/tiger/tiger'
var img = require('../../assets/img/draw-card.png')
export default {
  data () {
    return {
      img: img
    }
  },
  mounted () {
  },
  methods: {
    startClick () {
      this.$refs.tigerDraw.start([1, 2, 3], () => {})
    }
  },
  components: { tigerDraw }
}
</script>
<style lang="scss">
@import url('../../assets/reset.css');
.wrap {
  width: 100%;
  height: 13.27rem;
  background: url('../../assets/img/cj-bg.png') no-repeat, #6039e2;
  background-size: 100%;
  max-width: 750px;
  margin: 0 auto;
}
header{
  height: 3.76rem;
}
section{
  height: 3.12rem;
  margin-left: 1.3rem;
  margin-right: 1.14rem;
}
.btn {
  width: 5.91rem;
  height: auto;
  padding-top: .8rem;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
</style>
