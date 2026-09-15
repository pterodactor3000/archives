import { getQuoteRows } from '@remote-learning/domain'

const Quote = () => {
  const quotes = getQuoteRows()

  return (
    <>
      <table>
        <caption>Sample quotes from @remote-learning/domain</caption>
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Bid</th>
            <th scope="col">Ask</th>
            <th scope="col">Spread</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote, index) => (
            <tr key={`${quote.symbol}-${index}`}>
              <th scope="row">{quote.symbol}</th>
              <td>{quote.bid}</td>
              <td>{quote.ask}</td>
              <td>{quote.spread}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export { Quote }
