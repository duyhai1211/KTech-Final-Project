
import Card from 'react-bootstrap/Card';
const ReserDetails = (listCard) => {
    return (
        <>
                {listCard.map((item)=>{
                    <Card>
                    <Card.Body>
                        <Card.Title>Date {item.date} time {item.time}</Card.Title>
                        <Card.Text>
                            

                        </Card.Text>
                    </Card.Body>
                    </Card>
                })}
                
               
           
        </>
    )
}
export default ReserDetails