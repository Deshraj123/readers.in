import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      loading: "others/loading/getLoading",
    }),
  }
}
