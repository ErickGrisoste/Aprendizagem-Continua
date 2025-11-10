const apiBase = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("disciplinas")) carregarDisciplinas();
  if (document.getElementById("disciplina")) carregarDisciplinasSelect();
  if (document.getElementById("materiais")) carregarMateriais();
  if (document.getElementById("formCadastro")) configurarCadastro();
  if (document.getElementById("formCadastroDisciplina")) configurarCadastroDisciplina();
  if (document.getElementById("formLogin")) configurarLogin();
  if (document.getElementById("detalhesMaterial")) carregarDetalhesMaterial();
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
            <a href="/FRONT/materias.html?id=${d.disciplinaId}&nome=${encodeURIComponent(d.nome)}" 
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
        <a href="detalhes.html?id=${m.materialId}" class="btn btn-primary btn-sm mt-2">Ver detalhes</a>
        <a href="${m.url}" target="_blank" class="btn btn-success btn-sm mt-2">Acessar</a>
      </div>
    </div>
  `;
});

  } catch (e) {
    console.error("Erro ao carregar materiais:", e);
  }
}

async function carregarDisciplinasSelect() {
  const select = document.getElementById("disciplina");

  try {
    const resp = await fetch(`${apiBase}/disciplina`);
    if (!resp.ok) throw new Error("Erro ao carregar disciplinas");

    const disciplinas = await resp.json();
    select.innerHTML = '<option value="">Selecione uma disciplina...</option>';

    disciplinas.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d.disciplinaId; // 👈 ID vai escondido aqui
      opt.textContent = d.nome;
      select.appendChild(opt);
    });

  } catch (e) {
    console.error(e);
    select.innerHTML = '<option value="">Erro ao carregar disciplinas</option>';
  }
}


async function configurarCadastro() {
  const form = document.getElementById("formCadastro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const material = {
      titulo: document.getElementById("titulo").value,
      descricao: document.getElementById("descricao").value,
      tipo: document.getElementById("tipo").value,
      url: document.getElementById("url").value,
      disciplina: {
        disciplinaId: parseInt(document.getElementById("disciplina").value)
      }
    };

    console.log("🎯 Material a ser enviado:", JSON.stringify(material, null, 2));

    try {
      const resp = await fetch(`${apiBase}/material`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(material)
      });

      if (resp.ok) {
        alert("✅ Material cadastrado com sucesso!");
        form.reset();
      } else {
        alert("❌ Erro ao cadastrar material.");
      }
    } catch (e) {
      console.error(e);
      alert("⚠️ Erro na comunicação com o servidor.");
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

async function carregarDetalhesMaterial() {
  const params = new URLSearchParams(window.location.search);
  console.log(Object.fromEntries(params.entries()));
  const materialId = params.get("id");

  if (!materialId) {
    alert("Nenhum material selecionado.");
    return;
  }

  try {
    const resp = await fetch(`${apiBase}/material/${materialId}`);
    if (!resp.ok) throw new Error("Erro ao buscar material.");

    const m = await resp.json();
    console.log(m);
    const container = document.getElementById("detalhesMaterial");
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
  }
}

function configurarCadastroDisciplina() {
  const form = document.getElementById("formCadastroDisciplina");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await cadastrarDisciplina(form);
  });
}

async function cadastrarDisciplina(form) {
  const nome = document.getElementById("nome").value;
  const professor = document.getElementById("professor").value;

  if (!nome || !professor) {
    alert("Preencha todos os campos antes de cadastrar!");
    return;
  }

  const novaDisciplina = { nome, professor };

  console.log("📦 Enviando:", JSON.stringify(novaDisciplina));

  try {
    const response = await fetch(`${apiBase}/disciplina`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novaDisciplina)
    });

    if (response.ok) {
      const disciplina = await response.json();
      alert(`✅ Disciplina "${disciplina.nome}" cadastrada com sucesso!`);
      form.reset();
    } else {
      const error = await response.text();
      alert("❌ Erro ao cadastrar disciplina: " + error);
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("⚠️ Erro ao conectar com o servidor.");
  }
}