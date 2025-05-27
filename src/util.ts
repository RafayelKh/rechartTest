export const calcAverage = (data: number[]): number => {
  return data.reduce((sum, x) => sum + x, 0) / data.length;
}

export const calcStandardDeviation = (data: number[]): number => {
  const mean = calcAverage(data);
  const variance = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / data.length;
  return Math.sqrt(variance);
}

export function calcZScore(value: number, average: number, standardDeviation: number): number {
  return (value - average) / standardDeviation;
} 