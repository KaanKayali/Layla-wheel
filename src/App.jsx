import "./styles.css"

export default function App(){

  const [amount, setAmount] = useState(0)

  function handleSubmit(e){
    e.preventDefault();
  }

  return (
    <>
      <h1>layla - Spinwheel</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="number" min="1" className="amount" onChange={e => setAmount(e.target.value)}/>
          <button className="btn">Add</button>
        </form> 
        <ul>
          {
            amount.map(amo => {
              return(
                <li>
                  <label htmlFor="eintrag">
                    Name:
                  </label>
                  <input type="text" id="eintrag" className="eintrag"/>
                </li>
              )
            })

          }
        </ul>
        


      </div>
    </>
  )
}