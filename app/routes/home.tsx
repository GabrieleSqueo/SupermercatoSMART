import type { Route } from "./+types/home";
import esempioComponente from "../esempioComponente/esempioComponente"
import EsempioComponenteb from "../componenteb/esempioComponenteb";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <EsempioComponenteb />
      <p> Ciao</p>
    </div>
  );
}
