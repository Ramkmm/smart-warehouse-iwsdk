import { createSystem, Pressed } from '@iwsdk/core';
import { Robot } from './robot-component.js';
import { RobotTask } from './robot-task-component.js';

export class RobotAgentSystem extends createSystem({
  robotTask: {
    required: [Robot, RobotTask, Pressed],
  },
}) {
  init(): void {
    this.queries.robotTask.subscribe('qualify', (entity) => {
      const taskId = entity.getValue(RobotTask, 'taskId');
      const targetSku = entity.getValue(RobotTask, 'targetSku');
      const targetRack = entity.getValue(RobotTask, 'targetRack');
      const targetShelf = entity.getValue(RobotTask, 'targetShelf');
      const taskStatus = entity.getValue(RobotTask, 'taskStatus');

      console.log('===== ROBOT AGENT =====');
      console.log('Task ID:', taskId);
      console.log('Target SKU:', targetSku);
      console.log('Target Rack:', targetRack);
      console.log('Target Shelf:', targetShelf);
      console.log('Task Status:', taskStatus);
      console.log('Robot Agent: Picking task received');
      console.log('=======================');
    });
  }
}