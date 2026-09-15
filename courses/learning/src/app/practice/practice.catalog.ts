import { PracticeDay, PracticeTask } from './task.model';
import { quoteCardSignalsReview } from './day-01/d1-quote-card-signals/review';
import { QuoteCardSignalsDemoHost } from './demo-hosts/quote-card-signals-demo-host';
import { quoteVersionBridgeReview } from './day-01/d1-quote-card-version-bridge/review';
import { QuoteVersionBridgeExercise } from './day-01/d1-quote-card-version-bridge/solution';
import { tradeBoundaryReview } from './day-01/d1-trade-boundary/review';
import { runTradeBoundaryDemo } from './day-01/d1-trade-boundary/solution';
import { twoSumReview } from './day-01/d1-two-sum/review';
import { runTwoSumDemo } from './day-01/d1-two-sum/solution';
import { validParenthesesReview } from './day-01/d1-valid-parentheses/review';
import { runValidParenthesesDemo } from './day-01/d1-valid-parentheses/solution';
import { algorithmPairReview } from './day-02/d2-algorithm-pair/review';
import { runAlgorithmPairDemo } from './day-02/d2-algorithm-pair/solution';
import { debugRoundReview } from './day-02/d2-debug-round/review';
import { runDebugRoundDemo } from './day-02/d2-debug-round/solution';
import { lazyRoutingStatesReview } from './day-02/d2-lazy-routing-states/review';
import { LazyFeatureStarter } from './day-02/d2-lazy-routing-states/solution';
import { orderTicketReview } from './day-02/d2-order-ticket/review';
import { OrderTicketDemoHost } from './demo-hosts/order-ticket-demo-host';
import { testSuiteReview } from './day-02/d2-test-suite/review';
import { angularRecallReview } from './day-03/d3-angular-recall/review';
import { correctionRoundReview } from './day-03/d3-correction-round/review';
import { runCorrectionDemo } from './day-03/d3-correction-round/solution';
import { timedPatternsReview } from './day-03/d3-timed-patterns/review';
import { runTimedPatternsDemo } from './day-03/d3-timed-patterns/solution';
import { typeScriptQualityReview } from './day-03/d3-typescript-quality/review';
import { runTypeScriptQualityDemo } from './day-03/d3-typescript-quality/solution';
import { gapRepairsReview } from './day-04/d4-gap-repairs/review';
import { runGapRepairDemo } from './day-04/d4-gap-repairs/solution';
import { mockLiveCodingReview } from './day-04/d4-mock-live-coding/review';
import { MockLiveCodingExercise } from './day-04/d4-mock-live-coding/solution';

const ROOT = 'src/app/practice';

