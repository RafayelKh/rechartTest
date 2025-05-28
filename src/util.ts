import type { IChartBar } from "./Chart/Chart";


type IChartBarKey = keyof Omit<IChartBar, 'name'>;


export const calcAverage = (data: number[]): number => {
  return data.reduce((sum, x) => sum + x, 0) / data.length;
}

export const calcStandardDeviation = (data: number[]): number => {
  const mean = calcAverage(data);
  const variance = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / data.length;
  return Math.sqrt(variance);
}

export const calcZScore = (value: number, average: number, standardDeviation: number): number => {
  return (value - average) / standardDeviation;
}

export const convertBetweenAxes = (value: number, sourceAxis: [number, number], targetAxis: [number, number]): number => {
  const [sourceMin, sourceMax] = sourceAxis;
  const [targetMin, targetMax] = targetAxis;
  
  const relativePosition = normalize(value, sourceMin, sourceMax);
  const targetValue = targetMin + (relativePosition * (targetMax - targetMin));
  
  return targetValue;
}

export const normalize = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min);
}

export const getGradientOffset = (dataWithZScores: IChartBar[], key: IChartBarKey, zKey: IChartBarKey) => {
  const min = Math.min(...dataWithZScores.map(d => d[key]));
  const max = Math.max(...dataWithZScores.map(d => d[key]));

  const minZScore = Math.min(...dataWithZScores.map(d => d[zKey]));
  const maxZScore = Math.max(...dataWithZScores.map(d => d[zKey]));

  return 1 - normalize(convertBetweenAxes(1, [minZScore, maxZScore], [min, max]), min, max);
}