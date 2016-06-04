import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import IconButton from 'material-ui/lib/icon-button';
import LeftIcon from 'material-ui/lib/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/lib/svg-icons/navigation/chevron-right';
import $ from 'jquery';

window.React = React;


export class CommentList extends Component {
  render() {
    let commentNodes = this.props.data.map(function(comment, index) {
      return (
        <div key={index}>{comment.comment}</div>
      );
    });

    return (
      <div id="project-comments" className="commentList">
        <ul>
          {commentNodes}
        </ul>
      </div>
    );
  }
};

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0
    }
  }

  loadCommentsFromServer() {
    $.ajax({
      url      : this.props.url,
      data     : {limit: this.props.perPage, offset: this.state.offset},
      dataType : 'json',
      type     : 'GET',

      success: data => {
        this.setState({data: data.comments, pageNum: Math.ceil(data.meta.total_count / data.meta.limit)});
      },

      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({offset: offset}, () => {
      this.loadCommentsFromServer();
    });
  };

  render() {
    return (
      <div className="commentBox">
        <CommentList data={this.state.data} />
        <ReactPaginate previousLabel={<IconButton children={<LeftIcon />} />}
                       itemLabel={<IconButton style={{fontSize: '1.1em'}} />}
                       nextLabel={<IconButton children={<RightIcon />} />}
                       breakLabel={<IconButton style={{fontSize: '1.1em', cursor: 'auto'}} children={'...'} />}
                       pageNum={50000 || this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
      </div>
    );
  }
};

ReactDOM.render(
  <App url={'http://localhost:3000/comments'}
       author={'adele'}
       perPage={10} />,
  document.getElementById('react-paginate')
);
