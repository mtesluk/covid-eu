import { RangeConfig } from 'charts';


export const mostCommonColor: string = '#500000';

export const rangesConfigCases: RangeConfig = {
  ranges: [
    {min: 0, max: 1000, color: '#fff1d9'},
    {min: 1001, max: 10000, color: '#fdcd8b'},
    {min: 10001, max: 50000, color: '#b55440'},
    {min: 50001, max: 100000, color: '#b53828'},
    {min: 100001, max: 420001, color: mostCommonColor},
  ],
  default: '#000',
};


export const rangesConfigDeaths: RangeConfig = {
  ranges: [
    {min: 0, max: 30, color: '#fff1d9'},
    {min: 31, max: 300, color: '#fdcd8b'},
    {min: 301, max: 3000, color: '#b55440'},
    {min: 3001, max: 30000, color: '#b53828'},
    {min: 30001, max: 300000, color: mostCommonColor},
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