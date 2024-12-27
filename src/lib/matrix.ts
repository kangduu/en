type AxisType = [number, number];
type AxisMapping = [string, number];
type ScanningMode = "full" | "neighbor";

class Matrix {
  // X轴最大值
  BOUND_X: number = 6;
  // Y轴最大值
  BOUND_Y: number = 8;

  // 元数据
  private META_DATA: [AxisType, number][] = [
    [[1, 1], 8],
    [[1, 2], 3],
    [[1, 3], 7],
    [[1, 4], 3],
    [[1, 5], 6],
    [[1, 6], 1],
    [[1, 7], 7],
    [[1, 8], 7],
    [[1, 9], 4],
    [[1, 10], 4],
    [[1, 11], 2],
    [[1, 12], 2],
    [[1, 13], 8],

    [[2, 1], 5],
    [[2, 2], 1],
    [[2, 3], 2],
    [[2, 4], 2],
    [[2, 5], 0],
    [[2, 6], 6],
    [[2, 7], 1],
    [[2, 8], 9],
    [[2, 9], 7],
    [[2, 10], 6],
    [[2, 11], 4],
    [[2, 12], 0],
    [[2, 13], 5],

    [[3, 1], 2],
    [[3, 2], 5],
    [[3, 3], 4],
    [[3, 4], 7],
    [[3, 5], 2],
    [[3, 6], 3],
    [[3, 7], 8],
    [[3, 8], 4],
    [[3, 9], 9],
    [[3, 10], 7],
    [[3, 11], 3],
    [[3, 12], 4],
    [[3, 13], 2],

    [[4, 1], 2],
    [[4, 2], 4],
    [[4, 3], 1],
    [[4, 4], 6],
    [[4, 5], 5],
    [[4, 6], 9],
    [[4, 7], 3],
    [[4, 8], 4],
    [[4, 9], 5],
    [[4, 10], 1],
    [[4, 11], 9],
    [[4, 12], 3],
    [[4, 13], 2],

    [[5, 1], 1],
    [[5, 2], 2],
    [[5, 3], 0],
    [[5, 4], 5],
    [[5, 5], 8],
    [[5, 6], 8],
    [[5, 7], 6],
    [[5, 8], 7],
    [[5, 9], 4],
    [[5, 10], 8],
    [[5, 11], 8],
    [[5, 12], 6],
    [[5, 13], 1],

    [[6, 1], 4],
    [[6, 2], 3],
    [[6, 3], 7],
    [[6, 4], 4],
    [[6, 5], 0],
    [[6, 6], 9],
    [[6, 7], 3],
    [[6, 8], 0],
    [[6, 9], 3],
    [[6, 10], 4],
    [[6, 11], 0],
    [[6, 12], 5],
    [[6, 13], 4],

    [[7, 1], 8],
    [[7, 2], 5],
    [[7, 3], 9],
    [[7, 4], 2],
    [[7, 5], 4],
    [[7, 6], 5],
    [[7, 7], 7],
    [[7, 8], 8],
    [[7, 9], 4],
    [[7, 10], 2],
    [[7, 11], 0],
    [[7, 12], 7],
    [[7, 13], 8],

    [[8, 1], 7],
    [[8, 2], 0],
    [[8, 3], 0],
    [[8, 4], 6],
    [[8, 5], 9],
    [[8, 6], 6],
    [[8, 7], 4],
    [[8, 8], 9],
    [[8, 9], 9],
    [[8, 10], 8],
    [[8, 11], 9],
    [[8, 12], 7],
    [[8, 13], 7],

    [[9, 1], 0],
    [[9, 2], 6],
    [[9, 3], 4],
    [[9, 4], 0],
    [[9, 5], 7],
    [[9, 6], 5],
    [[9, 7], 8],
    [[9, 8], 3],
    [[9, 9], 8],
    [[9, 10], 6],
    [[9, 11], 2],
    [[9, 12], 3],
    [[9, 13], 0],

    [[10, 1], 8],
    [[10, 2], 3],
    [[10, 3], 0],
    [[10, 4], 7],
    [[10, 5], 1],
    [[10, 6], 7],
    [[10, 7], 2],
    [[10, 8], 6],
    [[10, 9], 0],
    [[10, 10], 9],
    [[10, 11], 4],
    [[10, 12], 6],
    [[10, 13], 8],

    [[11, 1], 2],
    [[11, 2], 1],
    [[11, 3], 1],
    [[11, 4], 1],
    [[11, 5], 8],
    [[11, 6], 0],
    [[11, 7], 6],
    [[11, 8], 5],
    [[11, 9], 5],
    [[11, 10], 6],
    [[11, 11], 1],
    [[11, 12], 4],
    [[11, 13], 2],

    [[12, 1], 6],
    [[12, 2], 4],
    [[12, 3], 0],
    [[12, 4], 4],
    [[12, 5], 2],
    [[12, 6], 1],
    [[12, 7], 1],
    [[12, 8], 6],
    [[12, 9], 3],
    [[12, 10], 5],
    [[12, 11], 1],
    [[12, 12], 3],
    [[12, 13], 6],

    [[13, 1], 8],
    [[13, 2], 9],
    [[13, 3], 0],
    [[13, 4], 0],
    [[13, 5], 0],
    [[13, 6], 2],
    [[13, 7], 7],
    [[13, 8], 3],
    [[13, 9], 5],
    [[13, 10], 3],
    [[13, 11], 4],
    [[13, 12], 3],
    [[13, 13], 8],

    [[14, 1], 8],
    [[14, 2], 5],
    [[14, 3], 0],
    [[14, 4], 2],
    [[14, 5], 8],
    [[14, 6], 3],
    [[14, 7], 0],
    [[14, 8], 1],
    [[14, 9], 8],
    [[14, 10], 9],
    [[14, 11], 7],
    [[14, 12], 5],
    [[14, 13], 8],

    [[15, 1], 1],
    [[15, 2], 7],
    [[15, 3], 4],
    [[15, 4], 4],
    [[15, 5], 2],
    [[15, 6], 7],
    [[15, 7], 8],
    [[15, 8], 4],
    [[15, 9], 8],
    [[15, 10], 6],
    [[15, 11], 0],
    [[15, 12], 7],
    [[15, 13], 1],

    [[16, 1], 6],
    [[16, 2], 8],
    [[16, 3], 9],
    [[16, 4], 2],
    [[16, 5], 8],
    [[16, 6], 1],
    [[16, 7], 5],
    [[16, 8], 4],
    [[16, 9], 2],
    [[16, 10], 7],
    [[16, 11], 9],
    [[16, 12], 1],
    [[16, 13], 6],

    [[17, 1], 8],
    [[17, 2], 3],
    [[17, 3], 7],
    [[17, 4], 3],
    [[17, 5], 6],
    [[17, 6], 1],
    [[17, 7], 7],
    [[17, 8], 7],
    [[17, 9], 4],
    [[17, 10], 4],
    [[17, 11], 2],
    [[17, 12], 2],
    [[17, 13], 8],
  ];

