# Teste Fullstack

## Tecnologias

### O que deve conter resumidamente

- Vue.js  
- Componentes de interface gráfica  
- Gerenciamento de estado no cliente  
- Análise estática de código (lint)  
- API REST  
- Autenticação com JWT no backend  
- Migrações na camada do backend para criação das tabelas e inserção de dados  
- Estimativa da implementação em horas  
- Um README.md explicando a solução, as escolhas e a estimativa preliminar

### Sugestões de tecnologias

- Pinia para gerenciamento de estado  
- Biblioteca de UI (ex.: Vuetify)  
- AdonisJs ou Laravel para o backend  
- Jest para testes  
- Caso utilize outra stack, justifique no README

## O teste sádico

Melhore e depois arruíne o humor de uma SPA utilizando a API de piadas geek  
API: <https://github.com/sameerkumar18/geek-joke-api>

> “Tive uma ideia genial para fazer as pessoas sorrirem, quanto custa?” — indagou o cliente, perplexo com a falta de felicidade no mundo.

Fluxo narrativo:

1. A aplicação inicia com uma tela de login.  
   - Campos: e-mail (validação de formato) e senha (mínimo 8 caracteres).
2. Após o login, a rota inicial é `/inicial` — humor neutro :|
3. O primeiro clique na tela muda para `/triste` — 100% triste :(
4. Um clique em `/triste` muda para `/poker-face` e solicita ao backend uma piada randômica para exibição em uma modal.
5. A tela melhora gradualmente o humor conforme lemos piadas :)
6. A modal só pode ser fechada quando a tela estiver 100% feliz, na rota `/feliz`.
7. Ao fechar a modal, a SPA volta para `/inicial`, retomando seu humor indeciso.

## Mais requisitos

- Estime, em horas, o esforço para implementação e registre no README.  
- Separe o projeto em backend (API REST) e frontend (consome a API).  
- O backend deve chamar a Geek Joke API e repassar a resposta ao frontend.  
- Crie tabelas e usuário inicial via migração.  
- Usuário padrão: `cliente@incuca.com.br`  
  - Senha: `seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga`.  
- Autenticação via JWT.  
- Persistir o token na sessão (recarregar o navegador não pode exigir novo login).

## Diferenciais

- Testes unitários e de integração.  
- Uso de Docker (rodar `docker-compose up` deve ser suficiente para subir o projeto).

## Dicas

- Os requisitos não cobrem todos os detalhes: cumpra-os e use criatividade nas lacunas.  
- Faça a estimativa antes de iniciar para fins de transparência interna (não há problema em errar).  
- Sugestão: separe a estimativa em duas partes — cumprimento de requisitos e evoluções extras.  
- Os frameworks sugeridos contemplam tudo o que é necessário.  
- Dúvidas? Entre em contato: `rh@incuca.com.br`.

## Avaliação

- **Prazo:** até às 18h do 7º dia.  
- **Critérios:**  
  - Código limpo e organizado  
  - Documentação de código  
  - Documentação do projeto (README.md)  
  - Usabilidade  
  - Criatividade  
  - Entrega (enviar o link do repositório para `rh@incuca.com.br`)