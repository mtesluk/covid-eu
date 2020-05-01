import { RangeConfig } from './interfaces';

export const manageColors = (amount: number, colors: RangeConfig | string) => {
  if (!(colors instanceof Object)) {
    return colors;
  }
  for(var range of colors.ranges) {
    if (amount > range.min && amount < range.max) return range.color;
  }
  return colors.default;
};
