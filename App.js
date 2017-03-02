import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import source from './data/source.json';

class MyTextCell extends React.Component {
  render() {
    const {rowIndex, field, data, props} = this.props;
    return (
      <Cell {...props}>
        {data[rowIndex][field]}
      </Cell>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myTableData: source,
    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        myTableData: source,
      });
    }

    var filterBy = e.target.value.toLowerCase();
    var size = source.length;
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var name = source[index]["Name"];
      if (name.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      myTableData: filteredIndexes.map(index => source[index]),
    });
  }

  render() {
    var myTableData = this.state.myTableData;
    var keys = Object.keys(myTableData[0]);
    var alignEnum = { left: 'left', center: "center", right: 'right'};

    return (
      <div>
        <span>
          <input
            onChange={this.onFilterChange}
            placeholder="Filter by Name"
          />
          <h5 className="title">Senate Confirmations of Executive Nominees - 115<sup>th</sup> Congress</h5>
        </span>
        <Table
          rowsCount={myTableData.length}
          rowHeight={35}
          headerHeight={60}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            header={<Cell>Name</Cell>}
            cell={
              <MyTextCell
                data={myTableData}
                field="Name"
              />
            }
            fixed={true}
            flexGrow={3}
            width={125}
          />
          <Column
            header={<Cell>Party</Cell>}
            cell={
              <MyTextCell
                data={myTableData}
                field="Party"
              />
            }
            fixed={true}
            width={100}
          />
          <Column
            header={<Cell>State</Cell>}
            cell={
              <MyTextCell
                data={myTableData}
                field="State"
              />
            }
            fixed={true}
            width={100}
          />
          {keys.slice(3).map(key =>
            <Column
              key = {key}
              align={alignEnum.center}
              header={<Cell>
                        <span className="nominee">
                          {key.split('—')[1]}
                        </span>
                        <span className="department">
                          {key.split('—')[2]}
                        </span>
                      </Cell>}
              cell={
                <MyTextCell
                  data={myTableData}
                  field={key}
                />
              }
              flexGrow={3}
              width={135}
            />
          )}
        </Table>
    </div>
    );
  }
}

export default App
