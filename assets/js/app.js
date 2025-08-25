// Quiz Data
const quizQuestions = [
    {
        question: "Qual elemento HTML é usado para títulos principais?",
        options: ["<header>", "<h1>", "<title>", "<main>"],
        answer: 1,
        explanation: "O <h1> é o título principal da página, importante para semântica e SEO."
    },
    {
        question: "Qual propriedade CSS centraliza um elemento horizontalmente com margin?",
        options: ["margin: 0 auto;", "margin: auto 0;", "margin: auto;", "margin: 0 0;"],
        answer: 0,
        explanation: "margin: 0 auto; centraliza blocos horizontalmente quando há largura definida."
    },
    {
        question: "Qual destes NÃO é um tipo de dado em JavaScript?",
        options: ["String", "Boolean", "Float", "Undefined"],
        answer: 2,
        explanation: "JavaScript não possui tipo 'Float', apenas 'Number'."
    },
    {
        question: "Por que usar alt nas imagens?",
        options: [
            "Para SEO e acessibilidade",
            "Para mudar a cor da imagem",
            "Para aumentar o tamanho",
            "Para adicionar links"
        ],
        answer: 0,
        explanation: "O atributo alt descreve a imagem para leitores de tela e melhora o SEO."
    },
    {
        question: "Qual tecnologia é usada para estilizar páginas web?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: 1,
        explanation: "CSS é responsável pela aparência visual das páginas."
    },
    {
        question: "O que o localStorage faz?",
        options: [
            "Armazena dados no servidor",
            "Armazena dados no navegador do usuário",
            "Armazena imagens",
            "Armazena arquivos temporários"
        ],
        answer: 1,
        explanation: "localStorage salva dados no navegador, persistindo mesmo após fechar a aba."
    },
    {
        question: "Qual é uma boa prática de versionamento com Git?",
        options: [
            "Commits claros e frequentes",
            "Salvar tudo em um único commit",
            "Nunca usar branches",
            "Ignorar mensagens de commit"
        ],
        answer: 0,
        explanation: "Commits claros e frequentes facilitam o histórico e colaboração."
    },
    {
        question: "Qual dessas escolhas é melhor para responsividade?",
        options: [
            "Usar px para tudo",
            "Usar unidades relativas (em, rem, %)",
            "Fixar largura em 1200px",
            "Não usar media queries"
        ],
        answer: 1,
        explanation: "Unidades relativas e media queries tornam o site adaptável a diferentes telas."
    }
];

// Quiz Logic
function renderQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    let current = 0;
    let score = 0;
    let userAnswers = [];

    function showQuestion(idx) {
        const q = quizQuestions[idx];
        quizContainer.innerHTML = `
            <div class="quiz-question">${q.question}</div>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <button class="quiz-option" data-index="${i}" tabindex="0">${opt}</button>
                `).join('')}
            </div>
            <button class="cta-btn" id="next-btn" disabled>Próxima</button>
        `;

        const optionBtns = quizContainer.querySelectorAll('.quiz-option');
        let selected = null;
        optionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                optionBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selected = parseInt(btn.dataset.index);
                quizContainer.querySelector('#next-btn').disabled = false;
            });
            btn.addEventListener('keydown', e => {
                if (e.key === "Enter" || e.key === " ") btn.click();
            });
        });

        quizContainer.querySelector('#next-btn').addEventListener('click', () => {
            userAnswers.push(selected);
            if (selected === q.answer) score++;
            current++;
            if (current < quizQuestions.length) {
                showQuestion(current);
            } else {
                showResult();
            }
        });
    }

    function showResult() {
        const quizSection = document.getElementById('quiz-container');
        const resultSection = document.getElementById('quiz-result');
        const explanations = document.getElementById('explanations');
        const scoreEl = document.getElementById('score');
        quizSection.style.display = 'none';
        resultSection.style.display = 'flex';

        // Salvar melhor pontuação
        let best = parseInt(localStorage.getItem('quizBest') || "0");
        if (score > best) {
            localStorage.setItem('quizBest', score);
            best = score;
        }

        scoreEl.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${quizQuestions.length}</strong>.<br>
        Sua melhor pontuação: <strong>${best}</strong>`;

        explanations.innerHTML = quizQuestions.map((q, i) => `
            <div style="margin-bottom:18px;">
                <strong>${i+1}. ${q.question}</strong><br>
                Sua resposta: <span style="color:${userAnswers[i]===q.answer?'#10B981':'#ef4444'}">
                    ${q.options[userAnswers[i]] || 'Não respondida'}
                </span><br>
                Correto: <span style="color:#2563EB">${q.options[q.answer]}</span><br>
                <em>${q.explanation}</em>
            </div>
        `).join('');

        document.getElementById('restart-btn').onclick = () => {
            current = 0;
            score = 0;
            userAnswers = [];
            quizSection.style.display = 'flex';
            resultSection.style.display = 'none';
            showQuestion(0);
        };
    }

    showQuestion(0);
}

document.addEventListener('DOMContentLoaded', renderQuiz);

document.addEventListener('DOMContentLoaded', () => {
    // ...seu código existente...

    renderQuiz(); // Chama o quiz ao carregar a página
});