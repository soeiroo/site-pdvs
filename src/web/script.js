const pdvButtonsContainer = document.getElementById("pdv-buttons");
const onlineCountElem = document.getElementById("online-count");
const pdvInfoSection = document.getElementById("pdv-info");
const entrarPdvBtn = document.getElementById("entrar-pdv");

// Gerar botões PDV 1 a 41
for (let i = 1; i <= 41; i++) {
  criarBotaoPDV(i);
}

// Inicialmente bloqueia botões PDV
bloquearBotoesPDV(true);

// Atualiza contador de PDVs online (simulado)
atualizarOnlineCount();

function criarBotaoPDV(pdvNum) {
  const btn = document.createElement("button");
  btn.className = "pdv-btn";
  btn.textContent = `PDV ${pdvNum}`;
  btn.disabled = true; // bloqueado inicialmente
  btn.onclick = () => mostrarInfoPDV(pdvNum);
  pdvButtonsContainer.appendChild(btn);
}

function mostrarInfoPDV(pdvNum) {
  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = hoje.getMonth() + 1;
  const diaMesString = `${dia}${mes}`;
  const soma = Number(diaMesString) + pdvNum;
  const senha = `pdv@${soma}`;

  let ip;
  if (pdvNum === 41) {
    ip = "192.168.222.179";
  } else {
    ip = `192.168.222.${100 + pdvNum}`;
  }

  const ssh = `ssh suporte@${ip}`;

  // Detecta Windows ou não para comando VNC
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

// Copiar texto corrigido com evento passado
function copiarTexto(event, id) {
  const texto = document.getElementById(id).textContent;
  navigator.clipboard.writeText(texto).then(() => {
    const botao = event.target;
    const textoOriginal = botao.textContent;
    botao.textContent = "Copiado!";
    setTimeout(() => {
      botao.textContent = textoOriginal;
    }, 1500);
  });
}

// Evento botão liberar senha
document.getElementById("liberar").addEventListener("click", () => {
  const senhaDigitada = document.getElementById("senha").value;
  const correta = "1234"; // Altere a senha aqui

  if (senhaDigitada === correta) {
    bloquearBotoesPDV(false);
    alert("Acesso liberado!");
  } else {
    alert("Senha incorreta!");
  }
});

function bloquearBotoesPDV(bloquear) {
  const botoes = document.querySelectorAll(".pdv-btn");
  botoes.forEach((btn) => {
    btn.disabled = bloquear;
  });
  pdvButtonsContainer.style.pointerEvents = bloquear ? "none" : "auto";
  pdvButtonsContainer.style.opacity = bloquear ? "0.4" : "1";
}

// Evento botão entrar no PDV - abre URL numa nova aba
entrarPdvBtn.addEventListener("click", () => {
  const pdvNum = Number(document.getElementById("pdv-numero").textContent);
  if (!pdvNum) {
    alert("Selecione um PDV antes de entrar.");
    return;
  }

  let ip;
  if (pdvNum === 41) {
    ip = "192.168.222.179";
  } else {
    ip = `192.168.222.${100 + pdvNum}`;
  }

  const url = `http://${ip}:9898/normal.html`;

  // Abre em nova aba sem tirar foco da aba atual
  window.open(url, '_blank', 'noopener,noreferrer');
});

// Função para simular PDVs online e atualizar contador
function atualizarOnlineCount() {
  // Simula entre 20 e 41 PDVs online
  const onlineCount = Math.floor(Math.random() * 22) + 20;
  onlineCountElem.textContent = onlineCount;
}
