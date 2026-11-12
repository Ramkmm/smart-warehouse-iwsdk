/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  createSystem,
  UIKitMLAsset,
  UIKitDocument,
  PanelDocument,
  VisibilityState,
} from '@iwsdk/core';

import { InventoryItem } from './inventory-component.js';
import { Robot } from './robot-component.js';
import { RobotTask } from './robot-task-component.js';
import { LogisticsTask } from './logistics-task-component.js';

export class PanelSystem extends createSystem({
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
  private lastDashboardSnapshot = '';

  init(): void {
    // Preserve the existing XR welcome panel functionality.
    const panel = this.world.getSceneObject<UIKitMLAsset>('welcome-panel');
    const xrButton = panel?.getElementById('xr-button');
    const exitButton = panel?.getElementById('exit-button');

    if (xrButton != null && exitButton != null) {
      if (!this.world.xrEnabled) {
        xrButton.setProperties({ display: 'none' });
        exitButton.setProperties({ display: 'none' });
      } else {
        const launchXR = () => this.world.launchXR();
        const exitXR = () => this.world.exitXR();

        xrButton.addEventListener('click', launchXR);
        exitButton.addEventListener('click', exitXR);

        this.cleanupFuncs.push(
          () => xrButton.removeEventListener('click', launchXR),
          () => exitButton.removeEventListener('click', exitXR),
          this.world.visibilityState.subscribe((visibilityState) => {
            const is2D =
              visibilityState === VisibilityState.NonImmersive;

            xrButton.setProperties({
              display: is2D ? 'flex' : 'none',
            });

            exitButton.setProperties({
              display: is2D ? 'none' : 'flex',
            });
          }),
        );
      }
    }
  }

  update(_delta: number): void {
    // Find the dashboard entity and wait until its UIKit document is loaded.
    const dashboardEntity = this.world.getSceneEntity(
      'warehouse-ai-dashboard',
    );

    if (dashboardEntity == null) return;

    const document = dashboardEntity.getValue(
      PanelDocument,
      'document',
    ) as UIKitDocument | undefined;

    if (document == null || document.disposed) return;

    // Read current inventory.
    const inventory = Array.from(this.queries.inventory.entities);

    const totalInventory = inventory.reduce((total, entity) => {
      const quantity = entity.getValue(InventoryItem, 'quantity');
      return total + (quantity ?? 0);
    }, 0);

    // Read pending robot tasks.
    const robotTasks = Array.from(this.queries.robotTasks.entities);

    const pendingRobots = robotTasks.filter(
      (entity) =>
        entity.getValue(RobotTask, 'taskStatus') === 'PENDING',
    );

    // Read shipment information.
    const shipments = Array.from(this.queries.shipments.entities);

    const highPriorityShipments = shipments.filter(
      (entity) =>
        entity.getValue(LogisticsTask, 'priority') === 'HIGH',
    );

    // Calculate the supervisor recommendation using existing rules.
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

    // Use the first shipment for the logistics summary.
    const firstShipment = shipments[0];

    const shipmentId = firstShipment
      ? firstShipment.getValue(LogisticsTask, 'shipmentId')
      : 'No shipments';

    const destination = firstShipment
      ? firstShipment.getValue(LogisticsTask, 'destination')
      : 'No destination';

    const shipmentPriority = firstShipment
      ? firstShipment.getValue(LogisticsTask, 'priority')
      : 'NONE';

    const estimatedDays = firstShipment
      ? firstShipment.getValue(LogisticsTask, 'estimatedDeliveryDays')
      : 0;

    const snapshot = JSON.stringify({
      totalInventory,
      pendingRobots: pendingRobots.length,
      shipments: shipments.length,
      highPriority: highPriorityShipments.length,
      shipmentId,
      destination,
      shipmentPriority,
      estimatedDays,
      recommendation,
      priority,
    });

    // Avoid unnecessary UI updates when the data has not changed.
    if (snapshot === this.lastDashboardSnapshot) return;

    this.lastDashboardSnapshot = snapshot;

    
    // Update dashboard text elements.
    const updateText = (id: string, value: string | number): void => {
      document.getElementById(id)?.setProperties({
        text: String(value),
      });
    };

    updateText('inventory-value', totalInventory);
    updateText('robot-tasks-value', pendingRobots.length);
    updateText('shipments-value', shipments.length);
    updateText('priority-value', highPriorityShipments.length);

    updateText('shipment-id', `Shipment: ${shipmentId}`);
    updateText('shipment-destination', `Destination: ${destination}`);

    updateText(
      'shipment-priority',
      `Priority: ${shipmentPriority} | ETA: ${estimatedDays} days`,
    );

    updateText('recommendation', recommendation);
    updateText('decision-priority', `DECISION PRIORITY: ${priority}`);

    console.log('===== WAREHOUSE DASHBOARD UPDATED =====');
    console.log('Total inventory:', totalInventory);
    console.log('Pending robot tasks:', pendingRobots.length);
    console.log('Total shipments:', shipments.length);
    console.log('High priority shipments:', highPriorityShipments.length);
    console.log('Supervisor recommendation:', recommendation);
    console.log('Decision priority:', priority);
    console.log('=======================================');

  }
}
