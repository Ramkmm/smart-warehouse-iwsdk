
import { createComponent, Types } from '@iwsdk/core';

export const Supervisor = createComponent('Supervisor', {
  supervisorStatus: {
    type: Types.String,
    default: 'READY',
  },
  lastDecision: {
    type: Types.String,
    default: 'WAITING_FOR_ANALYSIS',
  },
  recommendedAction: {
    type: Types.String,
    default: 'Review warehouse operations',
  },
  decisionPriority: {
    type: Types.String,
    default: 'NORMAL',
  },
});
