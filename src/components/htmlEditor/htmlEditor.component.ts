import { Component, Vue, Watch } from 'vue-property-decorator'
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'
import 'trumbowyg/dist/plugins/colors/trumbowyg.colors'

import 'trumbowyg/dist/plugins/colors/ui/trumbowyg.colors.css'
@Component({
  components: {
    trumbowyg: Trumbowyg
  },
  props: {
    content: {
      type: [String]
    }
  }

})
export default class HtmlEditorComponent extends Vue {

  public selectedContent = '';

  public editorConfig: any = {};
  constructor () {
    super()
    this.editorConfig = {
      btnsAdd: ['foreColor', 'backColor'],
      btns: [
        ['viewHTML'],
        ['undo', 'redo'], // Only supported in Blink browsers
        ['formatting'],
        ['strong', 'em', 'del'],
        ['superscript', 'subscript'],
        ['link'],
        ['insertImage'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        ['unorderedList', 'orderedList'],
        ['horizontalRule'],
        ['removeformat'],
        ['foreColor'], ['backColor'],
        ['fullscreen']
      ]
    }
  }

  public mounted () {
    this.selectedContent = this.$props.content
  }

  @Watch('content', { immediate: true, deep: true })
  public contentChanged (newVal: any) {
    if (newVal) {
      this.selectedContent = newVal
    } else {
      this.selectedContent = ''
    }
  }

  @Watch('selectedContent', { immediate: true, deep: true })
  public selectedCont (newVal: any) {
    this.$emit('contentChanged', newVal)
  }
}
