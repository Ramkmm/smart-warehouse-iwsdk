import { createComponent, Types } from '@iwsdk/core';

export const InventoryItem = createComponent('InventoryItem', {
  sku: {
    type: Types.String,
    default: 'WH-BOX-001',
  },
  productName: {
    type: Types.String,
    default: 'Sample Warehouse Carton',
  },
  rack: {
    type: Types.String,
    default: 'RACK-A',
  },
  shelf: {
    type: Types.String,
    default: 'LEVEL-1',
  },
  quantity: {
    type: Types.Int32,
    default: 10,
  },
});