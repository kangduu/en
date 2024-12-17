"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { dayOfWeek } from "../../lib/week";

// 拉取某一页的数据 排列三
async function pullOnePageData(page: number = 1) {
  const url = `https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=35&provinceId=0&pageSize=100&isVerify=1&pageNo=${page}`;
  return new Promise<{
    dataSource: Lottery3ResultRecord[];
    pagination: Lottery3Pagination;
  }>((resolve, reject) => {
    fetch(url)
      .then(function (response) {
        try {
          return response.json();
        } catch (error) {
          throw error;
        }
      })
      .then(function (data) {
        try {
          const { list, pageNo, pageSize, pages, total } = data.value;
          resolve({
            dataSource: list,
            pagination: { page: pageNo, pageSize, total, pages },
          });
        } catch (error) {
          console.log(error);
          reject(null);
        }
      })
      .catch(function () {
        console.log("获取数据错误！");
        reject(null);
      });
  });
}

export default function Permutation() {
  const [dataSource, setDataSource] = useState<Lottery3ResultRecord[]>([]);
  const [pagination, setPagination] = useState<Lottery3Pagination>({
    page: 1,
    total: 0,
    pages: 0,
    pageSize: 100,
  });

  const fetchData = (page: number = 1) => {
    let data: Lottery3ResultRecord[] = [];
    let pagination = null;

    try {
      const CacheData = localStorage.getItem(`Lottery-${page}`);
      if (CacheData) data = JSON.parse(CacheData);
      const CachePagination = localStorage.getItem("Lottery-Pagination");
      if (CachePagination) pagination = JSON.parse(CachePagination);
    } catch (error) {
      return console.log(error);
    }

    if (data.length > 0 && pagination) {
      setDataSource(data);
      setPagination({ ...pagination, page });
      return;
    }

    pullOnePageData(page)
      .then(({ dataSource, pagination }) => {
        setDataSource(dataSource);
        setPagination(pagination);

        localStorage.setItem(`Lottery-${page}`, JSON.stringify(dataSource));
        localStorage.setItem("Lottery-Pagination", JSON.stringify(pagination));
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={pagination?.page || 1}
        total={pagination?.pages || 0}
        onChange={(page) => fetchData(page)}
        className="flex w-full justify-center m-0"
      />
      <Table aria-label="Example table with dynamic content">
        <TableHeader>
          <TableColumn>Week</TableColumn>
          <TableColumn>Results</TableColumn>
          <TableColumn>Result 5</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>TotalSaleAmount</TableColumn>
          <TableColumn>Number</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {dataSource?.map(
            ({
              lotteryDrawTime,
              lotteryDrawNum,
              lotteryUnsortDrawresult,
              lotteryDrawResult,
              totalSaleAmount,
            }) => {
              return (
                <TableRow key={lotteryDrawNum}>
                  <TableCell className="text-nowrap">
                    {dayOfWeek(lotteryDrawTime, "zh-cn")}
                  </TableCell>
                  <TableCell className="text-nowrap text-primary">
                    {lotteryDrawResult}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {lotteryUnsortDrawresult}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {lotteryDrawTime}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {totalSaleAmount}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {lotteryDrawNum}
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={pagination?.page || 1}
        total={pagination?.pages || 0}
        onChange={(page) => fetchData(page)}
        className="flex w-full justify-center m-0"
      />
    </>
  );
}
