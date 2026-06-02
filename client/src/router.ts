import { isLoggedIn } from "./utils/store";

type PageRenderer = (params: Record<string, string>) => Promise<HTMLElement>;

interface Route {
   pattern: RegExp;
   paramNames: string[];
   render: PageRenderer;
   guarded: boolean;
}

const routes: Route[] = [];
let currentRenderToken = {};

function addRoute(path: string, render: PageRenderer, isProtected = false): void {
   const paramNames: string[] = [];
   const pattern = new RegExp(
      "^" +
         path.replace(/:([^/]+)/g, (_: string, name: string) => {
            paramNames.push(name);
            return "([^/]+)";
         }) +
         "$"
   );
   routes.push({ pattern, paramNames, render, guarded: isProtected });
}

addRoute("/", async () => {
   const { renderHome } = await import("./pages/home");
   return renderHome();
});

addRoute("/catalog", async () => {
   const { renderCatalog } = await import("./pages/catalog");
   return renderCatalog();
});

addRoute("/login", async () => {
   const { renderLogin } = await import("./pages/login");
   return renderLogin();
});

addRoute("/register", async () => {
   const { renderRegister } = await import("./pages/register");
   return renderRegister();
});

addRoute(
   "/film/:id",
   async (params) => {
      const { renderFilm } = await import("./pages/film");
      return renderFilm(Number(params.id));
   },
   true,
);

addRoute(
   "/serial/:id",
   async (params) => {
      const { renderSerial } = await import("./pages/serial");
      return renderSerial(Number(params.id));
   },
   true,
);

addRoute(
   "/profile",
   async () => {
      const { renderProfile } = await import("./pages/profile");
      return renderProfile();
   },
   true,
);

export function navigate(path: string): void {
   history.pushState(null, "", path);
   handleRoute();
}

function renderNotFoundPage(app: HTMLElement): void {
   import("./pages/not-found").then(({ renderNotFound }) => {
      app.innerHTML = "";
      app.appendChild(renderNotFound());
   });
}

export function handleRoute(): void {
   const path = location.pathname;
   const app = document.getElementById("app")!;

   for (const route of routes) {
      const match = path.match(route.pattern);
      if (!match) continue;

      if (route.guarded && !isLoggedIn()) {
         sessionStorage.setItem("redirectAfterLogin", path);
         navigate("/login");
         return;
      }

      const params: Record<string, string> = {};
      route.paramNames.forEach((name, i) => {
         params[name] = match[i + 1];
      });

      const token = {};
      currentRenderToken = token;

      route
         .render(params)
         .then((el) => {
            if (token !== currentRenderToken) return;
            app.innerHTML = "";
            app.appendChild(el);
         })
         .catch(() => renderNotFoundPage(app));

      return;
   }

   renderNotFoundPage(app);
}

export function initRouter(): void {
   document.addEventListener("click", (e) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("//")) return;

      e.preventDefault();
      navigate(href);
   });

   window.addEventListener("popstate", handleRoute);
}
