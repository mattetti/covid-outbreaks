import { REGIONS } from '../data/geoData'

export function filterBySearch (a, search) {
  if (search.codes) {
    let value = (a.code || '').toLowerCase()

    return !!search.codes.find(code => code.endsWith('*') ? value.startsWith(code.slice(0, -1)) : value === code)
  } else if (search.names) {
    let value = (a[`${search.language}Name`] || a.name || a.code || '').toLowerCase()

    return !!search.names.find(name => value.indexOf(name) >= 0)
  }
}

function filterAll (a, options) {
  return (a.daily.deaths && a.latestTotal.deaths > 0) || (a.daily.cases && a.latestTotal.cases > 0)
}

function filterRelevant (a, options) {
  if (options.sort === 'casesLatest') {
    return a.latestTotal.cases > 0
  } else if (options.sort === 'casesTotal') {
    return a.latestTotal.cases > 0
  } else if (options.sort === 'deathsLatest') {
    return a.latestTotal.deaths > 1
  } else if (options.sort === 'deathsTotal') {
    return a.latestTotal.deaths > 1
  } else if (options.sort === 'acceleration') {
    return a.latestTotal.deaths > 50
  } else {
    return a.latestTotal.deaths > 0
  }
}

function filterAmericas (a, options) {
  return REGIONS.americas.indexOf(a.codeCountry) >= 0
}

function filterUSA (a, options) {
  return a.codeCountry === 'us' || a.codeCountry === 'pr'
}

function filterLatam (a, options) {
  return REGIONS.america_latam.indexOf(a.codeCountry) >= 0
}

function filterEurope (a, options) {
  return REGIONS.europe.indexOf(a.codeCountry) >= 0
}

function filterMiddleEast (a, options) {
  return REGIONS.middleeast.indexOf(a.codeCountry) >= 0
}

function filterSEAsia (a, options) {
  return REGIONS.seasia.indexOf(a.codeCountry) >= 0
}

function filterAfrica (a, options) {
  return REGIONS.africa.indexOf(a.codeCountry) >= 0
}

function filterAsiaOceania (a, options) {
  return REGIONS.asia.indexOf(a.codeCountry) >= 0 || REGIONS.oceania.indexOf(a.codeCountry) >= 0
}

function filterOtherRegions (a, options) {
  return (a.code.indexOf('other') === 0)
}

const FILTERERS = {
  all: filterAll,
  relevant: filterRelevant,
  americas: filterAmericas,
  usa: filterUSA,
  latam: filterLatam,
  europe: filterEurope,
  middleEast: filterMiddleEast,
  seAsia: filterSEAsia,
  africa: filterAfrica,
  asiaOceania: filterAsiaOceania,
  otherRegions: filterOtherRegions
}

export const FILTER_ALIASES = {
  /* Actual options */
  all: 'all',
  relevant: 'relevant',
  default: 'all',
  americas: 'americas',
  usa: 'usa',
  latam: 'latam',
  europe: 'europe',
  middleEast: 'middleEast',
  seAsia: 'seAsia',
  africa: 'africa',
  asiaOceania: 'asiaOceania',
  otherRegions: 'otherRegions',

  /* Aliases */
  asia: 'asiaOceania',
  oceania: 'asiaOceania',
  america: 'americas',
  northAmerica: 'americas',
  centralAmerica: 'americas',
  southAmerica: 'americas',
  seasia: 'seasia',
}

export const FILTER_DESCRIPTIONS = {
  relevant: 'Important outbreaks',
  americas: 'Outbreaks in The Americas',
  usa: 'Outbreaks in USA',
  latam: 'Outbreaks in Latin America',
  europe: 'Outbreaks in Europe',
  africa: 'Outbreaks in Africa',
  middleEast: 'Outbreaks in the Middle East',
  seAsia: 'Outbreaks in South-East Asia',
  asiaOceania: 'Outbreaks in Asia & Oceania',
  otherRegions: 'Outbreaks in other regions',
  all: 'All outbreaks'
}

export const FILTER_TYPES = ['all', 'relevant', 'asiaOceania', 'seAsia', 'europe', 'americas', 'usa', 'latam', 'africa', 'middleEast', 'otherRegions']

export function viewOptionsForFiltering(filter, moreOptions) {
  filter = FILTER_ALIASES[filter] || FILTER_ALIASES.default
  return {
    filterer: FILTERERS[filter],
    filter,
    filterDescription: FILTER_DESCRIPTIONS[filter],
    ...moreOptions
  }
}

