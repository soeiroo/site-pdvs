import subprocess
from flask import Flask, jsonify

app = Flask(__name__)

PDV_COUNT = 41
PDV_41_IP = '192.168.222.179'
PDV_BASE_IP = '192.168.222.'
PDV_START = 101

# Gera lista de IPs
ips = [PDV_BASE_IP + str(PDV_START + i - 1) for i in range(1, PDV_COUNT)]
ips.append(PDV_41_IP)

def ping(ip):
    try:
        # Compatível com Linux
        output = subprocess.run(
            ['ping', '-c', '1', '-w', '1', ip],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
        )
        return output.returncode == 0
    except Exception as e:
        print(f"Erro ao pingar {ip}: {e}")
        return False

@app.route('/status')
def status():
    result = {}
    for idx, ip in enumerate(ips, 1):
        result[str(idx)] = ping(ip)
    return jsonify(result)

if __name__ == '__main__':
    # Rode com: python3 nome_do_arquivo.py
    # Acesse em: http://localhost:5000/status
    app.run(host='0.0.0.0', port=5000)

