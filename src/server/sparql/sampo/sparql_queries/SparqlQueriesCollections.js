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
    ?id pm:production_place ?productionPlace__id .
    ?productionPlace__id skos:prefLabel ?productionPlace__prefLabel .
  }
  UNION
  {
    ?id pm:shown_by ?image__id .
    BIND(?image__id AS ?image__url)
  }
  UNION
  {
    ?id pm:inventory_number ?inventoryNumber__id .
    BIND(?inventoryNumber__id AS ?inventoryNumber__prefLabel)    
  }
  UNION
  {
    ?id pm:identified_by ?identifier__id .
    BIND(?identifier__id AS ?identifier__prefLabel)    
  }
  UNION
  {
    ?id pm:maker ?maker__id.
    ?maker__id rdfs:label ?maker__prefLabel 
    BIND(CONCAT("/actors/page/", REPLACE(STR(?maker__id), "^.*\\\\/(.+)", "$1")) AS ?maker__dataProviderUrl)
  }
  UNION
  {
    ?id pm:production_time_span ?productionTimeSpan__id.
    ?productionTimeSpan__id crm:P82a_begin_of_the_begin ?productionTimeSpan__start .
    ?productionTimeSpan__id crm:P82b_end_of_the_end ?productionTimeSpan__end .
    BIND(CONCAT(STR(?productionTimeSpan__start), " --- " , STR(?productionTimeSpan__end) ) AS ?productionTimeSpan__prefLabel)
  }
  UNION
  {
    ?id crm:P24i_changed_ownership_through|crm:P30i_custody_transferred_through ?acquisitionType__id.
    ?acquisitionType__id rdfs:label ?acquisitionType__prefLabel .
  }
  UNION
  {
    ?id (crm:P24i_changed_ownership_through|crm:P30i_custody_transferred_through)/crm:P4_has_time-span ?acquisitionTimeSpan__id.
    ?acquisitionTimeSpan__id crm:P82a_begin_of_the_begin ?acquisitionTimeSpan__start .
    ?acquisitionTimeSpan__id crm:P82b_end_of_the_end ?acquisitionTimeSpan__end .
    BIND(CONCAT(STR(?acquisitionTimeSpan__start), " --- " , STR(?acquisitionTimeSpan__end) ) AS ?acquisitionTimeSpan__prefLabel)
  }
  UNION
  {
    ?id (crm:P24i_changed_ownership_through/crm:P23_transferred_title_from)|(crm:P30i_custody_transferred_through/crm:P28_custody_surrendered_by) ?transferedTitleFrom__id.
    ?transferedTitleFrom__id rdfs:label ?transferedTitleFrom__prefLabel .
    BIND(CONCAT("/actors/page/", REPLACE(STR(?transferedTitleFrom__id), "^.*\\\\/(.+)", "$1")) AS ?transferedTitleFrom__dataProviderUrl)
  }
  UNION
  {
    ?id (crm:P24i_changed_ownership_through/crm:P22_transferred_title_to)|(crm:P30i_custody_transferred_through/crm:P29_custody_received_by) ?transferedTitleTo__id .
    ?transferedTitleTo__id rdfs:label ?transferedTitleTo__prefLabel .
    BIND(CONCAT("/actors/page/", REPLACE(STR(?transferedTitleTo__id), "^.*\\\\/(.+)", "$1")) AS ?transferedTitleTo__dataProviderUrl)
  }
  UNION
  {
    ?id crm:P24i_changed_ownership_through | crm:P30i_custody_transferred_through ?provenanceEvent__id.
    ?provenanceEvent__id crm:P2_has_type ?provenanceEvent__prefLabel .
  } 

