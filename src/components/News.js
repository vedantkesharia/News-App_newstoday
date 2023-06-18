import React, { Component } from 'react'
import NewsItem from './NewsItem'

//col-md-4 -> 4 columns times 3(so 3 rows)
export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }

  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=0f9d0af3d4e84db7b18db670b31c8f91&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
  }

   handlePrevClick=async ()=>{
    console.log("previous")
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=0f9d0af3d4e84db7b18db670b31c8f91&page=${this.state.page-1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles:parsedData.articles
    })
  }

    handleNextClick=async ()=>{
    console.log("next");
    if(this.state.page+1>Math.ceil(this.state.totalResults/20)){

    }
    else{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=0f9d0af3d4e84db7b18db670b31c8f91&page=${this.state.page+1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles:parsedData.articles
    })
  }
  }

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsToday-Top Headlines</h1>
        <div className="row">
         {this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
              <NewsItem key={element.url} title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News