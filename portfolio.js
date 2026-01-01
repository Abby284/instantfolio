const supabaseClient = supabase.createClient(
  "https://ykrpylrwxdirlbxtqneo.supabase.co",
  "YOUR_PUBLIC_ANON_KEY"
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
  <section class="text-center mb-14">
    <h1 class="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
      ${data.name}
    </h1>

    <p class="mt-2 text-slate-300 text-lg">
      ${data.title || ""}
    </p>

    <div class="h-[1px] bg-slate-800 mt-6"></div>
  </section>



  <!-- MAIN GRID -->
  <div class="space-y-10">

    ${box("About", data.bio)}

    ${box("Education", data.education)}

    ${box("Experience", formatList(data.experience))}

    ${box("Projects", formatList(data.projects))}

    ${skillsBox(data.skills)}

    ${box("Achievements", formatList(data.achievements))}

    ${box("Certificates", formatList(data.certificates))}

    ${box("Academic Highlights", formatList(data.academics))}

    ${links(data)}

  </div>
  `;
}



// ------------ UI COMPONENTS -----------

function box(title, content) {
  return `
  <div class="bg-[#0c1324] border border-slate-700 rounded-2xl p-6 shadow-xl">
    <h2 class="text-2xl font-semibold mb-2 text-sky-400">${title}</h2>

    ${
      content
        ? `<p class="text-slate-300 leading-relaxed whitespace-pre-wrap">${content}</p>`
        : `<p class="text-slate-600">No information provided.</p>`
    }
  </div>`;
}

function formatList(text) {
  if (!text) return "";
  return text
    .split(/[,\n•-]/)
    .filter(x => x.trim())
    .map(x => `• ${x.trim()}`)
    .join("\n");
}

function skillsBox(skills) {
  return `
  <div class="bg-[#0c1324] border border-slate-700 rounded-2xl p-6 shadow-xl">
    <h2 class="text-2xl font-semibold mb-2 text-orange-400">Skills</h2>

    ${
      skills?.length
        ? `<div class="flex flex-wrap gap-3 mt-3">
           ${skills
             .map(
               s =>
                 `<span class="px-5 py-2 bg-slate-900 border border-slate-700 rounded-full shadow-[0_0_20px_-6px_rgba(56,189,248,0.7)] text-slate-200">
                    ${s}
                  </span>`
             )
             .join("")}
           </div>`
        : `<p class="text-slate-600">No skills listed.</p>`
    }
  </div>`;
}

function links(d) {
  return `
  <div class="bg-[#0c1324] border border-slate-700 rounded-2xl p-6 shadow-xl">
    <h2 class="text-2xl font-semibold mb-3 text-pink-400">Links</h2>
    <div class="flex gap-4">

      ${
        d.github
          ? `<a href="${d.github}" target="_blank"
              class="px-6 py-3 bg-sky-500 hover:bg-sky-400 rounded-xl text-black font-semibold">
              GitHub
            </a>`
          : ""
      }

      ${
        d.linkedin
          ? `<a href="${d.linkedin}" target="_blank"
              class="px-6 py-3 bg-purple-500 hover:bg-purple-400 rounded-xl text-black font-semibold">
              LinkedIn
            </a>`
          : ""
      }

    </div>
  </div>`;
}

loadPortfolio();
