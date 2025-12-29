document.addEventListener("DOMContentLoaded", () => {

  console.log("Main.js loaded");

  const form = document.getElementById("portfolioForm");

  if (!form) {
    console.error("Form NOT FOUND. Check id='portfolioForm'");
    return;
  }

  console.log("Form found successfully");

  const supabaseClient = supabase.createClient(
    "https://ykrpylrwxdirlbxtqneo.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrcnB5bHJ3eGRpcmxieHRxbmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5OTA1MDcsImV4cCI6MjA4MjU2NjUwN30.GUT_3RF57cLxNbQNOj_gjOx5Z9nh2BbiCPqGuk9uzqo"
  );

  function createSlug(name) {
    const base = name.toLowerCase().trim().replace(/\s+/g, "-");
    const random = Math.random().toString(36).substring(2, 6);
    return `${base}-${random}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Form submitted");

    const name = document.getElementById("name").value;
    const slug = createSlug(name);

    const skills = document
      .getElementById("skills")
      .value.split(",")
      .map(s => s.trim())
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
      console.log(error);
      alert("Something went wrong while saving portfolio.");
      return;
    }

    console.log("Saved successfully, redirecting...");
    window.location.href = `portfolio.html?slug=${slug}`;
  });
});
