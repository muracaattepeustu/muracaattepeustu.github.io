
const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');



const tableYemekciler = document.querySelector('.table-users');

let id;

// Create element and render Yemekci
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().yemekci_isim}</td>
      <td style="text-align: center;">${doc.data().yemekci_grup}</td>
      <td>
      <button class="btn btn-edit"><i class="material-icons">create</i></button>
      <button class="btn btn-delete"><i class="material-icons">remove_circle_outline</i></button>

      </td>
    </tr>
  `;
  tableYemekciler.insertAdjacentHTML('beforeend', tr);

  // Click edit user
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.yemekci_isim.value = doc.data().yemekci_isim;
    editModalForm.yemekci_grup.value = doc.data().yemekci_grup;

  });

  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);

  btnDelete.addEventListener("click", function() {
    var r = confirm("Silmek istiyor musunuz?");
    if (r == true) {

      db.collection('yemekciler').doc(`${doc.id}`).delete().then(() => {
        console.log('Document succesfully deleted!');
      }).catch(err => {
        console.log('Error removing document', err);
      });
  
    }
     
    if (r == false) {
       /* No delete*/
    } 
    
  }); 

    
}


// Click add user button
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');

  addModalForm.yemekci_isim.value = '';
  addModalForm.yemekci_grup.value = '';
});

//Close
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-none');

  addModalForm.yemekci_isim.value = '';
  addModalForm.yemekci_grup.value = '';
});

// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});

// Get all yemekci
// db.collection('yemekci').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderUser(doc);
//   })
// });

// Real time listener


/*
db.collection('yemekciler').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableYemekciler.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableYemekciler.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

*/




db.collection("yemekciler").orderBy("yemekci_grup", "asc").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableYemekciler.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableYemekciler.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('yemekciler').add({
    yemekci_isim: addModalForm.yemekci_isim.value,
    yemekci_grup: addModalForm.yemekci_grup.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('yemekciler').doc(id).update({
    yemekci_isim: editModalForm.yemekci_isim.value,
    yemekci_grup: editModalForm.yemekci_grup.value,
  });
  editModal.classList.remove('modal-show');
  
});


      
var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
navItems.forEach(function(e, i) {
	e.addEventListener("click", function(e) {
		navItems.forEach(function(e2, i2) {
			e2.classList.remove("mobile-bottom-nav__item--active");
		})
		this.classList.add("mobile-bottom-nav__item--active");
	});
});