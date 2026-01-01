const supabaseClient = supabase.createClient(
  "https://ykrpylrwxdirlbxtqneo.supabase.co",
  "YOUR_PUBLIC_ANON_KEY_HERE"
);

const slug = new URLSearchParams(window.location.search).get("slug");

async function loadPortfolio() {
  const { data, error } = await supabaseClient
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .single();

  const c = document.getElementById("content");

  if (!data || error) {
    c.innerHTML = `<h1 class="text-3xl font-bold text-center mt-20">Portfolio Not Found</h1>`;
    return;
  }

  c.innerHTML = `

  <!-- HERO -->
  <section class="text-center mb-16">
    <h1 class="text-6xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-xl">
      ${data.name}
    </h1>

    <p class="mt-3 text-slate-300 text-lg">
      ${data.title || "Student Portfolio"}
    </p>

    <p class="mt-1 text-slate-500 text-sm">
      Generated using InstantFolio
    </p>
  </section>


  <!-- GRID -->
  <div class="space-y-10">

    ${fancyBox("About Me", data.bio, "sky")}

    ${fancyBox("Education", data.education, "purple")}

    ${fancyBox("Experience", format(data.experience), "blue")}

    ${projectBox(data.projects)}

    ${skillsBox(data.skills)}

    ${fancyBox("Achievements", format(data.achievements), "emerald")}

    ${fancyBox("Certificates", format(data.certificates), "pink")}

    ${fancyBox("Academic Highlights", format(data.academics), "yellow")}

    ${links(data)}

  </div>

  `;
}


// ---------- COMPONENTS ----------

function fancyBox(title, text, color) {
  return `
  <div class="rounded-2xl p-6 border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl">
    <h2 class="text-2xl font-semibold text-${color}-400 mb-2">
      ${title}
    </h2>

    ${
      text
        ? `<p class="text-slate-300 whitespace-pre-wrap leading-relaxed">${text}</p>`
        : `<p class="text-slate-600">Not added.</p>`
    }
  </div>
  `;
}

function projectBox(text) {
  if (!text) return fancyBox("Projects", "", "green");

  const list = text
    .split(/[,\n]/)
    .filter(x => x.trim())
    .map(
      p => `
      <div class="bg-slate-900 border border-slate-700 px-4 py-3 rounded-xl">
        <p class="text-slate-200">${p.trim()}</p>
      </div>`
    )
    .join("");

  return `
  <div class="rounded-2xl p-6 border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl">
    <h2 class="text-2xl font-semibold text-green-400 mb-3">Projects</h2>
    <div class="grid md:grid-cols-2 gap-3">
      ${list}
    </div>
  </div>`;
}

function skillsBox(skills) {
  return `
  <div class="rounded-2xl p-6 border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl">
    <h2 class="text-2xl font-semibold text-orange-400 mb-2">Skills</h2>

    ${
      skills?.length
        ? `<div class="flex flex-wrap gap-3 mt-3">
            ${skills
              .map(
                s => `
                <span class="px-5 py-2 rounded-full bg-slate-900 border border-slate-700 shadow-[0_0_25px_-8px_rgba(255,255,255,0.6)] text-slate-200">
                  ${s}
                </span>`
              )
              .join("")}
           </div>`
        : `<p class="text-slate-600">No skills added.</p>`
    }
  </div>`;
}

function links(d) {
  return `
  <div class="rounded-2xl p-6 border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl">
    <h2 class="text-2xl font-semibold text-pink-400 mb-2">Links</h2>

    <div class="flex gap-4 mt-3">

      ${
        d.github
          ? `<a href="${d.github}" target="_blank"
             class="px-6 py-3 bg-sky-500 hover:bg-sky-400 rounded-xl text-black font-semibold shadow-lg">
             GitHub
           </a>`
          : ""
      }

      ${
        d.linkedin
          ? `<a href="${d.linkedin}" target="_blank"
             class="px-6 py-3 bg-purple-500 hover:bg-purple-400 rounded-xl text-black font-semibold shadow-lg">
             LinkedIn
           </a>`
          : ""
      }

    </div>
  </div>`;
}

function format(text) {
  if (!text) return "";

  return text
    .split(/[,\n•-]/)
    .filter(x => x.trim())
    .map(x => "• " + x.trim())
    .join("\n");
}

loadPortfolio();
