import {Component, Vue, Watch} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import FlowChartLink from '@/components/flowEditor/flowchartLink.vue'
import FlowChartNode from '@/components/flowEditor/flowchartNode.vue'
import {IRelationGroup} from "@/shared/models/relationms/relation-group.model";
import {AxiosResponse} from "axios";

@Component({
  components: {
    'flowchart-node': FlowChartNode,
    'flowchart-link': FlowChartLink,
  },
  props: {
    scene: {
      type: Object,
      default() {
        return {
          centerX: 1024,
          scale: 1,
          centerY: 140,
          nodes: [],
          links: [],
        }
      }
    }
  }
})

export default class SimpleFlowChart extends mixins(Vue, CommonHelpers) {

  public action: any;
  public mouse: any;
  public draggingLink: any;
  public rootDivOffset: any;
  public height: string;

  // double clicks
  public clicks: number;
  public timer: any;

  get nodeOptions() {
    return {
      centerY: this.$props.scene.centerY,
      centerX: this.$props.scene.centerX,
      scale: this.$props.scene.scale,
      offsetTop: this.rootDivOffset.top,
      offsetLeft: this.rootDivOffset.left,
      selected: this.action.selected,
    }
  }

  get lines() {
    const lines = this.$props.scene.links.map((link: any) => {
      const fromNode = this.findNodeWithID(link.from)
      const toNode = this.findNodeWithID(link.to)
      let x, y, cy, cx, ex, ey;
      x = this.$props.scene.centerX + fromNode.x;
      y = this.$props.scene.centerY + fromNode.y;
      [cx, cy] = this.getPortPosition('bottom', x, y);
      x = this.$props.scene.centerX + toNode.x;
      y = this.$props.scene.centerY + toNode.y;
      [ex, ey] = this.getPortPosition('top', x, y);
      return {
        start: [cx, cy],
        end: [ex, ey],
        id: link.id,
        type: link.type,
      };
    })
    if (this.draggingLink) {
      let x, y, cy, cx;
      const fromNode = this.findNodeWithID(this.draggingLink.from)
      x = this.$props.scene.centerX + fromNode.x;
      y = this.$props.scene.centerY + fromNode.y;
      // @ts-ignore
      [cx, cy] = this.getPortPosition('bottom', x, y);
      // push temp dragging link, mouse cursor postion = link end postion
      lines.push({
        start: [cx, cy],
        end: [this.draggingLink.mx, this.draggingLink.my],
        type: this.draggingLink.type,
      })
    }
    return lines;
  }

  constructor() {
    super()
    this.height = '100%'
    this.action = {
      linking: false,
      dragging: false,
      scrolling: false,
      selected: 0,
    }
    this.mouse = {
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
    }
    this.draggingLink = null
    this.rootDivOffset = {
      top: 0,
      left: 0
    }

    // double clicks
    this.clicks = 0;
    this.timer = null;

  }

  public mounted() {
    if (this.$el instanceof HTMLElement) {
      this.rootDivOffset.top = this.$el ? this.$el.offsetTop : 0;
      this.rootDivOffset.left = this.$el ? this.$el.offsetLeft : 0;
      // console.log(22222, this.rootDivOffset);
    }
  }

  public findNodeWithID(id: any) {
    return this.$props.scene.nodes.find((item: any) => {
      return id === item.id
    })
  }

  public getPortPosition(type: string, x: number, y: number) {
    if (type === 'top') {
      return [x + 100, y];
    }
    else if (type === 'bottom') {
      return [x + 100, y + 45];
    }
  }

  public linkingStart(index: any, outputType: string) {
    this.action.linking = true;
    this.draggingLink = {
      from: index,
      mx: 0,
      my: 0,
      type: outputType
    };
  }

  public linkingStop(index: any) {
    // add new Link
    if (this.draggingLink && this.draggingLink.from !== index) {
      // check link existence
      const existed = this.$props.scene.links.find((link: any) => {
        return link.from === this.draggingLink.from && link.to === index;
      })
      if (!existed) {
        let maxID = Math.max(0, ...this.$props.scene.links.map((link: any) => {
          return link.id
        }))
        const newLink = {
          id: maxID + 1,
          from: this.draggingLink.from,
          to: index,
          type: this.draggingLink.type
        };
        this.$props.scene.links.push(newLink)
        this.$emit('linkAdded', newLink)
      }
    }
    this.draggingLink = null
  }

  public linkDelete(id: any) {
    const deletedLink = this.$props.scene.links.find((item: any) => {
      return item.id === id;
    });
    if (deletedLink) {
      this.$props.scene.links = this.$props.scene.links.filter((item: any) => {
        return item.id !== id;
      });
      this.$emit('linkBreak', deletedLink);
    }
  }

