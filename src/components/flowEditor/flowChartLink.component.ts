import {Component, Vue, Watch} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'

@Component({
  props: {
    // start point position [x, y]
    start: {
      type: Array,
      default() {
        return [0, 0]
      }
    },
    // end point position [x, y]
    end: {
      type: Array,
      default() {
        return [0, 0]
      }
    },
    id: Number,
    type: String,
  }
})

export default class FlowChartLink extends mixins(Vue, CommonHelpers) {
  public show: any;

  get pathStyle() {
    return {
      stroke: 'rgb(255, 136, 85)',
      strokeWidth: 1.5,
      fill: 'none',
    }
  }

  get arrowStyle() {
    return {
      stroke: 'rgb(255, 136, 85)',
      strokeWidth: 6,
      fill: 'none',
    }
  }

  get arrowLabelTransform() {
    const [arrowX, arrowY] = this.calculateCenterPoint();
    return `translate(${arrowX}, ${arrowY})`;
  }

  get arrowTransform() {
    const [arrowX, arrowY] = this.calculateCenterPoint();
    const degree = this.calculateRotation()
    return `translate(${arrowX}, ${arrowY}) rotate(${degree})`;
  }

  get dAttr() {
    let adjustx = (this.$props.type === 'output_no') ? -60 : (this.$props.type === 'output_yes') ? 60 : 0;
    let cx = this.$props.start[0] + adjustx, cy = this.$props.start[1], ex = this.$props.end[0], ey = this.$props.end[1];
    let x1 = cx, y1 = cy + 50, x2 = ex, y2 = ey - 50;
    return `M ${cx}, ${cy} C ${x1}, ${y1}, ${x2}, ${y2}, ${ex}, ${ey}`;
  }

  constructor() {
    super()
    this.show = {
      delete: false,
    }
  }

  public handleMouseOver() {
    if (this.$props.id) {
      this.show.delete = true;
    }
  }

  public handleMouseLeave() {
    this.show.delete = false;
  }

  public calculateCenterPoint() {
    let adjustx = (this.$props.type === 'output_no') ? -60 : (this.$props.type === 'output_yes') ? 60 : 0;
    const dx = (this.$props.end[0] - (this.$props.start[0]) + adjustx) / 2;
    const dy = (this.$props.end[1] - this.$props.start[1]) / 2;
    return [this.$props.start[0] + dx, this.$props.start[1] + dy];
  }

  public calculateRotation() {
    let adjustx = (this.$props.type === 'output_no') ? -60 : (this.$props.type === 'output_yes') ? 60 : 0;
    const angle = -Math.atan2(this.$props.end[0] - this.$props.start[0] - adjustx, this.$props.end[1] - this.$props.start[1] - adjustx);
    const degree = angle * 180 / Math.PI;
    return degree < 0 ? degree + 360 : degree;
  }

  public deleteLink() {
    this.$emit('deleteLink')
  }

}
