export function Number({ value, totalValue }) {
	return <input style={{width: "20%", textAlign: "center"}} type="text" value={`${value} / ${totalValue}`} aria-label="Read-only input" readOnly/>;
}
