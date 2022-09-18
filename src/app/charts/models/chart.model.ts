export interface ChartInterface {
  id: number;
  title: string;
  name: string;
  data: {
    [id: string]: number;
  };
  type: string;
  color: string;
}
