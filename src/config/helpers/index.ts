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

export const dataDateTransform = (date: Date): string => {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	return date.toDateString() === yesterday.toDateString()
		? "Tomorrow"
		: dateFormatter.format(date);
};
