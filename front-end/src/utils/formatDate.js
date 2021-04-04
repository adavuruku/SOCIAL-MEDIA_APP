import Moment from 'react-moment'

// const formatDate = date =>{
//     return (<Moment format='YYYY/MM/DD'>{date}</Moment>)
// }

function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
}

export default formatDate