# language: pt
Funcionalidade: Roles

  Contexto:
    Dado que eu obtenho o token de autenticação
    Então o status da resposta deve ser 200

  @test
  Cenário: Lista roles com sucesso
    Quando eu envio uma requisição GET para "/api/role"
    Então o status da resposta deve ser 200
    E o array de roles deve conter:
    | id          |
    | value       |
    | title       |
    | description |
    | enabled     |