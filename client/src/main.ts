import "./main.scss";
import { initRouter, handleRoute } from "./router";
import { hasToken } from "./utils/token";
import { setAuthChecked } from "./utils/store";
import { getMe } from "./api/auth";

async function init(): Promise<void> {
   initRouter();

   if (hasToken()) {
      try {
         await getMe();
      } catch {}
   }

   setAuthChecked();

   handleRoute();
}

init();
