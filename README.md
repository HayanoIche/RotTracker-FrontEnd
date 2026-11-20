# RotTracker

O RotTracker é um projeto da Global Solution 2026/2 da FIAP. Ele ajuda a organizar os alimentos da despensa, da geladeira e do congelador, acompanhar as datas de validade e evitar desperdício em casa.

## Funcionalidades

- Consulta de despensas e acompanhamento das validades dos alimentos.
- Chatbot IBM Watson para tirar dúvidas e abrir formulários de cadastro.
- Página de IA que explica os modelos de previsão de desperdício do projeto.
- Páginas Sobre, Integrantes, FAQ e Contato.

## Tecnologias

- React, TypeScript e Vite
- Tailwind CSS e React Router
- IBM Watson Assistant
- API REST em Java publicada no Render

## Como rodar

Na pasta do projeto, com Node.js e npm instalados, execute:

```bash
npm ci
npm run dev
```

Abra a URL que o Vite mostrar no terminal. Para gerar a versão de produção, execute `npm run build`.

## Configuração do chatbot

Se a configuração do Watson já estiver no `.env` do projeto, basta rodar o front. Caso contrário, crie um `.env.local` ao lado do `package.json` e preencha os valores da integração:

```env
VITE_WATSON_INTEGRATION_ID=
VITE_WATSON_REGION=
VITE_WATSON_SERVICE_INSTANCE_ID=
```

A variável `VITE_CONTATO_EMAIL` é opcional e preenche o destinatário do rascunho de e-mail na página de Contato. Reinicie o Vite depois de alterar as variáveis.

## API

[API Java do RotTracker no Render](https://rottracker-java.onrender.com)

## Integrantes — Turma 1TDSPK

| Nome | RM |
| --- | --- |
| Franco Jared Marquina Blas | 572901 |
| Igor Mateus da Silva | 571751 |
| Marcela Batista Teixeira | 574069 |
| Matheus Pereira Vidal | 573327 |