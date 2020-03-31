import { Component, Vue, Watch } from 'vue-property-decorator'
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'
@Component({
  components: {
    trumbowyg: Trumbowyg
  },
  props: {
    content: {
      type: [String, Object]
    }
  }

})
export default class SimpleHtmlEditorComponent extends Vue {
  public selectedContent = '';
  public editorConfig: any = {};
  constructor () {
    super()
  }

  public mounted () {
    this.selectedContent = this.$props.content
  }

  @Watch('content', { immediate: true, deep: true })
  public contentChanged (newVal: any) {
    if (newVal) {
      this.selectedContent = newVal
    }
  }

  @Watch('selectedContent', { immediate: true, deep: true })
  public selectedCont (newVal: any) {
    if (newVal) {
      this.$emit('contentChanged', this.selectedContent)
    } else {
      this.$emit('contentChanged', this.selectedContent = '')
    }
  }
}
