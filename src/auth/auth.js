import { generateRandomString } from "../utils/utils";

const authEndpoint = "https://accounts.spotify.com/authorize";
const client_id = process.env.REACT_APP_CLIENT_ID;
const state = generateRandomString(8);
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-modify-playback-state",
  "user-top-read",
];

export const implicitAuth = () => {
  const params = new URLSearchParams({
    client_id,
    response_type: "token",
    redirect_uri: process.env.REACT_APP_REDIRECT_URL,
    state,
    scope: scopes.join(" "),
  });

  window.location = `${authEndpoint}?${params}`;
};
