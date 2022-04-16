export default function ({ app, redirect, route, store }) {
  let authPages = [
    "customer-account",
    "sale-order",
    "wishlist",
    "customer-address",
    "customer-account-edit",
    "customer-mobile",
    "newsletter-manage",
    "review-customer",
    "os-customer",
    "checkout"
  ]

  let unAuthPages = [
    "login",
    "createaccount"
  ]

  authPages.forEach(function(value){

    if(route.name.indexOf(value) > -1) {
      if (!app.$cookies.get("token")) {
        return redirect("/login")
      }
    }
  })

  unAuthPages.forEach(function(value){
    if(route.name.indexOf(value) > -1) {
      if (app.$cookies.get("token")) {
        return redirect("/customer/account")
      }
    }
  })
}
