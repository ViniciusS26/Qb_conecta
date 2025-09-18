# AQBA - SISTEMA PARA GERENCIAMENTO DA ASSOCIAÇÃO QUILOMBOLA BREJÃO DOS AIPINS

# Descrição

Este repositório se destina para o desenvolvimento do sistema da associação da Comunidade Quilombola Brejão dos Aipins

# Tecnologias Utilizadas

# Frontend

Vue.js

Vuetify

NodeJS

# Backend

Python

FastAPI

Pydantic (para gerenciamento de schemas)

SQLAlchemy (para gerenciamento de tabelas do banco de dados)

PostgreSQL

Docker (para conteinerização)

# Requisitos

Certifique-se de ter instalado os seguintes softwares antes de iniciar o projeto:

Node.js (para executar o frontend)

Docker (para conteinerização do backend e banco de dados)

Python 3.10+ (caso deseje rodar o backend sem Docker)

# Como Rodar o Projeto

## Clonando o Repositório

```
git clone https://github.com/Vinicius02612/sistema_da_associacao.git
cd sistema_da_associacao
```

## Rodando com Docker

Instale o docker e docker-compose


## Rodando Manualmente

Backend

Instale as dependências do backend: 

```
sudo apt-get update
sudo apt-get install ./docker-desktop-amd64.deb

```


```
cd Backend

pip install -r requirements.txt 
```

Execute o backend:

``` 
uvicorn main:app --reload 
```

Frontend

Instale as dependências do frontend:

``` 
cd Frontend 
npm install 
```

Execute o frontend:

``` 
npm run dev
```


# Estrutura do Projeto

```
/sistema_da_associacao
|-- /Backend
    | -- /  # Código do backend com FastAPI
|-- /Frontend
    |--   # Código do frontend com Vue.js e Vuetify
|-- docker-compose.yml  # Configuração do Docker
|-- README.md  # Este arquivo
```


# Tabela de Versões (Implementação do Figma)

| Titulo       | Descrição                       | Data           | Responsável                                        | 
| :---         |     :---:                       | :---           |      ---:                                          |
| Tela login   | Protótipo da tela de Login  e Cadastro |  07/04/2025    | Mayra Caetano[GitHub:](https://github.comMay-Raa)  |
| Tela Adminstrador   | Protótipo da tela Sócio   |  07/04/2025    | Mayra Caetano[GitHub:](https://github.com/May-Raa) |
| Tela listagem de Sócios | Tabela com a lista de Sócios cadastrados| 08/04/2025 | Mayra Caetano[GitHub:](https://github.com/May-Raa) |
| Tela Adicionar Sócio | Protótipo da tela de adicionar Sócio | 08/04/2025 | Mayra Caetano[GitHub:](https://github.com/May-Raa) |
| Tela de Editar Sócio | Prótipo da tela de Sócio | 08/04/2025 | Mayra Caetano[GitHub:](https://github.com/May-Raa)
| Tela de Listagem de Projetos | Protótipo da Tela de lista de Projetos| 09/03/2024 |  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Tela de Editar Projeto | Protótipo da Tela de Editar Projeto| 09/03/2024 |  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Tela de Adicionar Projeto | Protótipo da Tela de Adicionar Projeto| 09/03/2024 |  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Tela de Mensalidades | Protótipo da Tela de Mensalidades| 23/04/2024 |  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Correção do fluxo | Correção do fluxo do Usuário ADM| 23/04/2024 |  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Criação do Módulo "Financeiro" | Alteração da tela de Mensalidades para gerenciamento do Financeiro| 24/04/2024 |  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Tela de listagem de Receitas | Criação da tela de Receitas | 25/04/2024 |  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Editar e Adicionar Receitas | Fluxo para edição e adição de Receitas | 25/04/2024 |  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Tela de listagem de Despesas | Criação da tela de Despesas | 25/04/2025 |  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Editar e Adicionar Despesas | Fluxo para edição e adição de Despesas | 25/04/2025 |  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Tela de Finanças | Tabela de Mensalidades | 28/05/2025|  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Gerenciar Finanças | Fluxo para adição e edição de Mensalidades | 10/06/2025|  Mayra Caetano[GitHub:](https://github.com/May-Raa).|
| Vincular Sòcios | Fluxo para vincular sócios a um projeto | 10/06/2025|  Mayra Caetano[GitHub:](https://github.com/May-Raa).|


## Link para o figma:

Figma Sistema Associação [figma:](https://www.figma.com/design/qz8cxCq66quwiOBnGCdRZ0/Sistema-Associa%C3%A7%C3%A3o?node-id=558-16&p=f&t=7RM1VE3pdhgqcce0-0)


# Teste de Usabilidade
Para a realização dos testes de usabilidade deste projeto, foi adotada a recomendação proposta por **Jakob Nielsen (2000)**, que defende que um grupo de cinco participantes é suficiente para identificar aproximadamente 80% dos problemas de usabilidade em um produto digital. Essa abordagem é amplamente utilizada em projetos de UX (User Experience - Experiência do Usuário) por sua eficiência, permitindo a detecção das principais falhas com um número reduzido de usuários.

No contexto deste projeto, os cinco participantes convidados fazem parte da própria Associação Quilombola Brejão dos Aipins (AQBA), o que garantiu a representatividade do público-alvo na avaliação. Cada participante recebeu um link com acesso ao sistema em funcionamento, bem como um link para um formulário com questões quantitativas, baseadas em uma escala de concordância de 1 a 5, onde:

   - 1 = Discordo totalmente
   - 2 = Discordo parcialmente
   - 3 = Neutro
   - 4 = Concordo parcialmente
   - 5 = Concordo totalmente

# Resultados

| Idade     | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 |
|-----------|----|----|----|----|----|----|----|----|
| 53 anos   | 3  | 3  | 4  | 4  | 3  | 4  | 3  | 5  |
| 45 anos   | 5  | 5  | 5  | 5  | 5  | 4  | 5  | 5  |
| 32 anos   | 5  | 5  | 5  | 5  | 5  | 5  | 5  | 5  |
| 27 anos   | 4  | 4  | 4  | 4  | 4  | 5  | 4  | 5  |
| 38 anos   | 4  | 4  | 4  | 4  | 4  | 4  | 4  | 5  |
| **Média** | 4.2| 4.2| 4.4| 4.4| 4.2| 4.4| 4.2| 5.0|

**Legenda das Perguntas:**

- **P1** — Interface fácil de usar  
- **P2** — Entendeu rapidamente como utilizar  
- **P3** — Ícones e botões compreensíveis  
- **P4** — Informações organizadas  
- **P5** — Navegação intuitiva  
- **P6** — Aparência agradável  
- **P7** — Sistema eficiente  
- **P8** — Usaria o sistema na associação


# Contribuição

<img src="https://github.com/aleffericlys.png" width="100" height="100" style="border-radius: 50%;" > <h3>Alef Fericlys[GitHub:](https://github.com/aleffericlys)</h3> 

<img src="https://github.com/Vinicius02612.png" width="100" height="100" style="border-radius: 50%;"><h3>Vinicius Nunes[GitHub:](https://github.com/Vinicius02612)</h3> 

<img src="https://github.com/May-Raa.png" width="100" height="100" style="border-radius: 50%;" ><h3>Mayra Caetano[GitHub:](https://github.com/May-Raa) 
</h3> 

<img src="https://github.com/Mrprince0421.png" width="100" height="100" style="border-radius: 50%;" ><h3>\Marcos Eduardo[GitHub:](https://github.com/Mrprince0421) 
</h3> 

