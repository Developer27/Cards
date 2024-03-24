import './AddForm.css';
import {db} from '../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';

export default function AddForm() {
  const [title, setTitle] = useState('');
  const [translation, setTranslation] = useState('');

  function addCard(e) {
    e.preventDefault();
    addDoc(collection(db, "cards"), {
      id: uuidv4(),
      title: title,
      translation: translation,
      timestamp: serverTimestamp()
    });
    setTitle('');
    setTranslation('');
  }


  return (
    <div className="form-wrapper">
      <form className="inputs-wrapper" onSubmit={addCard}>
        <input className='input-field' required type="text" placeholder='Type your word...' 
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <input className='input-field' required type="text" placeholder='Type translation...' 
          onChange={e => setTranslation(e.target.value)}
          value={translation}
        />
          <button className="add-card-btn">Add</button>
      </form>
    </div>
  
  )
}
