const apiBase = "http://localhost:8080/api"; // ajuste se necessário

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("disciplinas")) carregarDisciplinas();
  if (document.getElementById("materiais")) carregarMateriais();
  if (document.getElementById("formCadastro")) configurarCadastro();
});

async function carregarDisciplinas() {
  try {
    const resp = await fetch(`${apiBase}/disciplinas`);
    const data = await resp.json();
    const container = document.getElementById("disciplinas");
    container.innerHTML = "";

    data.forEach(d => {
      container.innerHTML += `
        <div class="col-md-4">
          <div class="card p-3">
            <h5>${d.nome}</h5>
            <a href="materiais.html?id=${d.id}&nome=${encodeURIComponent(d.nome)}" class="btn btn-primary btn-sm mt-2">Ver materiais</a>
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
  const id = params.get("id");
  const nome = params.get("nome");
  document.getElementById("tituloDisciplina").textContent = nome;

  try {
    const resp = await fetch(`${apiBase}/materiais/disciplina/${id}`);
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
      const resp = await fetch(`${apiBase}/materiais`, {
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