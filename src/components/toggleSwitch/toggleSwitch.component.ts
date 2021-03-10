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

import Component from 'vue-class-component'
import { Vue, Watch } from 'vue-property-decorator'

@Component({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    onText: {
      type: String,
      default: ''
    },
    offText: {
      type: String,
      default: ''
    },
    disabled: Boolean
  }
})
export default class ToggleSwitch extends Vue {
  $refs!: {
    switchBtn: HTMLElement;
  }

    public selectedValue: boolean;
    constructor (
    ) {
      super()
      this.selectedValue = false
    }

    public emitClick (e: any) {
      this.$emit('clicked', e.currentTarget.checked)
    }
    public mounted () {
      if (this.$props.value) {
        // @ts-ignore
        this.$refs.switchBtn.checked = true
      } else {
        // @ts-ignore
        this.$refs.switchBtn.checked = false
      }
    }

  @Watch('value', { immediate: true, deep: true })
    public changeValue (newVal: any) {
      if (newVal) {
        // @ts-ignore
        if (this.$refs.switchBtn) this.$refs.switchBtn.checked = true
      } else {
        // @ts-ignore
        if (this.$refs.switchBtn) this.$refs.switchBtn.checked = false
      }
      this.$emit('changed', newVal)
    }

  public changeToggle (e: any) {
    if (e.currentTarget.checked) {
      this.$emit('update:value', true)
    } else {
      this.$emit('update:value', false)
    }
  }
}
