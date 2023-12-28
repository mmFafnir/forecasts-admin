export const statusMatchRender = (value: number): string => {
  if (value == 0) return "не начался";
  if (value == 1) return "в игре(live)";
  if (value == 3) return "Завершен";
  return "null";
};
