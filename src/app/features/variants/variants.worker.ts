/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  console.log('>>>>>>>>>>>> worker here, received', data);
  const startTime = performance.now();

  const { variants, searchText } = data;
  // const response = searchText
  //   ? variants.filter((v: any) =>
  //       v.name.toLowerCase().includes(searchText.toLowerCase())
  //     )
  //   : variants;
  const response = searchText
    ? filterVariantsInChunks(variants, 1000, searchText)
    : variants;

  const endTime = performance.now();
  console.log(`>>>>>> to search variants worker took ${endTime - startTime}ms`);

  postMessage(response);
});

/**
 * Optimeze memory usage by processing data in chunks
 * @param data
 * @param chunkSize
 * @param text
 * @returns
 */
function filterVariantsInChunks(
  data: Variant[],
  chunkSize: number,
  text: string
): Variant[] {
  let result: Variant[] = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunck = data.slice(i, i + chunkSize);
    result = result.concat(
      chunck.filter((v) => v.name.toLowerCase().includes(text.toLowerCase()))
    );
  }
  return result;
}
// types
// The reason is that when compiling a web-worker, it's compilation is totally separate from that of the application.
// Web-workers also requires a different TypeScript lib settings which is not compatible with the application code and vice-versa.
export interface Variant {
  id: string;
  name: string;
  gene: string;
  location: string;
  variantType: string;
  frequency: string;
  pathogenicity: string;
  exon?: number;
  clinicalSignificance?: string;
  references?: string[];
  classification?: Classification;
}

export enum Classification {
  'Benign',
  'Likely Benign',
  'Uncertain Significance',
  'Likely Pathogenic',
  'Pathogenic',
}
