import { z } from "zod";

export const PerformanceSchema = z.object({
  date: z.string(),
  impressions: z.number(),
  engagement: z.number(),
  clicks: z.number(),
  spend: z.number(),
  revenue: z.number()
});

export const ChannelSchema = z.object({
  name: z.string(),
  share: z.number(),
  followers: z.number(),
  engagementRate: z.number()
});

export const TopPostSchema = z.object({
  title: z.string(),
  type: z.string(),
  impressions: z.number(),
  engagement: z.number(),
  cta: z.string(),
  accent: z.string()
});

export const CampaignSchema = z.object({
  name: z.string(),
  status: z.string(),
  spend: z.number(),
  roi: z.number(),
  goal: z.string()
});

export const AudienceSchema = z.object({
  label: z.string(),
  value: z.number()
});

export const CadenceSchema = z.object({
  weeklyPosts: z.number(),
  bestTime: z.string(),
  hashtags: z.array(z.string())
});

export const BudgetSchema = z.object({
  pacing: z.number(),
  nextOptimization: z.string()
});

export const DeltasSchema = z.object({
  impressions: z.string(),
  engagement: z.string(),
  clicks: z.string(),
  spend: z.string(),
  revenue: z.string()
});

export const SummarySchema = z.object({
  followers: z.number(),
  engagementRate: z.number(),
  monthlyReach: z.number(),
  adSpend: z.number(),
  roas: z.number()
});

export const OverviewSchema = z.object({
  visitors: z.number(),
  organicSearch: z.number(),
  adSpend: z.number(),
  revenue: z.number(),
  ctr: z.number()
});

export const TrafficSourceSchema = z.object({
  label: z.string(),
  share: z.number(),
  value: z.number(),
  delta: z.string()
});

export const MetaAdsSchema = z.object({
  spend: z.number(),
  impressions: z.number(),
  clicks: z.number(),
  reach: z.number(),
  ctr: z.number(),
  cpc: z.number(),
  cpm: z.number()
});

export const MetaCampaignSchema = z.object({
  name: z.string(),
  status: z.string(),
  spend: z.number(),
  results: z.number(),
  type: z.string()
});

export const SalesSchema = z.object({
  transactions: z.number(),
  avgOrderValue: z.number(),
  topProducts: z.array(
    z.object({
      name: z.string(),
      revenue: z.number()
    })
  )
});

export const LocationsSchema = z.object({
  rating: z.number(),
  totalRatings: z.number(),
  distribution: z.array(
    z.object({
      label: z.string(),
      value: z.number()
    })
  )
});

export const FunnelStageSchema = z.object({
  label: z.string(),
  value: z.number(),
  delta: z.string()
});

export const TrackedPageSchema = z.object({
  title: z.string(),
  views: z.number(),
  avgTime: z.string(),
  conversions: z.number()
});

export const BacklinkSchema = z.object({
  domain: z.string(),
  url: z.string(),
  status: z.string()
});

export const SocialMediaSchema = z.object({
  facebook: z.object({
    posts: z.number(),
    followers: z.number()
  }),
  instagram: z.object({
    posts: z.number(),
    followers: z.number()
  }),
  recentPosts: z.array(
    z.object({
      title: z.string(),
      accent: z.string()
    })
  )
});

export const ClientDetailSchema = z.object({
  overview: OverviewSchema,
  trafficSources: z.array(TrafficSourceSchema),
  metaAds: MetaAdsSchema,
  metaCampaigns: z.array(MetaCampaignSchema),
  sales: SalesSchema,
  locations: LocationsSchema,
  funnel: z.array(FunnelStageSchema),
  social: SocialMediaSchema,
  starredKeywords: z.array(z.string()),
  trackedPages: z.array(TrackedPageSchema),
  backlinks: z.array(BacklinkSchema)
});

export const ClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  industry: z.string(),
  tier: z.string(),
  region: z.string(),
  status: z.string(),
  manager: z.string(),
  tags: z.array(z.string()),
  summary: SummarySchema,
  trend: z.array(z.number()),
  performance: z.array(PerformanceSchema),
  channels: z.array(ChannelSchema),
  topPosts: z.array(TopPostSchema),
  campaigns: z.array(CampaignSchema),
  audience: z.array(AudienceSchema),
  cadence: CadenceSchema,
  budget: BudgetSchema,
  deltas: DeltasSchema
});

export const ClientsSchema = z.object({
  clients: z.array(ClientSchema)
});

export const ClientDetailsSchema = z.object({
  clients: z.record(ClientDetailSchema)
});

export const IdeationItemSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string()
});

