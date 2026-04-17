# language: pt
Funcionalidade: Perfil de Acesso

  Contexto:
    Dado que eu obtenho o token de autenticação
    Então o status da resposta deve ser 200

  @test
  Cenário: Lista perfis de acesso com sucesso
    Quando eu envio uma requisição GET para "/api/access-profile" com page 0 e size 20
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista
    E o response deve conter os campos "id", "title" e "description"
    E deve existir o campo "roles"
    E o campo roles deve conter os campos:
    | id          |
    | value       |
    | title       |
    | description |
    | enabled     |

  @test
  Cenário: Lista perfil de acesso por ID com sucesso
    Quando eu envio uma requisição GET para "/api/access-profile/" enviando id 1
    Então o status da resposta deve ser 200
    E a resposta deve conter o id 1

  @test
  Cenário: Cria perfil de acesso com sucesso
    Quando eu envio uma requisição POST para "/api/access-profile" com os dados do perfil
    Então o status da resposta deve ser 201
    E a resposta deve conter os dados do perfil criado

  @test
  Cenário: Alterar perfil de acesso com sucesso
    Quando eu envio uma requisição PATCH para "/api/access-profile"
    Então o status da resposta deve ser 200

  @test_exclui_perfil
  Esquema do Cenário: Exclui perfil de acesso com sucesso
    Quando envio uma requisição DELETE para "/api/access-profile" com o titulo <profileName>
    # BUG - Esta retornando 500 no response
    Então o status da resposta deve ser 200

    Exemplos:
      | profileName     |
      | Perfil_4565     |
      # | Tecnologia_2    |
      # | Tecnologia_803  |
      # | Tecnologia_5021 |
      # | Tecnologia_5010 |
      # | Tecnologia_1168 |
      # | Tecnologia_8761 |
      # | Tecnologia_3925 |
      # | Tecnologia_8823 |