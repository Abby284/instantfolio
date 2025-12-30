const supabaseClient = supabase.createClient( "https://ykrpylrwxdirlbxtqneo.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrcnB5bHJ3eGRpcmxieHRxbmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5OTA1MDcsImV4cCI6MjA4MjU2NjUwN30.GUT_3RF57cLxNbQNOj_gjOx5Z9nh2BbiCPqGuk9uzqo" );
const slug = new URLSearchParams(window.location.search).get("slug");

async function loadPortfolio() {
  const { data } = await supabaseClient
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .single();

  document.getElementById("content").innerHTML = `
  <section class="text-center mb-16">
    <h1 class="text-6xl font-extrabold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
      ${data.name}
    </h1>
    <p class="text-xl text-slate-400 mt-3">${data.title}</p>
  </section>

  ${section("About", data.bio)}
  ${section("Education", data.education)}
  ${section("Experience", data.experience)}
  ${section("Projects", data.projects)}
  ${badges("Skills", data.skills)}
  ${section("Achievements", data.achievements)}
  ${section("Certificates", data.certificates)}
  ${section("Academic Highlights", data.academics)}
  ${links(data)}
  `;
}

function section(title, content) {
  return `
  <div class="mb-12">
    <h2 class="text-3xl text-sky-400 font-semibold">${title}</h2>
    <div class="bg-slate-900 p-6 mt-3 rounded-2xl border border-slate-700 whitespace-pre-wrap">
      ${content || "Not added"}
    </div>
  </div>`;
}

function badges(title, list) {
  return `
  <div class="mb-12">
    <h2 class="text-3xl text-orange-400 font-semibold">${title}</h2>
    <div class="flex flex-wrap gap-3 mt-4">
      ${list?.map(s => `<span class="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl">${s}</span>`).join("")}
    </div>
  </div>`;
}

function links(d) {
  return `
  <div class="mb-12">
    <h2 class="text-3xl text-pink-400 font-semibold">Links</h2>
    <div class="flex gap-4 mt-4">
      ${d.github ? `<a href="${d.github}" class="px-6 py-3 bg-sky-500 rounded-xl text-black">GitHub</a>` : ""}
      ${d.linkedin ? `<a href="${d.linkedin}" class="px-6 py-3 bg-violet-500 rounded-xl text-black">LinkedIn</a>` : ""}
    </div>
  </div>`;
}

loadPortfolio();
