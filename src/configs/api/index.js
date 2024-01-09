import baseUrl from "./url";
import { ApiRequest, apiInstance } from "./config";

const API = {};

// Customer
API.postLoginCustomer = ApiRequest.post(baseUrl.customer.login);
API.postForgotPassword = ApiRequest.post(baseUrl.customer.forgotPassword);
API.postRegisterCustomer = ApiRequest.post(baseUrl.customer.register);
API.postNewsletter = ApiRequest.post(baseUrl.customer.newsletter);
API.postRegisterLoginGoogle = ApiRequest.post(baseUrl.customer.registerLoginGoogleAccount);
API.postRegisterLoginFacebook = ApiRequest.post(baseUrl.customer.registerLoginFacebook);
API.postVerifyAccount = ApiRequest.post(baseUrl.customer.verifyAccount);
API.getOtpVerification = ApiRequest.get(baseUrl.customer.otpVerification);
API.postOtpVerification = ApiRequest.post(baseUrl.customer.otpVerification);
API.optionsBusinessPartner = ApiRequest.options(baseUrl.customer.businessPartner);
API.postBusinessPartner = ApiRequest.post(baseUrl.customer.businessPartner);
API.postCustomerProfile = ApiRequest.post(baseUrl.customer.profile);
API.patchCustomerProfile = ApiRequest.patch(baseUrl.customer.profile);
API.getCustomerProfile = ApiRequest.get(baseUrl.customer.profile);
API.optionCustomerProfile = ApiRequest.options(baseUrl.customer.profile);
API.putChangePassword = ApiRequest.put(baseUrl.customer.password);

// Address
API.getAddressDestination = ApiRequest.get(baseUrl.address.destination);

// Category
API.getParentCategory = ApiRequest.get(baseUrl.category.parent);

// Brand
API.getBrand = ApiRequest.get(baseUrl.brand.all);

// Product
API.getProduct = ApiRequest.get(baseUrl.product.products);
API.getProductList = ApiRequest.get(baseUrl.product.productList);
API.postProduct = ApiRequest.post(baseUrl.product.productList);
API.getProductDiscussion = ApiRequest.get(baseUrl.product.productDiscussion);
API.postProductDiscussion = ApiRequest.post(baseUrl.product.productDiscussion);
API.getProductPackage = ApiRequest.get(baseUrl.product.productPackage);
API.getProductPromotion = ApiRequest.get(baseUrl.product.promotion);

// Payment
API.getPayment = ApiRequest.get(baseUrl.payment.method);

// Courier
API.getShipment = ApiRequest.get(baseUrl.shipment.courier);
API.postShipment = ApiRequest.post(baseUrl.shipment.courier);

// Banner
API.getBanner = ApiRequest.get(baseUrl.banner.banners);

// Wishlist
API.getWishlist = ApiRequest.get(baseUrl.wishlist.wishlists);
API.headWishlist = ApiRequest.head(baseUrl.wishlist.wishlists);
API.postWishlist = ApiRequest.post(baseUrl.wishlist.wishlists);
API.deleteWishlist = ApiRequest.delete(baseUrl.wishlist.wishlists);

// Tradein
API.getTradeinContent = ApiRequest.get(baseUrl.tradein.tradeinContent);
API.optionTradeinRequest = ApiRequest.options(baseUrl.tradein.tradeinRequest);
API.postTradeinRequest = ApiRequest.post(baseUrl.tradein.tradeinRequest);
API.getTradeinRequest = ApiRequest.get(baseUrl.tradein.tradeinRequest);

// Promotion
API.getVoucher = ApiRequest.get(baseUrl.voucher.vouchers);
API.headVoucher = ApiRequest.head(baseUrl.voucher.vouchers);
API.getVoucherType = ApiRequest.get(baseUrl.voucher.voucherType);
API.getGiftVoucher = ApiRequest.get(baseUrl.voucher.giftVoucher);
API.headGiftVoucher = ApiRequest.head(baseUrl.voucher.giftVoucher);
API.getCoupon = ApiRequest.get(baseUrl.coupon.coupons);
API.headCoupon = ApiRequest.head(baseUrl.coupon.coupons);

// Cart
API.getCart = ApiRequest.get(baseUrl.cart.carts);
API.deleteCart = ApiRequest.delete(baseUrl.cart.carts);
API.postCartItem = ApiRequest.post(baseUrl.cart.cartItem);
API.updateCartItem = ApiRequest.patch(baseUrl.cart.cartItem);
API.deleteCartItem = ApiRequest.delete(baseUrl.cart.cartItem);

// Checkout
API.patchCheckout = ApiRequest.patch(baseUrl.checkout.checkouts);
API.postCheckout = ApiRequest.post(baseUrl.checkout.checkouts);
API.postPayment = ApiRequest.post(baseUrl.checkout.payments);
API.getCustomerOrder = ApiRequest.get(baseUrl.checkout.orders);

// Shipping Address
API.getShippingAddress = ApiRequest.get(baseUrl.checkout.shippingAddress);
API.postShippingAddress = ApiRequest.post(baseUrl.checkout.shippingAddress);
API.updateShippingAddress = ApiRequest.patch(baseUrl.checkout.shippingAddress);
API.deleteShippingAddress = ApiRequest.delete(baseUrl.checkout.shippingAddress);

// Announcement
API.getAnnouncement = ApiRequest.get(baseUrl.announcements.announcement);

// Referral Program
API.getReferralProgram = ApiRequest.get(baseUrl.referralPrograms.referralProgram);

// History Order
API.getHistoryOrder = ApiRequest.get(baseUrl.historyOrder.historyOrder);
API.headHistoryOrder = ApiRequest.head(baseUrl.historyOrder.historyOrder);
API.getHistoryOrderItem = ApiRequest.get(baseUrl.historyOrder.historyOrderItem);
API.getTrackingOrder = ApiRequest.get(baseUrl.historyOrder.trackingOrder);
API.optionHistoryOrderItem = ApiRequest.options(baseUrl.historyOrder.historyOrderItem);

// Commission
API.getCommission = ApiRequest.get(baseUrl.commissions.commission);
API.getCommissionHistory = ApiRequest.get(baseUrl.commissions.commissionHistory);
API.postCommissionWithdraw = ApiRequest.post(baseUrl.commissions.commissionWithdraw);

// Review
API.postProductReview = ApiRequest.post(baseUrl.review.review);
API.getProductReview = ApiRequest.get(baseUrl.review.review);

// Short Link
API.postShortLink = ApiRequest.post(baseUrl.shortLink.shortLink);

// Order
API.getOrder = ApiRequest.get(baseUrl.checkout.orders);
API.getOrderComplaint = ApiRequest.get(baseUrl.order.complaint);
API.optionOrderComplaint = ApiRequest.options(baseUrl.order.complaint);
API.getOrderCancellation = ApiRequest.get(baseUrl.order.orderCancel);
API.postOrderComplaint = ApiRequest.post(baseUrl.order.complaint);
API.postOrderCancel = ApiRequest.post(baseUrl.order.orderCancel);
API.headOrderCancellation = ApiRequest.head(baseUrl.order.orderCancel);
API.optionOrderCancellation = ApiRequest.options(baseUrl.order.orderCancel);

// Help
API.getHelpCategory = ApiRequest.get(baseUrl.help.category);
API.getHelpContent = ApiRequest.get(baseUrl.help.content);

export {API, apiInstance};