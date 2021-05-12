<template>
  <div class="dial-animate-wrap">
    <div class="dial-bg" :style="rotateStyle"><img :src="stateData.prize_img" alt=""></div>
    <div class="dial-run" @click="run">
      <div>点击抽奖</div>
      <p>10超级币/次</p>
    </div>
    <div class="dial-mork-wrap" @touchmove.prevent.stop v-if="isrun"></div>
    <!-- 抽奖进行中，禁用页面所有操作 z-index: 99; -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      isrun: false,
      rotateAngle: 0, // 旋转角度
      config: {
        duration: 4000, // 总旋转时间 ms级
        circle: 8, // 旋转圈数
        mode: 'ease-in-out' // 由快到慢 惯性效果都省了
      },
      cricleAdd: 1, // 第几次抽奖
      drawIndex: 0 // 中奖索引 转盘图片排序 指针右手开始 0-...
    }
  },
  computed: {
    rotateStyle () {
      const _c = this.config
      return `
        -webkit-transition: transform ${_c.duration}ms ${_c.mode};
        transition: transform ${_c.duration}ms ${_c.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
            transform: rotate(${this.rotateAngle}deg);`
    }
  },
  props: {
    httpData: {}, // 接口调用所需参数
    stateData: {
      type: Object,
      default: () => {
        return {
          coin: 0, // 超级币数量
          prize_img: '' // 转盘图片
        }
      }
    }
  },
  methods: {
    async run () {
      if (this.stateData.coin < 10) {
        console.log('超级币不足')
        return
      }   
      if (this.isrun) return
      // const data = await this.goDraw()
      // 可以作为弹窗等信息展示
      this.$emit('draw_fin', 'start')
      this.$set(this.stateData, 'coin', 0) // 更新数据，此处仅为示例，推荐使用 draw_fin方法的 start/fin 进行相应数据更新
      this.isrun = true
      this.rotateAngle = this.config.circle * 360 * this.cricleAdd - (22.5 + this.drawIndex * 45)
      // 圈数位置解析
      // this.config.circle * 360 * this.cricleAdd 顺时针总圈数/累积总圈数
      // 22.5 + this.drawIndex * 45 ===> (奖品位置 === this.drawIndex * 45) (指针中间位置 === 22.5)

      this.cricleAdd++
      setTimeout(() => {
        this.$emit('draw_fin', 'fin')
        this.isrun = false
      }, this.config.duration)
    },
    goDraw () {
      // 请求接口拿到中奖商品
      // 加下自己项目的样式 loading 用户体验
      return new Promise(async (resolve, reject) => {
        // await 奖品接口
        resolve({
          msg: '抽奖明细'
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.dial-mork-wrap{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.dial-animate-wrap{
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
  .dial-bg{
    img{
      width: 100%;
      height: 100%;
    }
  }
  .dial-run{
    width: 3rem;
    height: 3rem;
    background: url('../../assets/img/dial/dial-center-icon.png') no-repeat;
    background-size: contain;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    div{
      font-size: 0.3rem;
      font-weight: bold;
      color: #FF1717;
      line-height: 0.3rem;
      padding-top: 1.22rem;
      padding-bottom: 0.21rem;
    }
    p{
      font-size: 0.2rem;
      font-weight: bold;
      color: #834F36;
      line-height: 0.2rem;
    }
  }
}
</style>
