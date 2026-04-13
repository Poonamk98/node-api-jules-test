const { findDuplicates, buildReport, getUserPermissions, deepMergeConfigs } = require('../src/utils/helpers');

const RUNS = 10000;

const mockUsers = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `User ${i}`, role: i % 2 === 0 ? 'admin' : 'user' }));
const mockProducts = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Product ${i}`, price: 10.5, stock: 5 }));
const mockArr = Array.from({ length: 500 }, (_, i) => i % 50);

const mockBase = { a: 1, b: { c: 2, d: 3 }, e: [1, 2, 3] };
const mockOverride = { b: { c: 4 }, e: [4, 5] };

async function runBenchmark() {
  const timings = [];

  let start = performance.now();
  for (let i = 0; i < RUNS; i++) {
    findDuplicates(mockArr);
  }
  let end = performance.now();
  timings.push({ name: 'findDuplicates', time: end - start });

  start = performance.now();
  for (let i = 0; i < RUNS; i++) {
    buildReport(mockProducts);
  }
  end = performance.now();
  timings.push({ name: 'buildReport', time: end - start });

  start = performance.now();
  for (let i = 0; i < RUNS; i++) {
    getUserPermissions(0, mockUsers); // User 0 is admin
  }
  end = performance.now();
  timings.push({ name: 'getUserPermissions', time: end - start });

  start = performance.now();
  for (let i = 0; i < RUNS; i++) {
    deepMergeConfigs(mockBase, mockOverride);
  }
  end = performance.now();
  timings.push({ name: 'deepMergeConfigs', time: end - start });

  timings.sort((a, b) => b.time - a.time);

  console.log('--- Benchmark Results ---');
  timings.forEach(t => console.log(`${t.name}: ${t.time.toFixed(2)}ms for ${RUNS} runs`));

  console.log('\nTop 2 Slowest:');
  console.log(`1. ${timings[0].name}`);
  console.log(`2. ${timings[1].name}`);
}

runBenchmark();
