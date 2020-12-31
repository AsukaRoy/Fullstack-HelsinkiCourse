
const filterFun = ({newFilter, setNewFilter, setShowAll}) => {

    const handleFilterChange = (event) => {
      if (event.target.value === "") {
        setShowAll(true)
      }
      else {
        setShowAll(false)
      }
      setNewFilter(event.target.value)
    }
  
    return (
      <div>
        <form>
          <div>
            find countries: <input value={newFilter} onChange={handleFilterChange} />
          </div>
        </form>
      </div>
    )
  }

  export default filterFun