export const IdeationDaySchema = z.object({
  date: z.string(),
  month: z.string(),
  items: z.array(IdeationItemSchema)
});

export const IdeationWeekSchema = z.object({
  days: z.array(IdeationDaySchema)
});

export const IdeationSchema = z.object({
  header: z.object({
    title: z.string(),
    brand: z.string(),
    website: z.string()
  }),
  dateRange: z.object({
    from: z.string(),
    to: z.string()
  }),
  filters: z.array(
    z.object({
      label: z.string(),
      count: z.number()
    })
  ),
  summaryChips: z.array(
    z.object({
      label: z.string(),
      value: z.string()
    })
  ),
  calendar: z.object({
    monthLabel: z.string(),
    weeks: z.array(IdeationWeekSchema)
  })
});

export const SocialCalendarDaySchema = z.object({
  date: z.string(),
  month: z.string(),
  icons: z.array(z.string())
});

export const SocialCalendarWeekSchema = z.object({
  days: z.array(SocialCalendarDaySchema)
});

export const BrandSocialSchema = z.object({
  header: z.object({
    title: z.string(),
    subtitle: z.string()
  }),
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.number()
    })
  ),
  calendar: z.object({
    monthLabel: z.string(),
    weeks: z.array(SocialCalendarWeekSchema)
  }),
  facebook: z.object({
    title: z.string(),
    cta: z.string(),
    posts: z.array(
      z.object({
        date: z.string(),
        title: z.string(),
        type: z.string()
      })
    )
  }),
  instagram: z.object({
    title: z.string(),
    cta: z.string(),
    posts: z.array(
      z.object({
        date: z.string(),
        title: z.string(),
        type: z.string()
      })
    )
  })
});

export const BrandMetaSummarySchema = z.object({
  label: z.string(),
  value: z.number(),
  delta: z.string()
});

export const BrandMetaDailyTrendSchema = z.object({
  date: z.string(),
  spend: z.number(),
  ctr: z.number(),
  cpc: z.number()
});

export const BrandMetaCreativeSchema = z.object({
  title: z.string(),
  spend: z.number(),
  ctr: z.number(),
  cpc: z.number(),
  roas: z.number()
});

export const BrandMetaCampaignSchema = z.object({
  name: z.string(),
  status: z.string(),
  metrics: z.object({
    reach: z.number(),
    ctr: z.number(),
    cpc: z.number(),
    roas: z.number()
  }),
  creative: z.array(BrandMetaCreativeSchema)
});

export const BrandMetaSchema = z.object({
  header: z.object({
    title: z.string(),
    brand: z.string(),
    website: z.string()
  }),
  summary: z.array(BrandMetaSummarySchema),
  alert: z.string(),
  dailyTrends: z.array(BrandMetaDailyTrendSchema),
  campaigns: z.array(BrandMetaCampaignSchema),
  radar: z.array(
    z.object({
      metric: z.string(),
      campaignA: z.number(),
      campaignB: z.number(),
      campaignC: z.number()
    })
  )
});

export const BrandOrganicSummarySchema = z.object({
  label: z.string(),
  value: z.number(),
  note: z.string()
});

export const BrandOrganicTrendSchema = z.object({
  date: z.string(),
  totalUsers: z.number(),
  engagedSessions: z.number(),
  organicSearch: z.number(),
  paidSearch: z.number(),
  referral: z.number()
});

export const BrandOrganicEventSchema = z.object({
  date: z.string(),
  pageView: z.number(),
  formSubmit: z.number(),
  purchase: z.number(),
  addToCart: z.number()
});

export const BrandOrganicFunnelSchema = z.object({
  label: z.string(),
  sessions: z.number(),
  avgTime: z.string(),
  dropOff: z.string()
});

export const BrandOrganicPageSchema = z.object({
  page: z.string(),
  title: z.string(),
  views: z.number(),
  users: z.number(),
  avgDuration: z.string()
});

export const BrandOrganicTrafficSchema = z.object({
  label: z.string(),
  value: z.number(),
  percent: z.number(),
  accent: z.string()
});

export const BrandOrganicSchema = z.object({
  header: z.object({
    title: z.string(),
    brand: z.string(),
    website: z.string()
  }),
  summary: z.array(BrandOrganicSummarySchema),
  userTrends: z.array(BrandOrganicTrendSchema),
  keyEvents: z.array(BrandOrganicEventSchema),
  funnel: z.array(BrandOrganicFunnelSchema),
  topPages: z.array(BrandOrganicPageSchema),
  traffic: z.array(BrandOrganicTrafficSchema)
});

