import React, { Component } from 'react';
import Loader from './Loading';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      disableNextButton: false,
      disablePrevButton: true,
      showLoadingBar: false // Add a flag to control the loading bar display
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsCover`;
    this.handleScroll = this.handleScroll.bind(this);
  }

  async updateNews(page) {
    const { pageSize } = this.props;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8cb3e98133a147169cfef410a2fab412&pageSize=${pageSize}&page=${page}`;
    this.setState({ disableNextButton: true, showLoadingBar: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    const totalPages = Math.ceil(parsedData.totalResults / pageSize);
    this.setState({
      articles: [...this.state.articles, ...parsedData.articles],
      totalResults: parsedData.totalResults,
      loading: false,
      disableNextButton: totalPages === page,
      showLoadingBar: false
    });
  }

  async componentDidMount() {
    this.updateNews(1);
    window.addEventListener('scroll', this.handleScroll);
    this.setState({ showLoadingBar: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { loading, page, disableNextButton, showLoadingBar } = this.state;

    if (loading || disableNextButton || showLoadingBar) return;

    const threshold = window.innerHeight + document.documentElement.scrollTop;
    const offset = document.documentElement.offsetHeight;

    if (threshold >= offset) {
      const nextPage = page + 1;
      this.setState({ loading: true, page: nextPage });
      this.updateNews(nextPage);
    }
  }

  render() {
    const { articles, loading, showLoadingBar } = this.state;
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '35px', marginTop: '90px' }}  >
          NewsCover - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>



        <LoadingBar color="#f11946" progress={!loading ? 100 : undefined} />

        <div className="row">

          {articles.map((element, index) => {
            return (
              <div key={index} className="col-md-4">
                <NewsItem
                  item={element.urlToImage}
                  title={element.title ? element.title.slice(0, 45) : ''}
                  description={element.description ? element.description.slice(0, 88) : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })
          }
        </div>
        {loading && <Loader />}
      </div>
    );
  }



}

export default News;