import { RangeConfig } from 'charts';


export const mostCommonColor: string = '#500000';

export const rangesConfigCases: RangeConfig = {
  ranges: [
    {min: 0, max: 1000000, color: '#fff1d9'},
    {min: 1000001, max: 2000000, color: '#fdcd8b'},
    {min: 2000001, max: 3000000, color: '#b55440'},
    {min: 3000001, max: 4000000, color: '#b53828'},
    {min: 4000001, max: 7000000, color: mostCommonColor},
  ],
  default: '#000',
};


export const rangesConfigDeaths: RangeConfig = {
  ranges: [
    {min: 0, max: 10000, color: '#fff1d9'},
    {min: 10001, max: 50000, color: '#fdcd8b'},
    {min: 301, max: 70000, color: '#b55440'},
    {min: 3001, max: 90000, color: '#b53828'},
    {min: 30001, max: 900000, color: mostCommonColor},
  ],
  default: '#000',
};


export const rangesConfigTests: RangeConfig = {
  ranges: [
    {min: 0, max: 7000, color: '#fff1d9'},
    {min: 7001, max: 10000, color: '#fdcd8b'},
    {min: 10001, max: 20000, color: '#b55440'},
    {min: 20001, max: 30000, color: '#b53828'},
    {min: 30001, max: 200000, color: mostCommonColor},
  ],
  default: '#000',
};
