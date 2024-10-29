# base-nest-app-template

### Como rodar localmente

#### Variáveis de ambiente:

- Crie um arquivo `.env.local` na raiz do projeto seguindo o arquivo de exemplo `.env.example` substituindo os valores com os valores configurados no ambiente.

#### Banco de dados e backend (container)

- Tenha instalado docker e docker compose.
- Tenha as variáveis de ambientes configuradas como informado do step anterior.
- Na raiz do projeto rode o comando `docker-compose -f dockerfiles/docker-compose-dev.yml up --build`
- Acesse o container `app` com o seguinte comando `docker-compose -f dockerfiles/docker-compose-dev.yml exec app sh`
- Em seguida execute o comando ``npx prisma migrate dev`

#### Backend

- Tenha instalado o nodeJS na versão `20x`
- Na raiz do projeto rode o comando `npm install`
- Em seguida execute o comando ``npx prisma migrate dev`
- Após iniciar banco de dados, rode o comando `npm run dev`

#### Testes Automatizados

- Para executar os testes rode o seguinte comando `npm test` ou `npm t`
  > Dessa forma serão executados todos os testes da aplicação. É necessário estar com banco de dados e variáveis de ambiente de teste configurados.

---

## Sobre

- Essa aplicação é um template com configurações básicas iniciais para agilizar o desenvolvimento de aplicações backend com nestJs

## Padronização de commit

- Para padronização de commits utilizamos o **_[commitizen](https://commitizen-tools.github.io/commitizen/)_**, que usa como base as regras do **_[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)_** que assume que sua equipe usa uma maneira padrão de submeter regras e, a partir dessa base, pode melhorar a versão do seu projeto, criar o changelog e atualizar arquivos

## Versionamento do projeto

- Para versionamento de código, utilizamos os conceitos do **_[Semantic Versioning](https://semver.org/)_** que usa um conjunto simples de regras e requisitos que determinam como os números de versão são atribuídos e incrementados. Essas regras são baseadas, mas não necessariamente limitadas a práticas comuns difundidas pré-existentes em uso em softwares fechados e de código aberto

<!-- ## Estrutura do projeto

```
.
├── src
│   ├── common                 # Common module, shared module config
│   │   ├── domain             # Domain shared files
│   │   ├── enum               # Enum shared
│   │   ├── infra              # Infra shared files
│   │   │    ├── prisma        # Shared prisma models
│   │   │    ├── http          # Shared http module interface
│   │   │    └── database      # Shared database connection config
│   │   ├── pipes              # Global pipes
│   │   └── utils              # Shared utils
│   │
│   └── modules                # Main folder with configs, ports and adapters
│       ├── example            # Domain module, contains all application/business rules
│       │   ├── application    # Application business rules(UseCases)
│       │   ├── domain         # Domain business rules. Entities, repository interfaces and more
│       │   └── infra          # Port communication to external environments
│       └── example.module.ts  # Module configuration entrypoint
│
├── *.env.*                     # Environment configuration per stage
├── docker-compose.yaml         # Application resource provisioning with docker
├── package.json                # Javascript scripts
├── tsconfig.json               # Typescript compiler configuration
``` -->

## Pacotes

- Production
  - [class-validator:0.14.0](https://www.npmjs.com/package/class-validator)
  - [rxjs:7.8.1](https://www.npmjs.com/package/rxjs)
  - [express:4.18.2](https://www.npmjs.com/package/express)
  - [@nestjs/swagger:7.1.16](https://www.npmjs.com/package/@nestjs/swagger)
- Development
  - [eslint:8.54.0](https://www.npmjs.com/package/eslint)
  - [jest:29.7.0](https://www.npmjs.com/package/jest)
  - [prettier:3.1.0](https://npmjs.com/package/prettier)
  - [supertest:6.3.3](https://www.npmjs.com/package/supertest)
  - [typescript:5.3.2](https://www.npmjs.com/package/typescript)
