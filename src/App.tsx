import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

import "./App.css";
import Model from "./components/Model";
import { enterFullscreen } from "./utils/utils";
import Spinner from "./components/Spinner";

const App = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [loadedModel] = useState(loaded3DModel);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setIsMobile(window.innerWidth <= 768);
		});

		return () => {
			window.removeEventListener("resize", () => {
				setIsMobile(window.innerWidth <= 768);
			});
		};
	}, []);

	const renderModel = () => {
		return (
			<Model
				url={loadedModel.url}
				position={loadedModel.position}
				scale={loadedModel.scale}
				rotation={loadedModel.rotation}
				color={loadedModel.color}
			/>
		);
	};

	return (
		<div className="app-container">
			{isMobile && (
				<div className="button-container">
					<button
						className="toggle-button"
						onClick={() => {
							enterFullscreen();
						}}
					>
						{"Toggle Fullscreen"}
					</button>
				</div>
			)}
			<Canvas camera={{ position: [0, -150, 0] }} onTouchMove={(e) => e.stopPropagation()}>
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} intensity={1} />
				<directionalLight position={[-2, 5, 2]} intensity={1} />
				<Suspense fallback={<Spinner />}>
					{renderModel()}
					<OrbitControls />
				</Suspense>
			</Canvas>
		</div>
	);
};

export default App;
