(() => {
"use strict";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const root=document.createElement("section");root.id="sr-deep-analysis";root.className="wrap section";
root.innerHTML="<style>#sr-deep-analysis .da-panel{background:linear-gradient(145deg,#102238,#0b1929);border:1px solid var(--line);border-radius:18px;padding:20px;margin:14px 0}#sr-deep-analysis .da-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}#sr-deep-analysis .da-field{margin:12px 0}#sr-deep-analysis label{display:block;font-size:13px;font-weight:750;margin-bottom:6px}#sr-deep-analysis input,#sr-deep-analysis textarea,#sr-deep-analysis select{width:100%;background:#081522;border:1px solid var(--line);border-radius:10px;padding:11px;color:var(--text);font:inherit}#sr-deep-analysis textarea{min-height:76px;resize:vertical}#sr-deep-analysis .da-help,#sr-deep-analysis .da-muted{font-size:11px;color:var(--muted)}#sr-deep-analysis .da-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:16px}#sr-deep-analysis button{border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:#ffffff08;color:var(--text);font-weight:750;cursor:pointer}#sr-deep-analysis button.da-primary{background:var(--green);color:#062019;border-color:var(--green)}#sr-deep-analysis .da-metric{background:#ffffff08;border:1px solid var(--line);border-radius:14px;padding:15px}#sr-deep-analysis .da-big{font-size:29px;font-weight:900;color:var(--green)}#sr-deep-analysis .da-tag{display:inline-block;border-radius:30px;padding:5px 9px;background:#7cf0bd18;color:var(--green);font-size:11px;font-weight:800}#sr-deep-analysis .da-warning{border:1px solid #80652d;background:#d8a83b12;color:#e7d4a2;border-radius:12px;padding:12px;font-size:12px;margin:12px 0}#sr-deep-analysis .da-list{padding-left:19px;color:var(--muted);font-size:13px}#sr-deep-analysis .da-list li{margin:8px 0}#sr-deep-analysis .da-result{display:none}#sr-deep-analysis .da-result.show{display:block}#sr-deep-analysis .da-bar{height:8px;border-radius:20px;background:#ffffff16;overflow:hidden;margin:7px 0 12px}#sr-deep-analysis .da-bar span{display:block;height:100%;background:var(--green)}@media(max-width:650px){#sr-deep-analysis .da-grid{grid-template-columns:1fr}}</style>"+
"<div class='sectionhead'><div class='eyebrow'>Analyse approfondie · Nouveau</div><h2>Le diagnostic sérieux de ton idée</h2><p>Une analyse structurée à partir de tes réponses et de preuves que tu ajoutes. Les inconnues restent visibles : aucun chiffre de marché n'est inventé.</p></div>"+
"<form id='da-form' class='da-panel'><h3>1. Problème et utilisateurs</h3>"+
field("name","Nom provisoire du projet","input","Ex. : outil de suivi des demandes pour associations",true)+
field("audience","Qui rencontre ce problème précisément ?","textarea","Décris un groupe concret.")+
field("problem","Quel problème concret veux-tu résoudre ?","textarea","Décris une situation vécue, pas une fonctionnalité.")+
select("frequency","À quelle fréquence le problème arrive-t-il ?",["Je ne sais pas encore","Rarement","Chaque mois","Chaque semaine","Tous les jours ou presque"])+
select("pain","À quel point est-ce gênant ?",["Je ne sais pas encore","Petit désagrément","Gêne réelle","Problème important","Problème urgent ou coûteux en temps"])+
field("workaround","Comment les personnes font-elles aujourd'hui ?","textarea","Outils concurrents, tableur, messages, travail manuel…")+
select("interviews","Combien de personnes de cette cible as-tu interrogées ?",["Aucune","1 à 2","3 à 5","6 à 10","Plus de 10"])+
"<h3>2. Marché et concurrence</h3>"+
field("competitors","Solutions concurrentes ou alternatives repérées","textarea","Une par ligne : nom, prix affiché, point fort, limite observée.")+
field("difference","Pourquoi quelqu'un choisirait-il ta solution ?","textarea","Une différence précise et utile.")+
field("proof","Quelles preuves as-tu que le besoin existe ?","textarea","Entretiens, demandes, avis publics, observations. Sépare faits et suppositions.")+
"<h3>3. Faisabilité et modèle économique</h3>"+
field("mvp","Quelle est la plus petite version utile à tester ?","textarea","Une seule fonction, une maquette ou un service manuel.")+
select("difficulty","Difficulté technique estimée",["Je ne sais pas","Faible : maquette / no-code simple","Moyenne : plusieurs fonctions","Élevée : comptes, données, IA ou intégrations","Très élevée : sécurité ou infrastructure complexe"])+
select("budget","Budget pour le prototype",["0 €","Moins de 50 €","50 à 200 €","Plus de 200 €"])+
field("price","Prix mensuel envisagé par client (€)","number","Ex. : 9.90")+
field("target","Objectif de chiffre d'affaires mensuel (€)","number","Ex. : 500")+
field("costs","Coûts mensuels estimés (€)","number","Laisse vide si inconnu")+
field("sources","Sources consultées (URL + preuve + date)","textarea","Ajoute uniquement les pages réellement consultées.")+
"<p class='da-help'>Cette version ne récupère aucune donnée automatiquement. Note les sources que tu as réellement consultées.</p><div class='da-actions'><button class='da-primary' type='submit'>Générer mon diagnostic complet →</button><button type='button' id='da-load'>Charger mon brouillon</button><button type='button' id='da-clear'>Effacer</button></div></form>"+
"<div id='da-report' class='da-panel da-result' aria-live='polite'></div><div class='da-warning'><b>Transparence :</b> diagnostic pédagogique, pas une étude de marché certifiée ni une prévision de revenus. Ne saisis aucune donnée personnelle ou confidentielle. Pour les achats, abonnements, données ou démarches commerciales, demande l'aide d'un adulte responsable.</div>";
function field(id,label,type,placeholder,required){return "<div class='da-field'><label for='da-"+id+"'>"+label+"</label>"+(type==="textarea"?"<textarea id='da-"+id+"' placeholder='"+placeholder+"' "+(required?"required":"")+"></textarea>":"<input id='da-"+id+"' type='"+type+"' "+(type==="number"?"min='0' step='0.01'":"")+" placeholder='"+placeholder+"' "+(required?"required":"")+">")+"</div>"}
function select(id,label,opts){return "<div class='da-field'><label for='da-"+id+"'>"+label+"</label><select id='da-"+id+"'>"+opts.map((x,i)=>"<option value='"+i+"'>"+x+"</option>").join("")+"</select></div>"}
const anchor=document.querySelector("#radar-suite")||document.querySelector("#methode");if(anchor)anchor.before(root);else document.querySelector("main")?.append(root);
const $=s=>root.querySelector(s),ids=["name","audience","problem","frequency","pain","workaround","interviews","competitors","difference","proof","mvp","difficulty","budget","price","target","costs","sources"];
const get=()=>Object.fromEntries(ids.map(k=>[k,$("#da-"+k).value.trim()]));
const save=()=>localStorage.setItem("sr_deep_draft",JSON.stringify(get()));
$("#da-form").addEventListener("input",save);
$("#da-load").onclick=()=>{let d=null;try{d=JSON.parse(localStorage.getItem("sr_deep_draft")||"null")}catch(e){localStorage.removeItem("sr_deep_draft")}if(!d){alert("Aucun brouillon valide enregistré.");return}ids.forEach(k=>{if(d[k]!==undefined)$("#da-"+k).value=d[k]})};
$("#da-clear").onclick=()=>{if(confirm("Effacer les réponses ?")){$("#da-form").reset();$("#da-report").classList.remove("show");localStorage.removeItem("sr_deep_draft")}};
$("#da-form").onsubmit=e=>{
e.preventDefault();const d=get(),freq=+d.frequency,pain=+d.pain,interviews=+d.interviews,diff=+d.difficulty;
const competitors=d.competitors.split(/\n/).map(x=>x.trim()).filter(Boolean);
const sourceCount=d.sources.split(/\n/).filter(x=>/^https?:\/\//i.test(x.trim())).length;
const alt=d.workaround.length>=20||competitors.length>0,hasDiff=d.difference.length>=30,proof=d.proof.length>=35,mvp=d.mvp.length>=25;
const problem=(d.audience.length>=25?10:0)+(d.problem.length>=35?10:0)+freq*1.25+pain*1.25;
const evidence=Math.min(20,interviews*4+(proof?4:0)+Math.min(4,sourceCount*2));
const competition=Math.min(10,competitors.length*2)+(sourceCount?Math.min(5,sourceCount):0);
const differentiation=hasDiff?15:0,feasibility=(mvp?5:0)+(diff?Math.max(0,5-(diff-1)*1.5):0);
const economics=(+d.price>0?5:0)+(+d.target>0?3:0)+(d.costs!==""?2:0);
const readiness=Math.max(0,Math.min(100,Math.round(problem+evidence+competition+differentiation+feasibility+economics)));
const filled=[d.audience,d.problem,d.workaround,d.competitors,d.difference,d.proof,d.mvp,d.sources].filter(x=>x.length>=15).length;
const confidence=Math.max(0,Math.min(100,Math.round(filled/8*65+Math.min(35,interviews*7+sourceCount*5))));
const gaps=[];
if(d.audience.length<25)gaps.push("Définir une cible beaucoup plus précise.");
if(d.problem.length<35)gaps.push("Décrire un problème vécu avec un exemple réel.");
if(!freq||!pain)gaps.push("Vérifier la fréquence et la gravité auprès de la cible.");
if(!interviews)gaps.push("Interroger des utilisateurs potentiels avant de développer.");
if(!alt)gaps.push("Identifier concurrents directs et solutions de remplacement.");
if(!hasDiff)gaps.push("Formuler une différence concrète et vérifiable.");
if(!proof)gaps.push("Ajouter des preuves observées plutôt que des suppositions.");
if(!mvp)gaps.push("Définir la plus petite version testable.");
if(!sourceCount)gaps.push("Ajouter des sources datées pour les prix et affirmations de marché.");
const price=+d.price,target=+d.target,costs=+d.costs,customers=price>0&&target>0?Math.ceil(target/price):null,breakEven=price>0&&d.costs!==""?Math.ceil(costs/price):null;

const status=readiness<35?"Idée encore trop incertaine":readiness<60?"Piste à valider":readiness<80?"Base prometteuse à tester":"Dossier bien préparé — validation terrain indispensable";
const actions=["Écrire une phrase décrivant la cible et le problème observé.","Faire 3 à 5 entretiens courts sur les expériences réelles, sans vendre.","Lister au moins 5 concurrents ou alternatives et vérifier leurs pages officielles, leurs prix et la date.","Tester une maquette ou un service manuel avant de coder un produit complet.","Mettre à jour le diagnostic avec les retours et séparer faits, hypothèses et inconnues."];
const bars=[["Problème et cible",problem,30],["Preuves utilisateurs",evidence,20],["Alternatives et sources",competition,15],["Différenciation",differentiation,15],["Faisabilité du prototype",feasibility,10],["Modèle économique renseigné",economics,10]];
let html="<div class='eyebrow'>Rapport généré à partir de tes réponses</div><h2>"+esc(d.name)+"</h2><div class='da-grid'><div class='da-metric'><div class='da-muted'>Préparation du projet</div><div class='da-big'>"+readiness+"/100</div><span class='da-tag'>"+status+"</span><p class='da-help'>Qualité de préparation des informations, pas probabilité de réussite.</p></div><div class='da-metric'><div class='da-muted'>Confiance dans le diagnostic</div><div class='da-big'>"+confidence+"/100</div><p class='da-help'>Dépend des éléments renseignés, des entretiens et des sources. Faible confiance = preuves manquantes.</p></div></div><h3>Détail du diagnostic</h3>";
bars.forEach(b=>{html+="<div><b>"+b[0]+"</b><span class='da-muted' style='float:right'>"+b[1]+"/"+b[2]+"</span><div class='da-bar'><span style='width:"+(b[1]/b[2]*100)+"%'></span></div></div>"});
html+="<div class='da-warning'>Cette note mesure la préparation et les éléments déclarés. Elle ne mesure ni la taille réelle du marché ni la demande réelle. Les réponses non vérifiées restent des hypothèses.</div><h3>Ce que ton analyse indique</h3><ul class='da-list'><li><b>Cible :</b> "+esc(d.audience)+"</li><li><b>Problème :</b> "+esc(d.problem)+"</li><li><b>Fréquence :</b> "+["Inconnue","Rarement","Chaque mois","Chaque semaine","Quotidienne"][freq]+"</li><li><b>Gravité :</b> "+["Inconnue","Faible","Réelle","Importante","Urgente ou coûteuse"][pain]+"</li><li><b>Alternatives listées :</b> "+competitors.length+" — à vérifier indépendamment.</li><li><b>Différenciation :</b> "+(hasDiff?esc(d.difference):"À préciser")+"</li><li><b>Prototype :</b> "+(mvp?esc(d.mvp):"À définir")+"</li></ul><h3>Économie : calcul indicatif</h3><div class='da-grid'><div class='da-metric'><div class='da-muted'>Clients pour l'objectif</div><div class='da-big'>"+(customers===null?"—":customers)+"</div><p class='da-help'>"+(customers===null?"Renseigne prix et objectif.":price.toFixed(2)+" € × "+customers+" clients ≈ "+target.toFixed(2)+" € de chiffre d'affaires brut mensuel.")+"</p></div><div class='da-metric'><div class='da-muted'>Clients pour couvrir les coûts fixes saisis</div><div class='da-big'>"+(breakEven===null?"—":breakEven)+"</div><p class='da-help'>"+(breakEven===null?"Renseigne prix et coûts.":costs.toFixed(2)+" € de coûts fixes / "+price.toFixed(2)+" € de chiffre d’affaires brut par client. Hors frais variables, commissions, impôts et autres charges.")+"</p></div></div><h3>Inconnues prioritaires</h3><ul class='da-list'>"+(gaps.length?gaps.map(x=>"<li>"+esc(x)+"</li>").join(""):"<li>Les principaux champs sont renseignés : vérifie maintenant les informations sur le terrain.</li>")+"</ul><h3>Plan de validation en 5 étapes</h3><ol class='da-list'>"+actions.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ol><div class='da-actions'><button class='da-primary' id='da-export'>Exporter le rapport (.txt)</button><button id='da-json'>Exporter les réponses (.json)</button><button id='da-print'>Imprimer / PDF</button></div><p class='da-muted'>Rapport généré le "+new Date().toLocaleDateString("fr-FR")+". Sources non contrôlées automatiquement.</p>";
const report=$("#da-report");report.innerHTML=html;report.classList.add("show");report.scrollIntoView({behavior:"smooth",block:"start"});
const payload={answers:d,scores:{readiness,confidence,problem,evidence,competition,differentiation,feasibility,economics},gaps,generatedAt:new Date().toISOString()};localStorage.setItem("sr_deep_report",JSON.stringify(payload));
$("#da-export").onclick=()=>download("rapport-saas-radar.txt","SAAS RADAR — "+d.name+"\nPréparation : "+readiness+"/100\nConfiance : "+confidence+"/100\nVerdict : "+status+"\n\nCible : "+d.audience+"\nProblème : "+d.problem+"\nAlternatives : "+d.competitors+"\nDifférenciation : "+d.difference+"\nPreuves : "+d.proof+"\nPrototype : "+d.mvp+"\nSources : "+d.sources+"\n\nInconnues :\n- "+gaps.join("\n- ")+"\n\nPlan :\n- "+actions.join("\n- ")+"\n\nOutil de réflexion, pas une étude certifiée.");
$("#da-json").onclick=()=>download("reponses-saas-radar.json",JSON.stringify(payload,null,2));
$("#da-print").onclick=()=>window.print();
};
function download(name,txt){const blob=new Blob([txt],{type:"text/plain;charset=utf-8"}),a=document.createElement("a"),url=URL.createObjectURL(blob);a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
})();