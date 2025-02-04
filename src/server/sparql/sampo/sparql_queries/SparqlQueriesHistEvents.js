const perspectiveID = 'histEvents'

export const histEventProperties =
`  {
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
    ?id crm:P1_is_identified_by ?ID__id .
    ?ID__id crm:P2_has_type aat:300404626.
    ?ID__id crm:P190_has_symbolic_content ?ID__prefLabel .
    BIND(?id as ?ID__dataProviderUrl)
    
  }
  UNION
  {
    ?id crm:P4_has_time-span ?timeSpan__id .
    ?timeSpan__id crm:P82a_begin_of_the_begin ?timeSpan__start .
    ?timeSpan__id crm:P82b_end_of_the_end ?timeSpan__end .
    BIND(CONCAT(STR(?timeSpan__start), " --- " , STR(?timeSpan__end) ) AS ?timeSpan__prefLabel)
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