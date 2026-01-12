import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function getUrlParams(url) {
  try {
    const parsed = new URL(
      url,
      typeof window !== "undefined" ? window.location.href : undefined
    );
    return Object.fromEntries(parsed.searchParams.entries());
  } catch (err) {
    const urlStr = ("" + url).split("?")[1] || "";
    return Object.fromEntries(new URLSearchParams(urlStr).entries());
  }
}

async function tryGenerateKitTokenClientSide(
  appID,
  serverSecret,
  roomID,
  userID,
  userName
) {
  if (typeof window?.ZegoUIKitPrebuilt === "undefined") {
    throw new Error("ZegoUIKitPrebuilt is not loaded");
  }
  if (!serverSecret) {
    throw new Error("serverSecret is required for client-side token generation");
  }

  try {
    const token =
      await window.ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );
    return token;
  } catch (err) {
    throw new Error("Failed to generate token: " + err.message);
  }
}

function App() {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("initializing");

  useEffect(() => {
    if (window.__ZegoUIKitPrebuiltInitialized) {
      console.warn("ZegoUIKitPrebuilt is already initialized");
      setStatus("initialized");
      return;
    }
    window.__ZegoUIKitPrebuiltInitialized = true;

    let zpInstance = null;

    (async () => {
      try {
        console.log("import.meta.env : ", import.meta.env);

        const rawAppID = import.meta.env?.VITE_APP_ID;
        const rawServerSecret = import.meta.env?.VITE_SERVER_SECRET;
        const appID = rawAppID ? Number(rawAppID) : NaN;

        if (!Number.isFinite(appID)) {
          console.error("Invalid App ID:", rawAppID);
          setStatus("Missing or invalid App ID");
          return;
        }

        if (typeof window?.ZegoUIKitPrebuilt === "undefined") {
          console.error("ZegoUIKitPrebuilt SDK is not loaded");
          setStatus("SDK not loaded");
          return;
        }

        const params = getUrlParams(window.location.href);
        const roomID = params.roomID || String(Math.floor(Math.random() * 10000));
        const userID = params.userID || String(Math.floor(Math.random() * 10000));
        const userName = params.userName || "user_" + userID;

        const roleParam = (params.role || "Host").toString();
        const role =
          roleParam === "Host"
            ? window.ZegoUIKitPrebuilt.Host
            : window.ZegoUIKitPrebuilt.Audience;

        let kitToken = null;

        try {
          setStatus("generating token (server)");
          const resp = await fetch(
            `/api/kit-token?roomID=${encodeURIComponent(
              roomID
            )}&userName=${encodeURIComponent(userName)}`
          );

          if (resp.ok) {
            const json = await resp.json();
            if (json?.kitToken) {
              kitToken = json.kitToken;
            }
          }
        } catch (err) {
          console.log("No API kit-token found, falling back:", err);
        }

        if (!kitToken && rawServerSecret) {
          try {
            setStatus("generating token (client)");
            kitToken = await tryGenerateKitTokenClientSide(
              appID,
              rawServerSecret,
              roomID,
              userID,
              userName
            );
          } catch (err) {
            console.error("Failed to generate token client-side", err);
            setStatus("Failed to generate token");
            return;
          }
        }

        if (!kitToken) {
          setStatus("Token generation failed");
          return;
        }

        try {
          setStatus('creating instance');
          zpInstance = window.ZegoUIKitPrebuilt.create(kitToken);

          window.__ZegoUIKitPrebuiltInstance = zpInstance;
        } catch (e) {
          console.error("Failed to create Zego instance:", e);
          setStatus("Instance creation failed");
          return;
        }

        if (!zpInstance || typeof zpInstance.joinRoom !== "function") {
          console.error("Invalid Zego instance:", zpInstance);
          setStatus("Invalid Zego instance");
          return;
        }

        const hostConfig = {
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
        }

        const joinOpts = {
          container: containerRef.current || document.querySelector("#zego-root") || document.body,
          scenario: {
            mode: window.ZegoUIKitPrebuilt.LiveStreaming,
            config: {
              role
            },
          },

          sharedLinks: [
            {
              name: "Join as Host",
              url: window.location.protocol + "//" + window.location.host + window.location.pathname + "?roomID=" + encodeURIComponent(roomID) + "&role=Audience",
            },
          ],
          ...(role === window.ZegoUIKitPrebuilt.Host ? hostConfig : {}),
        }

        try {
          setStatus("joining room");
          await zpInstance.joinRoom(joinOpts);
          setStatus("joined");
          console.log("Joined room successfully");

          if (containerRef.current && containerRef.current.requestFullscreen) {
            containerRef.current.requestFullscreen().catch((err) => {
              console.warn("Failed to enter fullscreen:", err);
            })
          } else {
            console.warn("Fullscreen API not supported");
          }
        } catch (je) {
          console.error("Failed to join room:", je);
          setStatus("Failed to join room");
          return;
        }
      } catch (err) {
        console.error("Initialization error:", err);
        setStatus("Initialization failed");
      }
    })();

    return () => {


      try {
        const inst = zpInstance || window.__ZegoUIKitPrebuiltInstance;
        if (inst && typeof inst.destroy === "function") {
          inst.destroy();
        }
      } catch (e) {
        console.warn("Failed to destroy Zego instance:", e);
      }
    };
  }, []);

  return (
    <div className="min-h-screen text-blue-50 flex flex-col">
      <Navbar/>

      <main className="flex-1 p-4 ">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">
          Streamyy
        </h2>

        <div className="mb-4">
          <span className="inline-block text-blue-500 mr-2 font-medium">
            Status: 
          </span>
          <span data-testid = "zego-status text-green-400">
            {status}
          </span>
        </div>

        <div id="zero-root" ref={containerRef} 
        style={{
          width: "100%",
          height:"70vh",
          minHeight:"400px",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          overflow: "hidden",
        }}> 
            {/* ZegoUIKitPrebuilt will render the video call UI here */}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
