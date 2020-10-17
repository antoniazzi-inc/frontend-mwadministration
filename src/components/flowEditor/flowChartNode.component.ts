import {Component, Vue, Watch} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'

@Component({
  props: {
    id: {
      type: Number,
      default: 1000,
      validator(val) {
        return typeof val === 'number'
      }
    },
    x: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    y: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    type: {
      type: String,
      default: 'Default'
    },
    label: {
      type: String,
      default: 'input name'
    },
    options: {
      type: Object,
      default() {
        return {
          centerX: 1024,
          scale: 1,
          centerY: 140,
        }
      }
    }
  }
})

export default class FlowChartNode extends mixins(Vue, CommonHelpers) {
  public show: any;

  get nodeStyle() {
    return {
      top: this.$props.options.centerY + this.$props.y * this.$props.options.scale + 'px', // remove: this.options.offsetTop +
      left: this.$props.options.centerX + this.$props.x * this.$props.options.scale + 'px', // remove: this.options.offsetLeft +
      transform: `scale(${this.$props.options.scale})`,
    }
  }

  constructor() {
    super()
    this.show = {
      delete: false,
    }
  }

  public handleMousedown(e: any) {
    const target = e.target || e.srcElement;
    // console.log(target);
    if (target.className.indexOf('node-input') < 0 && target.className.indexOf('node-output') < 0) {
      this.$emit('nodeSelected', e);
    }
    e.preventDefault();
  }

  public handleMouseOver() {
    this.show.delete = true;
  }

  public handleMouseLeave() {
    this.show.delete = false;
  }

  public outputMouseDown(e: any) {
    this.$emit('linkingStart')
    e.preventDefault();
  }

  public inputMouseDown(e: any) {
    e.preventDefault();
  }

  public inputMouseUp(e: any) {
    this.$emit('linkingStop')
    e.preventDefault();
  }

}
