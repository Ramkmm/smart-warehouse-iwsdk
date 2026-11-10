import { createComponent, Types } from '@iwsdk/core';

export const RobotTask = createComponent('RobotTask', {
  taskId: {
    type: Types.String,
    default: 'PICK-001',
  },
  targetSku: {
    type: Types.String,
    default: 'WH-BOX-001',
  },
  targetRack: {
    type: Types.String,
    default: 'RACK-A',
  },
  targetShelf: {
    type: Types.String,
    default: 'LEVEL-1',
  },
  taskStatus: {
    type: Types.String,
    default: 'PENDING',
  },
});