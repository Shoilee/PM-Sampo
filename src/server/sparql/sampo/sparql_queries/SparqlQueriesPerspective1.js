const perspectiveID = 'perspective1'

export const workProperties = `
    {
      ?id dct:title ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(?id AS ?prefLabel__dataProviderUrl)
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
  # TODO: My note is not showing up in the UI
  {
    ?id crm:P3_has_note ?note.
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
