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
    productModule: '/app/products/'
}

export const userManagementModule = {

}

export const products = {
    getProducts: modules.productModule + 'getProducts?page='
}