`

export const csvObjectsQuery = `
  SELECT DISTINCT ?id ?title ?inventoryNumber ?uniqueIdentifier ?placeOfOrigin ?maker ?productionTimeSpan ?acquisitionType ?acquisitionTimeSpan ?fromActor ?toActor ?historicalEvent
    WHERE {
    <FILTER>
      ?id a crm:E22_Human-Made_Object .
  OPTIONAL
  {
    ?id dct:title ?title .
  }
  OPTIONAL
  {
    ?id pm:production_place ?productionPlace__id .
    ?productionPlace__id skos:prefLabel ?placeOfOrigin .
  }
  OPTIONAL
  {
    ?id pm:inventory_number ?inventoryNumber .
  }
  OPTIONAL
  {
    ?id pm:identified_by ?uniqueIdentifier.    
  }
  OPTIONAL
  {
    ?id pm:maker ?maker__id.
    ?maker__id rdfs:label ?maker .
  }
  OPTIONAL
  {
    ?id pm:production_time_span ?productionTimeSpan__id.
    ?productionTimeSpan__id crm:P82a_begin_of_the_begin ?productionTimeSpan__start .
    ?productionTimeSpan__id crm:P82b_end_of_the_end ?productionTimeSpan__end .
    BIND(CONCAT(STR(?productionTimeSpan__start), " --- " , STR(?productionTimeSpan__end) ) AS ?productionTimeSpan)
  }
  OPTIONAL
  {
    ?id crm:P24i_changed_ownership_through|crm:P30i_custody_transferred_through ?acquisitionType__id.
    ?acquisitionType__id rdfs:label ?acquisitionType .
  }
  OPTIONAL
  {
    ?id (crm:P24i_changed_ownership_through|crm:P30i_custody_transferred_through)/crm:P4_has_time-span ?acquisitionTimeSpan__id.
    ?acquisitionTimeSpan__id crm:P82a_begin_of_the_begin ?acquisitionTimeSpan__start .
    ?acquisitionTimeSpan__id crm:P82b_end_of_the_end ?acquisitionTimeSpan__end .
    BIND(CONCAT(STR(?acquisitionTimeSpan__start), " --- " , STR(?acquisitionTimeSpan__end) ) AS ?acquisitionTimeSpan)
  }
  OPTIONAL
  {
    ?id (crm:P24i_changed_ownership_through/crm:P23_transferred_title_from)|(crm:P30i_custody_transferred_through/crm:P28_custody_surrendered_by) ?transferedTitleFrom__id.
    ?transferedTitleFrom__id rdfs:label ?fromActor .
  }
  OPTIONAL
  {
    ?id (crm:P24i_changed_ownership_through/crm:P22_transferred_title_to)|(crm:P30i_custody_transferred_through/crm:P29_custody_received_by) ?transferedTitleTo__id .
 	  OPTIONAL {?transferedTitleTo__id rdfs:label ?transferedTitleTo__prefLabel .}
  	BIND(COALESCE(?transferedTitleTo__prefLabel, ?transferedTitleTo__id) AS ?toActor)
  }
  OPTIONAL
  {
    ?id pm:related_to/crm:P1_is_identified_by ?historicalEvent__BNode .
    ?historicalEvent__BNode crm:P2_has_type aat:300404650 .
    ?historicalEvent__BNode crm:P190_has_symbolic_content ?historicalEvent .
    ?historicalEvent__BNode ^crm:P1_is_identified_by [a crm:E5_Event].
  }
} LIMIT 10000
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
    ?collections pm:production_place/skos:exactMatch ?id .
      ?id wgs84:lat ?lat ;
        wgs84:long ?long .
  }
  GROUP BY ?id ?lat ?long
`

export const placePropertiesInfoWindow = `
    ?id ^skos:exactMatch/skos:prefLabel ?prefLabel__id .
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

export const eventsByDecadeQuery = `
  SELECT DISTINCT ?category 
  (COUNT(?transfer) AS ?transferCount) 
  WHERE {
    <FILTER>
    {
      ?collections crm:P24i_changed_ownership_through ?transfer .
      ?transfer crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?begin .
      BIND(year(xsd:dateTime(?begin)) AS ?category)
    } 
    FILTER (?category >= 1700)
  } 
  GROUP BY ?category 
  ORDER BY ?category
`
export const collectionsByTypeQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?collection) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?collection a crm:E22_Human-Made_Object .
      ?collection crm:P2_has_type ?category .
      ?category skos:prefLabel ?prefLabel .
    }
    UNION
    {
      ?collection a crm:E22_Human-Made_Object .
      FILTER NOT EXISTS {
        ?collection crm:P2_has_type [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const collectionsByMakerQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?collection) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?collection a crm:E22_Human-Made_Object ;
                  pm:maker  ?category .
      ?category rdfs:label ?prefLabel .
    }
    UNION
    {
      ?collection a crm:E22_Human-Made_Object .
      FILTER NOT EXISTS {
        ?collection pm:maker [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const collectionsByAcquisitionTypeQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?collection) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?collection a crm:E22_Human-Made_Object ;
                  pm:provenance_type  ?category .
      ?category rdfs:label ?prefLabel .
    }
    UNION
    {
      ?collection a crm:E22_Human-Made_Object .
      FILTER NOT EXISTS {
        ?collection pm:provenance_type [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const collectionsBytransferedTitleFromQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?collection) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?collection a crm:E22_Human-Made_Object ;
                  pm:provenance_from_actor  ?category .
      ?category rdfs:label ?prefLabel .
    }
    UNION
    {
      ?collection a crm:E22_Human-Made_Object .
      FILTER NOT EXISTS {
        ?collection pm:provenance_from_actor [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const collectionsBytransferedTitleToQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?collection) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?collection a crm:E22_Human-Made_Object ;
                  crm:P24i_changed_ownership_through/crm:P22_transferred_title_to  ?category .
      ?category rdfs:label ?prefLabel .
    }
    UNION
    {
      ?collection a crm:E22_Human-Made_Object .
      FILTER NOT EXISTS {
        ?collection crm:P24i_changed_ownership_through/crm:P22_transferred_title_to [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`