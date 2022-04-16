import emptyCartMutation from "~/graphql/quote/createEmptyCart.graphql";
import cartQuery from "~/graphql/quote/cart.graphql";
import customerCartQuery from "~/graphql/customer/customerCart.graphql";
import addConfigurableProductsToCartMutation from "~/graphql/quote/addConfigurableProductsToCart.graphql";
import addSimpleProductsToCartMutation from "~/graphql/quote/addSimpleProductsToCart.graphql";
import addBundleProductsToCartMutation from "~/graphql/quote/addBundleProductsToCart.graphql";
import removeItemFromCartMutation from "~/graphql/quote/removeItemFromCart.graphql";
import updateCartItemsMutation from "~/graphql/quote/updateCartItems.graphql";
import applyCouponToCartMutation from '~/graphql/quote/applyCouponToCart.graphql'
import availableShippingMethodsQuery from '~/graphql/quote/availableShippingMethods.graphql'
import shippingMethodsOnCartMutation from "~/graphql/quote/setShippingMethodsOnCart.graphql"
import shippingAddressOnCartMutation from "~/graphql/quote/setShippingAddressesOnCart.graphql"
import billingAddressOnCartMutation from "~/graphql/quote/setBillingAddressOnCart.graphql"
import guestEmailOnCartMutation from '~/graphql/quote/setGuestEmailOnCart.graphql'
import createPaypalExpressTokenMutation from '~/graphql/quote/createPaypalExpressToken.graphql'
import setpaymentMethodOnCartMutation from '~/graphql/quote/setPaymentMethodOnCart.graphql'
import placeOrderMutation from "~/graphql/quote/placeOrder.graphql"
import mergeCartsMutation from "~/graphql/quote/mergeCarts.graphql"
import reorderItemsMutation from "~/graphql/quote/reorderItems.graphql"


export const state = () => ({
  oldCartId: null,
  cart: {},
  availableShippingMethods: [],
  paypalToken: "",
  pageShow: false,

  // Errors
  addToCartProductError: null,
  removeItemError: null,
  updateCartItemQtyError: null,
  applyCoupanCodeError: null,
  shippingMethodsError: null,
  shippingAddressError: null,
  billingAddressError: null,
  paymentMethodError: null,
  placeOrderError: null,

  // Success
  billingAddressSuccess: null,

  // Steps
  steps:{
    shipping: true,
    payment: false,
    thank_you: false
  }
});

export const getters = {
  getOldCartId(state) {
    return state.oldCartId;
  },
  getCart(state) {
    return state.cart;
  },
  getAvailableShippingMethods(state) {
    return state.availableShippingMethods;
  },
  getPaypalToken: (state) => {
    return state.paypalToken
  },
  getPageShow: (state) => {
    return state.pageShow
  },

  // Errors
  getAddToCartProductError(state) {
    return state.addToCartProductError;
  },
  getRemoveItemError(state) {
    return state.removeItemError;
  },
  getUpdateCartItemQtyError(state) {
    return state.updateCartItemQtyError;
  },
  getApplyCoupanCodeError(state) {
    return state.applyCoupanCodeError;
  },
  getShippingMethodsError(state) {
    return state.shippingMethodsError;
  },
  getShippingAddressError(state) {
    return state.shippingAddressError;
  },
  getBillingAddressError(state) {
    return state.billingAddressError;
  },
  getPaymentMethodError(state) {
    return state.paymentMethodError;
  },
  getPlaceOrderError(state) {
    return state.placeOrderError;
  },

  // Success
  getBillingAddressSuccess(state) {
    return state.billingAddressSuccess;
  },

  //Steps
  getSteps(state) {
    return state.steps;
  }
};

