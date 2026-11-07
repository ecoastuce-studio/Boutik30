(() => {
  const section = document.createElement("section");
  section.id = "radar-suite";
  section.className = "wrap section";
  section.innerHTML = "<h2>Radar SaaS : outils de projet</h2><p>Mode prototype.</p>";
  const target = document.querySelector("#methode");
  if (target) target.before(section);
})();