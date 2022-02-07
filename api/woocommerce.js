import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const WooCommerceApi = new WooCommerceRestApi({
  url: process.env.baseUrl,
  consumerKey: process.env.woocommerce.key,
  consumerSecret: process.env.woocommerce.secret,
  version: "wc/v3",
  queryStringAuth: true
});
