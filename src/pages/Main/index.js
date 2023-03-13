import { useState, useRef, useEffect } from 'react';
import './style.css';
import ArrayCards from '../../cards';
import logo from '../../assets/Logo.svg';
import Card from '../../components';
import cardBack from '../../assets/card-back.png';
import congratulations from '../../assets/congrats.png';

let count = 0;

function Main() {
  const [Cards, setCards] = useState(ArrayCards);
  const [Congrats, setCongrats] = useState(null);

  const contentRef = useRef(null);

  const resetCards = [...ArrayCards];

  function spinAllCards() {
    console.log("Entrou na função spinAllCards");

    const localCards = [...resetCards];
    console.log(localCards);

    localCards.forEach((card) => {
      card.turned = false;
    });

    resetImg();
    setCards(localCards);
  };

  function resetImg() {
    const localCongrats = null;

    setCongrats(localCongrats);
  }

  function virarCarta(cardId) {
    count++;
    console.log(count);

    if (count === 1) {
      const localCards = [...Cards];

      const cardIndex = localCards.findIndex((card) => card.id === cardId);

      if (cardIndex === -1) {
        return;
      }

      const cardOnClick = localCards[cardIndex];

      cardOnClick.turned = true;

      setCards(localCards);
    };

    if (count === 2) {
      setTimeout(() => {
        checkCards();

      }, 2000)
      const localCards = [...Cards];

      const cardIndex = localCards.findIndex((card) => card.id === cardId);

      if (cardIndex === -1) {
        return;
      }

      const cardOnClick = localCards[cardIndex];

      cardOnClick.turned = true;

      setCards(localCards);
    };

    if (count === 3) {
      return;
    };
  };

  function desvirar() {

    count = 0;

    const localCards = [...Cards];

    localCards.forEach((card) => {
      card.turned = false;
    });

    setCards(localCards);
  };

  function excluir(deleteSlug) {

    console.log("Entrou na função de excluir", deleteSlug);

    count = 0;

    const localCards = [...Cards];

    const cardIndex = localCards.findIndex((card) => card.slug === deleteSlug);
    console.log(cardIndex, localCards);
    localCards.splice(cardIndex, 1);

    console.log(cardIndex, localCards);

    const cardIndexTwo = localCards.findIndex((card) => card.slug === deleteSlug);
    console.log(cardIndexTwo, localCards);
    localCards.splice(cardIndexTwo, 1);

    if (localCards.length === 0) {
      parabens();
    }

    setCards(localCards);
  };

  function checkCards() {
    console.log("Entrou na função checkCards");

    const localCards = [...Cards];

    const cardsVirados = [];

    localCards.find((card) => {
      if (card.turned === true) {
        cardsVirados.push(card);
      }
    });

    if (cardsVirados[0].slug === cardsVirados[1].slug) {
      const deleteSlug = cardsVirados[0].slug;
      excluir(deleteSlug);
    } else {
      desvirar();
    };
  };

  function parabens() {
    const localCongrats = congratulations;

    setCongrats(localCongrats);
  };

  return (
    <div className="container">
      <nav className="nav-bar">
        <div className="img">
          <img className="img-logo" src={logo} alt="Logo" />
        </div>
        <div className="btn">
          <button className="btn-reset" onClick={() => spinAllCards()} >RESET</button>
        </div>
      </nav>

      <div className='content' ref={contentRef} >
        {Cards.map((card) => (
          <Card key={card.id} slug={card.slug} image={`${card.turned ? card.image : cardBack}`} onClick={() => virarCarta(card.id)} />
        ))}
        <img src={`${Congrats === null ? '' : congratulations}`} />
      </div>
    </div>
  );
}

export default Main;
