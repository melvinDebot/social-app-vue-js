export default {
  props : {
    to : {
      type : String,
      default : '',
      fill : 'white',
      listener : null,
    }
  },
  mounted() {
    this.putColor(this.$route)
    this.listener = this.$el.addEventListener('click', ()=> {
      this.switchPage(this.to);
    })
  },
  destroyed() {
    this.$el.removeEventListener('click', this.listener )
  },
  methods: {
    switchPage (to) {
      this.$router.push({ path : to })
    },
    putColor (to) {
      if ( to.fullPath === this.to ) {
        this.fill = '#045C14'
      } else {
        this.fill = 'none'
      }
      this.$el.style.fill = this.fill
    }
  },
  watch: {
    $route(to) {
      this.putColor(to)
    }
  },
}