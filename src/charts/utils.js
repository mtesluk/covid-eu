const ranges = [
  {min: 0, max: 1000, color: '#fff1d9'},
  {min: 1001, max: 10000, color: '#fdcd8b'},
  {min: 10001, max: 50000, color: '#b55440'},
  {min: 50001, max: 100000, color: '#b53828'},
  {min: 100001, max: 420001, color: '#500000'},
]

const manageColors = (amount) => {
  if (!amount) return '#ff0909';

  for(var range of ranges) {
    if (amount > range.min && amount < range.max) return range.color;
  }
  return '#000';
}

export default manageColors;