export const mutations = {
  setOldCartId(state, id) {
    state.oldCartId = id;
  },
  setCart(state, cart) {
    if(cart.items && cart.items.length > 0) {
      cart.items.forEach(function(item, index){
        cart.items[index]['show_details'] = false
      })
    }
    state.cart = cart;
  },
  setAvailableShippingMethods(state, data) {
    state.availableShippingMethods = data;
  },
  setPaypalToken(state, data) {
    state.paypalToken = data;
  },
  setPageShow(state, data) {
    state.pageShow = data;
  },
  updateShowDetailsOfItem(state, data){
    state.cart.items[data.index].show_details = data.value
  },

  // Errors
  setAddToCartProductError(state, value) {
    state.addToCartProductError = value;
  },
  setRemoveItemError(state, value) {
    state.removeItemError = value;
  },
  setUpdateCartItemQtyError(state, value) {
    state.updateCartItemQtyError = value;
  },
  setApplyCoupanCodeError(state, value) {
    state.applyCoupanCodeError = value;
  },
  setShippingMethodsError(state, value) {
    state.shippingMethodsError = value;
  },
  setShippingAddressError(state, value) {
    state.shippingAddressError = value;
  },
  setBillingAddressError(state, value) {
    state.billingAddressError = value;
  },
  setPaymentMethodError(state, value) {
    state.paymentMethodError = value;
  },
  setPlaceOrderError(state, value) {
    state.placeOrderError = value;
  },

  // Success
  setBillingAddressSuccess(state, value) {
    state.billingAddressSuccess = value;
  },

  // Steps
  setSteps(state, value) {
    state.steps = value;
  }
};

