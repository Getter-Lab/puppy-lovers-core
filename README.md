# base-nest-app-template

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
│   ├── application             # Application domain folder
│   │   ├── enums               # Application enumerations
│   │   ├── ports               # Application contracts
│   │   ├── repositories        # Application persistence layer
│   │   │    ├── ports          # Repositories contracts
│   │   │    ├── prisma         # Prisma repositories layer implementation
│   │   │    └── index.ts       # Import/export of all repositories layer
│   │   └── useCases            # Application business rule layer
│   │
│   └── main                    # Main folder with configs, ports and adapters
│       ├── config              # Main configs with factories, responses, envs, db configs and utils
│       ├── controllers         # HTTP api implementation routes
│       ├── queues              # Mediator between queue entry and use cases
│       ├── requests            # Constructor between controllers and use cases, this layer build the necessary controller resources
│       └── schemas             # Input data schema contract and validation
│
├── *.env.*                     # Environment configuration per stage
├── docker-compose.yaml         # Application resource provisioning with docker
├── openapi.yaml                # Open APi file with all http routes
├── package.json                # Javascript scripts
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
└── webpack.config.js           # Webpack configuration
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
