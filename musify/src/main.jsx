import ReactDom from "react-dom/client"
import { App } from "./App"
import "react-pro-audio-player/src/CustomAudioPlayer.css";

import "./styles.css"

ReactDom.createRoot(document.getElementById("root")).render(
    <>
    <App/>
    </>
)