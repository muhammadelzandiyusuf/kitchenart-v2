import appConfig from "../appConfig";

export const config = appConfig;

const baseUrl = {
    customer: {
        login: `${config.url.api}uam/auth/token/customer/`,
        forgotPassword: `${config.url.api}uam/auth/forgot-password/`,
        register: `${config.url.api}uam/auth/register/`,
        newsletter: `${config.url.api}cms/newsletter/`,
        registerLoginGoogleAccount: `${config.url.api}uam/social-auth/google-oauth2/`,
        registerLoginFacebook: `${config.url.api}uam/social-auth/facebook/`,
        verifyAccount: `${config.url.api}uam/auth/verify/email/`,
        otpVerification: `${config.url.api}uam/auth/otp-verification/`,
        businessPartner: `${config.url.api}uam/business-partner/`,
        profile: `${config.url.api}uam/customer-profile/`,
        password: `${config.url.api}uam/auth/password-change/`,
    },
    address: {
        destination: `${config.url.api}fulfillment/address/destination/`
    },
    category: {
        parent: `${config.url.api}core/category/`,
    },
    brand: {
        all: `${config.url.api}core/brand/`,
    },
    product: {
        products: `${config.url.api}core/product-document/`,
        productList: `${config.url.api}core/product/`,
        productDiscussion: `${config.url.api}core/product-discussion/`,
        productPackage: `${config.url.api}core/package/`,
        promotion: `${config.url.api}core/promotion/`,
    },
    payment: {
        method: `${config.url.api}core/payment-method/`,
    },
    shipment: {
        courier: `${config.url.api}fulfillment/pricing/`,
    },
    banner: {
        banners: `${config.url.api}cms/banner/`,
    },
    wishlist: {
        wishlists: `${config.url.api}core/wishlist/`,
    },
    tradein: {
        tradeinContent: `${config.url.api}core/tradein-content/`,
        tradeinRequest: `${config.url.api}core/tradein-request/`,
    },
    voucher: {
        vouchers: `${config.url.api}core/voucher/`,
        giftVoucher: `${config.url.api}core/gift-voucher/`,
        voucherType: `${config.url.api}core/voucher-type/`
    },
    coupon: {
        coupons: `${config.url.api}core/coupon/`,
    },
    cart: {
        carts: `${config.url.api}core/cart/`,
        cartItem: `${config.url.api}core/cart-item/`,
    },
    checkout: {
        checkouts: `${config.url.api}core/checkout/`,
        shippingAddress: `${config.url.api}uam/shipping-address/`,
        payments: `${config.url.api}core/payment/`,
        orders: `${config.url.api}core/order/`,
    },
    announcements: {
        announcement: `${config.url.api}cms/announcement/`,
    },
    referralPrograms: {
        referralProgram: `${config.url.api}core/referral/`,
    },
    historyOrder: {
        historyOrder: `${config.url.api}core/order/`,
        historyOrderItem: `${config.url.api}core/order-item/`,
        trackingOrder: `${config.url.api}fulfillment/order/`
    },
    commissions: {
        commission: `${config.url.api}core/commission/`,
        commissionHistory: `${config.url.api}core/commission-history/`,
        commissionWithdraw: `${config.url.api}core/commission-withdrawal/`,
    },
    review: {
        review: `${config.url.api}core/review/`
    },
    shortLink: {
        shortLink: `${config.url.api}core/shortlink/`
    },
    order: {
        complaint: `${config.url.api}core/order-complaint/`,
        orderCancel: `${config.url.api}core/order-cancel/`
    },
    help: {
        content: `${config.url.api}cms/faq-content/`,
        category: `${config.url.api}cms/faq-category/`
    }
};

export default baseUrl;