  public nodeSelected(id: any, e: any) {
    this.action.dragging = id;
    this.action.selected = id;
    this.$emit('nodeClick', id);
    this.mouse.lastX = e.pageX || e.clientX + document.documentElement.scrollLeft
    this.mouse.lastY = e.pageY || e.clientY + document.documentElement.scrollTop
  }

  public handleMove(e: any) {
    if (this.action.linking) {
      [this.mouse.x, this.mouse.y] = this.getMousePosition(this.$el, e);
      [this.draggingLink.mx, this.draggingLink.my] = [this.mouse.x, this.mouse.y];
    }
    if (this.action.dragging) {
      this.mouse.x = e.pageX || e.clientX + document.documentElement.scrollLeft
      this.mouse.y = e.pageY || e.clientY + document.documentElement.scrollTop
      let diffX = this.mouse.x - this.mouse.lastX;
      let diffY = this.mouse.y - this.mouse.lastY;

      this.mouse.lastX = this.mouse.x;
      this.mouse.lastY = this.mouse.y;
      this.moveSelectedNode(diffX, diffY);
    }
    if (this.action.scrolling) {
      [this.mouse.x, this.mouse.y] = this.getMousePosition(this.$el, e);
      let diffX = this.mouse.x - this.mouse.lastX;
      let diffY = this.mouse.y - this.mouse.lastY;

      this.mouse.lastX = this.mouse.x;
      this.mouse.lastY = this.mouse.y;

      this.$props.scene.centerX += diffX;
      this.$props.scene.centerY += diffY;

      // this.hasDragged = true
    }
  }

  public handleUp(e: any) {
    const target = e.target || e.srcElement;

    if (this.$el.contains(target)) {
      if (typeof target.className !== 'string' || target.className.indexOf('node-input') < 0) {
        //console.log('dragged to nowhere', this.action.dragging);
        this.draggingLink = null;
      }
      if (typeof target.className === 'string' && (target.className.indexOf('node-delete') > -1 || target.className.indexOf('do-del') > -1)) {
        this.nodeDelete(this.action.dragging);
      }
      if (typeof target.className === 'string' && (target.className.indexOf('node-edit') > -1 || target.className.indexOf('do-edit') > -1)) {
        this.nodeEdit(this.action.dragging);
      }
      if (typeof target.className === 'string' && target.className.indexOf('node-output') > -1) {
        this.$emit('outportClick', e);
      }
    }
    this.action.linking = false;
    this.action.dragging = null;
    this.action.scrolling = false;
  }

  public handleDoubleClick(e: any){
    this.clicks++;
    if (this.clicks === 1) {
      let self = this;
      this.timer = setTimeout(function() {
        self.clicks = 0;
      }, 500);
    }
    else {
      clearTimeout(this.timer);
      this.$emit('canvasDoubleClick', e);
      this.clicks = 0;
    }
  }

  public handleDown(e: any) {
    const target = e.target || e.srcElement;
    if ((target === this.$el || target.matches('svg, svg *')) && e.which === 1) {
      this.action.scrolling = true;
      [this.mouse.lastX, this.mouse.lastY] = this.getMousePosition(this.$el, e);
      this.action.selected = null; // deselectAll
    }
    this.$emit('canvasClick', e);
  }

  public moveSelectedNode(dx: number, dy: number) {
    let index = this.$props.scene.nodes.findIndex((item: any) => {
      return item.id === this.action.dragging
    })
    let left = this.$props.scene.nodes[index].x + dx / this.$props.scene.scale;
    let top = this.$props.scene.nodes[index].y + dy / this.$props.scene.scale;
    this.$set(this.$props.scene.nodes, index, Object.assign(this.$props.scene.nodes[index], {
      x: left,
      y: top,
    }));
  }

  public nodeDelete(id: any) {
    this.$props.scene.nodes = this.$props.scene.nodes.filter((node: any) => {
      return node.id !== id;
    })
    this.$props.scene.links = this.$props.scene.links.filter((link: any) => {
      return link.from !== id && link.to !== id
    })
    this.$emit('nodeDelete', id)
  }

  public nodeEdit(id: any) {
    // open edit screen
    this.$emit('nodeEdit', id)
  }

  private getMousePosition (element: any, event: any) {
    let mouseX = event.pageX || event.clientX + document.documentElement.scrollLeft
    let mouseY = event.pageY || event.clientY + document.documentElement.scrollTop

    let offset = this.getOffsetRect(element)
    let x = mouseX - offset.left
    let y = mouseY - offset.top

    return [x, y];
  }

  private getOffsetRect (element: any) {
    let box = element.getBoundingClientRect()

    let scrollTop = window.pageYOffset
    let scrollLeft = window.pageXOffset

    let top = box.top + scrollTop
    let left = box.left + scrollLeft

    return {top: Math.round(top), left: Math.round(left)}
  }

}
