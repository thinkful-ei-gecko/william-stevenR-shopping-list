'use strict';

const STORE = [
  {id: cuid(), name: "apples", checked: false},
  {id: cuid(), name: "oranges", checked: false},
  {id: cuid(), name: "milk", checked: true},
  {id: cuid(), name: "bread", checked: false}
];

/**
 * 
 * @param {item} - item is an object. Specifically, it will be in our STORE variable
 */

function generateItemString(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

/**
 * 
 * @param {shoppingList} - shoppingList is an array. Specifically, it would be our STORE variable
 */
function generateShoppingItemsString(shoppingList) {
  //Loop over our STORE variable and give us an array of strings equal to the generateItemString function above
  //Convert that string into single text that will be added in as an HTML template in our HTML file
  //Loop using .map()...this will create a new array
  const items = shoppingList.map((item) => generateItemString(item));

  return items.join('');
}


function renderShoppingList() {
  // this function will be responsible for rendering the shopping list in
  // the DOM
  console.log('`renderShoppingList` ran');

  const shoppingListItemsString = generateShoppingItemsString(STORE);

  $('.js-shopping-list').html(shoppingListItemsString);
}


/**
 * 
 * @param {itemName} - itemName is a string within our STORE variable objects 
 */
function addItemToShoppingList (itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({id: cuid(), name: itemName, checked: false});
}
  
function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  // Add an event listener to the '.js-shopping-list-form' AKA the FORM and when the 'Add New Item' is clicked...
  // Add the New Item to our STORE variable and then callback functions generateItemString? generateShoppingItemString?
  // And then, renderShoppingList again?

  $('#js-shopping-list-form').on('submit', function (event) {
    event.preventDefault();
    const newShoppingItem = $('.js-shopping-list-entry').val();
    console.log(newShoppingItem);
    $('.js-shopping-list-entry').val('');

    addItemToShoppingList(newShoppingItem);
    renderShoppingList();
  });
}


function toggleCheckedForListItem(itemId) {
  console.log('Toggling checked property for item with id ' + itemId);
  const item = STORE.find(item => item.id === itemId);
  item.checked = !item.checked;
}

/**
 * 
 * @param {object} - item is an object within the STORE array
 */
function getItemIdFromElement (item) {
  return $(item).closest('li').data('item-id');
}


function handleItemCheckClicked(shoppingList) {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  // Add an event listener to the 'js-shopping-list' AKA the <ul> and when the 'CHECK' button is clicked...
  // Change the value of 'checked' in our STORE variable to either 'true' or 'false'
  // Callback functions generateItemString? generateShoppingItemString?
  // And then, renderShoppingList again?

  $('.js-shopping-list').on('click', '.js-item-toggle', function(event) {
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}

function deleteListItem(itemId) {
  const itemIndex = STORE.findIndex(item => item.id === itemId);
  STORE.splice(itemIndex,1);
}
  
function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  // Will we need to add a new attribute to our STORE variable such as 'delete: true ? false' ? and then assign a class like .hidden?
  // OR will we need to just use jQuery method, .remove()?
  // Add an event listener to the 'js-shopping-list' AKA the <ul> and when the 'CHECK' button is clicked...
  // And either .remove() when the button is clicked OR add the class .hidden?
  $('.js-shopping-list').on('click', '.js-item-delete', function (event) {
    const itemIndex = getItemIdFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}
  
// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  
}
  
// when the page loads, call `handleShoppingList`
$(handleShoppingList);