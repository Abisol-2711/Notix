import './search.css'

function Search() {
  return (
    <form className="formSearch">
      <input
        className="search"
        type="text"
        placeholder="Busca tu nota o carpeta"
      />
      <div className="contentIconSearch">
        <span className="material-symbols-rounded"> search </span>
      </div>
    </form>
  )
}

export default Search
