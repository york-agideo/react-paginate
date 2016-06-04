'use strict';

import React from 'react';

export default class PageView extends React.Component {
  render() {
    let linkClassName = this.props.pageLinkClassName;
    let cssClassName = this.props.pageClassName;

    if (this.props.selected) {
      if (typeof(cssClassName) !== 'undefined') {
        cssClassName = cssClassName + ' ' + this.props.activeClassName;
      } else {
        cssClassName = this.props.activeClassName;
      }
    }

    const { itemLabel } = this.props;

    return (
        <li className={cssClassName}>
            <a {...this.props} className={linkClassName}>
              {React.cloneElement(itemLabel, {children: this.props.page})}
            </a>
        </li>
    );
  }
};
