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
        console.log(d);
      container.innerHTML += `
        <div class="col-md-4">
          <div class="card p-3">
            <h5>${d.nome}</h5>
            <a href="./materiais.html?id=${d.disciplinaId}&nome=${encodeURIComponent(d.nome)}" class="btn btn-primary btn-sm mt-2">Ver materiais</a>
          </div>
        </div>
      `;
    });
  } catch (e) {
    console.error(e);
  }
}

async function carregarMateriais() {
    console.log("carregarMateriais() foi chamada");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const nome = params.get("nome");
  document.getElementById("tituloDisciplina").textContent = nome;

  console.log("API URL:", `${apiBase}/material/disciplina/${id}`);

  try {

    const resp = await fetch(`${apiBase}/material/disciplina/${id}`); //${apiBase}/materiais/disciplina/${id}
    const data = await resp.json();
    const container = document.getElementById("materiais");
    container.innerHTML = "";
    data.forEach(m => {
      let conteudo = "";
      if (m.tipo === "video") {
        conteudo = `<video controls width="100%"><source src="${m.url}" type="video/mp4"></video>`;
      } else if (m.tipo === "pdf") {
        conteudo = `<iframe src="${m.url}" width="100%" height="400"></iframe>`;
      } else {
        conteudo = `<a href="${m.url}" target="_blank" class="btn btn-secondary">Abrir Material</a>`;
      }
      container.innerHTML += `
        <div class="col-md-6">
          <div class="card p-3">
            <h5>${m.titulo}</h5>
            ${conteudo}
          </div>
        </div>
      `;
    });
  } catch (e) {
    console.error(e);
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
