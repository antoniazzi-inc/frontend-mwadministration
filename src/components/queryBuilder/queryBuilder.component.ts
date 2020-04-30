import GroupComponent from './group/group.vue'
import describerMixinComponent from './describer'
import { Component, Inject, Prop, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

@Component({
  components: {
    'group-component': GroupComponent
  },
  props: {
    rules: {
      type: Array
    },
    styled: {
      type: Boolean,
      default: true
    },
    maxDepth: {
      type: Number,
      default: 3,
      validator: function (value) {
        return value >= 1
      }
    },
    initialQuery: {
      type: Object
    },
    onlyActiveEntities: {
      type: Boolean // only use lookup entities that are not soft-deleted
    }
  }
})
export default class QueryBuilderComponent extends mixins(describerMixinComponent, Vue) {
    public depth: number;
    public query: Record<string, any>;
    public initQuery: any;
    constructor () {
      super()
      this.depth = 1
      this.initQuery = null
      this.query = {
        logicalOperator: 'and',
        children: []
      }
    }

    public mounted () {
      this.$emit('queryUpdated', this.deepClone(this.query))
      this.$emit('descUpdated', this.describe(this.query))
      if (this.$options && this.$options.propsData &&
        // @ts-ignore
        typeof this.$options.propsData.initialQuery !== 'undefined') {
        // @ts-ignore
        this.query = this.deepClone(this.$options.propsData.initialQuery)
      }
    }

    @Watch('query', { immediate: true, deep: true })
    public updateQuery (newVal: any) {
      this.$emit('queryUpdated', this.deepClone(newVal))
      this.$emit('descUpdated', this.describe(newVal))
    }

    get mergedRules () {
      const self = this
      const mergedRules: any = []
      this.$props.rules.forEach(function (rule: any) {
        rule.label = self.$t(rule.label)
        mergedRules.push(rule)
      })
      return mergedRules
    }

    @Watch('initialQuery', { immediate: true, deep: true })
    public initialQueryVal (newInitialQuery: any) {
      this.initQuery = newInitialQuery
      this.query = this.deepClone(this.initQuery)
    }

    public deepClone (obj: any): any {
      if (Array.isArray(obj)) {
        return obj.map(this.deepClone)
      } else if (obj && typeof obj === 'object') {
        const cloned: any = {}
        const keys = Object.keys(obj)
        for (let i = 0, l = keys.length; i < l; i++) {
          const key = keys[i]
          cloned[key] = this.deepClone(obj[key])
        }
        return cloned
      } else {
        return obj
      }
    }
}
