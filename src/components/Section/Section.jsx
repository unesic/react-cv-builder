import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { FiPlus, FiColumns } from 'react-icons/fi';

import builderContext from '../../containers/Builder/context/builder-context';
import SectionContext from './section-context';

import Button from '../../ui/Button/Button';
import Column from '../Column/Column';

const Section = ({ id, columns }) => {
	const [data, setData] = useState([]);
	const [prevData, setPrevData] = useState([]);
	const [cols, setCols] = useState();
	const isMounted = useRef(false);
	const context = useContext(builderContext);
	
	useEffect(_ => {
		const initialData = [];
		if (columns.length) {
			columns.forEach(column => {
				initialData.push({...column})
			})
		}

		setData(initialData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(columns)]);

	useEffect(_ => {
        if (isMounted.current) {
			const newCols = data.map(column => (
				<Column key={column.id} {...column} />
			))

			setCols(newCols);
        } else {
            isMounted.current = true;
        }
	}, [id, data, context]);

	useEffect(() => {
		context.setSectionData(id, data);
	}, [prevData]);

	const newColumnHandler = _ => {
        const newData = data ? data.map(f => ({...f})) : [];

        newData.push({
			id: 'column-id-' + new Date().valueOf(),
			fields: [],
        })

        setData(newData);
		context.setSectionData(id, newData);
	}

	const updateColumnData = (id, updatedData) => {
		if (updatedData.length > 0) {
			const newData = data.map(c => ({...c}));
			const current = newData.find(column => column.id === id);
			const old = data.find(column => column.id === id);
			const index = newData.indexOf(current);
			current.fields = [...updatedData]
			
			if ({...current}.fields !== {...old}.fields) {
				newData[index] = current;
				setData(newData);
				setPrevData(newData);
			}
		}
	}

	return (
			<Container style={{backgroundColor: '#ccc8'}}>
				<Row style={{backgroundColor: '#ccc8'}}>
					<SectionContext.Provider
						value={{ updateColumnData: updateColumnData }} >
						{cols ? cols : null}
					</SectionContext.Provider>
				</Row>
				<Button
					type='Add'
					clicked={newColumnHandler}
				>
					<FiPlus /><FiColumns />
				</Button>
			</Container>
	);
}
 
export default Section;