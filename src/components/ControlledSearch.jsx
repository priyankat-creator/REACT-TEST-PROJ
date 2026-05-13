import React from 'react'

function ControlledSearch({search,setSearch}) {
    const searchHandler = (e) =>{
        setSearch(e.target.value);
    }
  return (
    <div>
        <input type="text"
                name = "search"
                value = {search}
                onChange={searchHandler}
                placeholder='search or ask a question'
                style={{width:"80%",padding:"10px",margin:"15px"}} />
                <br /><br />
      
    </div>
  )
}

export default ControlledSearch
