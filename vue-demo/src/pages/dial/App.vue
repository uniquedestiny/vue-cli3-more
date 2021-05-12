<template>
  <div class="dial-container">
    <section>
      <dialWrap ref="dialWrap" :stateData="stateData"></dialWrap>
    </section>
  </div>
</template>

<script>
import dialWrap from '../../components/dial/dial.vue'
import prizeImg from '../../assets/img/dial/dial.png'
export default {
  data () {
    return {
      stateData: {
        coin: 10,
        prize_img: prizeImg
      }
    }
  },
  mounted () {
  },
  methods: {
    startClick () {
    }
  },
  components: { dialWrap }
}
</script>
<style lang="scss">
@import url('../../assets/reset.css');
.dial-container {
  width: 100%;
  height: 100%;
  background: url(../../assets/img/dial/home-bg.png) no-repeat, rgb(255,107,5);
  background-size: cover;
  display: inline-block;
  section{
    width: 6.7rem;
    height: 6.7rem;
    margin: 0 auto;
    margin-top: 2.28rem;
  }
}
</style>
