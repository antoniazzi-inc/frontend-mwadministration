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

import Cropper from 'cropperjs'
import ImageCompressor from '@xkeshi/image-compressor'
import FileUpload from 'vue-upload-component'
import ToggleSwitch from '../toggleSwitch/toggleSwitch.vue'

export default {
  props: {
    accept: {
      type: String,
      default: 'image/png,image/gif,image/jpeg,image/webp'
    },
    extensions: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    showFeaturedFlag: {
      type: Boolean,
      default: false
    },
    uploadAuto: {
      type: Boolean,
      default: false
    },
    allFiles: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    FileUpload,
    ToggleSwitch
  },
  data () {
    return {
      files: [],
      minSize: 1024,
      size: 1024 * 1024 * 10,
      directory: false,
      directUpload: false,
      isFeatured: false,
      drop: true,
      dropDirectory: true,
      addIndex: false,
      thread: 3,
      name: 'file',
      maxFileSizeExceedError: false,
      postAction: '/upload/post',
      putAction: '/upload/put',
      headers: {
        'X-Csrf-Token': 'xxxx'
      },
      data: {
        _csrf_token: 'xxxxxx'
      },
      autoCompress: 1024 * 1024,
      isOption: false,
      addData: {
        show: false,
        name: '',
        type: '',
        content: ''
      },
      editFile: {
        show: false,
        name: ''
      }
    }
  },
  watch: {
    'addData.show' (show) {
      if (show) {
        this.addData.name = ''
        this.addData.type = ''
        this.addData.content = ''
      }
    },
    allFiles: {
      handler: function (allFiles) {
        this.files = allFiles
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    $(this.$refs.editImageModal).on('shown.bs.modal', this.editImageShow)
  },
  methods: {
    changeFeaturedImage (obj) {
      this.isFeatured = obj.event
      this.$emit('changeFeaturedImage', { isFeatured: obj.event, index: obj.index })
    },
    editImageShow () {
      this.$nextTick(function () {
        if (!this.$refs.editImage) {
          return
        }
        const cropper = new Cropper(this.$refs.editImage, {
          autoCrop: false
        })
        this.editFile = {
          ...this.editFile,
          cropper
        }
      })
    },
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // Filter system files or hide files
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // Filter php html js file
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
        // Automatic compression
        if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
          newFile.error = 'compressing'
          const imageCompressor = new ImageCompressor(null, {
            convertSize: Infinity,
            maxWidth: 512,
            maxHeight: 512
          })
          imageCompressor.compress(newFile.file)
            .then((file) => {
              this.$refs.upload.update(newFile, {
                error: '',
                file,
                size: file.size,
                type: file.type
              })
            })
            .catch((err) => {
              this.$refs.upload.update(newFile, { error: err.message || 'compress' })
            })
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        newFile.blob = ''
        const URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        // Thumbnails
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
    },
    // add, update, remove File Event
    inputFile (newFile, oldFile){
      if (newFile && oldFile) {
        // max upload size
        if (newFile && newFile.size >= 0 && newFile.size / 1000 > this.$store.state.maxUploadSize) {
          this.maxFileSizeExceedError = true
          return
        } else {
          this.maxFileSizeExceedError = false
        }
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.upload.update(newFile, { error: 'size' })
          }
        }
        if (newFile.progress !== oldFile.progress) {
          this.$emit('onProgress', newFile)
          return true
        }
        if (newFile.error && !oldFile.error) {
          this.$emit('onError', newFile)
          return true
        }
        if (newFile.success && !oldFile.success) {
          this.$emit('onSuccess', newFile)
          return true
        }
      }
      if (!newFile && oldFile) {
        this.maxFileSizeExceedError = false
        if (oldFile.mediaId) {
          this.$emit('onRemove', oldFile)
        }
        return true
      }
      if (newFile && !oldFile) {
        if (newFile && newFile.size >= 0 && newFile.size / 1000 > this.$store.state.maxUploadSize) {
          this.maxFileSizeExceedError = true
          return
        } else {
          this.maxFileSizeExceedError = false
          if (!newFile.mediaId) {
            this.$emit('newImageAdded', newFile)
          }
        }
      }
      // Automatically activate upload
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
    },
    rotateLeft () {
      this.editFile.cropper.rotate(-90)
    },
    rotateRight () {
      this.editFile.cropper.rotate(90)
    },
    crop () {
      this.editFile.cropper.crop()
      this.onEditorFile()
    },
    clear () {
      this.editFile.cropper.clear()
    },
    alert (message) {
      alert(message)
    },
    onEditFileShow (file) {
      this.editFile = {
        ...file,
        show: true
      }
      this.$refs.upload.update(file, { error: 'edit' })
    },
    onEditorFile () {
      $(this.$refs.editImageModal).modal('hide')
      if (!this.$refs.upload.features.html5) {
        this.alert('Your browser does not support')
        this.editFile.show = false
        return
      }
      const data = {
        name: this.editFile.name
      }
      if (this.editFile.cropper) {
        const binStr = atob(this.editFile.cropper.getCroppedCanvas().toDataURL(this.editFile.type).split(',')[1])
        const arr = new Uint8Array(binStr.length)
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i)
        }
        data.file = new File([arr], data.name, { type: this.editFile.type })
        data.size = data.file.size
      }
      this.$refs.upload.update(this.editFile.id, data)
      this.editFile.error = ''
      this.editFile.show = false
    },
    // add folder
    onAddFolader () {
      if (!this.$refs.upload.features.directory) {
        this.alert('Your browser does not support')
        return
      }
      const input = this.$refs.upload.$el.querySelector('input')
      input.directory = true
      input.webkitdirectory = true
      this.directory = true
      input.onclick = null
      input.click()
      input.onclick = (e) => {
        this.directory = false
        input.directory = false
        input.webkitdirectory = false
      }
    },
    onAddData () {
      this.addData.show = false
      if (!this.$refs.upload.features.html5) {
        this.alert('Your browser does not support')
        return
      }
      const file = new window.File([this.addData.content], this.addData.name, {
        type: this.addData.type
      })
      this.$refs.upload.add(file)
    }
  }
}
