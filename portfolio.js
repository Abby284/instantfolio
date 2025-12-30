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

  if (!data || error) {
    document.getElementById("content").innerHTML =
      `<h1 class="text-2xl font-bold">Portfolio Not Found</h1>`;
    return;
  }

  document.getElementById("content").innerHTML = `
    
    <!-- HERO -->
    <section class="text-center mb-14">
      <h1 class="text-5xl font-extrabold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
        ${data.name}
      </h1>

      <p class="text-lg text-slate-400 mt-2">
        ${data.title || "Student Portfolio"}
      </p>

      <div class="h-[1px] bg-slate-800 mt-6"></div>
    </section>


    <!-- ABOUT -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-sky-400">About</h2>

      <p class="mt-3 text-slate-300 leading-relaxed">
        ${data.bio || "No bio provided."}
      </p>
    </section>


    <!-- EXPERIENCE -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-violet-400">Experience</h2>

      ${
        data.experience
          ? `<div class="bg-slate-900 p-5 mt-3 rounded-2xl border border-slate-700">
              <pre class="whitespace-pre-wrap text-slate-300 leading-relaxed">${data.experience}</pre>
            </div>`
          : `<p class="text-slate-500 mt-2">No experience added.</p>`
      }
    </section>


    <!-- PROJECTS -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-emerald-400">Projects</h2>

      ${
        data.projects
          ? `<div class="bg-slate-900 p-5 mt-3 rounded-2xl border border-slate-700">
              <pre class="whitespace-pre-wrap text-slate-300 leading-relaxed">${data.projects}</pre>
            </div>`
          : `<p class="text-slate-500 mt-2">No projects added.</p>`
      }
    </section>


    <!-- SKILLS -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-orange-400">Skills</h2>

      <div class="flex flex-wrap gap-2 mt-3">
        ${
          data.skills?.length
            ? data.skills
                .map(
                  s =>
                    `<span class="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-200 shadow-[0_0_15px_-5px_rgba(56,189,248,0.6)]">
                      ${s}
                    </span>`
                )
                .join("")
            : `<p class="text-slate-500">No skills added.</p>`
        }
      </div>
    </section>


    <!-- LINKS -->
    <section>
      <h2 class="text-2xl font-semibold text-pink-400">Links</h2>

      <div class="flex gap-4 mt-4">

        ${
          data.github
            ? `<a href="${data.github}" target="_blank"
                class="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-black font-semibold rounded-xl">
                GitHub
               </a>`
            : ""
        }

        ${
          data.linkedin
            ? `<a href="${data.linkedin}" target="_blank"
                class="px-5 py-2 bg-violet-500 hover:bg-violet-400 text-black font-semibold rounded-xl">
                LinkedIn
               </a>`
            : ""
        }

      </div>
    </section>

  `;
}

loadPortfolio();