export const actions = {
  getCartId({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient;
      apolloClient
        .mutate({
          mutation: emptyCartMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.createEmptyCart !== null) {
            if (this.app.$cookies.get("token")) {
              commit("setOldCartId", this.app.$cookies.get("cart_id"));
            }
            this.app.$cookies.set("cart_id", res.data.createEmptyCart);
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  cartIssue({ commit }, error) {
    //console.log(error)
    let str = '';
    if(error && error.message) {
       str = error.message.replace(/GraphQL error:/, "")
    }else if(error && errors.length >0 && errors[0].message){
       str = errors[0].message.replace(/GraphQL error:/, "")
    }

    //console.log(str)
    // Cart not Perform by current user
    let res = str.search(
      "The current user cannot perform operations on cart"
    );
    if (res != -1) {
      commit("setCart", {});
      this.app.$cookies.remove("cart_id");
      this.$router.push({ path: "/" });
      window.location.reload()
    }

    // Cart issue
    res = str.search("cart with ID");
    if (res != -1) {
      commit("setCart", {});
      this.app.$cookies.remove("cart_id");
      this.$router.push({ path: "/" });
      window.location.reload()
    }
    // In Active Cart
    res = str.search("isn't active");
    if (res != -1) {
      commit("setCart", {});
      this.app.$cookies.remove("cart_id");
      this.$router.push({ path: "/" });
      window.location.reload()
    }

    // In Active Cart
    res = str.search("isn't authorized");
    if (res != -1) {
      commit("setCart", {});
      this.app.$cookies.remove("cart_id");
      this.app.$cookies.remove("token");
      this.$router.push({ path: "/" });
      window.location.reload()
    }
  },

  getCartAction({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient;
      if (typeof this.app.$cookies.get("token") !== "undefined") {
        apolloClient
          .query({
            fetchPolicy: "no-cache",
            query: customerCartQuery,
            variables: {},
            context: {
              headers: payload.headers,
            },
          })
          .then((res) => {
            if (res.data.customerCart !== null) {
              commit("setCart", res.data.customerCart);
            }
            resolve(res);
          })
          .catch((error) => {
            dispatch("cartIssue", error)
            reject(error);
          });
      } else {
        apolloClient
          .query({
            fetchPolicy: "no-cache",
            query: cartQuery,
            variables: payload.variables,
            context: {
              headers: payload.headers,
            },
          })
          .then((res) => {
            if (res.data.cart !== null) {
              commit("setCart", res.data.cart);
            }
            resolve(res);
          })
          .catch((error) => {
            dispatch("cartIssue", error)
            reject(error);
          });
      }
    });
  },

  addSimpleProductAction({ commit, dispatch }, payload) {
    commit("setAddToCartProductError", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: addSimpleProductsToCartMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.addSimpleProductsToCart !== null) {
            commit("setCart", res.data.addSimpleProductsToCart.cart);
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setAddToCartProductError", str)
          setTimeout(function(){
            commit("setAddToCartProductError", null)
          }, 5000)
          commit("others/loading/setLoading", false, { root: true })
          dispatch("cartIssue", error)
          reject(error)
          this.$toast.error(str)
        })
    })
  },

  addConfigurationProductAction({ commit, dispatch }, payload) {
    commit("setAddToCartProductError", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: addConfigurableProductsToCartMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.addConfigurableProductsToCart !== null) {
            commit("setCart", res.data.addConfigurableProductsToCart.cart);
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setAddToCartProductError", str)
          setTimeout(function(){
            commit("setAddToCartProductError", null)
          }, 5000)
          commit("others/loading/setLoading", false, { root: true })
          dispatch("cartIssue", error)
          this.$toast.error(str)
          reject(error)
        })
    })
  },

  addBundleProductAction({ commit, dispatch }, payload) {
    commit("setAddToCartProductError", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: addBundleProductsToCartMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.addBundleProductsToCart !== null) {
            commit("setCart", res.data.addBundleProductsToCart.cart);
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setAddToCartProductError", str)
          setTimeout(function(){
            commit("setAddToCartProductError", null)
          }, 5000)
          commit("others/loading/setLoading", false, { root: true })
          this.$toast.error(str)
          dispatch("cartIssue", error)
          reject(error)
        })
    })
  },

  removeItemAction({ commit, dispatch }, payload) {
    commit("setRemoveItemError", null)
    if(payload.loading) {
      commit("others/loading/setLoading", true, { root: true })
    }

    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: removeItemFromCartMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers
          }
        })
        .then((res) => {
          if (res.data.removeItemFromCart !== null) {
            commit("setCart", res.data.removeItemFromCart.cart);
          }
          if(payload.loading) {
            commit("others/loading/setLoading", false, { root: true })
          }
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit('setRemoveItemError', str)
          this.$toast.error(str)
          commit("others/loading/setLoading", false, { root: true })
          dispatch("cartIssue", error)
          reject(error)
        })
    })
  },

  updateCartItemQtyAction({ commit, dispatch }, payload) {
    commit("setUpdateCartItemQtyError", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: updateCartItemsMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.updateCartItems !== null) {
            commit("setCart", res.data.updateCartItems.cart);
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setUpdateCartItemQtyError", str)
          commit("others/loading/setLoading", false, { root: true })
          this.$toast.error(str)
          dispatch("cartIssue", error)
          reject(error)
        })
    })
  },

  setApplyCoupanCodeAction({ commit, dispatch }, payload) {
    commit("setApplyCoupanCodeError", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: applyCouponToCartMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers
          }
        })
        .then((res) => {
          if ( res.data.applyCouponToCart && res.data.applyCouponToCart.cart !== null) {
            commit("setCart", res.data.applyCouponToCart.cart)
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit('setApplyCoupanCodeError', str)
          setTimeout(function(){
            commit("setApplyCoupanCodeError", null)
          }, 5000)
          commit("others/loading/setLoading", false, { root: true })
          this.$toast.error(str)
          dispatch("cartIssue", error)
          reject(error)
        })
    });
  },

  getAvailableShippingMethodsAction({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .query({
          query: availableShippingMethodsQuery,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.available_shipping_methods) {
            commit("setAvailableShippingMethods", res.data.available_shipping_methods)
          }
          resolve(res)
        })
        .catch((error) => {
          dispatch("cartIssue", error)
          reject(error)
        })
    })
  },

  setShippingMethodsAction({ commit, dispatch }, payload) {
    commit("setShippingMethodsError", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: shippingMethodsOnCartMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.setShippingMethodsOnCart && res.data.setShippingMethodsOnCart.cart !== null) {
            commit("setCart", res.data.setShippingMethodsOnCart.cart)
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit('setShippingMethodsError', str)
          this.$toast.error(str)
          setTimeout(function(){
            commit("setShippingMethodsError", null)
          }, 5000)
          commit("others/loading/setLoading", false, { root: true })
          dispatch("cartIssue", error)
          reject(error)
        })
    })
  },

  setShippingAddressAction({ commit, dispatch }, payload) {
    commit("setShippingAddressError", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: shippingAddressOnCartMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers
          },
        })
        .then((res) => {
          if (
            res.data.setShippingAddressesOnCart &&
            res.data.setShippingAddressesOnCart.cart !== null
          ) {
            commit("setCart", res.data.setShippingAddressesOnCart.cart)

            if(res.data.setShippingAddressesOnCart.cart.shipping_addresses && res.data.setShippingAddressesOnCart.cart.shipping_addresses[0] && res.data.setShippingAddressesOnCart.cart.shipping_addresses[0].available_shipping_methods){
              commit("setAvailableShippingMethods", res.data.setShippingAddressesOnCart.cart.shipping_addresses[0].available_shipping_methods)
            }

          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit('setShippingAddressError', str)
          this.$toast.error(str)
          commit("others/loading/setLoading", false, { root: true })
          dispatch("cartIssue", error)
          reject(error)
        })
    })
  },

  setBillingAddressAction({ commit, dispatch }, payload) {
    commit("setBillingAddressError", null)
    commit("setBillingAddressSuccess", null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: billingAddressOnCartMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.setBillingAddressOnCart && res.data.setBillingAddressOnCart.cart !== null) {
            commit("setCart", res.data.setBillingAddressOnCart.cart)
          }
          commit("setBillingAddressSuccess", 'Address is successfully updated.')
          setTimeout(function(){
            commit("setBillingAddressSuccess", null)
          }, 5000)
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("setBillingAddressSuccess", null)
          commit('setBillingAddressError', str)
          commit("others/loading/setLoading", false, { root: true })
          dispatch("cartIssue", error)
          reject(error)
          this.$toast.error(str)
        })
    })
  },

  setEmailCartAsGuest({ commit, dispatch }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: guestEmailOnCartMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers
          }
        })
        .then((res) => {
          if ( res.data.setGuestEmailOnCart && res.data.setGuestEmailOnCart.cart !== null) {
            commit('setCart', res.data.setGuestEmailOnCart.cart)
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          dispatch("cartIssue", error)
          commit("others/loading/setLoading", false, { root: true })
          reject(error)
        })
    });
  },

  createPaypalExpressToken({commit, dispatch}, payload) {
    commit('setPaymentMethodError', null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: createPaypalExpressTokenMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers
          }
        })
        .then((res) => {
          if (res.data.createPaypalExpressToken !== null) {
            commit('setToken', res.data.createPaypalExpressToken)
            commit("others/loading/setLoading", false, { root: true })
            window.open(res.data.createPaypalExpressToken.paypal_urls.start, "_self");
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, '')
          commit('setPaymentMethodError', str)
          commit("others/loading/setLoading", false, { root: true })
          dispatch("cartIssue", error)
          reject(error)
          this.$toast.error(str)
        })
    })
  },

  setPaymentMethodAction({ commit, dispatch }, payload) {
    commit('setPaymentMethodError', null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: setpaymentMethodOnCartMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers
          }
        })
        .then((res) => {
          if ( res.data.setPaymentMethodOnCart && res.data.setPaymentMethodOnCart.cart !== null) {
            commit('setCart', res.data.setPaymentMethodOnCart.cart)
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, '')
          commit('setPaymentMethodError', str)
          commit("others/loading/setLoading", false, { root: true })
          dispatch("cartIssue", error)
          reject(error)
          this.$toast.error(str)
        })
    });
  },

  placeOrderAction({ commit, dispatch }, payload) {
    commit('setPlaceOrderError', null)
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: placeOrderMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.placeOrder && res.data.placeOrder.order !== null) {
            commit("sales/setOrder", res.data.placeOrder.order, { root: true })
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit('setPlaceOrderError', str)
          commit("others/loading/setLoading", false, { root: true })
          dispatch("cartIssue", error)
          reject(error)
          this.$toast.error(str)
        })
    })
  },

  mergeCartsActions({ commit, dispatch }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: mergeCartsMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.mergeCarts) {
            payload.variables = {}
            dispatch("getCartAction", payload)
            commit("others/loading/setLoading", false, { root: true })
          }
          resolve(res)
        })
        .catch((error) => {
          let str = error.message.replace(/GraphQL error:/, "")
          commit("others/loading/setLoading", false, { root: true })
          dispatch("cartIssue", error)
          this.$toast.error(str)
          reject(error)
        })
    })
  },

  reorderItemsActions({ commit, dispatch }, payload) {
    commit("others/loading/setLoading", true, { root: true })
    return new Promise((resolve, reject) => {
      const apolloClient = this.app.apolloProvider.defaultClient
      apolloClient
        .mutate({
          mutation: reorderItemsMutation,
          variables: payload.variables,
          context: {
            headers: payload.headers,
          },
        })
        .then((res) => {
          if (res.data.reorderItems) {
            commit("setCart", res.data.reorderItems.cart);
          }
          commit("others/loading/setLoading", false, { root: true })
          resolve(res)
        })
        .catch((error) => {
          commit("others/loading/setLoading", false, { root: true })
          dispatch("cartIssue", error)
          reject(error)
        })
    })
  }
};
