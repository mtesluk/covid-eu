import { RangeConfig } from 'charts';


export const mostCommonColor: string = '#500000';

export const rangesConfigCases: RangeConfig = {
  ranges: [
    {min: 0, max: 10000000, color: '#fff1d9'},
    {min: 1000001, max: 20000000, color: '#fdcd8b'},
    {min: 2000001, max: 30000000, color: '#b55440'},
    {min: 3000001, max: 40000000, color: '#b53828'},
    {min: 4000001, max: 700000000, color: mostCommonColor},
  ],
  default: '#000',
};


export const rangesConfigDeaths: RangeConfig = {
  ranges: [
    {min: 0, max: 10000, color: '#fff1d9'},
    {min: 10001, max: 50000, color: '#fdcd8b'},
    {min: 50001, max: 100000, color: '#b55440'},
    {min: 100001, max: 150000, color: '#b53828'},
    {min: 150001, max: 200000, color: mostCommonColor},
  ],
  default: '#000',
};


export const rangesConfigTests: RangeConfig = {
  ranges: [
    {min: 0, max: 7000, color: '#fff1d9'},
    {min: 7001, max: 50000, color: '#fdcd8b'},
    {min: 50001, max: 100000, color: '#b55440'},
    {min: 100001, max: 200000, color: '#b53828'},
    {min: 200001, max: 300000, color: mostCommonColor},
  ],
  default: '#000',
};
