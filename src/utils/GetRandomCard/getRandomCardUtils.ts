import { CardType } from "../../api/cardsApi";

export const getRandomCard = (cards: Array<CardType>): CardType => {
    const sum = cards.reduce((acc, card) => acc + ((6 - card.grade) ** 2), 0);
    const randomNumber = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < randomNumber ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, randomNumber, res)

    return cards[res.id + 1];
};
