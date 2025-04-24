import Test from "@components/test/index.js";
import type { AppProps } from "@models/app.js";
import React from "react";

export default function App({ name }: AppProps) {
	return <Test name={name} />;
}
