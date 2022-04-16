import { mapGetters } from "vuex"
var moment = require('moment');

export default {
  computed: {
    ...mapGetters({
      currency: "others/directory/getCurrency",
      //locale: "directory/getLocale",
    }),
  },

  methods: {
    setFormatPrice(price) {
      return this.currency.base_currency_symbol + Number.parseFloat(price).toFixed(2)
    },

    setFormatDate(date) {
      let lang = this.$cookies.get('i18n_redirected')
      return moment(date).locale(lang).format("DD MMMM YYYY")
    },

    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },

    is_numeric: function (phone) {
      return /^\d+$/.test(phone)
    },

    isPhoneNumber: function(phone)
    {
      let validate = /^\d{10}$/.test(phone)
      if(validate) {
        return true
      }
      return false
    },

    is_password: function (password) {
      let passwordSyntax = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[( !@#$%^&* )]).{8,})$/
      return passwordSyntax.test(password)
    },

    formatPhoneNumber(phoneNumber) {
      let cleaned = ('' + phoneNumber).replace(/\D/g, '');
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return '( ' + match[1] + ' ) - ' + match[2] + ' - ' + match[3]
      };
      return null
    },

    removeCacheUrl(path) {
      let replacePath = ''
      if(path != null && path.indexOf('cache') > -1) {
        let _newPaths = []
        let newPaths = path.split("cache/")
        if(newPaths[0]) {
          replacePath = newPaths[0]
        }

        if(newPaths[1]) {
          _newPaths = newPaths[1].split('/')
        }

        if(_newPaths.length > 0) {
          _newPaths.forEach(function(value, index){
            if(index > 0) {
              replacePath +=value+'/'
            }
          })
        }
        replacePath= replacePath.slice(0, -1)
      }else{
        replacePath = path
      }

      return replacePath
    },

    getCloudinaryUrl(src, width, height) {
      let image_url = this.$cloudinary.image.fetchRemote(src,{ crop: 'scale', width: width, height:height })
      fetch(image_url, { method: 'HEAD' })
      .then(res => {
          if (!res.ok) {
            return '~/assets/images/category/coming-soon.png'
          }
      });

      return image_url
    },

    getAddressAsHtml(address) {
      let html = "";
      html += address.firstname + " " + address.lastname + ", <br/>";
      html += address.street[0];
      if (address.street[1]) {
        html += ", " + address.street[1] + ",<br/>";
      } else {
        html += ",<br/>";
      }
      html += address.city + ", " + address.postcode + ",<br/>";
      if(Object.keys(address.region).length > 0){
        html += address.region.region + ", " + address.country_code + ",<br/>";
      }else{
        html += address.region + ", " + address.country_code + "<br/>";
      }


      return html;
    }
  },
}
