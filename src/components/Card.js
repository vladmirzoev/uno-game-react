import '../styles/card.scss'
const Card = ({colour, value}) => {
    return (
        <div className={`card ${colour}`}>
            <h1>{value}</h1>
        </div>
    );
};

export default Card;