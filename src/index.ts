
import { World } from '@iwsdk/core';
import projectOptions from 'virtual:iwsdk-project';
import { PanelSystem } from './panel.js';
import { RobotSystem } from './robot.js';
import { RobotAgentSystem } from './robot-agent.js';
import { InventorySystem } from './inventory.js';
import { LogisticsAgentSystem } from './logistics-agent.js';
import { AnalyticsAgentSystem } from './analytics-agent.js';
import { SupervisorAgentSystem } from './supervisor-agent.js';

World.create(
  document.getElementById('scene-container') as HTMLDivElement,
  projectOptions,
).then((world) => {
  world.registerSystem(RobotSystem);
  world.registerSystem(PanelSystem);
  world.registerSystem(InventorySystem);
  world.registerSystem(RobotAgentSystem);
  world.registerSystem(LogisticsAgentSystem);
  world.registerSystem(AnalyticsAgentSystem);
  world.registerSystem(SupervisorAgentSystem);
});
