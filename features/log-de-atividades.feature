# language: pt
Funcionalidade: Log de atividades

  Contexto:
    Dado que eu obtenho o token de autenticação
    Então o status da resposta deve ser 200

  @test
  Cenário: Lista logs de atividades com sucesso
    Quando eu envio uma requisição GET para o endpoint "/api/activity-log" com os parâmetros:
    | page | 0  |
    | size | 20 |
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista
    E o response de log de atividades deve conter os campos:
    | entityId   |
    | entityType |
    | fieldName  |
    | id         |
    | ipAddress  |
    | newValue   |
    | oldValue   |
    | operation  |
    | timestamp  |
    | userId     |
    | username   |

  @test
  Cenário: Lista logs de atividades por ID com sucesso
    Quando eu envio uma requisição GET para "/api/activity-log/" enviando id 1
    Então o status da resposta deve ser 200
    E a resposta deve conter o id 1