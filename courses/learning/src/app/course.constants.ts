import { PracticeDayNumber } from './practice/task.model';

export interface CourseLink {
  readonly href: string;
  readonly label: string;
}

export const PRACTICE_DAY_NUMBERS: readonly PracticeDayNumber[] = [1, 2, 3, 4];
export const FIRST_PRACTICE_DAY: PracticeDayNumber = 1;
export const LAST_PRACTICE_DAY: PracticeDayNumber = 4;

export const LESSON_LINKS: readonly CourseLink[] = [
  {
    href: '/lessons/0001-adaptive-interview-diagnostic.html',
    label: 'Adaptive interview diagnostic',
  },
  {
    href: '/lessons/0002-angular-typescript-principles.html',
    label: 'Angular and TypeScript principles',
  },
  {
    href: '/lessons/0003-rebuild-quote-card.html',
    label: 'Rebuild the quote card',
  },
];

export const REFERENCE_LINKS: readonly CourseLink[] = [
  {
    href: '/reference/0001-four-day-interview-roadmap.html',
    label: 'Four-day interview roadmap',
  },
  {
    href: '/reference/0002-diagnostic-solution-key.html',
    label: 'Diagnostic solution key',
  },
  {
    href: '/reference/angular-typescript-principles.html',
    label: 'Angular and TypeScript principles',
  },
];

export const WORKSPACE_LINKS: readonly CourseLink[] = [
  { href: '/COURSE.md', label: 'Full course markdown' },
  { href: '/MISSION.md', label: 'Mission' },
  { href: '/NOTES.md', label: 'Teaching notes' },
  { href: '/RESOURCES.md', label: 'Primary resources' },
];
