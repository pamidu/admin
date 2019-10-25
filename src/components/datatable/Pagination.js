import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setPageNumber } from "Actions/globalActions";

const defaultButton = props => <button {...props}>{props.children}</button>;

class Pagination extends Component {
  constructor(props) {
    super();

    this.changePage = this.changePage.bind(this);

    this.state = {
      visiblePages: this.getVisiblePages(null, props.pages)
    };
  }

  componentDidMount () {
    this.props.onPageChange(this.props.global.pageNumber);
  }

  componentWillUnmount() {
    this.props.setPageNumber(this.props.page);
  }

  static propTypes = {
    pages: PropTypes.number,
    page: PropTypes.number,
    PageButtonComponent: PropTypes.any,
    onPageChange: PropTypes.func,
    previousText: PropTypes.string,
    nextText: PropTypes.string
  };

  static getDerivedStateFromProps(nextProps, prevState){
      if(nextProps.pages!==prevState.pages){
        return { pages: nextProps.pages};
    }
    else return null;
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.pages!==this.props.pages){
      //Perform some operation here
      this.setState({
        visiblePages: this.getVisiblePages(null, this.props.pages)
      });
      // this.classMethod();
    }

    this.changePage(this.props.page + 1);
  }
 

  filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter(page => page <= totalPages);
  };

  getVisiblePages = (page, total) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  changePage(page) {
    const activePage = this.props.page + 1;

    if (page === activePage) {
      return;
    }

    const visiblePages = this.getVisiblePages(page, this.props.pages);

    this.setState({
      visiblePages: this.filterPages(visiblePages, this.props.pages)
    });

    this.props.onPageChange(page - 1);
  }

  render() {
    const { PageButtonComponent = defaultButton } = this.props;
    const { visiblePages } = this.state;
    const activePage = this.props.page + 1;

    return (
      <div className="Table__pagination">
        <div className="Table__prevPageWrapper">
          <PageButtonComponent
            className="Table__pageButton"
            onClick={() => {
              if (activePage === 1) return;
              this.changePage(activePage - 1);
            }}
            disabled={activePage === 1}
          >
            {this.props.previousText}
          </PageButtonComponent>
        </div>
        <div className="Table__visiblePagesWrapper">
          {visiblePages.map((page, index, array) => {
            return (
              <PageButtonComponent
                key={page}
                className={
                  activePage === page
                    ? "Table__pageButton Table__pageButton--active"
                    : "Table__pageButton"
                }
                onClick={this.changePage.bind(null, page)}
              >
                {array[index - 1] + 2 < page ? `...${page}` : page}
              </PageButtonComponent>
            );
          })}
        </div>
        <div className="Table__nextPageWrapper">
          <PageButtonComponent
            className="Table__pageButton"
            onClick={() => {
              if (activePage === this.props.pages) return;
              this.changePage(activePage + 1);
            }}
            disabled={activePage === this.props.pages}
          >
            {this.props.nextText}
          </PageButtonComponent>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  setPageNumber: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  global: state.global
});

export default connect(
	mapStateToProps,
	{ setPageNumber }
)(Pagination);
