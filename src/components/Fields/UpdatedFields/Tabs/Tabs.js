import React from 'react';
import styles from './Tabs.module.css';

import Button from '../../../../ui/Button/Button';
import { Fieldset, Label, Text } from '../../../../ui/InputFields/InputFields';
import advancedStyleParser from '../../../../advancedStyleParser/advancedStyleParser';

const Tabs = ({ fields, properties, propertyChangeHandler, activeTab, switchTabHandler }) => {

	const tabsButtons = (
		fields ? Object.keys(fields).map((fKey, i) => (
			<Button
				Active={activeTab === i}
				type='Default'
				customStyles={styles.TabButton}
				clicked={_ => switchTabHandler(i)}>{fKey}</Button>
		)) : null
	)

	const tabsContent = (
		fields ? Object.keys(fields).map((fKey, i) => (
				<div className={activeTab === i ? styles.Display : styles.Hide }>
					{Object.keys(fields[fKey]).map(pKey => {
							const group = fields[fKey][pKey];
							return (
								<div key={pKey} className={styles.Subcategory}>
									<h5>{group.label}</h5>
									{Object.keys(group.values).map(val => {
										const property = group.values[val];
										return (
											<Fieldset key={val} value={advancedStyleParser(properties)[val]}>
												<Text
													id={val}
													name={val}
													value={advancedStyleParser(properties)[val]}
													onChange={propertyChangeHandler} />
												<Label labels={val}>
													{property.label}
												</Label>
											</Fieldset>
										)
									})}
								</div>
							)
						})}
				</div>
		)) : null
	)

	return (
		<div className={styles.Tabs}>
			<div className={styles.TabsButtons}>
				{tabsButtons}
			</div>
			<div className={styles.TabsContent}>
				{tabsContent}
			</div>
		</div>
	);
}
 
export default Tabs;