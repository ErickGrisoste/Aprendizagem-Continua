const apiBase = "http://localhost:8080";

// --- Funções Auxiliares Reutilizáveis ---

/**
 * Função genérica para lidar com todas as chamadas à API.
 * @param {string} endpoint O caminho da URL (ex: /material, /disciplina).
 * @param {string} method Método HTTP (GET, POST, PUT, DELETE).
 * @param {object} [bodyData=null] Dados a serem enviados no corpo da requisição.
 * @returns {Promise<any>} O corpo da resposta da API (JSON).
 */
async function fetchApi(endpoint, method = 'GET', bodyData = null) {
    const url = `${apiBase}${endpoint}`;
    const config = {
        method: method,
        headers: {
            // Garante que enviamos e esperamos JSON na maioria dos casos.
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };

    if (bodyData) {
        config.body = JSON.stringify(bodyData);
    }

    try {
        const resp = await fetch(url, config);

        if (!resp.ok) {
            // Tenta pegar o erro do corpo da resposta, se houver
            const errorText = await resp.text();
            console.error(`Falha no ${method} ${endpoint}: Status ${resp.status}`, errorText);
            throw new Error(`Erro ${resp.status}: Falha na requisição. Verifique o console.`);
        }
        
        // Retorna o JSON se a resposta não for 204 No Content
        return resp.status !== 204 ? await resp.json() : null;

    } catch (error) {
        // Erro de rede ou erro lançado acima
        console.error("Erro na comunicação com o servidor:", error);
        throw new Error("⚠️ Erro de conexão. Verifique se o backend está rodando.");
    }
}


// --- Funções de Inicialização (DOMContentLoaded) ---

document.addEventListener("DOMContentLoaded", () => {
    // Note: Usamos o Optional Chaining (?.) para checar o elemento de forma concisa.
    if (document.getElementById("disciplinas")) carregarDisciplinas();
    if (document.getElementById("disciplina")) carregarDisciplinasSelect();
    if (document.getElementById("materiais")) carregarMateriais();
    
    // Configuração de Formulários
    document.getElementById("formCadastro")?.addEventListener("submit", configurarCadastro);
    document.getElementById("formCadastroDisciplina")?.addEventListener("submit", configurarCadastroDisciplina);
    document.getElementById("formLogin")?.addEventListener("submit", configurarLogin);
    
    if (document.getElementById("detalhesMaterial")) carregarDetalhesMaterial();
});


// --- Funções de Listagem (GET) ---

async function carregarDisciplinas() {
    try {
        // Rota esperada: GET http://localhost:8080/disciplina
        const data = await fetchApi("/disciplina");
        const container = document.getElementById("disciplinas");
        
        container.innerHTML = ""; // Limpa antes de preencher

        if (data.length === 0) {
             container.innerHTML = "<p>Nenhuma disciplina cadastrada.</p>";
             return;
        }

        data.forEach(d => {
            container.innerHTML += `
                <div class="col-md-4">
                    <div class="card p-3">
                        <h5>${d.nome}</h5>
                        <a href="materiais.html?id=${d.disciplinaId}&nome=${encodeURIComponent(d.nome)}" 
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

async function carregarDisciplinasSelect() {
    const select = document.getElementById("disciplina");

    try {
        // Rota esperada: GET http://localhost:8080/disciplina
        const disciplinas = await fetchApi("/disciplina");
        select.innerHTML = '<option value="">Selecione uma disciplina...</option>';

        disciplinas.forEach(d => {
            const opt = document.createElement("option");
            opt.value = d.disciplinaId; 
            opt.textContent = d.nome;
            select.appendChild(opt);
        });

    } catch (e) {
        console.error(e);
        select.innerHTML = '<option value="">Erro ao carregar disciplinas</option>';
    }
}

async function carregarMateriais() {
    const params = new URLSearchParams(window.location.search);
    const disciplinaId = params.get("id");
    const container = document.getElementById("materiais");

    if (!disciplinaId) {
        container.innerHTML = "<p>Nenhuma disciplina selecionada na URL.</p>";
        return;
    }

    try {
        // Rota esperada: GET http://localhost:8080/material/disciplina/{id}
        const data = await fetchApi(`/material/disciplina/${disciplinaId}`);
        const titulo = document.getElementById("tituloDisciplina");

        container.innerHTML = "";
        titulo.textContent = `Materiais da disciplina #${disciplinaId}`;

        if (data.length === 0) {
            container.innerHTML = "<p>Nenhum material encontrado.</p>";
            return;
        }

        data.forEach(m => {
            container.innerHTML += `
                <div class="col-md-4">
                    <div class="card p-3">
                        <h5>${m.titulo}</h5>
                        <p>${m.descricao || ""}</p>
                        <a href="detalhes.html?id=${m.materialId}" class="btn btn-primary btn-sm mt-2">Ver detalhes</a>
                        <a href="${m.url}" target="_blank" class="btn btn-success btn-sm mt-2">Acessar</a>
                    </div>
                </div>
            `;
        });

    } catch (e) {
        console.error("Erro ao carregar materiais:", e);
        container.innerHTML = "<p class='text-danger'>Falha ao carregar materiais. Verifique o console.</p>";
    }
}

async function carregarDetalhesMaterial() {
    const params = new URLSearchParams(window.location.search);
    const materialId = params.get("id");
    const container = document.getElementById("detalhesMaterial");

    if (!materialId) {
        container.innerHTML = "<h4>Nenhum material selecionado.</h4>";
        return;
    }

    try {
        // Rota esperada: GET http://localhost:8080/material/{id}
        const m = await fetchApi(`/material/${materialId}`);
        const titulo = document.getElementById("tituloMaterial");

        titulo.textContent = m.titulo;

        container.innerHTML = `
            <p><strong>Tipo:</strong> ${m.tipo || "—"}</p>
            <p><strong>Descrição:</strong><br>${m.descricao || "Sem descrição"}</p>
            <p><strong>Disciplina:</strong> ${m.disciplina?.nome || "Não especificada"}</p>
            <a href="${m.url}" target="_blank" class="btn btn-success mt-3">Acessar Material</a>
        `;
    } catch (e) {
        console.error("Erro ao carregar detalhes do material:", e);
        document.getElementById("detalhesMaterial").innerHTML = "<p class='text-danger'>Falha ao carregar detalhes do material. Verifique o console.</p>";
    }
}


// --- Funções de Cadastro (POST) ---

// Configura o formulário de Cadastro de Material.
async function configurarCadastro(e) {
    e.preventDefault();
    const form = e.target;

    const material = {
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        tipo: document.getElementById("tipo").value,
        url: document.getElementById("url").value,
        // O backend espera o objeto Disciplina completo, então enviamos apenas o ID dentro dele.
        disciplina: {
            disciplinaId: parseInt(document.getElementById("disciplina").value)
        }
    };

    try {
        // Rota esperada: POST http://localhost:8080/material
        await fetchApi("/material", "POST", material);
        alert("✅ Material cadastrado com sucesso!");
        form.reset();
        // Recarrega as disciplinas no select, caso o usuário queira cadastrar mais.
        carregarDisciplinasSelect(); 
    } catch (e) {
        alert("❌ Erro ao cadastrar material. Verifique o console para detalhes.");
    }
}

// Configura o formulário de Cadastro de Disciplina.
async function configurarCadastroDisciplina(e) {
    e.preventDefault();
    const form = e.target;
    
    const novaDisciplina = {
        nome: document.getElementById("nome").value,
        professor: document.getElementById("professor").value 
    };

    if (!novaDisciplina.nome || !novaDisciplina.professor) {
        alert("Preencha todos os campos antes de cadastrar!");
        return;
    }

    try {
        // Rota esperada: POST http://localhost:8080/disciplina
        const disciplina = await fetchApi("/disciplina", "POST", novaDisciplina);
        alert(`✅ Disciplina "${disciplina.nome}" cadastrada com sucesso!`);
        form.reset();
    } catch (e) {
        alert("❌ Erro ao cadastrar disciplina. Verifique o console para detalhes.");
    }
}


// Funções de Cadastro (Refatoradas para Reuso)
// OBS: Depende da URL de mapeamento dos seus Controllers (ex: /aluno, /professor, /administrador)
async function cadastrarEntidade(endpoint, data, formId, successMessage) {
    try {
        await fetchApi(endpoint, "POST", data);
        alert(`✅ ${successMessage} cadastrado com sucesso!`);
        document.getElementById(formId)?.reset();
    } catch (e) {
        alert(`❌ Erro ao cadastrar ${successMessage.toLowerCase()}. Verifique o console.`);
    }
}

async function cadastrarAluno() {
    const aluno = { 
        nome: document.getElementById("nome").value, 
        ra: document.getElementById("ra").value 
    };
    await cadastrarEntidade("/aluno", aluno, "formAluno", "Aluno");
}

async function cadastrarProfessor() {
    const professor = { 
        nome: document.getElementById("nome").value, 
        ra: document.getElementById("ra").value 
    };
    await cadastrarEntidade("/professor", professor, "formProfessor", "Professor");
}

async function cadastrarAdministrador() {
    const administrador = { 
        nome: document.getElementById("nome").value 
    };
    await cadastrarEntidade("/administrador", administrador, "formAdmin", "Administrador");
}


// --- Função de Login e Logout ---

async function configurarLogin(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Lógica de Admin Local
    if (email === "admin@teste.com" && senha === "123456") {
        localStorage.setItem("usuario", JSON.stringify({ email: email, role: "ADMIN_LOCAL" }));
        window.location.href = "index.html";
        return;
    }
    
    // Autenticação na API
    try {
        // Rota esperada: POST http://localhost:8080/login
        const user = await fetchApi("/login", "POST", { email, senha });
        localStorage.setItem("usuario", JSON.stringify(user));
        window.location.href = "index.html";
    } catch (error) {
        alert("Usuário ou senha incorretos ou falha na autenticação.");
        console.error("Falha no Login:", error);
    }
}

function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}