import {FusionSDK} from "@1inch/fusion-sdk";
import {ActiveOrdersResponse, OrdersByMakerResponse} from "@1inch/fusion-sdk/api/orders";

export async function orders(sdk: FusionSDK): Promise<ActiveOrdersResponse> {
    return await sdk.getActiveOrders({page: 1, limit: 2})
}

export async function ordersByMaker(sdk: FusionSDK, address: string): Promise<OrdersByMakerResponse> {
    return await sdk.getOrdersByMaker({
        page: 1,
        limit: 2,
        address,
    })
}
