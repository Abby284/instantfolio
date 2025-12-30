document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("portfolioForm");

const supabaseClient = supabase.createClient( "https://ykrpylrwxdirlbxtqneo.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrcnB5bHJ3eGRpcmxieHRxbmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5OTA1MDcsImV4cCI6MjA4MjU2NjUwN30.GUT_3RF57cLxNbQNOj_gjOx5Z9nh2BbiCPqGuk9uzqo" );

  function createSlug(name) {
    const base = name.toLowerCase().trim().replace(/\s+/g, "-");
    const random = Math.random().toString(36).substring(2, 6);
    return `${base}-${random}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const slug = createSlug(name);
    const skills = document.getElementById("skills").value.split(",").map(s => s.trim());

    const { error } = await supabaseClient.from("portfolios").insert([
      {
        name,
        slug,
        title: title.value,
        bio: bio.value,
        skills,
        github: github.value,
        linkedin: linkedin.value,
        experience: experience.value,
        projects: projects.value,
        education: education.value,
        achievements: achievements.value,
        certificates: certificates.value,
        academics: academics.value
      }
    ]);

    if (error) {
      alert("Error saving portfolio");
      return;
    }

    window.location.href = `portfolio.html?slug=${slug}`;
  });
});
