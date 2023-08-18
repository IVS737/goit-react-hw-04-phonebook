import styles from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { useState, useEffect } from 'react';

export const App = () => {
  // state = {
  //   contacts: [],

  //   filter: '',
  // };

  const [contacts, setContacts] = useState(() => {
    return localStorage.getItem('contacts')
      ? JSON.parse(localStorage.getItem('contacts'))
      : [];
  });

  const [filter, setFilter] = useState('');

  // componentDidMount() {
  //   const localItem = localStorage.getItem('contacts');
  //   const parsedItems = JSON.parse(localItem);
  //   if (parsedItems) {
  //     this.setState({ contacts: parsedItems });
  //   }
  //   // this.setState({ contacts: [parsedItems] });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = data => {
    const inContacts = contacts.some(
      contact =>
        data.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
    );
    if (inContacts) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts(prev => [...prev, data]);
  };

  const handleFilterChange = ({ target }) => setFilter(target.value);

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => id !== contact.id));
  };
  const getFilteredContact = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = getFilteredContact();

  return (
    <div className={styles.Container}>
      <h1>Phone-book</h1>
      <ContactForm submit={handleSubmit} />

      <h2>Contacts</h2>
      <input name="filter" onChange={handleFilterChange} value={filter} />

      <ContactList
        onDeleteContact={handleDeleteContact}
        contacts={filteredContacts}
      />
    </div>
  );
};
