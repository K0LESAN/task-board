export function getFormattedDate(milliseconds: number): string {
  return new Date(milliseconds).toLocaleDateString('ru');
}