  // 坐标映射数据 数组类型
  AxisArr: AxisMapping[] = [];
  // 数字对应的坐标点
  NumberPoint: Map<number, AxisType[]> = new Map();
  // 坐标轴数据
  AxisData: Map<string, number>;

  constructor() {
    const axis = this.init();
    this.AxisArr = axis;
    this.AxisData = new Map(axis);
  }

  private init(): AxisMapping[] {
    const mapping: AxisMapping[] = [];
    this.META_DATA.forEach((curr) => {
      const [[a, b], v] = curr;
      const x: number = b - 7,
        y: number = -(a - 9);
      const axis: AxisType = [x, y];

      const point = this.NumberPoint.get(v);
      if (point) this.NumberPoint.set(v, [...point, axis]);
      else this.NumberPoint.set(v, [axis]);

      mapping.push([axis.toString(), v]);
    });
    return mapping;
  }

  /**
   * 扫描目标点周围数据是否满足需求
   * @param point 目标点
   * @param target 目标值
   * @returns 命中目标值的所有点
   */
  scanning(
    point: AxisType,
    target: number,
    mode: ScanningMode = "full"
  ): AxisType[] {
    const results: AxisType[] = [];
    const [x, y] = point;
    // 周围8个的情况
    const Axis8: AxisType[] = [];
    [x - 1, x, x + 1].forEach((px: number) => {
      [y - 1, y, y + 1].forEach((py: number) => {
        const p: AxisType = [px, py];
        Axis8.push(p);
      });
    });

    // 上下左右的情况
    const Axis4: AxisType[] = [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
    ];

    (mode == "full" ? Axis8 : Axis4).forEach((p) => {
      const ps = p.toString();
      const self = point.toString();
      if (ps !== self) {
        const value = this.AxisData.get(ps);
        if (target === value) results.push(p);
      }
    });

    return results;
  }

  // 获取连续的点的集合
  findSerialAxis(target: [number, number, number]): Array<AxisType[]> {
    const results: Array<AxisType[]> = [];
    const [a, b, c] = target;
    const Start = this.NumberPoint.get(a) || [];
    Start?.forEach((s) => {
      const Next = this.scanning(s, b);
      Next.forEach((n) => {
        const End = this.scanning(n, c);
        End.forEach((e) => {
          results.push([s, n, e]);
        });
      });
    });
    return results;
  }
}

class MatrixNeighbor extends Matrix {
  constructor() {
    super();
  }

  public findSerialAxis(target: [number, number, number]): Array<AxisType[]> {
    const results: Array<AxisType[]> = [];
    const [a, b, c] = target;
    const Start = this.NumberPoint.get(a) || [];
    Start?.forEach((s) => {
      const Next = this.scanning(s, b, "neighbor");
      console.log(Next);
    });
    // Next.forEach((n) => {
    //   const End = this.scanning(n, c);
    //   End.forEach((e) => {
    //     results.push([s, n, e]);
    //   });
    // });
    return results;
  }
}

const matrix = new MatrixNeighbor();
const paths = matrix.findSerialAxis([6, 2, 0]);
console.log(paths);
