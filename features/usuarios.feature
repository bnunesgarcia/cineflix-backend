# language: pt
Funcionalidade: Usuários

  Contexto:
    Dado que eu obtenho o token de autenticação
    Então o status da resposta deve ser 200

  @test
  Cenário: Lista usuário por e-mail com sucesso
    Quando eu envio requisição GET para "/api/user/email/" com email "brung@rederecord.com.br"
    Então o status da resposta deve ser 200
    E o campo email deve conter o email "brung@rederecord.com.br"

  @test_exclui_user
  Cenário: Deleta usuário com sucesso
    Quando envio uma requisição DELETE para "/api/user" com o id 2
    # BUG - Esta retornando 500 no response
    Então o status da resposta deve ser 200

  