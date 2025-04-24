const perspectiveID = 'actors'

export const actorProperties = `
    {
      ?id rdfs:label ?prefLabel__id .
      BIND(STR(?prefLabel__id) AS ?prefLabel__prefLabel)
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id pm:identified_by ?name__id .
      BIND(?name__id AS ?name__prefLabel)
    }
    UNION
    {
      ?id a ?type__id .
      BIND(CONCAT("crm:", REPLACE(STR(?type__id), "^.*\\\\/(.+)", "$1")) AS ?type__prefLabel)
      BIND(?id AS ?type__dataProviderUrl)
    }
    UNION{
      ?id pm:roles ?role__id .
      BIND(?role__id AS ?role__prefLabel)
    }
    UNION{
      ?id pm:gender ?gender__id .
      BIND(?gender__id AS ?gender__prefLabel)
    }
    UNION{
      ?id pm:nationality ?nationality__id .
      BIND(?nationality__id AS ?nationality__prefLabel)
    }
    UNION{
      ?id pm:biography ?biography__id .
      BIND(?biography__id AS ?biography__prefLabel)
    }
    UNION{
      ?id pm:remarks ?remarks__id .
      BIND(?remarks__id AS ?remarks__prefLabel)
    }
    UNION{
      ?id pm:profession ?profession__id .
      BIND(?profession__id AS ?profession__prefLabel)
    }
`

export const actorHistoricatEventsQuery = `
  SELECT DISTINCT ?object__id ?id ?uri__id ?uri__prefLabel ?uri__dataProviderUrl ?prefLabel__id  
  ?object__prefLabel__id ?object__prefLabel__prefLabel ?object__prefLabel__dataProviderUrl
  ?object__uri__id ?object__uri__prefLabel ?object__uri__dataProviderUrl
  ?object__histEventTimeSpan__id ?object__histEventTimeSpan__prefLabel
  ?object__histEventDescription__id ?object__histEventDescription__prefLabel
  WHERE {
    <FILTER>
    BIND(<ID> as ?id)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)

    ?collection crm:P24i_changed_ownership_through ?acqEvent .
  	?acqEvent crm:P23_transferred_title_from ?id .
    ?collection pm:related_to ?object__id.
    BIND(?object__id AS ?object__uri__id)
    BIND(?object__id AS ?object__uri__dataProviderUrl)
    BIND(STR(?object__id) AS ?object__uri__prefLabel) 
    {
      ?object__id a ?object__type__id .
      BIND(?object__type__id as ?object__type__dataProviderUrl)
      BIND(REPLACE(STR(?object__type__id), "^.*/(.*)$", "$1") as ?object__type__prefLabel)
    }
    UNION {
      ?object__id crm:P1_is_identified_by ?object__prefLabel__id .
      ?object__prefLabel__id crm:P2_has_type aat:300404650.
      ?object__prefLabel__id crm:P190_has_symbolic_content ?object__prefLabel__prefLabel .
      BIND(CONCAT("/histEvents/page/", REPLACE(STR(?object__id), "^.*/(.*)$", "$1")) as ?object__prefLabel__dataProviderUrl)
    }
    UNION {
      ?object__id crm:P4_has_time-span ?object__histEventTimeSpan__id .
      ?object__histEventTimeSpan__id crm:P82a_begin_of_the_begin ?object__histEventTimeSpan__start .
      ?object__histEventTimeSpan__id crm:P82b_end_of_the_end ?object__histEventTimeSpan__end .
      BIND(CONCAT(STR(?object__histEventTimeSpan__start), " --- ", STR(?object__histEventTimeSpan__end)) AS ?object__histEventTimeSpan__prefLabel)
    }
    UNION {
      ?object__id crm:P67i_is_referred_to_by ?object__histEventDescription__id .
      ?object__histEventDescription__id crm:P2_has_type aat:300435416 .
      ?object__histEventDescription__id crm:P190_has_symbolic_content ?object__histEventDescription__prefLabel .
    }
  }
`

