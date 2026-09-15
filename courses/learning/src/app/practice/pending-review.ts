import { PendingTaskReview } from './task.model';

export function createPendingReview(): PendingTaskReview {
  return {
    status: 'pending',
    score: null,
    criticism: 'No review yet. Ask the agent to review this day after editing the listed files.',
    improvements: [],
  };
}
