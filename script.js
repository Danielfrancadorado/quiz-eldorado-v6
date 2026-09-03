const quiz = [

{ 
question:"Como a liderança da transportadora demonstra que segurança é prioridade em relação à produtividade?",
answers:[
"Realiza visitas periódicas em campo",
"Participa de DDS",
"Analisa indicadores preventivos",
"Todas as anteriores"
 ],
 correct:3
  },

 { 
 question:"Qual indicador melhor demonstra a maturidade da cultura de segurança?",
 answers:[ 
"Quantidade de multas",
"Número de viagens realizadas",
"Relatos de desvios e condições inseguras",
"Faturamento mensal"
], 
correct:2
},  

{
question:"Quando um motorista deixa de reportar um incidente, qual o principal risco para a organização?",
answers:[
"Perda de produtividade",
"Perda de oportunidade de prevenção",
"Aumento do custo operacional",
"Atraso na programação"
],
correct:1
}, 

{
question:"Qual destes riscos possui maior potencial de gerar fatalidades no transporte de celulose?",
answers:[
"Excesso de velocidade",
"Fadiga",
"Uso de celular",
"Todos os anteriores"
],
correct:3
},  

{
question:"Sua transportadora possui matriz de riscos atualizada para atividades críticas?",
answers:[  
"Sim",
"Não",
"Parcialmente",
"De vez em quando",  
 ],
correct:0
 },  

 {
question:"Qual deve ser a ação imediata ao identificar um desvio crítico durante um sinistro?",
answers:[
 "Registrar posteriormente",
 "Corrigir após o carregamento",
 "Comunicar de imediato",
 "Comunicar apenas a liderança", 
 ],
correct:2
 },  

 {
question:"Após um sinistro, qual deve ser a prioridade da investigação?",
answers:[
"Buscar o culpado",
"Avaliar prejuízos financeiros",
"Identificar causas sistêmicas e fatores contribuintes",
"Encerrar rapidamente o processo",  
  ],
correct:2
 },  

 {
question:"Qual ferramenta possui maior eficácia para evitar repetição de acidentes?",
answers:[
 "Advertência",
 "Suspensão",
 "Comunicação verbal",
 "Investigação com causa raiz e plano de ação", 
  ],
correct:3
 },  

  {
question:"Os aprendizados dos sinistros são compartilhados com?",
answers:[
 "Apenas envolvidos",
 "Apenas gestores",
 "Todos da operação",
 "Apenas segurança do trabalho", 
  ],
correct:2
 }, 

  {
question:"Qual fator mais contribui para acidentes relacionados à fadiga?",
answers:[
 "Longos períodos acordado",
 "Sono insuficiente",
 "Jornadas extensas",
 "Todos os anteriores", 
  ],
correct:3
 },  

 {
question:"Qual ação demonstra maturidade na gestão de fadiga?",
answers:[
 "Agir após o acidente",
 "Fazer somente treinamentos",
 "Aplicar advertências",
 "Monitorar indicadores de sono, jornada e comportamento", 
  ],
correct:3
 }, 

 {
question:"O excesso de confiança do motorista é considerado?",
answers:[
 "Falha administrativa",
 "Fator de risco comportamental",
 "Fator mecânico",
 "Falha da indústria", 
  ],
correct:1
 }, 

  {
question:"As inspeções devem ocorrer?",
answers:[
 "Semanalmente",
 "Mensalmente",
 "Antes do início da operação",
 "Apenas quando houver manutenção", 
  ],
correct:2
 },  

  {
question:"Qual destes indicadores é mais importante para avaliar prevenção?",
answers:[
"Quantidade de acidentes",
"Taxa de observações comportamentais",
"Valor gasto em manutenção",
"Quantidade de viagens", 
  ],
correct:1
 },  

 {
question:"O que caracteriza uma transportadora de alta performance em segurança?",
answers:[
"Não possuir acidentes recentes",
"Ter forte capacidade de identificar riscos antes dos eventos",
"Possuir grande frota",
"Ter baixo custo operacional", 
  ],
correct:1
 }, 

 {
question:"Qual deve ser o principal compromisso de cada gestor ao final deste Comitê?",
answers:[
"Reduzir custos",
"Aumentar produtividade",
"Implementar pelo menos uma ação preventiva relevante na transportadora",
"Revisar documentação", 
  ],
correct:2
 } 
  
];  
let current = 0;
let score = 0;
let ranking =
JSON.parse(localStorage.getItem("ranking")) || [];
let timeLeft = 15;
let timer;

function startQuiz(){

document.getElementById("startScreen")
.classList.add("hidden");

document.getElementById("lobbyScreen")
 .classList.add("hidden");

document.getElementById("quizScreen")
.classList.remove("hidden");
 
loadQuestion();

}

function loadQuestion(){

const q = quiz[current];

let percent =
((current+1)/quiz.length)*100;

document.getElementById("progress").style.width =
percent + "%";
 
document.getElementById("questionNumber").innerText =
`Pergunta ${current+1}/${quiz.length}`;

document.getElementById("question").innerText =
q.question;

const answersDiv =
document.getElementById("answers");

answersDiv.innerHTML = "";

const colors =
["red","blue","yellow","green"];

q.answers.forEach((answer,index)=>{

const btn =
document.createElement("button");

btn.className =
`answer ${colors[index]}`;

btn.innerText =
answer;

btn.onclick = () => choose(index);

answersDiv.appendChild(btn);

});

startTimer();

}

function startTimer(){

clearInterval(timer);

timeLeft = 15;

document.getElementById("timer").innerText =
timeLeft;

timer = setInterval(()=>{

timeLeft--;

document.getElementById("timer").innerText =
timeLeft;

if(timeLeft <= 0){

nextQuestion();

}

},1000);

}

