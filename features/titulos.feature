# language: pt
Funcionalidade: Titulos

  Contexto:
    Dado que eu obtenho o token de autenticação
    Então o status da resposta deve ser 200

  @test
  Cenário: Lista todos os titulos com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents" com os parâmetros:
    | page      | 0     |
    | size      | 20    |
    | sort      | title |
    | direction | ASC   |
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista
    E a resposta de titulos deve conter os campos:
    | active        |
    | distributor   |
    | genre         |
    | hd            |
    | id            |
    | originalTitle |
    | processNumber |
    | rating        |
    | title         |
    | type          |
    | year          |

  @test
  Cenário: Lista titulo por ID com sucesso
    Quando eu envio uma requisição GET para "/api/api/contents/" enviando id 1
    Então o status da resposta deve ser 200
    E a resposta deve conter o id 1

  @test
  Cenário: Lista titulo por tipo com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/type/FILME" com os parâmetros:
    | page | 0  |
    | size | 20 |
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista
    E a resposta deve conter o type "FILME"

  @test
  Cenário: Lista titulo por genero com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/genre/Ação" com os parâmetros:
    | page | 0  |
    | size | 20 |
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista
    E a resposta deve conter o genero "AÇÃO"

  @test
  Cenário: Lista titulo por range de ano com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/year-range" com os parâmetros:
    | startYear | 2020 |
    | endYear   | 2024 |
    | page      | 0    |
    | size      | 20   |
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista

  @test
  Cenário: Lista titulo do tipo blockbuster com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/blockbusters" com os parâmetros:
    | page      | 0    |
    | size      | 20   |
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista
    E o campo "blockbuster" deve ser true

  @test
  Cenário: Lista titulo do tipo unrealeased com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/unreleased" com os parâmetros:
    | page      | 0    |
    | size      | 20   |
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista

  @test
  Cenário: Lista titulo do tipo hd com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/hd" com os parâmetros:
    | page      | 0    |
    | size      | 20   |
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista
    E o campo "hd" deve ser true

  @test
  Cenário: Lista titulo com execuções disponiveis com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/available-runs" com os parâmetros:
    | page      | 0    |
    | size      | 20   |
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista
    
  @test
  Cenário: Lista titulo através do nome do filme com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/search" com os parâmetros:
    | title | 12 Heróis |
    Então o status da resposta deve ser 200
    E o titulo da resposta deve conter "12 Heróis"

  @test
  Cenário: Lista titulo recentes com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/recent" com os parâmetros:
    | page      | 0    |
    | size      | 20   |
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista

  @test
  Cenário: Lista nomes do cast utilizando filtro especifico do nome do artista com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/cast-names" com os parâmetros:
    | search | tom    |
    | limit  | 50     |
    Então o status da resposta deve ser 200
    E a lista de nomes deve conter o termo "tom"

  @test
  Cenário: Lista opções de filtros com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/filter-options" com os parâmetros:
    | page      | 0    |
    | size      | 20   |
    Então o status da resposta deve ser 200

  @test
  Cenário: Lista estatisticas de conteúdo com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/api/contents/stats" com os parâmetros:
    | page      | 0    |
    | size      | 20   |
    Então o status da resposta deve ser 200
    