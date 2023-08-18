import PropTypes from 'prop-types';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <div>
      {contacts.map(({ id, name, number }) => (
        <div key={id}>
          <p>
            {name} {number}
          </p>
          <button onClick={() => onDeleteContact(id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
