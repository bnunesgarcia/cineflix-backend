# language: pt
Funcionalidade: Departamentos

  Contexto:
    Dado que eu obtenho o token de autenticação
    Então o status da resposta deve ser 200

  @test
  Cenário: Lista departamentos com sucesso
    Quando eu envio uma requisição GET para "/api/department" com page 0 e size 20
    Então o status da resposta deve ser 200
    E a resposta deve conter uma lista
    E o response deve conter os campos "id", "name" e "description"

  @test
  Cenário: Lista departamento por ID com sucesso
    Quando eu envio uma requisição GET para "/api/department/" enviando id 47
    Então o status da resposta deve ser 200
    E a resposta deve conter o id 47

  @test
  Cenário: Cria departamentos com sucesso
    Quando eu envio uma requisição POST para "/api/department" com os dados do departamento
    Então o status da resposta deve ser 201
    E a resposta deve conter os dados do departamento criado

  @test
  Cenário: Alterar departamento
    Quando eu envio uma requisição PATCH para "/api/department" com dados para alteracao com o id 1
    Então o status da resposta deve ser 200

  @test_exclui
  Esquema do Cenário: Exclui departamentos com sucesso
    Quando envio uma requisição DELETE para "/api/department" com o nome <departmentName>
    Então o status da resposta deve ser 200

    Exemplos:
      | departmentName  |
      # | Tecnologia      |
      # | Tecnologia_2    |
      # | Tecnologia_803  |
      # | Tecnologia_5021 |
      # | Tecnologia_5010 |
      # | Tecnologia_1168 |
      # | Tecnologia_8761 |
      # | Tecnologia_3925 |
      # | Tecnologia_8823 |