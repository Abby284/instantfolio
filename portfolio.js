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
      `<h1 class="text-2xl font-bold">Portfolio not found</h1>`;
    return;
  }

  document.getElementById("content").innerHTML = `
    <h1 class="text-4xl font-bold">${data.name}</h1>
    <p class="text-slate-400 text-lg">${data.title || ""}</p>

    <p class="mt-6 text-slate-300 leading-relaxed">
      ${data.bio || ""}
    </p>

    <h2 class="mt-10 text-2xl font-semibold">Skills</h2>
    <div class="flex gap-2 flex-wrap mt-3">
      ${
        data.skills
          .map(
            s =>
              `<span class="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">${s}</span>`
          )
          .join("")
      }
    </div>

    ${
      data.github || data.linkedin
        ? `
      <h2 class="mt-10 text-2xl font-semibold">Links</h2>
      <div class="mt-3 space-y-2">
        ${data.github ? `<a class="text-sky-400 block" href="${data.github}" target="_blank">GitHub</a>` : ""}
        ${data.linkedin ? `<a class="text-sky-400 block" href="${data.linkedin}" target="_blank">LinkedIn</a>` : ""}
      </div>
    `
        : ""
    }
  `;
}

loadPortfolio();
