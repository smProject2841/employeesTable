import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'font-awesome/css/font-awesome.min.css';
import convertColorNameToHex from 'convert-css-color-name-to-hex';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  componentWillMount = () => {
    fetch('http://localhost:8080/api/employees')
      .then(response => response.json())
      .then(employees => this.setState({ employees }))
  }
//delte the employee
  deleteEmployee(employeeid){
    let headers = new Headers();

   headers.append('Content-Type', 'application/json');
   headers.append('Accept', 'application/json');
    fetch(`http://localhost:8080/api/employees/${employeeid}`,{
        method: 'DELETE',
        body:JSON.stringify([{"employeeid":employeeid}]),
        headers:headers,
        crossDomain:true

      }).then(response => response.json())
      // .then(responseJson  => {
      //   console.log(responseJson);})
      const employeeIndex= this.state.employees.findIndex(employees=>{
      return employees.id===employeeid;
    })
    this.state.employees.splice(employeeIndex,1)
    this.setState({
       employees: this.state.employees
    });
  }

  renderEditable(cellInfo) {
//render the column check if the column is for the color
    // console.log(cellInfo.orginal[cellInfo.index-1])
    if(cellInfo.column.id === 'color'){
      return(
        <div
          style={{ backgroundColor:convertColorNameToHex(cellInfo.original.color) }}//setting background for the cell for the color colum
          contentEditable
          suppressContentEditableWarning
          onBlur={e => {
            const data = [...this.state.employees];
            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            this.setState({ data });
            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');

            fetch(`http://localhost:8080/api/employees/${cellInfo.original['id']}`,{
                method: 'PUT',
                body:JSON.stringify({[cellInfo.column.id]  :e.target.innerHTML  }),//sending the column name of the DB with thw calue to update
                headers:headers,
                crossDomain:true

              }).then(response => response.json())

          }}
          dangerouslySetInnerHTML={{
            __html: this.state.employees[cellInfo.index][cellInfo.column.id]
          }}
        />
      );
    }else{//for all the other column
      return (
          <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.employees];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ data });
              let headers = new Headers();

              headers.append('Content-Type', 'application/json');
              headers.append('Accept', 'application/json');

              fetch(`http://localhost:8080/api/employees/${cellInfo.original['id']}`,{
                  method: 'PUT',
                  body:JSON.stringify({[cellInfo.column.id]  :e.target.innerHTML  }),//sending the column name of the DB with thw calue to update
                  headers:headers,
                  crossDomain:true

                }).then(response => response.json())

            }}
            dangerouslySetInnerHTML={{
              __html: this.state.employees[cellInfo.index][cellInfo.column.id]
            }}
          />
      );

    }

  }

  addEmployee(e) {
    let newId;
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // fetch('http://localhost:8080/api/maxID')
    //     .then(response => response.json())
    //     .then( responseJson => newId= responseJson[0].id)
    //     .then(()=>{

          fetch(`http://localhost:8080/api/employees/`,{
              method: 'POST',
              headers:headers,
              crossDomain:true
            }).then(response => response.json())
            .then( responseJson => newId= responseJson[0].id)
            .then(responseJson  => {
              console.log(responseJson);})
          .then(()=>{//adding new column to the table
            let employee = {
              id: newId+1,
              "name": "",
              "code": "",
              "profession": "",
              "color": "",
              "city": "",
              "branch": "",
              "assigned": ""
            }
            this.state.employees.push(employee);
            this.setState(this.state.employees);
          })
        // })
}
//Put request to change the checkbox
checkboxSet(props,e){
  let checkValue=e.target.checked;
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  fetch(`http://localhost:8080/api/employees/${props.original['id']}`,{
      method: 'PUT',
      body:JSON.stringify({[props.column.id]  :checkValue  }),
      headers:headers,
      crossDomain:true

    }).then(response => response.json())
    .then(() => {
      const data = [...this.state.employees];
      data[props.index][props.column.id] = checkValue;
      this.setState({ data });})
}


  render() {

    const {
      employees
    } = this.state;

//react table columns withspecfic setting and render
    const columnsEmployees=[
      {
        Header:"Action",
        Cell:props=>{
          return(
            <div>
            <button onClick={()=>{
              this.deleteEmployee(props.original.id); //delete employee
            }}><i className="fa fa-trash" aria-hidden="true"></i></button>
            </div>
          )

        },
        sortable:false,
        filterable:false,
        style:{
          textAlign:"center"
        },
        width:70,
        minwWidth:70,
        maxwidth:70,
      },
      {
        Header:"User ID",
        accessor:"id",
        sortable:true,
        style:{
          textAlign:"center"
        },
        width:50,
        minwWidth:50,
        maxwidth:50,
      },
      {
        Header:"Employee ",
        accessor:"name",
        sortable:true,
        Cell: this.renderEditable
      },
      {
        Header:"Department Code",
        accessor:"code",
        sortable:true,
        Cell: this.renderEditable
      },
      {
        Header:"Profession",
        accessor:"profession",
        sortable:true,
        Cell: this.renderEditable
      },
      {
        Header:"Color",
        accessor:"color",
        sortable:true,
        Cell:this.renderEditable,
        style:{
          textAlign:"center"
        },
        width:100,
        minwWidth:100,
        maxwidth:100,
      },
      {
        Header:"Branch",
        accessor:"branch",
        sortable:true,
        Cell: this.renderEditable
      },
      {
        Header:"City",
        accessor:"city",
        sortable:true,
        Cell: this.renderEditable
      },
      {
        Header:"Assigned",
        accessor:"assigned",
        sortable:true,
        Cell:props=>{//handles the checkbox clicks
          return(
            <div>
            <input type="checkbox" data-name="assigned" onChange={(e)=>{this.checkboxSet(props,e)}} checked={props.original.assigned}/>
            </div>
          )},
        style:{
          textAlign:"center"
        },
        width:50,
        minwWidth:50,
        maxwidth:50,
      },

    ]


    return (
      <div>
        <button onClick={(e)=>{
          this.addEmployee(e); //add new employees
        }}><i className="fa fa-plus" aria-hidden="true"></i></button>
        <ReactTable
          columns={columnsEmployees}
          data={this.state.employees}
          filterable
        >
        </ReactTable>


      </div>

    );
  }
}

export default App;
