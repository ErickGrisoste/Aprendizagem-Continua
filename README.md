# 🎓 Sistema de Gestão de Disciplinas e Materiais

Este projeto tem como objetivo gerenciar **disciplinas** e seus **materiais de estudo**, permitindo o cadastro, listagem e visualização dos conteúdos de forma simples e organizada.  
O sistema foi desenvolvido com **Java (Spring Boot)** no back-end e **HTML, CSS e JavaScript** no front-end, integrando as camadas via API REST.

---

## 🚀 Funcionalidades

- **Cadastro de disciplinas**
- **Cadastro e listagem de materiais**
- **Associação entre material e disciplina**
- **Integração front-end e back-end com requisições REST**
- **Tratamento de erros e mensagens amigáveis**
- **Exibição dinâmica dos dados no front-end**

---

## 🧩 Tecnologias Utilizadas

### 🔙 Back-end
- Java 17  
- Spring Boot  
- Spring Data JPA  
- PostgreSQL  
- Maven  

### 🌐 Front-end
- HTML5  
- CSS3  
- JavaScript (Fetch API)  
- Bootstrap  

---

## 🗂️ Organização do Projeto

O projeto é dividido em duas partes principais:

📁 backend/
│ ├── src/
│ │ ├── main/java/com/aprendizagemcontinua/
│ │ │ ├── config/
│ │ │ ├── controller/
│ │ │ ├── model/
│ │ │ ├── repository/
│ │ │ └── service/
│ │ └── resources/
│ │ └── application.properties
│ └── pom.xml
│
📁 frontend/
├── cadastro.html
├── cadastroAdm.html
├── cadastroAluno.html
├── cadastroDisciplina.html
├── cadastroProfessor.html
├── detalhes.html
├── index.html
├── login.html
├── materiais.html
├── script.js
└── style.css

---

## 🧠 Exemplo de Requisição

Abaixo está um exemplo de função JavaScript que busca todas as disciplinas do servidor e as exibe na tela:

```javascript
async function carregarDisciplinas() {
    try {
        const data = await fetchApi("/disciplina");
        const container = document.getElementById("disciplinas");
        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = "<p>Nenhuma disciplina cadastrada.</p>";
            return;
        }

        data.forEach(d => {
            container.innerHTML += `
                <div class="col-md-4">
                    <div class="card p-3">
                        <h5>${d.nome}</h5>
                        <a href="materias.html?id=${d.disciplinaId}&nome=${encodeURIComponent(d.nome)}" 
                            class="btn btn-primary btn-sm mt-2">
                            Ver materiais
                        </a>
                    </div>
                </div>
            `;
        });
    } catch (e) {
        console.error("Erro ao carregar disciplinas:", e);
        document.getElementById("disciplinas").innerHTML = "<p class='text-danger'>Falha ao carregar disciplinas. Verifique o servidor.</p>";
    }
}
```
🗃️ Banco de Dados
O sistema utiliza PostgreSQL como banco relacional.
As principais tabelas são:

- disciplina

 -- disciplina_id (PK)

 -- nome

- material

 -- material_id (PK)

 -- nome

 -- descricao

 -- disciplina_id (FK)

Relação:
Uma disciplina possui vários materiais, mas cada material pertence a uma única disciplina.

🧭 Organização no JIRA
O desenvolvimento foi acompanhado por meio de boards no JIRA, com as etapas:

Planejamento das sprints

Criação das tasks (front-end, back-end e testes)

Acompanhamento de progresso

Revisão e entrega final

⚙️ Como Executar o Projeto
🖥️ Back-end
Abra o projeto no IntelliJ ou Eclipse.

Configure o arquivo application.properties com seu banco PostgreSQL.

Execute o projeto Spring Boot (classe principal).

🌍 Front-end
Abra a pasta /frontend com o VS Code.

Instale a extensão Live Server.

Clique em “Go Live” no index.html.

