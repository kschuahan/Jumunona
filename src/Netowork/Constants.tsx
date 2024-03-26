import { localEnum } from './ApiEnum';

export const reloadData = {
  profileRefresh: false,
  refreshBodyData: false,
};

export const BASE_URL = (type = localEnum.development) => {
  if (type === localEnum.development) {
    return apiUrls.development;
  } else if (type === localEnum.testing) {
    return apiUrls.testing;
  } else {
    return apiUrls.production;
  }
};

export const apiUrls = {
  development: 'https://jumunona.onrender.com',
  testing: 'https://jumunona-c3eq.onrender.com',
  production: 'https://api.jumunona.com',
};

export const modules = {
  productModule: '/app/products/',
  categoryModule: '/app/categories/',
  authModule: '/auth/',
  profile: '/app/profile/',
  cart: '/app/cart/',
  review: '/app/reviews/',
  address: '/app/address/',
  order: '/app/orders/',
  bodyData: '/app/bodyData/',
  chatModule: 'admin/chat/',
  shipping: '/app/shipping/',
};

export const otherModule = {
  getTermsCondition: '/app/getTermsCondition',
  getPrivacyPolicy: '/app/getPrivacyPolicy',
};

export const categoriesModule = {
  getCategories: `${modules.categoryModule}getCategoriesV2`,
  getSubCategories: `${modules.categoryModule}getSubCategoriesV2?categoryId=`,

  getHomePageCategories: `${modules.categoryModule}getCategoriesV2`,
  getCategoriesListForCategoriesScreen: `${modules.categoryModule}getCategoriesV2`,
};

export const ProductAPIs = {
  getProducts: modules.productModule + 'getProductsV2?page=',
  getFavourite: modules.productModule + 'getFavoriteProducts?categoryId=',
  getProductDetails: modules.productModule + 'getProductDetailsV2?productId=',
  favoriteProduct: modules.productModule + 'favoriteProduct',
  removeFavourite: modules.productModule + 'removeFavoriteProduct',
  getShopsProduct: modules.productModule + 'getShopsProduct?productId=',
};

export const AuthAPIs = {
  login: modules.authModule + 'login',
  signUp: modules.authModule + 'register',
  sendOtp: modules.authModule + 'sendOtp',
  forgotPassword: modules.authModule + 'forgotPassword',
};

export const ProfileAPIs = {
  changePass: modules.profile + 'changePassword',
  uploadProfilePic: modules.profile + 'uploadProfileImage',
  getprofile: modules.profile + 'getProfile',
  updateProfile: modules.profile + 'updateProfile',
  deleteAccount: modules.profile + 'delete',
  changePhoneNumber: modules.profile + 'changePhoneNumber',
  getOrderCount: modules.profile + 'getOrdersCount',
};

export const CartAPIs = {
  addToCart: modules.cart + 'addToCart',
  deleteItemFromCart: modules.cart + 'deleteItemFromCart',
  updateCart: modules.cart + 'updateCart',
  deleteCart: modules.cart + 'deleteCart',
  getCart: modules.cart + 'getCart',
  deleteMultiItemFromCart: modules.cart + 'deleteMultiItemFromCart',
  moveToFavorite: modules.cart + 'moveToFavorite',
};

export const ReviewApis = {
  getReviews: modules.review + 'getReviews?productId=',
};

export const AddressAPIs = {
  getAddresses: modules.address + 'getAddress',
  addAddress: modules.address + 'addAddress',
  getAddressDetail: modules.address + 'getAddressDeatils?addressId=',
  deleteAddress: modules.address + 'deleteAddress',
};

export const OrderAPI = {
  placingOrder: modules.order + 'placingOrder',
  createOrder: modules.order + 'createOrders',
  getOrders: modules.order + 'getOrders?page=',
  getOrderDetail: modules.order + 'getOrderDetails?orderId=',
};

export const BodyDataAPI = {
  getBodyImages: modules.bodyData + 'getBodyDataImages',
  addBodyData: modules.bodyData + 'addBodyData',
  getBodyData: modules.bodyData + 'getBodyData',
  deleteBodyData: modules.bodyData + 'deleteBodyData',
  getBodyMeasurementGuide: modules.bodyData + 'getBodyMeasurementGuide',
  upadateBodyData: modules.bodyData + 'upadateBodyData',
};

export const ChatAPI = {
  getChatMessages: modules.chatModule + 'getChats?',
  getAllUsers: '/app/users/getUsers?page=',
};

export const ShippingAPI = {
  getOrderLocation: modules.shipping + 'getOrderLocation?orderId=',
};
