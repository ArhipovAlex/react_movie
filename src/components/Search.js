import React from 'react';
import './Search.css';

class Search extends React.Component {
    // constructor(props)
    // {
    //     super(props);
    //     //this.setState({totalPages:props.total/10})
    //     this.state.totalPages = props.total/10;
    // }
    state =
        {
            search: "Terminator",
            type: "all",
            page:1,
            totalPages:0
        }

    handleKey = (event) => {
        if (event.key === 'Enter') {
            this.props.searchMovie(this.state.search, this.state.type);
        }
    }
    handlerFilter = (event) => {
        this.setState
        (
            () => ({type:event.target.dataset.type}),
            () => {this.props.searchMovie(this.state.search, this.state.type);}
        );
    }
    prevPage =() =>
        {
        this.setState(
            () => (this.state.page > 1 ? {page:this.state.page - 1}:{page:1}),
            () => {this.props.searchMovie(this.state.search, this.state.type, this.state.page)}
            )
        }
    firstPage=()=>
    {
        this.setState(
            () => ({page:1}),
            () => {this.props.searchMovie(this.state.search, this.state.type, this.state.page)}
        )
    }
    nextPage=() =>
        {
        this.setState(
            () => ({page: this.state.page<Math.ceil(this.props.totalMovies/10)? this.state.page + 1 : this.state.page}),
            () => {this.props.searchMovie(this.state.search, this.state.type, this.state.page)} 
            )
        }
        lastPage=()=>
        {
            this.setState(
                //()=>({totalPages:this.props.totalMovies/10}),
                ()=>({page:Math.ceil(this.props.totalMovies/10)}),
                ()=>{this.props.searchMovie(this.state.search, this.state.type, this.state.page)}
            )
        }
    setPage=(pageNumber)=>
        {
            this.setState
            (
                () => ({page:pageNumber}),
                () => (this.props.searchMovie(this.state.search, this.state.type, this,this.state.page))
            )
        }
    render() {
        let moviesPerPage =10;
        let totalPages= Math.ceil(this.props.totalMovies/moviesPerPage);
        let lastIndex = totalPages <= 10 ? totalPages + 1 : this.state.page+moviesPerPage;
        let firstIndex=totalPages <= 10 ? lastIndex - moviesPerPage + lastIndex + 1 : lastIndex - moviesPerPage;
        let pageNumbers=[];
        for (let i=0; i<=totalPages;i++) pageNumbers.push(i);
        return (
            <>
                <div className='radio'>
                    <div>
                        <input  type='radio' 
                                name='type'
                                data-type='all'
                                checked={this.state.type === 'all'}
                                onChange={this.handlerFilter}
                                id='all'
                                />
                        <label htmlFor='all'>All</label>
                    </div>
                    <div>
                        <input  type='radio'
                                name='type'
                                data-type='movie'
                                checked={this.state.type==='movie'}
                                onChange={this.handlerFilter}
                                id='movies'
                                />
                        <label htmlFor='movies'>Movies</label>
                    </div>
                    <div>
                        <input  type='radio'
                                name='type'
                                data-type='series'
                                checked={this.state.type==='series'}
                                onChange={this.handlerFilter}
                                id='series'
                                />
                        <label htmlFor='series'>Television series</label>
                    </div>
                    <div>
                        <input  type='radio'
                                name='type'
                                data-type='game'
                                checked={this.state.type==='game'}
                                onChange={this.handlerFilter}
                                id='games'
                                />
                        <label htmlFor='games'>Games</label>
                    </div>
                </div>
                <div className='search'>
                    <input
                        type="search"
                        placeholder='search'
                        value={this.state.search}
                        onChange={(e) => this.setState({ search: e.target.value})}
                        onKeyDown={this.handleKey}
                    />
                    <button className='btn' onClick={() => this.props.searchMovie(this.state.search, this.state.type)}>
                        Search
                    </button>
                </div>
                <div className='navigator'>
                    <div className='main_btns'>
                        <button className="btn" onClick={this.firstPage}>First</button>
                        <button className="btn" onClick={this.prevPage}>Previous</button>
                    </div>
                    <div className='items'>
                        {
                            pageNumbers
                            .slice(firstIndex,lastIndex)
                            .map
                            (
                                (el,index) =>
                                {
                                    return <button 
                                        className='btn'
                                        style={{background: this.state.page !== el ? "grey":""}}
                                        key={index}
                                        onClick={() => (this.setPage(el))}
                                    >
                                        {el}
                                    </button>
                                }
                            )
                        }
                    </div>
                    <div className='main_btns'>
                        <button className="btn" onClick={this.nextPage}>Next</button>
                        <button className="btn" onClick={this.lastPage}>Last</button>
                    </div>
                </div>
                <div className="debug">
                    {this.state.page}<br/>
                    {this.state.totalPages}<br/>
                    {totalPages}
                </div>
            </>
        )
    }
}

export default Search;