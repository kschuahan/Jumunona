import { localEnum } from "./ApiEnum"

export const BASE_URL = (type = localEnum.development) => {
    if (type == localEnum.development) {
        return apiUrls.development
    } else if (type == localEnum.testing) {
        return apiUrls.testing
    } else {
        return apiUrls.production
    }
}

export const apiUrls = {
    development: 'https://jumunona.onrender.com',
    testing: '',
    production: ''
}

export const modules = {
    productModule: '/app/products/',
    categoryModule: '/app/categories/',
    authModule: '/auth/'
}


export const categoriesModule = {
    getCategories: `${modules.categoryModule}getCategories`
}

export const ProductAPIs = {
    getProducts: modules.productModule + 'getProducts?page=',
    getFavourite: modules.productModule + 'getFavoriteProducts?categoryId=',
    getProductDetails: modules.productModule + 'getProductDetails?productId=',
    favoriteProduct: modules.productModule + "favoriteProduct",
    removeFavourite: modules.productModule + "removeFavoriteProduct"
}

export const AuthAPIs = {
    login: modules.authModule + 'login',
    signUp: modules.authModule + 'register',
    sendOtp: modules.authModule + 'sendOtp',
    forgotPassword: modules.authModule + 'forgotPassword'
}