export const actorCollectionsQuery = `
  SELECT DISTINCT ?object__id ?id ?uri__id ?uri__prefLabel ?uri__dataProviderUrl ?prefLabel__id  
  ?object__prefLabel__id ?object__prefLabel__prefLabel ?object__prefLabel__dataProviderUrl
  ?object__uri__id ?object__uri__prefLabel ?object__uri__dataProviderUrl
  ?object__productionPlace__id ?object__productionPlace__prefLabel
  ?object__productionTimeSpan__id ?object__productionTimeSpan__prefLabel
  ?object__image__id ?object__image__url
  ?object__acquisition__id ?object__acquisition__prefLabel ?object__acquisition__dataProviderUrl
  ?object__connection__id ?object__connection__prefLabel
  WHERE {
    <FILTER>
    BIND(<ID> as ?id)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)

    ?object__id crm:P24i_changed_ownership_through ?object__acquisition__id .
    ?object__acquisition__id ?object__connection__id ?id.

    BIND(?object__id AS ?object__uri__id)
    BIND(?object__id AS ?object__uri__dataProviderUrl)
    BIND(STR(?object__id) AS ?object__uri__prefLabel) 

    BIND(CONCAT("/provEvents/page/" , REPLACE(STR(REPLACE(STR(?object__acquisition__id), ':', '%3A', 'i')), '/', '%2F', 'i'), '/table') AS ?object__acquisition__dataProviderUrl)
    BIND(?object__acquisition__id AS ?object__acquisition__prefLabel)

    BIND(REPLACE(STR(?object__connection__id), "^.*/(.+)", "$1") AS ?object__connection__prefLabel)
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
      ?object__id pm:shown_by ?object__image__id .
      BIND (?object__image__id AS ?object__image__url) .
    }
  }
`

export const actorActorsQuery = `
  SELECT DISTINCT ?object__id ?id ?uri__id ?uri__prefLabel ?uri__dataProviderUrl ?prefLabel__id  
  ?object__prefLabel__id ?object__prefLabel__prefLabel ?object__prefLabel__dataProviderUrl
  ?object__uri__id ?object__uri__prefLabel ?object__uri__dataProviderUrl
  ?object__type__id ?object__type__prefLabel ?object__type__dataProviderUrl
  ?object__collection__id ?object__collection__prefLabel ?object__collection__dataProviderUrl
  WHERE {
    <FILTER>
    BIND(<ID> as ?id)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)

    # connection with other actor
    ?acqusiition1 crm:P23_transferred_title_from ?id .
    ?object__collection__id crm:P24i_changed_ownership_through ?acqusiition1 .
    ?acqusiition2 crm:P23_transferred_title_from ?object__id .
    ?object__collection__id crm:P24i_changed_ownership_through ?acqusiition2 .
    FILTER(?id != ?object__id)

    OPTIONAL {?object__collection__id dct:title | rdfs:label ?object__collection__prefLabel .}
    BIND(CONCAT("/collections/page/", REPLACE(STR(?object__collection__id), "^.*\\\\/(.+)", "$1")) AS ?object__collection__dataProviderUrl) 

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
      ?object__id a ?object__type__id .
      BIND(?object__type__id as ?object__type__dataProviderUrl)
      BIND(REPLACE(STR(?object__type__id), "^.*/(.*)$", "$1") as ?object__type__prefLabel)
    }
  }
`

export const actorPlacesQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?actor) as ?instanceCount)
  WHERE {
    <FILTER>
    { ?actor crm:P98i_was_born/crm:P7_took_place_at ?id }
    UNION
    { ?actor crm:P100i_died_in/crm:P7_took_place_at ?id }
    UNION
    { ?actor ^crm:P11_had_participant/crm:P7_took_place_at ?id }
    ?id wgs84:lat ?lat ;
        wgs84:long ?long .
  }
  GROUP BY ?id ?lat ?long
`

export const networkLinksQuery = `
SELECT DISTINCT (?actor as ?source) ?target (COUNT(DISTINCT ?collections) AS ?weight) (str(?weight) as ?prefLabel)
  WHERE {
  <FILTER>
    ?acqusiition1 crm:P23_transferred_title_from ?actor .
    ?collections crm:P24i_changed_ownership_through ?acqusiition1 .
    ?acqusiition2 crm:P23_transferred_title_from ?target .
    ?collections crm:P24i_changed_ownership_through ?acqusiition2 .
    FILTER(?actor != ?target)
} GROUP BY ?actor ?target
`

export const networkNodesFacetQuery = `
 SELECT DISTINCT ?id ?prefLabel ?class ?href
 WHERE {
   VALUES ?class {crm:E21_Person crm:E74_Group crm:E39_Actor}
    VALUES ?id { <ID_SET> }
    ?id a ?class ;
    rdfs:label ?_label .
    
    BIND(?_label AS ?prefLabel)
    BIND(CONCAT("../../actors/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?href)
  }
`