import { Outlet } from "react-router-dom";

const Root = () => {
	return (
		<>
			<main className="max-w-[1920px] w-full min-h-screen mx-auto px-12 lg:px-24">
				<Outlet />
			</main>
		</>
	);
};

export default Root;
