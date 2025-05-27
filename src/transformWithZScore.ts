import { zScore } from './util';

import { IChartBar } from './Chart/Chart';

export interface IChartBarWithZ extends IChartBar {
  uvZ: number;
  pvZ: number;
}

export function addZScores(data: IChartBar[]): IChartBarWithZ[] {
  const uvArray = data.map(d => d.uv);
  const pvArray = data.map(d => d.pv);
  return data.map(d => ({
    ...d,
    uvZ: zScore(d.uv, uvArray),
    pvZ: zScore(d.pv, pvArray),
  }));
} 