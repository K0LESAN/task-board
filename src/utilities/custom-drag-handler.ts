import { checkTag } from './check-tag';

export function customDragHandler(element: EventTarget | null): boolean {
  let target: HTMLElement | null = element as HTMLElement | null;

  while (target) {
    if (checkTag(target.tagName) || target.dataset.noDnd === 'true') {
      return false;
    }

    target = target.parentElement;
  }

  return true;
}
