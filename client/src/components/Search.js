import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

export class Search extends Component {
    state = {
        data: [],
        keyWords: "",
        offset: 0,
        pageCount: 0,
        totaCount: 173, // the total data in the db is 173 rows
    }

    componentDidMount() {
        this.getMajors(0); // first page fetch the first 20 rows of data
    }

    getMajors = (id) => {
        fetch('/api/major?id=' + id)
          .then(response => response.json())
          .then(data => {
             this.setState({
                data: data,
                pageCount: Math.ceil(this.state.totaCount / 20), // one page displays 20 rows of data
             });
          });
    }

    onSearch = (e) => {
        this.setState({keyWords: e.target.value.toLowerCase()});
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 20);

        this.setState({ offset: offset }, () => {
            this.getMajors(offset);
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.data != null &&
                    <div>
                        <h1 style={{marginTop: "2rem"}}>Majors in Univeristies</h1>
                        <input className="search-bar" onChange={this.onSearch} placeholder="Search majors, eg 'Agriculture'"></input>
                        {this.state.data.map((m, index) => {
                            if (this.state.keyWords !== "") {
                                let curMajor = m.major.toLowerCase();
                                let curMajorCategory = m.major_category.toLowerCase();
                                if (!curMajor.includes(this.state.keyWords) && !curMajorCategory.includes(this.state.keyWords)) {
                                    return null;
                                }
                            }
                            let bgClassName = index % 2 === 1 ? "bg-odd" : "bg-even";
                            return (
                                <MajorCard
                                    key={index}
                                    bgClassName={bgClassName}
                                    name={m.major}
                                    category={m.major_category}
                                />
                            );
                        })}
                        <ReactPaginate
                              previousLabel={'previous'}
                              nextLabel={'next'}
                              breakLabel={'...'}
                              breakClassName={'break-me'}
                              pageCount={this.state.pageCount}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={this.handlePageClick}
                              containerClassName={'pagination'}
                              activeClassName={'active'}
                            />
                        <Link to="/" className="page-link">Homepage</Link>
                    </div>
                }
            </React.Fragment>
        )
    }
}

const MajorCard = (props) => {
    return (
        <div className={props.bgClassName}>
            <h4>Name: {props.name}</h4>
            <h4>Category: {props.category}</h4>
        </div>
    )
}


export default Search;