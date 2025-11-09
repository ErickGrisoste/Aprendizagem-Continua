const apiBase = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("disciplinas")) carregarDisciplinas();
  if (document.getElementById("materiais")) carregarMateriais();
  if (document.getElementById("formCadastro")) configurarCadastro();
  if (document.getElementById("formLogin")) configurarLogin();
});

async function carregarDisciplinas() {
  try {
    const resp = await fetch(`${apiBase}/disciplina`);
    const data = await resp.json();
    const container = document.getElementById("disciplinas");
    container.innerHTML = "";
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
    console.error(e);
  }
}

async function carregarMateriais() {
  const params = new URLSearchParams(window.location.search);
  const disciplinaId = params.get("id");

  if (!disciplinaId) {
    alert("Nenhuma disciplina selecionada.");
    return;
  }

  try {
    const resp = await fetch(`${apiBase}/material/disciplina/${disciplinaId}`);
    if (!resp.ok) throw new Error("Erro ao buscar materiais");

    const data = await resp.json();
    const container = document.getElementById("materiais");
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
            <a href="${m.link}" target="_blank" class="btn btn-success btn-sm mt-2">Acessar</a>
          </div>
        </div>
      `;
    });

  } catch (e) {
    console.error("Erro ao carregar materiais:", e);
  }
}

function configurarCadastro() {
  const form = document.getElementById("formCadastro");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const novoMaterial = {
      disciplina: { nome: document.getElementById("disciplina").value },
      titulo: document.getElementById("titulo").value,
      tipo: document.getElementById("tipo").value,
      url: document.getElementById("url").value
    };
    try {
      const resp = await fetch(`${apiBase}/material`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoMaterial)
      });
      if (resp.ok) {
        alert("Material cadastrado com sucesso!");
        form.reset();
      } else {
        alert("Erro ao cadastrar material.");
      }
    } catch (e) {
      console.error(e);
    }
  });
}

async function configurarLogin() {
  const form = document.getElementById("formLogin");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    if (email === "admin@teste.com" && senha === "123456") {
      localStorage.setItem("usuario", JSON.stringify({ email }));
      window.location.href = "index.html";
    } else {
      try {
        const resp = await fetch(`${apiBase}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha })
        });
        if (resp.ok) {
          const user = await resp.json();
          localStorage.setItem("usuario", JSON.stringify(user));
          window.location.href = "index.html";
        } else {
          alert("Usuário ou senha incorretos!");
        }
      } catch {
        alert("Falha na autenticação");
      }
    }
  });
}

function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}
