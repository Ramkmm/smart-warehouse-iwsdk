
import { createSystem, Pressed } from '@iwsdk/core';
import { Supervisor } from './supervisor-component.js';
import { InventoryItem } from './inventory-component.js';
import { Robot } from './robot-component.js';
import { RobotTask } from './robot-task-component.js';
import { LogisticsTask } from './logistics-task-component.js';

export class SupervisorAgentSystem extends createSystem({
  supervisorClicked: {
    required: [Supervisor, Pressed],
  },
  inventory: {
    required: [InventoryItem],
  },
  robotTasks: {
    required: [Robot, RobotTask],
  },
  shipments: {
    required: [LogisticsTask],
  },
}) {
  init(): void {
    this.queries.supervisorClicked.subscribe('qualify', () => {
      const inventory = Array.from(this.queries.inventory.entities);
      const robotTasks = Array.from(this.queries.robotTasks.entities);
      const shipments = Array.from(this.queries.shipments.entities);

      console.log('===== AI WAREHOUSE SUPERVISOR =====');

      console.log('Inventory entities:', inventory.length);
      console.log('Robot task entities:', robotTasks.length);
      console.log('Shipment entities:', shipments.length);

      const pendingRobots = robotTasks.filter(
        (entity) =>
          entity.getValue(RobotTask, 'taskStatus') === 'PENDING',
      );

      const highPriorityShipments = shipments.filter(
        (entity) =>
          entity.getValue(LogisticsTask, 'priority') === 'HIGH',
      );

      const lowStockItems = inventory.filter((entity) => {
         const quantity = entity.getValue(InventoryItem, 'quantity');
         return quantity !== null && quantity <= 5;
      });

      let recommendation = 'Continue normal warehouse operations';
      let priority = 'NORMAL';

      if (highPriorityShipments.length > 0 && pendingRobots.length > 0) {
        recommendation =
          'Prioritize pending robot picking tasks for high-priority shipments';
        priority = 'HIGH';
      } else if (lowStockItems.length > 0) {
        recommendation = 'Review low-stock inventory items';
        priority = 'MEDIUM';
      }

      console.log('Pending robot tasks:', pendingRobots.length);
      console.log('High priority shipments:', highPriorityShipments.length);
      console.log('Low stock items:', lowStockItems.length);
      console.log('Supervisor recommendation:', recommendation);
      console.log('Decision priority:', priority);
      console.log('AI Supervisor: Decision generated');
      console.log('===================================');
    });
  }
}
