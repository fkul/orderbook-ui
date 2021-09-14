export type SubscribeMessage = {
  event: string;
  feed: string;
  product_ids?: string[];
  api_key?: string;
  original_challenge?: string;
  signed_challenge?: string;
};
