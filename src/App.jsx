import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '3px',
    border: '1px solid #ccc',
  },
  button: {
    background: '#4caf50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  contactList: {
    listStyle: 'none',
    padding: '0',
  },
  contactItem: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  editButton: {
    marginRight: '5px',
    background: '#2196F3',
    color: 'white',
    padding: '8px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  deleteButton: {
    background: '#f44336',
    color: 'white',
    padding: '8px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddContact = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!name || !emailRegex.test(email) || !phoneRegex.test(phone)) {
      alert('Please enter valid details');
      return;
    }
    

    addContact({ name, email, phone });
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>Add New Contact</h2>
        <label style={styles.label}>Name:</label>
        <input style={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label style={styles.label}>Email:</label>
        <input style={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label style={styles.label}>Phone:</label>
        <input style={styles.input} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button style={styles.button} onClick={handleAddContact}>
          Add Contact
        </button>
      </div>
    </div>
  );
};

const ContactList = ({ contacts, editContact, deleteContact }) => {
  return (
    <div style={styles.container}>
      <div style={styles.contactList}>
        <h2>Contact List</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index} style={styles.contactItem}>
              {contact.name} - {contact.email} - {contact.phone}{' '}
              <button style={styles.editButton} onClick={() => editContact(index)}>
                Edit
              </button>{' '}
              <button style={styles.deleteButton} onClick={() => deleteContact(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  const [contacts, setContacts] = useState([]);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const editContact = (index) => {
    const updatedContacts = [...contacts];
    const updatedContact = prompt('Enter updated contact details (name, email, phone):');
    if (updatedContact) {
      const [name, email, phone] = updatedContact.split(',');
      updatedContacts[index] = { name, email, phone };
      setContacts(updatedContacts);
    }
  };

  const deleteContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  return (
    <div>
      <ContactForm addContact={addContact} />
      <ContactList contacts={contacts} editContact={editContact} deleteContact={deleteContact} />
    </div>
  );
};

export default App;