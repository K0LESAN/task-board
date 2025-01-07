import type { TagName } from '@/shared/types';
import { ignoreTags } from '@/shared/constants';
import { checkTag } from '.';

describe('checkTag utils', () => {
  it('truthy values', () => {
    const testCases: string[] = [...ignoreTags];

    testCases.forEach((testCase: string): void => {
      expect(checkTag(testCase)).toBeTruthy();
    });
  });

  it('falsy values', () => {
    const testCases: string[] = ignoreTags.map(
      (ignoreTag: TagName): string => ignoreTag + '_'
    );

    testCases.forEach((testCase: string): void => {
      expect(checkTag(testCase)).toBeFalsy();
    });
  });
});
