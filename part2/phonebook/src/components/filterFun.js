
const filterFun = ({newFilter, setNewFilter, setShowAll}) => {

    const handleFilterChange = (event) => {
      console.log(event.target.value === "")
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
        <h1>Phonebook</h1>
        <form>
          <div>
            filter shown with: <input value={newFilter} onChange={handleFilterChange} />
          </div>
        </form>
      </div>
    )
  }

  export default filterFun