
import { createSystem, Pressed } from '@iwsdk/core';
import { WarehouseAnalytics } from './analytics-component.js';

export class AnalyticsAgentSystem extends createSystem({
  analyticsClicked: {
    required: [WarehouseAnalytics, Pressed],
  },
}) {
  init(): void {
    this.queries.analyticsClicked.subscribe('qualify', (entity) => {
      const totalInventory = entity.getValue(
        WarehouseAnalytics,
        'totalInventory',
      );

      const pendingRobotTasks = entity.getValue(
        WarehouseAnalytics,
        'pendingRobotTasks',
      );

      const createdShipments = entity.getValue(
        WarehouseAnalytics,
        'createdShipments',
      );

      const highPriorityShipments = entity.getValue(
        WarehouseAnalytics,
        'highPriorityShipments',
      );

      const warehouseStatus = entity.getValue(
        WarehouseAnalytics,
        'warehouseStatus',
      );

      console.log('===== WAREHOUSE ANALYTICS =====');
      console.log('Total Inventory:', totalInventory);
      console.log('Pending Robot Tasks:', pendingRobotTasks);
      console.log('Created Shipments:', createdShipments);
      console.log('High Priority Shipments:', highPriorityShipments);
      console.log('Warehouse Status:', warehouseStatus);
      console.log('Analytics Agent: Warehouse report generated');
      console.log('================================');
    });
  }
}
