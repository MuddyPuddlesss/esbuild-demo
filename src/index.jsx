// src/index.jsx
import Server from "react-dom/server"

let Greet = () => <h1>Hello Esbuild</h1>;
console.log(Server.renderToString(<Greet />));
