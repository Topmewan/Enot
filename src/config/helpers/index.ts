export const getRandomItemInArray = <T>(arr: T[]): T => {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
};

export const getColor = (idx: number) => {
	if (!idx) return;
	if (idx % 3 === 0) {
		return "yellow";
	} else if (idx % 3 === 1) {
		return "red";
	} else if (idx % 3 === 2) {
		return "blue";
	}
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "2-digit",
	day: "2-digit",
});

export const tomorrow = (date: Date) => {
	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	if (date.getDate() === tomorrow.getDate()) {
		return "Tomorrow";
	} else {
		return dateFormatter.format(date);
	}
};
