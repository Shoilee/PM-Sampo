const perspectiveID = 'collections'

export const collectionProperties = `
    {
      ?id dct:title ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
  UNION
  {
    ?id crm:P108i_was_produced_by/crm:P7_took_place_at ?productionPlace__id .
    ?productionPlace__id skos:prefLabel ?productionPlace__prefLabel .
  }
  UNION
  {
    ?id crm:P65_shows_visual_item ?i_BNODE .
    ?i_BNODE a crm:E36_Visual_Item .
    ?i_BNODE <https://linked.art/ns/terms/digitally_shown_by> ?image__id.
    ?image__id <https://linked.art/ns/terms/access_point> ?image__url .
  }
  UNION
  {
    ?id crm:P24i_changed_ownership_through ?acquisitionType__id.
    ?acquisitionType__id rdfs:label ?acquisitionType__prefLabel .
  }
  UNION
  {
    ?id crm:P108i_was_produced_by/crm:P4_has_time-span ?productionTimeSpan__id.
    ?productionTimeSpan__id crm:P82a_begin_of_the_begin ?productionTimeSpan__start .
    ?productionTimeSpan__id crm:P82b_end_of_the_end ?productionTimeSpan__end .
    BIND(CONCAT(STR(?productionTimeSpan__start), " --- " , STR(?productionTimeSpan__end) ) AS ?productionTimeSpan__prefLabel)
  }
  UNION
  {
    ?id crm:P24i_changed_ownership_through/crm:P4_has_time-span ?acquisitionTimeSpan__id.
    ?acquisitionTimeSpan__id crm:P82a_begin_of_the_begin ?acquisitionTimeSpan__start .
    ?acquisitionTimeSpan__id crm:P82b_end_of_the_end ?acquisitionTimeSpan__end .
    BIND(CONCAT(STR(?acquisitionTimeSpan__start), " --- " , STR(?acquisitionTimeSpan__end) ) AS ?acquisitionTimeSpan__prefLabel)
  }
  UNION
  {
    ?id crm:P24i_changed_ownership_through/crm:P23_transferred_title_from ?transferedTitleFrom__id.
    ?transferedTitleFrom__id rdfs:label ?transferedTitleFrom__prefLabel .
  }
  UNION
  {
    ?id crm:P24i_changed_ownership_through | crm:P30i_custody_transferred_through ?provenanceEvent__id.
    ?provenanceEvent__id crm:P2_has_type ?provenanceEvent__prefLabel .
  } 

`

export const knowledgeGraphMetadataQuery = `
  SELECT * 
  WHERE {
    ?id a sd:Dataset ;
        dct:title ?title ;
        dct:publisher ?publisher ;
        dct:rightsHolder ?rightsHolder ;
        dct:modified ?modified ;
        dct:source ?databaseDump__id .
    ?databaseDump__id skos:prefLabel ?databaseDump__prefLabel ;
                      mmm-schema:data_provider_url ?databaseDump__dataProviderUrl ;
                      dct:modified ?databaseDump__modified .
  }
`

export const collectionProvEventsQuery = `
  SELECT DISTINCT ?object__id ?id ?uri__id ?uri__prefLabel ?uri__dataProviderUrl ?prefLabel__id  
  ?object__prefLabel__id ?object__prefLabel__prefLabel
  ?object__uri__id ?object__uri__prefLabel ?object__uri__dataProviderUrl
  ?object__acquisitionTimeSpan__id ?object__acquisitionTimeSpan__prefLabel
  ?object__transferedTitleFrom__id ?object__transferedTitleFrom__prefLabel
  ?object__transferedTitleTo__id ?object__transferedTitleTo__prefLabel
  ?object__type__id ?object__type__prefLabel ?object__type__dataProviderUrl
  ?object__acquisitionType__id ?object__acquisitionType__prefLabel ?object__acquisitionType__dataProviderUrl
  ?object__provActivity__id ?object__provActivity__prefLabel ?object__provActivity__dataProviderUrl
  WHERE {
    <FILTER>
    BIND(<ID> as ?id)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
    ?id dct:title ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    ?id crm:P24i_changed_ownership_through|crm:P30i_custody_transferred_through ?object__id .
    BIND(?object__id AS ?object__uri__id)
    BIND(?object__id AS ?object__uri__dataProviderUrl)
    BIND(STR(?object__id) AS ?object__uri__prefLabel) 
    {
      ?object__id a ?object__type__id .
      BIND(?object__type__id as ?object__type__dataProviderUrl)
      BIND(REPLACE(STR(?object__type__id), "^.*/(.*)$", "$1") as ?object__type__prefLabel)
      OPTIONAL {
        ?object__id rdfs:label ?object__prefLabel__id .
        BIND(?object__prefLabel__id as ?object__prefLabel__prefLabel)
      }
    }
    UNION
    {
      ?object__id crm:P4_has_time-span ?object__acquisitionTimeSpan__id.
      ?object__acquisitionTimeSpan__id crm:P82a_begin_of_the_begin ?object__acquisitionTimeSpan__start .
      ?object__acquisitionTimeSpan__id crm:P82b_end_of_the_end ?object__acquisitionTimeSpan__end .
      BIND(CONCAT(STR(?object__acquisitionTimeSpan__start), " --- " , STR(?object__acquisitionTimeSpan__end) ) AS ?object__acquisitionTimeSpan__prefLabel)
    }
    UNION
    {
      ?object__id crm:P23_transferred_title_from|crm:P28_custody_surrendered_by ?object__transferedTitleFrom__id.
      ?object__transferedTitleFrom__id rdfs:label ?object__transferedTitleFrom__prefLabel .
    }
    UNION
    {
      ?object__id crm:P22_transferred_title_to|crm:P29_custody_received_by ?object__transferedTitleTo__id .
      OPTIONAL{?object__transferedTitleTo__id rdfs:label ?object__transferedTitleTo__prefLabel .}
    }  
    UNION
    {
      ?object__id crm:P2_has_type ?object__acquisitionType__id .
      BIND(STR(?object__acquisitionType__id) as ?object__acquisitionType__prefLabel)
      BIND(?object__acquisitionType__id as ?object__acquisitionType__dataProviderUrl)
    } 
    UNION
    {
      ?object__id crm:P9i_forms_part_of ?object__provActivity__id.
      BIND(STR(?object__provActivity__id) AS ?object__provActivity__prefLabel)
      BIND(STR(?object__provActivity__id) AS ?object__provActivity__dataProviderUrl)
    }
  }
`

export const productionPlacesQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?collections) as ?instanceCount)
  WHERE {
    <FILTER>
    ?collections crm:P108i_was_produced_by/crm:P7_took_place_at/skos:exactMatch ?id .
    SERVICE <https://api.colonialcollections.nl/datasets/sarah/sarah-geonames/sparql>{
      ?id wgs84:lat ?lat ;
        wgs84:long ?long .
    }
  }
  GROUP BY ?id ?lat ?long
`

export const placePropertiesInfoWindow = `
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(CONCAT("/places/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`

export const collectionsProducedAt = `
    OPTIONAL {
      <FILTER>
      ?related__id ^crm:P108_has_produced/crm:P7_took_place_at ?id .
      ?related__id skos:prefLabel ?related__prefLabel .
      BIND(CONCAT("/collections/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
    }
`

