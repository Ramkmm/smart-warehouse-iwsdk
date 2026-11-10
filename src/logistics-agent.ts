
import { createSystem, Pressed } from '@iwsdk/core';
import { LogisticsTask } from './logistics-task-component.js';

export class LogisticsAgentSystem extends createSystem({
  shipmentClicked: {
    required: [LogisticsTask, Pressed],
  },
}) {
  init(): void {
    this.queries.shipmentClicked.subscribe('qualify', (entity) => {
      const shipmentId = entity.getValue(LogisticsTask, 'shipmentId');
      const orderId = entity.getValue(LogisticsTask, 'orderId');
      const productSku = entity.getValue(LogisticsTask, 'productSku');
      const destination = entity.getValue(LogisticsTask, 'destination');
      const priority = entity.getValue(LogisticsTask, 'priority');
      const shipmentStatus = entity.getValue(LogisticsTask, 'shipmentStatus');
      const estimatedDeliveryDays = entity.getValue(
        LogisticsTask,
        'estimatedDeliveryDays',
      );

      console.log('===== LOGISTICS AGENT =====');
      console.log('Shipment ID:', shipmentId);
      console.log('Order ID:', orderId);
      console.log('Product SKU:', productSku);
      console.log('Destination:', destination);
      console.log('Priority:', priority);
      console.log('Shipment Status:', shipmentStatus);
      console.log('Estimated Delivery Days:', estimatedDeliveryDays);
      console.log('Logistics Agent: Shipment task received');
      console.log('===========================');
    });
  }
}
