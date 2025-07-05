const pdvButtonsContainer = document.getElementById("pdv-buttons");

// Gerar botões PDV 1 a 41
for (let i = 1; i <= 41; i++) {
  criarBotaoPDV(i);
}

function criarBotaoPDV(pdvNum) {
  const btn = document.createElement("button");
  btn.className = "pdv-btn";
  btn.textContent = `PDV ${pdvNum}`;
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

  document.getElementById("pdv-info").style.display = "block";
}

// Copiar texto
function copiarTexto(id) {
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

// Botão liberar senha
document.getElementById("liberar").addEventListener("click", () => {
  const senhaDigitada = document.getElementById("senha").value;
  const correta = "1234"; // Altere aqui

  if (senhaDigitada === correta) {
    document.getElementById("pdv-buttons").style.pointerEvents = "auto";
    document.getElementById("pdv-buttons").style.opacity = "1";
  } else {
    alert("Senha incorreta!");
  }
});

// Bloquear acesso inicial
document.getElementById("pdv-buttons").style.pointerEvents = "none";
document.getElementById("pdv-buttons").style.opacity = "0.4";