export const BrandPagesSummarySchema = z.object({
  label: z.string(),
  value: z.number()
});

export const BrandPageEntrySchema = z.object({
  title: z.string(),
  url: z.string(),
  views: z.number(),
  users: z.number(),
  avgDuration: z.string(),
  created: z.string()
});

export const BrandPagesSchema = z.object({
  header: z.object({
    title: z.string(),
    brand: z.string(),
    website: z.string()
  }),
  summary: z.array(BrandPagesSummarySchema),
  managedPages: z.array(BrandPageEntrySchema),
  topPages: z.array(BrandPageEntrySchema)
});

export const BrandBacklinksSummarySchema = z.object({
  label: z.string(),
  value: z.number(),
  note: z.string()
});

export const BrandBacklinkEntrySchema = z.object({
  url: z.string(),
  status: z.string(),
  added: z.string()
});

export const BrandBacklinksSchema = z.object({
  header: z.object({
    title: z.string(),
    brand: z.string(),
    website: z.string()
  }),
  summary: z.array(BrandBacklinksSummarySchema),
  backlinks: z.array(BrandBacklinkEntrySchema)
});

export const BrandKeywordSchema = z.object({
  keyword: z.string(),
  volume: z.number(),
  competition: z.string(),
  cpc: z.string(),
  location: z.string(),
  locationCode: z.string(),
  starred: z.boolean()
});

export const BrandKeywordsSchema = z.object({
  header: z.object({
    title: z.string(),
    subtitle: z.string()
  }),
  totals: z.object({
    tracked: z.number(),
    starred: z.number()
  }),
  keywords: z.array(BrandKeywordSchema)
});

export const BrandGmbSummarySchema = z.object({
  label: z.string(),
  value: z.number()
});

export const BrandGmbLocationSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  website: z.string(),
  updated: z.string(),
  rating: z.number(),
  reviews: z.number()
});

export const BrandGmbSchema = z.object({
  header: z.object({
    title: z.string(),
    subtitle: z.string()
  }),
  summary: z.array(BrandGmbSummarySchema),
  locations: z.array(BrandGmbLocationSchema)
});

export const WorkspaceSummarySchema = z.object({
  label: z.string(),
  value: z.string(),
  delta: z.string()
});

export const WorkspaceChannelSchema = z.object({
  label: z.string(),
  target: z.number(),
  planned: z.number(),
  completed: z.number()
});

export const WorkspaceBrandSchema = z.object({
  brand: z.string(),
  focus: z.string(),
  owner: z.string(),
  nextDeliverable: z.string(),
  status: z.string(),
  pace: z.string()
});

export const WorkspacePrioritySchema = z.object({
  title: z.string(),
  brand: z.string(),
  due: z.string(),
  type: z.string()
});

export const WorkspaceSchema = z.object({
  header: z.object({
    title: z.string(),
    subtitle: z.string()
  }),
  summary: z.array(WorkspaceSummarySchema),
  monthlyPlan: z.array(WorkspaceChannelSchema),
  brandWorkstreams: z.array(WorkspaceBrandSchema),
  priorities: z.array(WorkspacePrioritySchema)
});

export const AgencySchema = z.object({
  workspace: z.object({
    name: z.string(),
    activeClients: z.number()
  }),
  user: z.object({
    name: z.string(),
    initials: z.string()
  }),
  dateRanges: z.array(z.string()),
  targets: z.object({
    roasTarget: z.number()
  }),
  briefs: z.array(
    z.object({
      clientId: z.string(),
      note: z.string(),
      delta: z.string()
    })
  ),
  moments: z.array(
    z.object({
      clientId: z.string(),
      title: z.string(),
      day: z.string()
    })
  )
});

export type Client = z.infer<typeof ClientSchema>;
export type Agency = z.infer<typeof AgencySchema>;
export type Performance = z.infer<typeof PerformanceSchema>;
export type ClientDetail = z.infer<typeof ClientDetailSchema>;
export type Ideation = z.infer<typeof IdeationSchema>;
export type BrandSocial = z.infer<typeof BrandSocialSchema>;
export type BrandMeta = z.infer<typeof BrandMetaSchema>;
export type BrandOrganic = z.infer<typeof BrandOrganicSchema>;
export type BrandPages = z.infer<typeof BrandPagesSchema>;
export type BrandBacklinks = z.infer<typeof BrandBacklinksSchema>;
export type BrandKeywords = z.infer<typeof BrandKeywordsSchema>;
export type BrandGmb = z.infer<typeof BrandGmbSchema>;
export type Workspace = z.infer<typeof WorkspaceSchema>;
