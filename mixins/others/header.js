import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      miniCartShow: "others/header/getMiniCartShow"
    }),
  }
}
