import { mapGetters } from "vuex"
import globalMixin from "~/mixins/others/global.js";
export default {
  mixins: [globalMixin],
  computed: {
    ...mapGetters({
      headers: "others/global/getHeaderData",
      error: "others/contact/getError",
      success: "others/contact/getSuccess"
    }),
  },
  data(){
    return {
      name: "",
      email: "",
      question: "",
      telephone: "",
      recaptcha: false,

      // Error
      nameError: null,
      emailError: null,
      questionError: null,
      telephoneError: null,
      recaptchaError: null
    }
  },
  methods: {
    restoreForm() {
      this.name= ""
      this.email= ""
      this.question= ""
      this.telephone= ""
    },

    async sendEmail() {
      let vali = this.checkValidation()
      if(!vali) {
        let payload = {
          variables: {
            name: this.name,
            email: this.email,
            message: this.question,
            telephone: this.telephone
          },
          headers: this.headers
        }
        await this.$store.dispatch("others/contact/sendContactEmailAction", payload)
        await this.restoreForm()
      }
    },
    checkValidation() {
      this.resetAllError();
      let error = false;

      if (this.name === "") {
        error = true;
        this.nameError = "Name is required.";
      }

      if (this.email == "") {
        error = true;
        this.emailError = "Email is required.";
      }

      if (this.email != "" && !this.validEmail(this.email)) {
        error = true;
        this.emailError = "Email is invalid.";
      }

      if (this.question == "") {
        error = true;
        this.questionError = "Message is required.";
      }

      if (this.telephone != "" && !this.isPhoneNumber(this.telephone)) {
        error = true;
        this.telephoneError = "Telephone is not valid.";
      }

      if(!this.recaptcha){
        error = true;
        this.recaptchaError = "Recaptcha is required.";
      }

      return error
    },
    resetAllError() {
      this.nameError = null;
      this.emailError = null;
      this.questionError = null;
      this.telephoneError = null;
      this.recaptchaError = null;
    },

    async onError (error) {
      await this.$recaptcha.reset()
    },

    onSuccess (token) {
      this.recaptcha = true
    },
    async onExpired () {
      await this.$recaptcha.reset()
    }
  }
}
