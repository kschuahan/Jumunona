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

export const otherModule = {
    getTermsCondition: '/app/getTermsCondition',
    getPrivacyPolicy: '/app/getPrivacyPolicy'
}


export const categoriesModule = {
    getCategories: `${modules.categoryModule}getCategories`
}

export const products = {
    getProducts: modules.productModule + 'getProducts?page=',
    getProductDetails: modules.productModule + 'getProductDetails?productId='
}

export const AuthAPIs = {
    login: modules.authModule + 'login',
    signUp: modules.authModule + 'register',
    sendOtp: modules.authModule + 'sendOtp',
    forgotPassword: modules.authModule + 'forgotPassword'
}