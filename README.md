# App

GymPass style app.

## RFs (Requisitos Funcionais)

- [✅] O usuário deve ser capaz de se cadastrar na aplicação.
- [✅] O usuário deve ser capaz de se autenticar na aplicação.
- [✅] O usuário deve ser capaz de realizar check-ins.
- [✅] O usuário deve ser capaz de obter o perfil do usuário logado.
- [✅] O usuário deve ser capaz de obter o número de check-ins do usuário logado.
- [✅] O usuário deve ser capaz de obter o seu historico de check-ins.
- [ ] O usuário deve ser capaz de buscar academias próximas.
- [✅] O usuário deve ser capaz de buscar academias por nome.
- [ ] A academia deve ser capaz de validar o check-in do usuário.
- [✅] Deve ser possível cadastrar academias.

## RNFs (Requisitos Não Funcionais)

- [✅] A aplicação deve ser desenvolvida em React.
- [✅] A aplicação deve ser desenvolvida em TypeScript.
- [✅] A aplicação deve ser responsiva.
- [✅] A senha do usuário deve ser criptografada.
- [✅] Os dados da aplicação precisam estar persistidos em um banco de dados PostgreSQL.
- [✅] Todas as listas de dados devem ser paginadas (20 itens por página).
- [✅] O usuário deve ser identificados por um token JWT.

## RNs (Regras de Negócio)

- [✅] O usuário não pode se cadastrar com o mesmo e-mail.
- [✅] O usuário não pode fazer 2 check-ins no mesmo dia.
- [✅] O usuário não pode fazer check-in se não estiver próximo a uma academia. (100m)
- [ ] O check-in só pode ser validado até 20 min após o check-in.
- [ ] O check-in só pode ser validado pela academia que o usuário fez o check-in.
