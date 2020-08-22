import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { AppContext } from '../../../App';
import advancedStyleParser from '../../../advancedStyleParser/advancedStyleParser';

const PageViewer = ({ page }) => {
	const [state, setState] = useState({
		page: { ...page },
		error: null,
		loading: false,
		sections: [],
	});
	const context = useContext(AppContext);

	useEffect(() => {
		if (page.data) {
			const parsedData = JSON.parse(page.data.replace(/'/g, '"'));
			setState({
				...state,
				sections: parsedData,
			});
		}

		return () => {
			context.setPageMode("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return state.sections.map((section) => (
		<Container id={section.id} key={section.id}>
			<Row>
				{section.columns.map((column) => (
					<Col id={column.id} key={column.id}>
						{column.fields.map((field) =>
							field.type === "text" ? (
								<p
									id={field.id}
									key={field.id}
									style={advancedStyleParser(field.customStyles)}
								>
									{field.data}
								</p>
							) : field.type === "image" ? (
								<img
									id={field.id}
									key={field.id}
									style={advancedStyleParser(field.customStyles)}
									src={field.data}
									alt=""
								/>
							) : field.type === "list" ? (
								<ul
									id={field.id}
									key={field.id}
									style={advancedStyleParser(field.customStyles)}
								>
									{field.data.split('\n').map((listItem, i) => (
										<li key={`${field.id}--${i}`}>{listItem}</li>
									))}
								</ul>
							) : null
						)}
					</Col>
				))}
			</Row>
		</Container>
	));
};

export default PageViewer;
