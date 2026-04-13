const { findDuplicates, buildReport, getUserPermissions, deepMergeConfigs } = require('../src/utils/helpers');

describe('Helper Functions', () => {
  describe('findDuplicates', () => {
    it('should find duplicates in an array', () => {
      const result = findDuplicates([1, 2, 3, 2, 4, 1, 5]);
      expect(result.sort()).toEqual([1, 2]);
    });

    it('should return empty array if no duplicates', () => {
      const result = findDuplicates([1, 2, 3]);
      expect(result).toEqual([]);
    });

    it('should handle empty arrays', () => {
      const result = findDuplicates([]);
      expect(result).toEqual([]);
    });
  });

  describe('buildReport', () => {
    it('should build a string report for items', () => {
      const items = [
        { id: 1, name: 'Apple', price: 1.5, stock: 10 },
        { id: 2, name: 'Banana', price: 0.5, stock: 20 }
      ];
      const result = buildReport(items);
      expect(result).toContain('Report:');
      expect(result).toContain('- Item 1: Apple (Price: 1.5, Stock: 10)');
      expect(result).toContain('- Item 2: Banana (Price: 0.5, Stock: 20)');
    });

    it('should handle empty items array', () => {
      const result = buildReport([]);
      expect(result).toBe('Report:\n');
    });
  });

  describe('getUserPermissions', () => {
    const mockUsers = [
      { id: 1, role: 'admin' },
      { id: 2, role: 'user' },
      { id: 3, role: 'user' }
    ];

    it('should return empty array if user not found', () => {
      expect(getUserPermissions(99, mockUsers)).toEqual([]);
    });

    it('should return admin permissions', () => {
      const result = getUserPermissions(1, mockUsers);
      expect(result).toEqual(['can_manage_2', 'can_manage_3']);
    });

    it('should return standard user permissions', () => {
      const result = getUserPermissions(2, mockUsers);
      expect(result).toEqual(['can_read']);
    });
  });

  describe('deepMergeConfigs', () => {
    it('should merge objects deeply', () => {
      const base = { a: 1, b: { c: 2 } };
      const override = { b: { d: 3 }, e: 4 };
      const result = deepMergeConfigs(base, override);
      expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });
  });
});
