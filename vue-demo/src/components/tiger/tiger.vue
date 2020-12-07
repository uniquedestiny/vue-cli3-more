<template>
  <div class="tiger-wrap" id="tiger-wrap">
    <p id="draw-1" ref="img1"></p>
    <p id="draw-2" ref="img2"></p>
    <p id="draw-3" ref="img3"></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawConfig: [] // 奖项配置
    }
  },
  props: {
    img: {
      type: String,
      default:
        ''
    },
    rlc: {
      type: Object,
      default: () => {
        return {
          eh: 158 / 2, // 每块区域从空白区域开始 - 单一模块的末尾结束
          ew: 119 / 2, // 参考宽度
          ih: 63 / 2, // 初始移动的高度 63 = (312/2 - 93)  312 = 容器高度，计算中间距离 93 = 第一个空白区域到第一卡片中间的位置
          ah: 2368 / 2, // 全图高度
          rfh: (158 - 63) / 2, // 起始基准值 第一个元素运行到中间的基础位置
          sp: 50, // 速度
          ln: 7, // 圈数
          dt: 750 // 默认多少市场后执行 下一轨迹
        }
      }
    }
  },
  mounted () {
    // 初始化入口高度
    var vm = this
    if (this.rlc.ah) {
      this.c_ah = this.rlc.ah
      this.initPx()
    } else {
      var img = new Image()
      img.src = this.img
      img.onload = function (e) {
        vm.c_ah = img.height / 2
        vm.initPx()
      }
    }
  },
  methods: {
    start (drawArr, endBack) {
      // 配置处理区 完成各组配置
      // drawArr 入口传入的运动索引数组
      // endBack 开始运行轨迹回调
      var prevConfig = this.drawConfig
      this.drawConfig = []
      const reference = this.rlc.rfh
      const img1 = this.$refs.img1
      const img2 = this.$refs.img2
      const img3 = this.$refs.img3
      const domArr = [img1, img2, img3]
      drawArr.forEach((val, index) => {
        const scale = reference + this.rlc.eh * (val - 2) // 以第一个下沉作为参照 this.rlc.eh * (val - 2)完整的距离会多一个 reference
        const pp = prevConfig[index] ? Math.abs(prevConfig[index].endPoint) : 0
        this.drawConfig.push({
          endPoint: -parseInt((scale / this.c_ah) * this.ph), // 结束为止高度
          startPoint: (prevConfig[index] && prevConfig[index].endPoint) || 0, // 开始位置高度
          index: index, // 当前抽奖位置
          dom: domArr[index], // 当前dom
          turn: true, // 当前组是否抽奖开关
          stotal: -this.ph * this.rlc.ln - parseInt((scale / this.c_ah) * this.ph), // 理想情况下的参考 运动路线总长
          total: -this.ph * this.rlc.ln - parseInt((scale / this.c_ah) * this.ph) + pp // 兼容上一次停留位置 计算总线
        })
      })
      // 根据设定间隔开始运行
      this.drawConfig.forEach((val, index) => {
        setTimeout(() => {
          this.Rundom(val)
        }, index * this.rlc.dt)
      })
      this.endBack = endBack
    },
    Rundom (domPage) {
      // 开始运行轨迹
      var num = domPage.startPoint || this.initStart // 默认从 0 开始
      var lineConfig = this.Runline(domPage) // 拿到轨迹线
      var ph = this.ph
      // RunBody 轨迹执行器
      this.RunBody(() => {
        lineConfig.forEach(ele => {
          if (num > ele[1] && num <= ele[0]) {
            num = num - ele[2]
          }
        })
        if (num <= lineConfig[lineConfig.length - 1][1]) {
          this.drawConfig[domPage.index].turn = false
          if (!this.drawConfig[2].turn) {
            this.endBack && this.endBack()
          }
        }
        domPage.dom.style.backgroundPositionY = `${num}px`
        if (!this.drawConfig[domPage.index].turn) {
          domPage.dom.style.backgroundPositionY = `${
            this.drawConfig[domPage.index].endPoint
          }px`
        }
      }, domPage)
    },
    Runline (domPage) {
      // 轨迹 每一条线对应一组轨迹运动
      const { total, startPoint, stotal } = domPage
      const lineArr = []
      const num = this.rlc.sp // 每次轨迹距离/运行速度
      let numwrap = 0
      let slow = 0
      let newnumwrap = 0
      const forlength = -parseInt(total / 2 / num)
      // 初始值的跑秒
      if (this.initStart > startPoint && startPoint === 0) {
        lineArr.push([this.initStart, 0, 3])
      }
      for (let i = 0; i < forlength; i++) {
        slow = i * 0.5 + 3
        lineArr.push([-i * num + startPoint, num * -i - num + startPoint, slow])
      }
      numwrap = lineArr[lineArr.length - 1][1] * 1
      for (let j = 0; j < forlength; j++) {
        lineArr.push([
          -j * num + numwrap,
          num * -j - num + numwrap,
          slow - j * 0.5 + 1
        ])
      }
      newnumwrap = lineArr[lineArr.length - 1][1]
      // 停止的间隔优化 初始化 第一次结束 起始位置不为 >= 0
      if (newnumwrap > total && total === stotal) {
        if (Math.abs(total) - Math.abs(newnumwrap) > 10) {
          const next2 =
            newnumwrap -
            (Math.abs(total) - Math.abs(newnumwrap) - 10)
          lineArr.push([newnumwrap, next2, 3])
        }
        lineArr.push([newnumwrap, total, 1])
      }
      // 起始位置不为 0
      // 此时需注意 每组跑完停留的位置并非0
      if (total > stotal) {
        if (Math.abs(stotal) - Math.abs(total) > 10) {
          const next2 =
            newnumwrap -
            (Math.abs(stotal) - Math.abs(newnumwrap) - 10)
          lineArr.push([newnumwrap, next2, 3])
        }
        lineArr.push([newnumwrap, stotal, 1])
      }
      return lineArr
    },
    RunBody (into, domPage) {
      // 运动 requestAnimationFrame webkitRequestAnimationFrame
      // 帧动画处理方式 递归执行
      // 非兼容模式下 采用setTimeout
      if (!this.drawConfig[domPage.index].turn) return
      const RunBody = () => {
        into()
        this.RunBody(into, domPage)
      }
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(RunBody)
      } else if (window.webkitRequestAnimationFrame) {
        window.webkitRequestAnimationFrame(RunBody)
      } else {
        window.setTimeout(RunBody, 10)
      }
    },
    initPx () {
      // 自动设置定位高度
       window.addEventListener('DOMContentLoaded', e => {
        const ps = document.getElementById('tiger-wrap').getElementsByTagName('p')
        var width = null
        var newheight = null
        width = ps[0].clientWidth // 当前单个子容器实际宽度
        newheight = parseInt(width / (this.rlc.ew / this.c_ah)) // 比例计算 px适配机型
        this.initStart = parseInt((this.rlc.ih / this.c_ah) * newheight) // 根据参照下沉高度计算出真实高度
        this.ph = newheight // 精灵图总高度
        ps.forEach(ele => {
          ele.style.backgroundImage = `url(${this.img})`
          ele.style.backgroundSize = `100% ${newheight}px`
          ele.style.backgroundPositionY = `${this.initStart}px`
        })
       })
    }
  },
  components: {}
}
</script>

<style lang="scss">
.tiger-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  p {
    width: 1.19rem;
    height: 100%;
  }
}
</style>
