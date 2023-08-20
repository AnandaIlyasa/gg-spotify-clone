import { useState, useEffect } from "react";

export default function useExtractAccessToken() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    function extractAccessToken() {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const token = hashParams.get("access_token");
      setAccessToken(token);
    }

    if (!accessToken) {
      extractAccessToken();
    }
  }, [accessToken]);

  return [accessToken, setAccessToken];
}
