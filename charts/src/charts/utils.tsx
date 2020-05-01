import { RangeConfig } from "./interfaces";

export const manageColors = (amount: number, rangeConfig: RangeConfig) => {
  for(var range of rangeConfig.ranges) {
    if (amount > range.min && amount < range.max) return range.color;
  }
  return rangeConfig.default;
};
