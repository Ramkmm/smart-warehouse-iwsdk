
import { createSystem, Pressed } from '@iwsdk/core';
import { InventoryItem } from './inventory-component.js';

export class InventorySystem extends createSystem({
  inventoryClicked: {
    required: [InventoryItem, Pressed],
  },
}) {
  init(): void {
    this.queries.inventoryClicked.subscribe('qualify', (entity) => {
      const sku = entity.getValue(InventoryItem, 'sku');
      const productName = entity.getValue(InventoryItem, 'productName');
      const rack = entity.getValue(InventoryItem, 'rack');
      const shelf = entity.getValue(InventoryItem, 'shelf');
      const quantity = entity.getValue(InventoryItem, 'quantity');

      console.log('===== WAREHOUSE INVENTORY =====');
      console.log('SKU:', sku);
      console.log('Product:', productName);
      console.log('Rack:', rack);
      console.log('Shelf:', shelf);
      console.log('Quantity:', quantity);
      console.log('===============================');
    });
  }
}
