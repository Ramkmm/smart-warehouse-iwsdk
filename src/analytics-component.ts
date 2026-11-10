
import { createComponent, Types } from '@iwsdk/core';

export const WarehouseAnalytics = createComponent(
  'WarehouseAnalytics',
  {
    totalInventory: {
      type: Types.Int32,
      default: 10,
    },
    pendingRobotTasks: {
      type: Types.Int32,
      default: 1,
    },
    createdShipments: {
      type: Types.Int32,
      default: 1,
    },
    highPriorityShipments: {
      type: Types.Int32,
      default: 1,
    },
    warehouseStatus: {
      type: Types.String,
      default: 'OPERATIONAL',
    },
  },
);
