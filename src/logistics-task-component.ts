
import { createComponent, Types } from '@iwsdk/core';

export const LogisticsTask = createComponent('LogisticsTask', {
  shipmentId: {
    type: Types.String,
    default: 'SHIP-001',
  },
  orderId: {
    type: Types.String,
    default: 'ORD-001',
  },
  productSku: {
    type: Types.String,
    default: 'WH-BOX-001',
  },
  destination: {
    type: Types.String,
    default: 'Hyderabad',
  },
  priority: {
    type: Types.String,
    default: 'HIGH',
  },
  shipmentStatus: {
    type: Types.String,
    default: 'CREATED',
  },
  estimatedDeliveryDays: {
    type: Types.Int32,
    default: 2,
  },
});
