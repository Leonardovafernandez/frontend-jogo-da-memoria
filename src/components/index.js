import './index.css';

function Card({ ...prop }) {
    return (
        <div className="card" key={prop.key} slug={prop.slug} onClick={prop.onClick}>
            <img src={prop.image} alt="tecnologia" />
        </div>
    );
};

export default Card;
