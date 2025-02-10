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
      ?id crm:P1_is_identified_by ?name__id .
      ?name__id crm:P2_has_type aat:300404650 .
      ?name__id crm:P190_has_symbolic_content ?name__prefLabel .

    }
    UNION
    {
      ?id a ?type__id .
      BIND(CONCAT("crm:", REPLACE(STR(?type__id), "^.*\\\\/(.+)", "$1")) AS ?type__prefLabel)
      BIND(?id AS ?type__dataProviderUrl)
    }
    UNION{
      ?id crm:P2_has_type ?role__id .
      ?role__id skos:prefLabel|rdfs:label ?role__prefLabel .
    }
    UNION{
      ?id crm:P67i_is_referred_to_by ?gender__id .
      ?gender__id crm:P2_has_type aat:300055147 .
      ?gender__id crm:P190_has_symbolic_content ?gender__prefLabel .
    }
    UNION{
      ?id crm:P67i_is_referred_to_by ?gender__id .
      ?gender__id crm:P2_has_type aat:300055147 .
      ?gender__id crm:P190_has_symbolic_content ?gender__prefLabel .
    }
`

export const actorHistoricatEventsQuery = `
  SELECT DISTINCT ?object__id ?id ?uri__id ?uri__prefLabel ?uri__dataProviderUrl ?prefLabel__id  
  ?object__prefLabel__id ?object__prefLabel__prefLabel ?object__prefLabel__dataProviderUrl
  ?object__uri__id ?object__uri__prefLabel ?object__uri__dataProviderUrl
  ?object__timeSpan__id ?object__timeSpan__prefLabel
  ?object__description__id ?object__description__prefLabel
  WHERE {
    <FILTER>
    BIND(<ID> as ?id)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
    [crm:P24i_changed_ownership_through [?p ?id]] crm:P141i_was_assigned_by/crm:P141_assigned ?object__id .
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
      ?object__id crm:P4_has_time-span ?object__timeSpan__id .
      ?object__timeSpan__id crm:P82a_begin_of_the_begin ?object__timeSpan__start .
      ?object__timeSpan__id crm:P82b_end_of_the_end ?object__timeSpan__end .
      BIND(CONCAT(STR(?object__timeSpan__start), " --- ", STR(?object__timeSpan__end)) AS ?object__timeSpan__prefLabel)
    }
    UNION {
      ?object__id crm:P67i_is_referred_to_by ?object__description__id .
      ?object__description__id crm:P2_has_type aat:300435416 .
      ?object__description__id crm:P190_has_symbolic_content ?object__description__prefLabel .
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