function choose(index){

clearInterval(timer);

if(index === quiz[current].correct){

score += 100 + timeLeft;

}

nextQuestion();

}

function nextQuestion(){

current++;

if(current < quiz.length){

loadQuestion();

}else{

finishQuiz();

}

}

function finishQuiz(){

saveScore(); 
 
resetQuizControl();
 
loadGlobalRanking();

document.getElementById("quizScreen").classList.add("hidden");

document.getElementById("resultScreen").classList.remove("hidden");

const name =
document.getElementById("playerName").value;
 
const avatar =
document.getElementById("avatar").value; 

const player =
document.getElementById("playerName").value;
 
ranking.push({
nome: player,
avatar: avatar,
pontos: score
});
 
ranking.sort((a,b)=>
b.pontos-a.pontos
);
 
localStorage.setItem(
"ranking",
JSON.stringify(ranking)
);

let top3 =
ranking.slice(0,3);
let podium =
 
`
<hr>
 
<h2>🏆 Pódio</h2>
 
🥇 ${top3[0]?.avatar || ""} ${top3[0]?.nome || "-"}
<br>

🥈 ${top3[1]?.avatar || ""} ${top3[1]?.nome || "-"}
<br>
 
🥉 ${top3[2]?.avatar || ""} ${top3[2]?.nome || "-"}
`; 
 
document.getElementById("finalScore").innerHTML = 

`
<h2>${avatar} ${name}</h2>

<h3>Pontuação: ${score}</h3>

<p>
Obrigado por participar do Comitê de Segurança da Eldorado Brasil.
</p>

${podium}
`;

}

async function saveScore(){
 
const name =
document.getElementById("playerName").value;
 
const avatar =
document.getElementById("avatar").value;
 
try{
 
await window.addDoc(
 
window.collection(
window.db,
"ranking"
),
 
{
nome: name,
avatar: avatar,
pontos: score
}
 
);
 
console.log("Pontuação salva com sucesso");
 
}
catch(error){
 
console.error(
"Erro ao salvar:",
error
);
 
}

} // fecha saveScore

async function loadGlobalRanking(){

const rankingDiv =
document.getElementById("rankingGlobal");

const q =
window.query(
window.collection(window.db,"ranking"),
window.orderBy("pontos","desc"),
window.limit(10)
);

window.onSnapshot(q,(snapshot)=>{

let html =

`
<hr>

<h2>🏆 Ranking Geral Eldorado</h2>
`;

let posicao = 1;
 
snapshot.forEach((doc)=>{

const p = doc.data();

html +=

`
<p>

${posicao}º

${p.avatar}

${p.nome}

-

${p.pontos}

pontos

</p>

`;

posicao++;

});

rankingDiv.innerHTML = html;

});

}

async function enterLobby(){
 
const name =
document.getElementById("playerName").value;

const avatar = 
document.getElementById("avatar").value;

if(name.trim() === ""){

alert("Digite seu nome");

return;

} 

try{

await window.addDoc(

window.collection(
window.db,
"participantes"
 ),

 {
 nome: name,
 avatar: avatar
 }

 );

 alert(
 "Você entrou na sala!"
 );

 document.getElementById("startScreen")
 .classList.add("hidden");
 
 document.getElementById("lobbyScreen")
 .classList.remove("hidden");
 
 loadParticipants();

 listenQuizStart();
 
 }
 catch(error){

 console.error(error);

 }

 }

function loadParticipants(){
 
const participantList =
document.getElementById("participantList");

const participantCount =
document.getElementById("participantCount");
 
window.onSnapshot(

window.collection(
window.db,
"participantes"
 ),

(snapshot)=>{

participantCount.innerText =
"Participantes conectados: " +
snapshot.size; 
 
let html = ""; 

snapshot.forEach((doc)=>{

const p = doc.data();

html += `
<p>
${p.avatar} ${p.nome}
</p>
`;

});

participantList.innerHTML = html;
 
} 

); 

}

function listenQuizStart(){

window.onSnapshot(

window.doc(
window.db,
"controle",
"quiz"
 ),

(docSnap)=>{
 
if(!docSnap.exists()) return; 

const data = docSnap.data();
 
if(data.status === "contagem"){
 
startCountdown();
 
} 

}

);

} 

function startCountdown(){
 
const countdown =
document.getElementById("countdown");
 
let time = 3;

countdown.innerText = time;

const interval = setInterval(()=>{

time--;

if(time > 0){

countdown.innerText = time;

}
else if(time === 0){

countdown.innerText = "🚀";

 }
else{

clearInterval(interval);

countdown.innerText = "";

startQuiz();

}
 
},1000);

}

async function startForEveryone(){

try{

const quizRef =

window.doc(
window.db,
"controle",
"quiz"
 );

 await window.updateDoc(
 quizRef,
 {
 status: "contagem"
 }
 );

 }
 catch(error){
  
 console.error(error);

 }

 }

async function resetQuizControl(){

try{

const quizRef =

window.doc(
window.db,
"controle",
"quiz"
 );

await window.updateDoc(
quizRef,
{
status: "aguardando"
}
);

}
catch(error){

console.error(error);
 
}

}

async function clearLobby(){

try{

const snapshot = await window.getDocs(

window.collection(
window.db,
"participantes"
)

);

for(const documentItem of snapshot.docs){

await window.deleteDoc( 
documentItem.ref
);
 
}

alert("Sala limpa com sucesso!");

}
catch(error){

console.error(error);

}

} 

window.startQuiz = startQuiz;
window.enterLobby = enterLobby;
window.startForEveryone = startForEveryone;
window.clearLobby = clearLobby;
