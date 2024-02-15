import { localEnum } from './ApiEnum';

export const BASE_URL = (type = localEnum.development) => {
  if (type == localEnum.development) {
    return apiUrls.development;
  } else if (type == localEnum.testing) {
    return apiUrls.testing;
  } else {
    return apiUrls.production;
  }
};

export const apiUrls = {
  development: 'https://jumunona.onrender.com',
  testing: '',
  production: '',
};

export const modules = {
  productModule: '/app/products/',
  categoryModule: '/app/categories/',
  authModule: '/auth/',
  profile: "/app/profile/",
  cart: '/app/cart/'
}

export const otherModule = {
  getTermsCondition: '/app/getTermsCondition',
  getPrivacyPolicy: '/app/getPrivacyPolicy',
};

export const categoriesModule = {
  getCategories: `${modules.categoryModule}getCategories`,
  getSubCategories: `${modules.categoryModule}getSubCategories?categoryId=`,

  getHomePageCategories: `${modules.categoryModule}getHomePageCategories`,
  getCategoriesListForCategoriesScreen: `${modules.categoryModule}getCategoriesList`,
};

export const ProductAPIs = {
  getProducts: modules.productModule + 'getProducts?page=',
  getFavourite: modules.productModule + 'getFavoriteProducts?categoryId=',
  getProductDetails: modules.productModule + 'getProductDetails?productId=',
  favoriteProduct: modules.productModule + 'favoriteProduct',
  removeFavourite: modules.productModule + 'removeFavoriteProduct',
  getShopsProduct: modules.productModule + 'getShopsProduct?productId=',

  
};

export const AuthAPIs = {
  login: modules.authModule + 'login',
  signUp: modules.authModule + 'register',
  sendOtp: modules.authModule + 'sendOtp',
  forgotPassword: modules.authModule + 'forgotPassword'
}

export const ProfileAPIs = {
  changePass: modules.profile + "changePassword",
  uploadProfilePic: modules.profile + "uploadProfileImage",
  getprofile: modules.profile + 'getProfile',
  updateProfile: modules.profile + "updateProfile",
  deleteAccount: modules.profile + "delete"
}

export const CartAPIs = {
  addToCart: modules.cart + 'addToCart',
  deleteItemFromCart: modules.cart + 'deleteItemFromCart',
  updateCart: modules.cart + 'updateCart',
  deleteCart: modules.cart + 'deleteCart',
  getCart: modules.cart + 'getCart',
}
