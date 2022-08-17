// src/index.jsx
// import Server from "react-dom/server"

// let Greet = () => <h1>Hello Esbuild</h1>;
// console.log(Server.renderToString(<Greet />));

import { render } from "https://cdn.skypack.dev/react-dom"
import React from "https://cdn.skypack.dev/react"

const Greet = () => <h1>Hello Esbuild</h1>;

render(<Greet />, document.getElementById("root"));