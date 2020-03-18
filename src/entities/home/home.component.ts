import { Component, Vue } from 'vue-property-decorator'
import MainNavBar from '@/components/mainNav/mainNavBar.vue'

@Component({
  components: {
    MainNavBar: MainNavBar
  }
})
export default class HomeComponent extends Vue {

}
