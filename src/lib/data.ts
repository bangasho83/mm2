import "server-only";
import clientsJson from "@/data/clients.json";
import agencyJson from "@/data/agency.json";
import clientDetailsJson from "@/data/client-details.json";
import ideationJson from "@/data/brand-ideation.json";
import socialJson from "@/data/brand-social.json";
import metaJson from "@/data/brand-meta.json";
import organicJson from "@/data/brand-organic.json";
import pagesJson from "@/data/brand-pages.json";
import backlinksJson from "@/data/brand-backlinks.json";
import keywordsJson from "@/data/brand-keywords.json";
import gmbJson from "@/data/brand-gmb.json";
import workspaceJson from "@/data/workspace.json";
import {
  AgencySchema,
  BrandMetaSchema,
  BrandOrganicSchema,
  BrandPagesSchema,
  BrandBacklinksSchema,
  BrandKeywordsSchema,
  BrandGmbSchema,
  WorkspaceSchema,
  BrandSocialSchema,
  ClientDetailsSchema,
  ClientsSchema,
  IdeationSchema
} from "@/lib/schemas";

const parsedClients = ClientsSchema.parse(clientsJson);
const parsedAgency = AgencySchema.parse(agencyJson);
const parsedDetails = ClientDetailsSchema.parse(clientDetailsJson);
const parsedIdeation = IdeationSchema.parse(ideationJson);
const parsedSocial = BrandSocialSchema.parse(socialJson);
const parsedMeta = BrandMetaSchema.parse(metaJson);
const parsedOrganic = BrandOrganicSchema.parse(organicJson);
const parsedPages = BrandPagesSchema.parse(pagesJson);
const parsedBacklinks = BrandBacklinksSchema.parse(backlinksJson);
const parsedKeywords = BrandKeywordsSchema.parse(keywordsJson);
const parsedGmb = BrandGmbSchema.parse(gmbJson);
const parsedWorkspace = WorkspaceSchema.parse(workspaceJson);

export const clients = parsedClients.clients;
export const agency = parsedAgency;
export const clientDetails = parsedDetails.clients;
export const ideation = parsedIdeation;
export const social = parsedSocial;
export const meta = parsedMeta;
export const organic = parsedOrganic;
export const pages = parsedPages;
export const backlinks = parsedBacklinks;
export const keywords = parsedKeywords;
export const gmb = parsedGmb;
export const workspace = parsedWorkspace;
