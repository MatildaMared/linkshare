import React, { useState } from "react";
import styled from "styled-components";
import { PlusCircle } from "react-feather";
import { createList } from "../services/listService";

function CreateList() {
	const [title, setTitle] = useState("");

	async function createListHandler() {
		console.log(title);
		const token = localStorage.getItem("token");
		const data = await createList(token, title);
	}

	return (
		<div>
			<h2>Create List</h2>
			<div>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				></input>
				<button onClick={createListHandler}>
					<PlusCircle />
				</button>
			</div>
		</div>
	);
}

export default CreateList;
