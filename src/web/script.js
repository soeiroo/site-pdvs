const PDV_COUNT = 41;
const PDV_41_IP = '192.168.222.179';
const PDV_BASE_IP = '192.168.222.';
const PDV_START = 101;
const SENHA_PADRAO = '1234';

const senhaInput = document.getElementById('senha');
const liberarBtn = document.getElementById('liberar');
const pdvButtonsDiv = document.getElementById('pdv-buttons');
const onlineCountSpan = document.getElementById('online-count');

let acessoLiberado = false;
let historico = JSON.parse(localStorage.getItem('historicoAcessos') || '[]');

function criarBotoesPDV() {
  pdvButtonsDiv.innerHTML = '';
  for (let i = 1; i <= PDV_COUNT; i++) {
    const btn = document.createElement('button');
    btn.className = 'pdv-btn' + (i === 41 ? ' pdv-41' : '');
    btn.textContent = `PDV ${i}`;
    btn.disabled = !acessoLiberado;
    btn.dataset.pdv = i;
    btn.innerHTML += ' <span class="status-dot">🔴</span>';
    btn.onclick = () => selecionarPDV(i);
    pdvButtonsDiv.appendChild(btn);
  }
}

function selecionarPDV(num) {
  const ip = num === 41 ? PDV_41_IP : PDV_BASE_IP + (PDV_START + num - 1);
  const hoje = new Date();
  const dia = hoje.getDate(); // sem zero à esquerda
  const mes = hoje.getMonth() + 1;
  const diaMesString = `${dia}${mes}`;
  const soma = Number(diaMesString) + num;
  const senhaSSH = `pdv@${soma}`;
  const comandoSSH = `ssh suporte@${ip}`;

  document.getElementById('pdv-info').style.display = 'block';
  document.getElementById('pdv-numero').textContent = num;
  document.getElementById('pdv-ip').textContent = ip;
  document.getElementById('ssh-comando').textContent = comandoSSH;
  document.getElementById('ssh-senha').textContent = senhaSSH;

  document.getElementById('entrar-pdv').onclick = () => {
    window.open(`http://${ip}:9898/normal.html`, '_blank');
    historico.push({ pdv: num, data: new Date().toISOString() });
    localStorage.setItem('historicoAcessos', JSON.stringify(historico));
  };
}

async function checarStatusPDVs() {
  let online = 0;
  const botoes = document.querySelectorAll('.pdv-btn');
  for (let idx = 0; idx < botoes.length; idx++) {
    const btn = botoes[idx];
    const num = idx + 1;
    const ip = num === 41 ? PDV_41_IP : PDV_BASE_IP + (PDV_START + num - 1);
    let statusOnline = false;
    if (window.pdvAPI && window.pdvAPI.pingPDV) {
      try {
        statusOnline = await window.pdvAPI.pingPDV(ip);
      } catch (e) {
        statusOnline = false;
      }
    }
    btn.querySelector('.status-dot').textContent = statusOnline ? '🟢' : '🔴';
    if (statusOnline) online++;
  }
  onlineCountSpan.textContent = online;
}

liberarBtn.onclick = () => {
  if (senhaInput.value === SENHA_PADRAO) {
    acessoLiberado = true;
    criarBotoesPDV();
    checarStatusPDVs();
  } else {
    alert('Senha incorreta!');
  }
};

window.onload = () => {
  criarBotoesPDV();
  checarStatusPDVs();
};