export const PRACTICE_DAYS: readonly PracticeDay[] = [
  {
    day: 1,
    title: 'Restore implementation fluency',
    focus: 'Runtime validation, component API recall, and traced map or stack solutions.',
    tasks: [
      {
        id: 'd1-trade-boundary',
        day: 1,
        title: 'Validate, model, exhaust',
        kind: 'typescript',
        duration: '60 minutes',
        prompt:
          'Rewrite describeTrade so external data stays unknown until validated into a discriminated union.',
        requirements: [
          'Use no any and no unchecked assertion.',
          'Validate every variant-specific field at runtime.',
          'Handle malformed data with a useful result.',
          'Use an exhaustive switch for trusted trades.',
        ],
        files: [`${ROOT}/day-01/d1-trade-boundary/solution.ts`],
        reviewFile: `${ROOT}/day-01/d1-trade-boundary/review.ts`,
        review: tradeBoundaryReview,
        runDemo: runTradeBoundaryDemo,
      },
      {
        id: 'd1-quote-card-signals',
        day: 1,
        title: 'Build a current QuoteCard',
        kind: 'angular',
        duration: '35 minutes',
        prompt:
          'Build a standalone QuoteCard with a required typed quote, computed spread, and typed selected output.',
        requirements: [
          'Import every Angular API exactly.',
          'Use input.required, output, and computed.',
          'Render symbol, bid, ask, and spread.',
          'Emit the current symbol from a user event.',
        ],
        files: [`${ROOT}/day-01/d1-quote-card-signals/solution.ts`],
        reviewFile: `${ROOT}/day-01/d1-quote-card-signals/review.ts`,
        review: quoteCardSignalsReview,
        demoComponent: QuoteCardSignalsDemoHost,
      },
      {
        id: 'd1-two-sum',
        day: 1,
        title: 'Repair Two Sum',
        kind: 'algorithm',
        duration: '60 minutes',
        prompt:
          'State the invariant, implement expected O(n) lookup, and trace duplicate and zero cases before running.',
        requirements: [
          'Return two distinct indices.',
          'Handle duplicates, zero, and negative values.',
          'State O(n) time and O(n) space.',
          'Record every prediction that differs from execution.',
        ],
        files: [
          `${ROOT}/day-01/d1-two-sum/solution.ts`,
          `${ROOT}/day-01/d1-two-sum/notes.md`,
        ],
        reviewFile: `${ROOT}/day-01/d1-two-sum/review.ts`,
        review: twoSumReview,
        runDemo: runTwoSumDemo,
      },
      {
        id: 'd1-quote-card-version-bridge',
        day: 1,
        title: 'Bridge Angular 16 and current APIs',
        kind: 'angular',
        duration: '45 minutes',
        prompt:
          'In the listed file, rebuild the quote card twice and add a parent host that binds each input and output: once with Angular 16 decorators and once with current signal APIs.',
        requirements: [
          'Both versions must expose equivalent behavior.',
          'Derive spread instead of storing duplicate state.',
          'Include a parent input and output binding example.',
          'Explain which APIs are compile-time and runtime constructs.',
        ],
        files: [`${ROOT}/day-01/d1-quote-card-version-bridge/solution.ts`],
        reviewFile: `${ROOT}/day-01/d1-quote-card-version-bridge/review.ts`,
        review: quoteVersionBridgeReview,
        demoComponent: QuoteVersionBridgeExercise,
      },
      {
        id: 'd1-valid-parentheses',
        day: 1,
        title: 'Valid Parentheses',
        kind: 'algorithm',
        duration: '30 minutes',
        prompt: 'Solve Valid Parentheses with a stack after stating its invariant and edge cases.',
        requirements: [
          'Reject wrong closing order.',
          'Reject unfinished opening groups.',
          'Handle an empty string.',
          'State O(n) time and O(n) worst-case space.',
        ],
        files: [
          `${ROOT}/day-01/d1-valid-parentheses/solution.ts`,
          `${ROOT}/day-01/d1-valid-parentheses/notes.md`,
        ],
        reviewFile: `${ROOT}/day-01/d1-valid-parentheses/review.ts`,
        review: validParenthesesReview,
        runDemo: runValidParenthesesDemo,
        isOptional: true,
      },
    ],
  },
  {
    day: 2,
    title: 'Angular implementation and design',
    focus: 'Typed forms, service boundaries, tests, debugging, and route composition.',
    tasks: [
      {
        id: 'd2-order-ticket',
        day: 2,
        title: 'Build an order ticket',
        kind: 'angular',
        duration: '120 minutes',
        prompt:
          'Complete the order ticket at /practice/order-ticket/:accountId with a strictly typed form, validation, route parameter, and service boundary.',
        requirements: [
          'Use non-nullable typed controls.',
          'Keep server data unknown until validated.',
          'Model valid submission and failed service states.',
          'Read the account ID from route context and keep API work behind the service boundary.',
          'Complete the focused tests for valid, invalid, and failed submissions.',
          'Replace every todo test; skipped tests do not count as completion.',
        ],
        files: [
          `${ROOT}/day-02/d2-order-ticket/solution.ts`,
          `${ROOT}/day-02/d2-order-ticket/order.service.ts`,
          `${ROOT}/day-02/d2-order-ticket/order-ticket.routes.ts`,
          `${ROOT}/day-02/d2-order-ticket/solution.spec.ts`,
        ],
        reviewFile: `${ROOT}/day-02/d2-order-ticket/review.ts`,
        review: orderTicketReview,
        demoComponent: OrderTicketDemoHost,
        testCommand:
          'npm test -- --include src/app/practice/day-02/d2-order-ticket/solution.spec.ts',
      },
      {
        id: 'd2-test-suite',
        day: 2,
        title: 'Test the order ticket',
        kind: 'testing',
        duration: '45 minutes',
        prompt: 'Add one service test and two component tests around the order-ticket behavior.',
        requirements: [
          'Cover valid submission.',
          'Cover invalid input.',
          'Cover a failed service call.',
          'Assert visible behavior or emitted intent.',
          'Replace every todo test; skipped tests do not count as completion.',
        ],
        files: [
          `${ROOT}/day-02/d2-test-suite/order-validator.ts`,
          `${ROOT}/day-02/d2-test-suite/solution.spec.ts`,
        ],
        reviewFile: `${ROOT}/day-02/d2-test-suite/review.ts`,
        review: testSuiteReview,
        testCommand: 'npm test -- --include src/app/practice/day-02/d2-test-suite/solution.spec.ts',
      },
      {
        id: 'd2-debug-round',
        day: 2,
        title: 'Fix three Angular bugs',
        kind: 'typescript',
        duration: '30 minutes',
        prompt:
          'Fix the stale derived value, leaking subscription, and unsafe external HTML binding in the starter.',
        requirements: [
          'Use computed state for the spread.',
          'Give imperative streams destruction-aware cleanup.',
          'Render external text without trusting HTML.',
          'Explain why each original line was risky.',
        ],
        files: [`${ROOT}/day-02/d2-debug-round/solution.ts`],
        reviewFile: `${ROOT}/day-02/d2-debug-round/review.ts`,
        review: debugRoundReview,
        runDemo: runDebugRoundDemo,
      },
      {
        id: 'd2-algorithm-pair',
        day: 2,
        title: 'Hash map and two pointers',
        kind: 'algorithm',
        duration: '60 minutes',
        prompt:
          'Solve one membership problem with a hash map and one sorted-pair problem with two pointers.',
        requirements: [
          'Predict demo output before execution.',
          'State one invariant for each solution.',
          'Keep hash-map work at expected O(n).',
          'Keep two-pointer extra space at O(1).',
        ],
        files: [`${ROOT}/day-02/d2-algorithm-pair/solution.ts`],
        reviewFile: `${ROOT}/day-02/d2-algorithm-pair/review.ts`,
        review: algorithmPairReview,
        runDemo: runAlgorithmPairDemo,
      },
      {
        id: 'd2-lazy-routing-states',
        day: 2,
        title: 'Build lazy routing and view states',
        kind: 'angular',
        duration: '30 minutes',
        prompt:
          'Complete the feature at /practice/lazy-states and verify loading, error, empty, and ready states without polishing CSS.',
        requirements: [
          'Use loadComponent at a feature boundary.',
          'Represent view states as a discriminated union.',
          'Render every state explicitly.',
          'Do not treat a route guard as server authorization.',
          'Keep the focused lazy-route and state tests passing.',
        ],
        files: [
          `${ROOT}/day-02/d2-lazy-routing-states/solution.ts`,
          `${ROOT}/day-02/d2-lazy-routing-states/lazy-feature.routes.ts`,
          `${ROOT}/day-02/d2-lazy-routing-states/solution.spec.ts`,
        ],
        reviewFile: `${ROOT}/day-02/d2-lazy-routing-states/review.ts`,
        review: lazyRoutingStatesReview,
        demoComponent: LazyFeatureStarter,
        testCommand:
          'npm test -- --include src/app/practice/day-02/d2-lazy-routing-states/solution.spec.ts',
        isOptional: true,
      },
    ],
  },
  {
    day: 3,
    title: 'Algorithms under interview conditions',
    focus: 'Timed pattern recognition, TypeScript quality, and clean-room correction.',
    tasks: [
      {
        id: 'd3-timed-patterns',
        day: 3,
        title: 'Three timed pattern problems',
        kind: 'algorithm',
        duration: '105 minutes',
        prompt:
          'Solve Longest Substring, Binary Search, and Maximum Tree Depth in 30 minutes each. Use five minutes after each to record the missed clue.',
        requirements: [
          'State signal, invariant, and target complexity first.',
          'Trace a boundary case before running.',
          'Use sliding window, binary search, and DFS or BFS.',
          'Record the missed clue after each timer.',
        ],
        files: [`${ROOT}/day-03/d3-timed-patterns/solution.ts`],
        reviewFile: `${ROOT}/day-03/d3-timed-patterns/review.ts`,
        review: timedPatternsReview,
        runDemo: runTimedPatternsDemo,
      },
      {
        id: 'd3-typescript-quality',
        day: 3,
        title: 'Run a TypeScript quality pass',
        kind: 'typescript',
        duration: '35 minutes',
        prompt:
          'Refine the position summarizer with clear interfaces, empty-input behavior, and explicit mutation choices.',
        requirements: [
          'Keep inputs readonly unless mutation is required.',
          'Return a precise object shape.',
          'Handle empty lots and empty positions.',
          'Explain every allocation and mutation choice.',
        ],
        files: [`${ROOT}/day-03/d3-typescript-quality/solution.ts`],
        reviewFile: `${ROOT}/day-03/d3-typescript-quality/review.ts`,
        review: typeScriptQualityReview,
        runDemo: runTypeScriptQualityDemo,
      },
      {
        id: 'd3-angular-recall',
        day: 3,
        title: 'Rebuild an Angular API and test',
        kind: 'angular',
        duration: '40 minutes',
        prompt: "From a blank file, rebuild yesterday's component state API and one behavior test.",
        requirements: [
          'Use writable and computed signals correctly.',
          'Keep change detection OnPush.',
          'Test through rendered behavior.',
          'Explain why the test needs Angular TestBed.',
          'Replace every todo test; skipped tests do not count as completion.',
        ],
        files: [
          `${ROOT}/day-03/d3-angular-recall/solution.ts`,
          `${ROOT}/day-03/d3-angular-recall/solution.spec.ts`,
        ],
        reviewFile: `${ROOT}/day-03/d3-angular-recall/review.ts`,
        review: angularRecallReview,
        testCommand:
          'npm test -- --include src/app/practice/day-03/d3-angular-recall/solution.spec.ts',
      },
      {
        id: 'd3-correction-round',
        day: 3,
        title: 'Re-solve the hardest failure',
        kind: 'algorithm',
        duration: '40 minutes',
        prompt:
          'Choose the hardest failed problem, record its missed clue, then solve it again without prior code.',
        requirements: [
          'Name the failed task ID.',
          'Write the corrected invariant before code.',
          'Add at least two edge cases.',
          'Compare the new result with the first attempt.',
        ],
        files: [`${ROOT}/day-03/d3-correction-round/solution.ts`],
        reviewFile: `${ROOT}/day-03/d3-correction-round/review.ts`,
        review: correctionRoundReview,
        runDemo: runCorrectionDemo,
      },
    ],
  },
  {
    day: 4,
    title: 'Simulation, correction, stop',
    focus: 'One realistic mock, evidence-based repairs, and no late cramming.',
    tasks: [
      {
        id: 'd4-mock-live-coding',
        day: 4,
        title: 'Run the live-coding mock',
        kind: 'angular',
        duration: '60 minutes',
        prompt:
          'Build the order-blotter starter while narrating inputs, state, validation, tests, and tradeoffs.',
        requirements: [
          'Time-box coding to one hour.',
          'Use immutable updates and derived totals.',
          'Handle empty and invalid orders.',
          'Add focused tests and state complexity.',
          'Replace every todo test; skipped tests do not count as completion.',
        ],
        files: [
          `${ROOT}/day-04/d4-mock-live-coding/solution.ts`,
          `${ROOT}/day-04/d4-mock-live-coding/solution.spec.ts`,
        ],
        reviewFile: `${ROOT}/day-04/d4-mock-live-coding/review.ts`,
        review: mockLiveCodingReview,
        demoComponent: MockLiveCodingExercise,
        testCommand:
          'npm test -- --include src/app/practice/day-04/d4-mock-live-coding/solution.spec.ts',
      },
      {
        id: 'd4-gap-repairs',
        day: 4,
        title: 'Repair the top two gaps',
        kind: 'typescript',
        duration: '45 minutes',
        prompt:
          'Use mock evidence to choose two gaps. Implement the smallest exercise that proves each correction.',
        requirements: [
          'Quote concrete evidence from the mock.',
          'Keep each repair narrow.',
          'Name how each repair was verified.',
          'Stop after the top two gaps.',
        ],
        files: [`${ROOT}/day-04/d4-gap-repairs/solution.ts`],
        reviewFile: `${ROOT}/day-04/d4-gap-repairs/review.ts`,
        review: gapRepairsReview,
        runDemo: runGapRepairDemo,
      },
    ],
  },
];

export function getPracticeDay(day: number): PracticeDay | undefined {
  return PRACTICE_DAYS.find((practiceDay) => practiceDay.day === day);
}

export function getPracticeTask(day: number, taskId: string): PracticeTask | undefined {
  return getPracticeDay(day)?.tasks.find((task) => task.id === taskId);
}
