import { DataBasic } from "charts";
import { Info } from "./interfaces";


export function mapDataToInfo(data: Info[], selector: string, filterCallback: (el: Info) => boolean): DataBasic[] {
      data = filterCallback ? data.filter((el: Info) => filterCallback(el)) : data;
      const mappedData: DataBasic[] = data.map((el: Info) => ({name: el.country, value: el[selector]}));
      return mappedData;
}


export function getWidth(current: HTMLDivElement | null): number {
    if (!getComputedStyle) { alert('Not supported'); }
    const computedStyle = getComputedStyle(current as Element);
    var width = current?.clientWidth || 0;
    width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    return width;
  }