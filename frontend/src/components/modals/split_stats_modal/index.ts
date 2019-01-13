import SplitStatsModalContainer from '@/components/modals/split_stats_modal/split_stats_modal_container.vue'

interface IMarketPair {
  underdog: number
  favorite: number
}

interface ISplitStats {
  fb: IMarketPair
  ft: IMarketPair
  fd: IMarketPair
  fbaron: IMarketPair
}

export { SplitStatsModalContainer, ISplitStats, IMarketPair }
