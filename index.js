
const EDIT_BTN_CLASS = 'editBtn';
const DELETE_BTN_CLASS = 'deleteBtn';
const TODO_ITEM_SELECTORE ='.todoItem';

const form = document.querySelector('#todoForm');
const contactsContainer = document.querySelector('#contactsContainer');
const idInput = document.querySelector('#idInput');
const inputs = document.querySelectorAll('input');
let contactList =[];

form.addEventListener('submit', onFormSubmit);
contactsContainer.addEventListener('click' , onContactsContainerClick);

getContactList()


function onFormSubmit(e) {
    e.preventDefault();

    const contact = getContact();

    if(!isContactValid(contact)){
        alert('Контакт не валидный');
        return;
    }

    saveContact(contact)
    clear();
}

function onContactsContainerClick(e){
    const contactEl= getContactEl(e.target);
    const id = getContactId(contactEl);
    const contact = getContactById(id);

    if(contact){
        if (e.target.classList.contains(DELETE_BTN_CLASS)){
            ContactApi.delete(id.catch(showError))
            contactEl.remove();
            returne;
        }

        if (e.target.classList.contains(EDIT_BTN_CLASS)){
            fillForm(contact);
        }
    }
}

function isContactValid(contact){
    return contact.firstName !== '' 
        && contact.lasstName !== '' 
        && contact.phone !== ''
        && contact.phone !== null
        && !siNan(contact.phone)
}

function fillForm(contact) {
    for(const input of inputs){
        input.value = contact[input.id];
    }
}

function getContactEl(el) {
    return el.closest();
}

function getContactId(contactEl){
    return contactEl.dataset.id;
}

function getContactList(){
    ContactApi.getList()
    .then(list => contactList = list)
    .then(renderContactList)
    .catch(showError)
}

function saveContact(contact) {
    if(contact.id) {
        ContactApi.update(contact.id, contact).catch(showError)

        const contactOld = getContactById(contact.id);
        contactOld.title = contact.tatle;

        replaceContactElById(contact.id, contact);
    } else{
        ContactApi.Create(contact)
            .then(() => addContactItem(contact))
            .catch(showError)
    }
}

function replaceContactElById(id, contact) {
    const oldContactEl = document.querySelector(`[data-id="${id}"]`);
    const newContact = generateContactItemHTML(contact);

    oldContactEl.outerHTML = newContact;
}

function getContact(){
    const contact = {};

    for(const input of inputs){
        contact[input.id] = input.value;
    }

    return contact;
}

function renderContactList(contactList) {
    const html = contactList.map(generateContactItemHTML).join('');

    contactsContainer.innerHTML = html;
}

function addContactItem (contact) {
    const html = generateContactItemHTML(contact);

    contactsContainer.insertAdjacentHTML('beforeend', html);
}

function generateContactItemHTML(contact) {
    return `
        <tr class="contactItem" data-id="${contact.id}">
            <td>$(contact.firsName)</td>
            <td>$(contact.lastName)</td>
            <td>$(contact.phone)</td>
            <td>
                <button class="editBtn">[Edit]</button>
                <button class="deleteBtn">[Delete]</button>
            </td>
        </tr>
        `;
}

function clear(){
    form.reset();
}

function showError(error) {
    alert(error.message);
}

function getContactById(id){
    return contactList.find(contact => contact.id === id)
}