import React from 'react';
import './Search.css';

class Search extends React.Component
{
    state=
    {
        search:""
    }

    handleKey=(event)=>
    {
        if(event.key==='Enter')
        {
            this.props.searchMovie(this.state.search, this.state.type);
        }
    }
    render()
    {
        return(
            <>
                <div className='search'>
                    <input 
                        type="search"
                        placeholder='search'
                        value={this.state.search}
                        onChange={(e)=>this.setState({search:e.target.value})}
                        onKeyDown={this.handleKey}
                    />
                    <button className='btn' onClick={() => this.props.searchMovie(this.state.search, this.state.type)}>
                        Search
                    </button>
                </div>
            </>
        )
    }
}

export default Search;