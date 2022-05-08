// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { HTTPClientFactory, GroupedProduct } from '@woocommerce/api';

export const WooCommerceApi = HTTPClientFactory
  .build(process.env.baseUrl)
  .withOAuth(process.env.woocommerce.key, process.env.woocommerce.secret)
  .withIndexPermalinks()
  .create();


export const products = GroupedProduct.restRepository(WooCommerceApi);
