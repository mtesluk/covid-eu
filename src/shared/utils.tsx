import { DataBasic } from "charts";
import { Info } from "./interfaces";


export function mapInfoToData(data: Info[], selector: string, filterCallback: (el: Info) => boolean, slice: number | null = null): DataBasic[] {
      const filteredData = filterCallback ? data.filter((el: Info) => filterCallback(el)) : data;
      let mappedData: DataBasic[] = filteredData.map((el: Info) => ({name: el.country, value: el[selector]}));
      if (slice) mappedData = mappedData.slice(0, slice);
      return mappedData;
}


export function getWidth(current: HTMLDivElement | null): number {
    if (!getComputedStyle) { alert('Not supported'); }
    const computedStyle = getComputedStyle(current as Element);
    let width = current?.clientWidth || 0;
    width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    return width;
}