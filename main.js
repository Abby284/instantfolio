const supabaseClient = supabase.createClient(
  "https://ykrpylrwxdirlbxtqneo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrcnB5bHJ3eGRpcmxieHRxbmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5OTA1MDcsImV4cCI6MjA4MjU2NjUwN30.GUT_3RF57cLxNbQNOj_gjOx5Z9nh2BbiCPqGuk9uzqo"
);
console.log("Main.js connected");

// generate clean slug with short random
function createSlug(name) {
  const base = name.toLowerCase().trim().replace(/\s+/g, "-");
  const random = Math.random().toString(36).substring(2, 6);
  return `${base}-${random}`;
}

document.getElementById("portfolioForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const slug = createSlug(name);

  const skills = document
    .getElementById("skills")
    .value.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const { error } = await supabaseClient.from("portfolios").insert([
    {
      name,
      slug,
      title: document.getElementById("title").value,
      bio: document.getElementById("bio").value,
      skills,
      github: document.getElementById("github").value,
      linkedin: document.getElementById("linkedin").value
    }
  ]);

  if (error) {
    alert("Something went wrong. Please try again.");
    console.log(error);
    return;
  }

  window.location.href = `portfolio.html?slug=${slug}`;
});
