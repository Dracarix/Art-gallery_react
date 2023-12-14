interface Counts {
  totalCount: number;
  limit: number;
}

export function getPagesCount({ totalCount, limit }: Counts) {
  return Math.ceil(totalCount / limit);
}

export function PagesArr(totalPages: number) {
  const resArr = [];
  for (let i = 0; i < totalPages; i += 1) {
    resArr.push(i + 1);
  }
  return resArr;
}
