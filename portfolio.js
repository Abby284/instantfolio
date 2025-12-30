const supabaseClient = supabase.createClient(
  "https://ykrpylrwxdirlbxtqneo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrcnB5bHJ3eGRpcmxieHRxbmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5OTA1MDcsImV4cCI6MjA4MjU2NjUwN30.GUT_3RF57cLxNbQNOj_gjOx5Z9nh2BbiCPqGuk9uzqo"
);

const slug = new URLSearchParams(window.location.search).get("slug");

async function loadPortfolio() {
  const { data, error } = await supabaseClient
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    document.getElementById("content").innerHTML =
      `<h1 class="text-2xl font-bold">Portfolio not found</h1>`;
    return;
  }

  document.getElementById("content").innerHTML = `
    <!-- HERO -->
    <div class="mb-14">
      <h1 class="text-5xl font-bold">${data.name}</h1>
      <p class="text-xl text-slate-400 mt-2">${data.title || ""}</p>
    </div>

    <!-- ABOUT -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold border-b border-slate-700 pb-2 mb-3">
        About
      </h2>
      <p class="text-slate-300 leading-relaxed">
        ${data.bio || "No bio added yet."}
      </p>
    </section>

    <!-- EXPERIENCE -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold border-b border-slate-700 pb-2 mb-3">
        Experience
      </h2>
      <p class="text-slate-300 whitespace-pre-line">
        ${data.experience || "No experience added."}
      </p>
    </section>

    <!-- PROJECTS -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold border-b border-slate-700 pb-2 mb-3">
        Projects
      </h2>
      <p class="text-slate-300 whitespace-pre-line">
        ${data.projects || "No projects added yet."}
      </p>
    </section>

    <!-- SKILLS -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold border-b border-slate-700 pb-2 mb-3">
        Skills
      </h2>
      <div class="flex gap-2 flex-wrap">
        ${
          data.skills?.length
            ? data.skills
                .map(
                  (s) =>
                    `<span class="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">${s}</span>`
                )
                .join("")
            : `<p class="text-slate-400">No skills added.</p>`
        }
      </div>
    </section>

    <!-- LINKS -->
    <section>
      <h2 class="text-2xl font-semibold border-b border-slate-700 pb-2 mb-3">
        Links
      </h2>
      <div class="space-y-2">
        ${
          data.github
            ? `<a href="${data.github}" class="text-sky-400 hover:underline" target="_blank">GitHub</a>`
            : ""
        }
        ${
          data.linkedin
            ? `<a href="${data.linkedin}" class="text-sky-400 hover:underline block" target="_blank">LinkedIn</a>`
            : ""
        }
      </div>
    </section>
  `;
}

loadPortfolio();
