import type { TagName } from '@/shared/types';
import { ignoreTags } from '@/shared/constants';

export function checkTag(tagName: string): boolean {
  const lowerTagName: string = tagName.toLowerCase();

  return ignoreTags.some((tag: TagName): boolean => tag === lowerTagName);
}
