import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HelmetProvider>
			<RouterProvider router={router} />
			<Toaster />
		</HelmetProvider>
	</StrictMode>
);
