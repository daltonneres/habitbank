// SCROLL SUAVE
function scrollToForm() {
  document.getElementById("form").scrollIntoView({ behavior: "smooth" });
}

// ANIMAÇÃO SCROLL
const elements = document.querySelectorAll(".fade");

function checkScroll() {
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

// roda no scroll
window.addEventListener("scroll", checkScroll);

// roda ao carregar a página (🔥 RESOLVE SEU PROBLEMA)
window.addEventListener("load", checkScroll);

// 📊 GRÁFICO
const canvas = document.getElementById("grafico");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let pontos = [20, 30, 40, 55, 70, 85, 100];
  let progresso = 0;

  function desenharLinha() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, 250 - pontos[0]);

    for (let i = 0; i < progresso; i++) {
      ctx.lineTo(i * 60, 250 - pontos[i]);
    }

    ctx.strokeStyle = "#22C55E";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  function animarGrafico() {
    if (progresso < pontos.length) {
      progresso++;
      desenharLinha();
      setTimeout(animarGrafico, 300);
    }
  }

  animarGrafico();
}

// IMPORTS (versão CDN para funcionar no navegador)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyD2P3ezHhw1IRPYw0UHoCdEWxlNVGf6lOA",
  authDomain: "habitleads.firebaseapp.com",
  projectId: "habitleads",
  storageBucket: "habitleads.firebasestorage.app",
  messagingSenderId: "504905977621",
  appId: "1:504905977621:web:b32087a67be87355cae31c"
};

// INICIALIZA
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// FUNÇÃO DE ENVIO
window.enviar = async function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  try {
    await addDoc(collection(db, "leads"), {
      nome: nome,
      email: email,
      data: new Date()
    });

    alert("Você entrou na lista 🚀");

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";

  } catch (erro) {
    console.error(erro);
    alert("Erro ao enviar");
  }
};