const pdvButtonsContainer = document.getElementById("pdv-buttons");
const onlineCountElem = document.getElementById("online-count");
const pdvInfoSection = document.getElementById("pdv-info");
const entrarPdvBtn = document.getElementById("entrar-pdv");

// Gerar botões PDV 1 a 41
for (let i = 1; i <= 41; i++) {
  criarBotaoPDV(i);
}

bloquearBotoesPDV(true);
onlineCountElem.textContent = "0";

function criarBotaoPDV(pdvNum) {
  const btnWrapper = document.createElement("div");
  btnWrapper.className = "pdv-btn";

  const titulo = document.createElement("span");
  titulo.textContent = `PDV ${pdvNum}`;
  titulo.style.flex = "1";

  const acessoRapidoBtn = document.createElement("button");
  acessoRapidoBtn.textContent = "↗";
  acessoRapidoBtn.className = "acesso-rapido";
  acessoRapidoBtn.title = "Acesso rápido ao PDV";

  acessoRapidoBtn.onclick = (e) => {
    e.stopPropagation();
    const ip = pdvNum === 41 ? "192.168.222.179" : `192.168.222.${100 + pdvNum}`;
    const url = `http://${ip}:9898/normal.html`;

    const largura = 900;
    const altura = 700;
    const esquerda = window.screenX + (window.innerWidth - largura) / 2;
    const topo = window.screenY + (window.innerHeight - altura) / 2;

    const popup = window.open(
      url,
      '_blank',
      `width=${largura},height=${altura},left=${esquerda},top=${topo},` +
      'resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no'
    );

    if (popup) popup.focus();
  };

  btnWrapper.appendChild(titulo);
  btnWrapper.appendChild(acessoRapidoBtn);
  btnWrapper.onclick = () => mostrarInfoPDV(pdvNum);
  btnWrapper.classList.add("pdv-desativado");

  pdvButtonsContainer.appendChild(btnWrapper);
}

function mostrarInfoPDV(pdvNum) {
  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = hoje.getMonth() + 1;
  const diaMesString = `${dia}${mes}`;
  const senha = `pdv@${Number(diaMesString) + pdvNum}`;
  const ip = pdvNum === 41 ? "192.168.222.179" : `192.168.222.${100 + pdvNum}`;
  const ssh = `ssh suporte@${ip}`;
  const isWindows = navigator.userAgent.includes("Windows");
  const vncCommand = isWindows
    ? `"C:\\Program Files\\RealVNC\\VNC Viewer\\vncviewer.exe" ${ip}`
    : `vncviewer ${ip}:5900`;

  document.getElementById("pdv-numero").textContent = pdvNum;
  document.getElementById("pdv-ip").textContent = ip;
  document.getElementById("ssh-comando").textContent = ssh;
  document.getElementById("ssh-senha").textContent = senha;
  document.getElementById("vnc-comando").textContent = vncCommand;

  pdvInfoSection.style.display = "block";
}

document.getElementById("liberar").addEventListener("click", () => {
  const senhaDigitada = document.getElementById("senha").value;
  const correta = "1234";
  if (senhaDigitada === correta) {
    bloquearBotoesPDV(false);
  } else {
    alert("Senha incorreta!");
  }
});

function bloquearBotoesPDV(bloquear) {
  const botoes = document.querySelectorAll(".pdv-btn");
  botoes.forEach((btn) => {
    if (bloquear) {
      btn.classList.add("pdv-desativado");
    } else {
      btn.classList.remove("pdv-desativado");
    }
  });
  pdvButtonsContainer.style.pointerEvents = bloquear ? "none" : "auto";
  pdvButtonsContainer.style.opacity = bloquear ? "0.4" : "1";
}

entrarPdvBtn.addEventListener("click", () => {
  const pdvNum = Number(document.getElementById("pdv-numero").textContent);
  if (!pdvNum) return alert("Selecione um PDV antes de entrar.");

  const ip = pdvNum === 41 ? "192.168.222.179" : `192.168.222.${100 + pdvNum}`;
  const url = `http://${ip}:9898/normal.html`;

  const largura = 900;
  const altura = 700;
  const esquerda = window.screenX + (window.innerWidth - largura) / 2;
  const topo = window.screenY + (window.innerHeight - altura) / 2;

  const popup = window.open(
    url,
    '_blank',
    `width=${largura},height=${altura},left=${esquerda},top=${topo},` +
    'resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no'
  );

  if (popup) popup.focus();
});

// Botões copiar
document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const id = btn.dataset.target;
    const texto = document.getElementById(id).textContent;
    navigator.clipboard.writeText(texto).then(() => {
      const original = btn.textContent;
      btn.textContent = "Copiado!";
      setTimeout(() => (btn.textContent = original), 1500);
    });
  });
});
