# Security Audit & Performance Optimization Project

## Slow Functions

The following functions in `src/utils/helpers.js` are intentionally slow:
- `findDuplicates`: Uses O(n^2) nested loop.
- `buildReport`: Uses string concatenation in a loop.
- `getUserPermissions`: Uses repeated `.find` and `.filter`.
- `deepMergeConfigs`: Uses lodash _.merge.

## Optimization Hints
- Use `Set` for `findDuplicates` to make it O(n).
- Use `Array.join()` for `buildReport`.
- Cache user lookups in `getUserPermissions`.

## Commands
- `npm start`: Starts the application.
- `npm test`: Runs jest coverage.
- `npm run bench`: Runs the performance benchmark.
- `npm audit`: Runs security audit.
