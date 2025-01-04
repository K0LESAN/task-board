import type { TagName } from '@/types';
import { ignoreTags } from '@/constants';

export function checkTag(tagName: string): boolean {
  const lowerTagName: string = tagName.toLowerCase();

  return ignoreTags.some((tag: TagName): boolean => tag === lowerTagName);
}
