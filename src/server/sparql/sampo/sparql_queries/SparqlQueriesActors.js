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
