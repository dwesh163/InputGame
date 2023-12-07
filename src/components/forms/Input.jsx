export function Input({ placeholder, value, onChange }) {
    return <input id="input" type="text" className="form-control" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
}
