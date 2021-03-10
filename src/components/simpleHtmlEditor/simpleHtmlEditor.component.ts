/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

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
