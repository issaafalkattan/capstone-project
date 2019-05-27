import Calendar from 'react-calendar'
import React, { Component } from 'react'
import moment from 'moment';
import { Badge,Tooltip } from 'antd';

export class eventsCalender extends Component {
 
    state ={
        date : new Date(),
    }


    

parseDates =(date, dates) => {
        for(let i =0; i<dates.length ; i++){
            
          if(moment(dates[i].date).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY'))
       
            return dates[i].title;
       
        
        }
    }
   
getCount =(date, dates) => {
    for(let i =0; i<dates.length ; i++){
        
      if(moment(dates[i].date).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY'))
   
        return dates[i].count;
   
    
    } 

}
  render() {
      const data = this.props.dates;
    return (
        <Calendar
        
        tileClassName={({ date }) => this.parseDates(date, this.props.dates) ? 
      "colorful" : null}
        tileContent={({ date }) => this.parseDates(date, this.props.dates) ? 
        <Tooltip placement="top" title={this.parseDates(date, this.props.dates)}>
     <div>      
           <Badge type="default" />
        </div>

            </Tooltip> : null}
        
      />
    )
  }
}

export default eventsCalender
