import {Component, Vue, Watch} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleFlowChart from '@/components/flowEditor/simpleFlowchart.vue'

@Component({
  components: {
    'simple-flowchart': SimpleFlowChart
  },
  props: {
    service: Object,
  }
})
export default class FlowEditorComponent extends mixins(Vue, CommonHelpers) {
//  $refs!: {
//    deleteModal: HTMLElement;
//  }
  public scene: any;
  public newNodeType: number;
  public newNodeLabel: string;
  public nodeCategory: any;
  public isLoading: boolean;

  protected props = {
    table: String,
    active: Boolean
  }

  constructor() {
    super()
    this.scene = {
        centerX: 1024,
        centerY: 140,
        scale: 1,
        nodes: [
        {
          id: 2,
          x: -700,
          y: -69,
          type: 'Action',
          label: 'test1',
        },
        {
          id: 4,
          x: -357,
          y: 80,
          type: 'Script',
          label: 'test2',
        },
        {
          id: 6,
          x: -557,
          y: 80,
          type: 'Rule',
          label: 'test3',
        }
      ],
        links: [
        {
          id: 3,
          from: 2, // node id the link start
          to: 4,  // node id the link end
        }
      ]
    };
    this.newNodeType = 0;
    this.newNodeLabel = '';
    this.nodeCategory = [
      'rule',
      'action',
      'script',
      'decision',
      'fork',
      'join',
    ];
    this.isLoading = true
  }

  public canvasClick(e: any) {
    console.log('canvas Click, event:', e)
  }

  public addNode() {
    let maxID = Math.max(0, ...this.scene.nodes.map((link: any) => {
      return link.id
    }))
    this.scene.nodes.push({
      id: maxID + 1,
      x: -400,
      y: 50,
      type: this.nodeCategory[this.newNodeType],
      label: this.newNodeLabel ? this.newNodeLabel: `test${maxID + 1}`,
    })
  }

  public nodeClick(id: any) {
    console.log('node click', id);
  }

  public nodeDelete(id: any) {
    console.log('node delete', id);
  }

  public linkBreak(id: any) {
    console.log('link break', id);
  }

  public linkAdded(link: any) {
    console.log('new link added:', link);
  }

}
