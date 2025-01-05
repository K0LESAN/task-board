import { Todo } from '@/types';

export function hasTextInTodo(target: string) {
  return ({ text }: Todo): boolean => {
    const formattedText: string = text.toLowerCase().trim();
    const formattedTarget: string = target.toLowerCase().trim();

    return formattedText.includes(formattedTarget);
  };
}
