// The Shelf page (`ShelfPage.js` at `/shelf`) should allow a user to 
//add a new item to the database (which should immediately appear in the 
//list). **Users must be logged in to add an item to the shelf.**
// > NOTE: Image url should be a full path to an existing image on the web.

import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

// Delete 
const deleteItem = (id) => {
  axios.delete(`/api/shelf/${id}`).then ((response) => {
    fetchShelf();
  }).catch((error) =>{
    console.log(error);
    alert('Something went wrong.');
  });
}
  
// Add 
const addShelf =(event) => {
  event.preventDefault();
  const newItem ={ 
    name: event.target.firstElementChild.value,
    image: event.target.children[1].value
   }
   axios.post('/api/shelf', newItem).then((response) => {
    fetchShelf();
   }).catch((error) => {
    console.log(error);
    alert ('Something is wrong in addShelf on ShelfPage');
   })
};


  // What Displays
  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      
      <form onSubmit={addShelf}>
      <input type='text' placeholder="Name"/>
      <input type='text' placeholder="Image"/>
      <input type='submit' />
      </form>
      
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }

      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button  onClick={() => deleteItem(item.id)} style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }

      <div className="clearfix"></div>
    </div>
  );
} // Ends ShelfPage()

export default ShelfPage;


