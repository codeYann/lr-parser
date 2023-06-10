export type Production = {
	left: string;
	right: string[];
};

export type Item = {
	production: Production;
	dotPosition: number;
};

export type ItemSet = Item[];

function itemExists(item: Item, itemSet: ItemSet): boolean {
	return itemSet.some((i) => {
		return (
			i.production.left === item.production.left &&
			i.production.right.length === item.production.right.length &&
			i.dotPosition === item.dotPosition
		);
	});
}

function expandItem(item: Item, grammar: Production[], itemSet: ItemSet) {
	const { production, dotPosition } = item;
	const symbolAfterDot = production.right[dotPosition];

	if (symbolAfterDot) {
		grammar
			.filter((prod: Production) => prod.left === symbolAfterDot)
			.forEach((prod: Production) => {
				const newItem: Item = {
					production: prod,
					dotPosition: 0,
				};
				if (!itemExists(newItem, itemSet)) {
					itemSet.push(newItem);
					expandItem(newItem, grammar, itemSet);
				}
			});
	}
}

function buildClosure(itemSet: Item[], grammar: Production[]): ItemSet {
	const itemSetCopy = [...itemSet];
	itemSetCopy.forEach((item) => {
		expandItem(item, grammar, itemSetCopy);
	});
	return itemSetCopy;
}

function isSameItemSet(setA: ItemSet, setB: ItemSet): boolean {
	if (setA.length !== setB.length) {
		return false;
	}
	for (const itemA of setA) {
		if (!setB.some((itemB) => isSameItem(itemA, itemB))) {
			return false;
		}
	}
	return true;
}

function isSameItem(itemA: Item, itemB: Item): boolean {
	return (
		itemA.production.left === itemB.production.left &&
		itemA.dotPosition === itemB.dotPosition &&
		itemA.production.right.length === itemB.production.right.length &&
		itemA.production.right.every(
			(symbol, idx) => symbol === itemB.production.right[idx]
		)
	);
}

export function buildLR0Items(grammar: Production[]): ItemSet[] {
	const startProduction = grammar[0];
	const startItem: Item = {
		production: startProduction,
		dotPosition: 0,
	};
	const startItemSet = buildClosure([startItem], grammar);
	const itemSets: ItemSet[] = [startItemSet];
	const visitedItemSets: ItemSet[] = [startItemSet];

	let idx = 0;
	while (idx < itemSets.length) {
		const currentItemSet = itemSets[idx];

		const symbolsAfterDot = currentItemSet
			.filter((item) => item.production.right[item.dotPosition])
			.map((item) => item.production.right[item.dotPosition]);

		const nextItemSets: ItemSet[] = symbolsAfterDot.map((symbol) => {
			const nextItems = currentItemSet.filter(
				(item) => item.production.right[item.dotPosition] === symbol
			);
			return buildClosure(nextItems, grammar);
		});
		nextItemSets.forEach((itemSet) => {
			if (
				!visitedItemSets.some((visitedSet) =>
					isSameItemSet(visitedSet, itemSet)
				)
			) {
				visitedItemSets.push(itemSet);
				itemSets.push(itemSet);
			}
		});
		idx += 1;
	}
	return itemSets;
}

function printItemSets(itemSets: ItemSet[]) {
	itemSets.forEach((itemSet, index) => {
	  console.log(`Item Set ${index}:`);
	  itemSet.forEach((item) => {
		console.log(`${item.production.left} -> ${getItemString(item)}`);
	  });
	  console.log();
	});
  }
  
  // Function to get a string representation of an item
  function getItemString(item: Item): string {
	const { production, dotPosition } = item;
	const rhsSymbols = production.right.slice();
	rhsSymbols.splice(dotPosition, 0, '•'); // Insert the dot symbol at the appropriate position
	return rhsSymbols.join(' ');
  }