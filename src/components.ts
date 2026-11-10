/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import { defineComponents } from '@iwsdk/core';
import { Robot } from './robot-component.js';
import { RobotTask } from './robot-task-component.js';
import { InventoryItem } from './inventory-component.js';
import { LogisticsTask } from './logistics-task-component.js';
import { WarehouseAnalytics } from './analytics-component.js';
import { Supervisor } from './supervisor-component.js';

export default defineComponents([
  Robot,
  InventoryItem,
  RobotTask,
  LogisticsTask,
  WarehouseAnalytics,
  Supervisor,
]);
