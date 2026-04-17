# language: pt
Funcionalidade: Busca Token AD Azure

  @test
  Cenário: Buscar Token AD Azure
    Dado que eu obtenho o token de autenticação
    Então o status da resposta deve ser 200