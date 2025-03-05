const perspectiveID = 'histEvents'

export const histEventProperties =
`   {
      ?id crm:P1_is_identified_by ?prefLabel__id .
      ?prefLabel__id crm:P2_has_type aat:300404650.
      ?prefLabel__id crm:P190_has_symbolic_content ?prefLabel__prefLabel .
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*/(.*)$", "$1")) as ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
  UNION
  {
    ?id crm:P4_has_time-span ?timeSpan__id .
    ?timeSpan__id crm:P82a_begin_of_the_begin ?timeSpan__start .
    ?timeSpan__id crm:P82b_end_of_the_end ?timeSpan__end .
    BIND(CONCAT(STR(?timeSpan__start), " --- " , STR(?timeSpan__end) ) AS ?timeSpan__prefLabel)
  }
  UNION
  {
    ?id crm:P67i_is_referred_to_by ?description__id .
    ?description__id crm:P2_has_type aat:300435416 .
    ?description__id crm:P190_has_symbolic_content ?description__prefLabel .
  }
  UNION
  {
    ?id crm:P3_has_note ?note__id .
    BIND (?note__id AS ?note__prefLabel)
  }
`

export const histEventCollectionsQuery = `
  SELECT DISTINCT ?object__id ?id ?uri__id ?uri__prefLabel ?uri__dataProviderUrl ?prefLabel__id  
  ?object__prefLabel__id ?object__prefLabel__prefLabel ?object__prefLabel__dataProviderUrl
  ?object__uri__id ?object__uri__prefLabel ?object__uri__dataProviderUrl
  ?object__productionPlace__id ?object__productionPlace__prefLabel
  ?object__productionTimeSpan__id ?object__productionTimeSpan__prefLabel
  ?object__image__id ?object__image__url
  ?object__fromActor__id ?object__fromActor__prefLabel ?object__fromActor__dataProviderUrl
  ?object__toActor__id ?object__toActor__prefLabel ?object__toActor__dataProviderUrl
  WHERE {
    <FILTER>
    BIND(<ID> as ?id)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
    ?object__id crm:P141i_was_assigned_by/crm:P141_assigned ?id .
    BIND(?object__id AS ?object__uri__id)
    BIND(?object__id AS ?object__uri__dataProviderUrl)
    BIND(STR(?object__id) AS ?object__uri__prefLabel) 
    {
      ?object__id dct:title ?object__prefLabel__id .
      BIND(?object__prefLabel__id AS ?object__prefLabel__prefLabel)
      BIND(CONCAT("/collections/page/", REPLACE(STR(?object__id), "^.*\\\\/(.+)", "$1")) AS ?object__prefLabel__dataProviderUrl)
    }
    UNION
    {
      ?object__id crm:P108i_was_produced_by/crm:P7_took_place_at ?object__productionPlace__id .
      ?object__productionPlace__id skos:prefLabel ?object__productionPlace__prefLabel .
    }
    UNION
    {
      ?object__id crm:P108i_was_produced_by/crm:P4_has_time-span ?object__productionTimeSpan__id.
      ?object__productionTimeSpan__id crm:P82a_begin_of_the_begin ?object__productionTimeSpan__start .
      ?object__productionTimeSpan__id crm:P82b_end_of_the_end ?object__productionTimeSpan__end .
      BIND(CONCAT(STR(?object__productionTimeSpan__start), " --- " , STR(?object__productionTimeSpan__end) ) AS ?object__productionTimeSpan__prefLabel)
    }
    UNION
    {
      ?object__id crm:P65_shows_visual_item ?i_BNODE .
      ?i_BNODE a crm:E36_Visual_Item .
      ?i_BNODE <https://linked.art/ns/terms/digitally_shown_by> ?object__image__id .
      ?object__image__id <https://linked.art/ns/terms/access_point> ?object__image__url .
    }
    UNION
    {
      {?object__id crm:P24i_changed_ownership_through/crm:P23_transferred_title_from ?object__fromActor__id.}
      UNION 
      {?object__id crm:P30i_custody_transferred_through/crm:P23_transferred_title_from ?object__fromActor__id.}
      ?object__fromActor__id rdfs:label ?object__fromActor__prefLabel .
      BIND(CONCAT("/actors/page/", REPLACE(STR(?object__fromActor__id), "^.*\\\\/(.+)", "$1")) AS ?object__fromActor__dataProviderUrl)
    }
    UNION
    {
      {?object__id crm:P24i_changed_ownership_through/crm:P22_transferred_title_to ?object__toActor__id.}
      UNION 
      {?object__id crm:P30i_custody_transferred_through/crm:P29_custody_received_by ?object__toActor__id.}
      OPTIONAL {?object__toActor__id rdfs:label ?label .}
      BIND(COALESCE(?label, STR(?object__toActor__id)) AS ?object__toActor__prefLabel)
      BIND(CONCAT("/actors/page/", REPLACE(STR(?object__toActor__id), "^.*\\\\/(.+)", "$1")) AS ?object__toActor__dataProviderUrl)
    }
  }Limit 100

`

export const histEventActorsQuery = `
  SELECT DISTINCT ?object__id ?id ?uri__id ?uri__prefLabel ?uri__dataProviderUrl ?prefLabel__id  
  ?object__prefLabel__id ?object__prefLabel__prefLabel ?object__prefLabel__dataProviderUrl
  ?object__uri__id ?object__uri__prefLabel ?object__uri__dataProviderUrl
  ?object__collection_id ?object__collection__prefLabel ?object__collection__dataProviderUrl

  WHERE {
    <FILTER>
    BIND(<ID> as ?id)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
    ?collections crm:P141i_was_assigned_by/crm:P141_assigned ?id .
    ?collections crm:P24i_changed_ownership_through/crm:P23_transferred_title_from ?object__id.
    BIND(?object__id AS ?object__uri__id)
    BIND(?object__id AS ?object__uri__dataProviderUrl)
    BIND(STR(?object__id) AS ?object__uri__prefLabel) 
    {
      ?object__id rdfs:label ?object__prefLabel__id .
      BIND(?object__prefLabel__id AS ?object__prefLabel__prefLabel)
      BIND(CONCAT("/actors/page/", REPLACE(STR(?object__id), "^.*\\\\/(.+)", "$1")) AS ?object__prefLabel__dataProviderUrl)
    }
    UNION
    {
      BIND(?collections AS ?object__collection_id) 
      ?object__collection_id dct:title ?object__collection__prefLabel .
      BIND(CONCAT("/collections/page/", REPLACE(STR(?object__id), "^.*\\\\/(.+)", "$1")) AS ?object__collection__dataProviderUrl)
    }
    
  }Limit 100
  `