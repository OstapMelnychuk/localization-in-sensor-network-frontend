export class IterationServiceResponse {
  constructor(
    public min: number,
    public max: number,
    public average: number,
    public iterationPrecision: Map<number, number>
  ) {
  }
}
