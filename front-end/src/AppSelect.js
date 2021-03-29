import axios from 'axios';

import React,{Component} from 'react';

class App extends Component {

	state = {
        myInterest : [
            {
              id: 1,
              select: false,
              title: "Sports",
            },
            {
              id: 2,
              select: false,
              title: "Entertainment",
            },
            {
              id: 3,
              select: false,
              title: "Crime Police",
            },
            {
              id: 4,
              select: false,
              title: "Legal Affairs",
            },
            {
              id: 5,
              select: false,
              title: "Upcoming Bills",
            },
            {
              id: 6,
              select: false,
              title: "Elections",
            },
            {
              id: 7,
              select: false,
              title: "Civil Rights",
            },
            {
              id: 8,
              select: false,
              title: "Abortions",
            },
            {
              id: 9,
              select: false,
              title: "Terrorism",
            },
            {
              id: 10,
              select: false,
              title: "Disability",
            },
            {
              id: 11,
              select: false,
              title: "Drugs",
            },
            {
              id: 12,
              select: false,
              title: "Education",
            },
            {
              id: 13,
              select: false,
              title: "Energy",
            },
            {
              id: 14,
              select: false,
              title: "Environment",
            },
            {
              id: 15,
              select: false,
              title: "Financial Market",
            },
            {
              id: 16,
              select: false,
              title: "Health",
            },
            {
              id: 17,
              select: false,
              title: "Housing",
            },
            {
              id: 18,
              select: false,
              title: "Community",
            },
            {
              id: 19,
              select: false,
              title: "Ir Trade Affairs",
            },
            {
              id: 20,
              select: false,
              title: "Mental Health",
            },
            {
              id: 21,
              select: false,
              title: "Military",
            },
            {
              id: 22,
              select: false,
              title: "Poverty",
            },
            {
              id: 23,
              select: false,
              title: "Prison",
            },
            {
              id: 24,
              select: false,
              title: "Private Sector",
            },
            {
              id: 25,
              select: false,
              title: "Public Safety",
            },
            {
              id: 26,
              select: false,
              title: "Public Workers",
            },
            {
              id: 27,
              select: false,
              title: "Refugee Crises",
            },
            {
              id: 28,
              select: false,
              title: "Religion",
            },
            {
              id: 29,
              select: false,
              title: "Sanctions",
            },
            {
              id: 30,
              select: false,
              title: "Sexual Assualt",
            },
            {
              id: 31,
              select: false,
              title: "Taxes",
            },
            {
              id: 32,
              select: false,
              title: "Constitution",
            },
            {
              id: 33,
              select: false,
              title: "Trafficking",
            },
            {
              id: 34,
              select: false,
              title: "Transportation",
            },
            {
              id: 35,
              select: false,
              title: "Unions",
            },
            {
              id: 36,
              select: false,
              title: "Veteran Affairs",
            },
            {
              id: 37,
              select: false,
              title: "Wages",
            },
            {
              id: 38,
              select: false,
              title: "Women Equality",
            },
            {
              id: 39,
              select: false,
              title: "War",
            },
            {
              id: 40,
              select: false,
              title: "Youth",
            },
          ]
	};	
    handleInputChange=(event)=> {
        const name = event.target.name;
        let item = this.state.myInterest.filter(element => (element.id==name)) //filter out the clicked item
        let theVal = this.state.myInterest.indexOf(item[0]) //get the position of the item
        this.state.myInterest[theVal].select = event.target.checked //change the check value
        this.setState({
            myInterest:  this.state.myInterest
        });
      }

	fileData = () => {
        const selectStyle = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial",
            margin:'20px'
          };
          const notSelectStyle = {
            color: "white",
            backgroundColor: "grey",
            padding: "10px",
            fontFamily: "Arial",
            margin:'20px'
          };
        let gochy = this.state.myInterest.map(
            (element)=><div style={element.select ? selectStyle:notSelectStyle} key={element.id}> 
                <input 
                type="checkbox"
                name={element.id}
                checked={element.select}
                onChange={this.handleInputChange} />
                {element.title}</div>
        )
		return (
            <div>
                {gochy}
            </div>
		);
	};
	
	render() {
	console.log(this.fileData())
	return (
		<div>
		    {this.fileData()}
		</div>
	);
	}
}

export default App;