interface Lottery3ResultRecord {
  drawFlowFund: string;
  drawFlowFundRj: string;
  drawPdfUrl: string;
  estimateDrawTime: string;
  isGetKjpdf: number;
  isGetXlpdf: number;
  lotteryDrawNum: string;
  lotteryDrawResult: string;
  lotteryDrawStatus: number;
  lotteryDrawStatusNo: string;
  lotteryDrawTime: string;
  lotteryEquipmentCount: number;
  lotteryGameName: string;
  lotteryGameNum: string;
  lotteryGamePronum: number;
  lotteryNotice: number;
  lotteryNoticeShowFlag: number;
  lotteryPaidBeginTime: string;
  lotteryPaidEndTime: string;
  lotteryPromotionFlag: number;
  lotteryPromotionFlagRj: number;
  lotterySaleBeginTime: string;
  lotterySaleEndTimeUnix: number;
  lotterySaleEndtime: string;
  lotterySuspendedFlag: number;
  lotteryUnsortDrawresult: string;
  matchList: unknown[];
  pdfType: number;
  poolBalanceAfterdraw: string;
  poolBalanceAfterdrawRj: string;
  prizeLevelListRj: unknown[];
  ruleType: number;
  surplusAmount: string;
  surplusAmountRj: string;
  termList: unknown[];
  termResultList: unknown[];
  totalSaleAmount: string;
  totalSaleAmountRj: string;
  verify: number;
  vtoolsConfig: unknown;
}

interface Lottery3Pagination {
  page: number;
  pageSize: number;
  total: number;
  pages: number;
}
