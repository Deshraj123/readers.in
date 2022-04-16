export default {
  methods: {
    setTitle(data) {
      let title = 'Readers';
      if(Object.keys(data).length > 0 && data.meta_title !=null && data.meta_title !='') {
        title = data.meta_title
      }
      return title
    },

    setHead(data) {
      let meta = []
      if (
        Object.keys(data).length > 0 &&
        Object.keys(process.env.head_variables).length > 0
      ) {
        let headVariables = process.env.head_variables
        for (let [key, value] of Object.entries(headVariables)) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (value == "description") {
              meta.push({
                hid: value,
                name: value,
                content: data[key],
              })
            } else if (value == "keywords") {
              meta.push({
                hid: value,
                name: value,
                keywords: data[key],
              })
            }
          }
        }
      }

      return meta
    },
  },
}
