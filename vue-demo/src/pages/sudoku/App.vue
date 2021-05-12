<template>
  <div class="sudoku-container">
    <section>
      <sudoluWrap @change="lotteryChange" :awardList="awardList"></sudoluWrap>
    </section>
  </div>
</template>

<script>
import sudoluWrap from '../../components/sudoku/sudolu.vue'
import coupon from '../../assets/img/sudoku/coupon.png'
export default {
  data () {
    return {
      awardList: []
    }
  },
  created () {
    this.initWard()
  },
  methods: {
    initWard () {
      // 模拟异步数据
      setTimeout(() => {
        this.awardList = [
          {
            name: '10点券',
            prize_img: coupon,
            prize_id: 'c10',
            order: 1
          },
          {
            name: '20点券',
            prize_img: coupon,
            prize_id: 'c20',
            order: 2
          },
          {
            name: '30点券',
            prize_img: coupon,
            prize_id: 'c30',
            order: 3
          },
          {
            name: '40点券',
            prize_img: coupon,
            prize_id: 'c40',
            order: 4
          },
          {
            name: '50点券',
            prize_img: coupon,
            prize_id: 'c50',
            order: 5
          },
          {
            name: '60点券',
            prize_img: coupon,
            prize_id: 'c60',
            order: 6
          },
          {
            name: '70点券',
            prize_img: coupon,
            prize_id: 'c70',
            order: 7
          },
          {
            name: '80点券',
            prize_img: coupon,
            prize_id: 'c80',
            order: 8
          }
        ]
      }, 0)
    },
    lotteryChange (action, item) {
      // start fin 的行为反馈
      console.log(action, item)
    }
  },
  components: { sudoluWrap }
}
</script>
<style lang="scss">
@import url('../../assets/reset.css');
.sudoku-container {
  width: 100%;
  height: 100%;
  display: inline-block;
  section {
    width: 6.7rem;
    height: 6.7rem;
    margin: 0 auto;
    margin-top: 2.28rem;
  }
}
</style>
