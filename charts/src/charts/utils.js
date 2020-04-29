export const manageColors = (amount, ranges) => {
  if (!amount) return '#ff0909';

  for(var range of ranges) {
    if (amount > range.min && amount < range.max) return range.color;
  }
  return '#000';
};
