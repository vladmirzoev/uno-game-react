const ColourSelector = ({ onColourSelect }) => {
    const colours = ['red', 'blue', 'yellow', 'green'];
    return (
        <div className="color-selector">
            <h3>Select a colour:</h3>
            {colours.map(colour => (
                <button
                key={colour}
                style={{backgroundColor: colour}}
                onClick={() => onColourSelect(colour)}
                >
                {colour}
                </button>
            ))}
        </div>
    );
}

export default ColourSelector;