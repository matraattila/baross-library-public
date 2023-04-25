export default function removeSpecials(string) {
	// Remove special characters
	const newString = string.replace(/[\])}[{(]/g, '')

	return newString
}
