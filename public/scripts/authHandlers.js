async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { data, error } = await document.supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${location.origin}/exchangeSupabaseCode` },
  });
  if (error) {
    console.error(error);
  } else {
    document.dispatchEvent(new CustomEvent("signup-event", { detail: data }));
  }
  return false;
}
async function signin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { data, error } = await document.supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
  } else {
    document.dispatchEvent(new CustomEvent("signin-event", { detail: data }));
  }
  return false;
}
async function signout() {
  const { data, error } = await document.supabase.auth.signOut();
  if (error) {
    console.error(error);
  } else {
    document.dispatchEvent(new CustomEvent("signout-event", { detail: data }));
  }
  return false;
}
let map;
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

document.addEventListener("htmx:afterRequest", (event) => {
  if (event.detail.pathInfo.requestPath === "/map") {
    initMap();
  }
});
