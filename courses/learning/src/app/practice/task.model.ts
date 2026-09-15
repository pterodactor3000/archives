import { Type } from '@angular/core';

export type PracticeDayNumber = 1 | 2 | 3 | 4;
export type TaskKind = 'angular' | 'typescript' | 'algorithm' | 'testing';
export type ReviewScore = 0 | 1 | 2 | 3;

interface ReviewNotes {
  readonly criticism: string;
  readonly improvements: readonly string[];
}

export interface PendingTaskReview extends ReviewNotes {
  readonly status: 'pending';
  readonly score: null;
  readonly optimalSolution?: never;
}

export interface ReviewedTaskReview extends ReviewNotes {
  readonly status: 'reviewed';
  readonly score: ReviewScore;
  readonly optimalSolution?: string;
}

export type TaskReview = PendingTaskReview | ReviewedTaskReview;

interface PracticeTaskDetails {
  readonly id: string;
  readonly day: PracticeDayNumber;
  readonly title: string;
  readonly kind: TaskKind;
  readonly duration: string;
  readonly prompt: string;
  readonly requirements: readonly string[];
  readonly files: readonly string[];
  readonly reviewFile: string;
  readonly review: TaskReview;
  readonly isOptional?: boolean;
  readonly testCommand?: string;
}

interface ComponentDemo {
  readonly demoComponent: Type<unknown>;
  readonly demoInputs?: Readonly<Record<string, unknown>>;
  readonly runDemo?: never;
}

interface HarnessDemo {
  readonly demoComponent?: never;
  readonly demoInputs?: never;
  readonly runDemo: () => readonly string[];
}

interface NoDemo {
  readonly demoComponent?: never;
  readonly demoInputs?: never;
  readonly runDemo?: never;
}

export type PracticeTask = PracticeTaskDetails & (ComponentDemo | HarnessDemo | NoDemo);

export interface PracticeDay {
  readonly day: PracticeDayNumber;
  readonly title: string;
  readonly focus: string;
  readonly tasks: readonly PracticeTask[];
}
