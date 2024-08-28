import {domID, select, selectID, selectAll} from './DOM.js';
import {getData} from '../service/fetch.js';
import setArray, {navPills, tabPanes, showPart, Character} from './method.js';
document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault;
  const triggerTabList = document.querySelectorAll("#showNav li");

  triggerTabList.forEach((triggerEl) => {
    const tabTrigger = new bootstrap.Tab(triggerEl);
  
    triggerEl.addEventListener("click", (event) => {
      event.preventDefault();
      tabTrigger.show();
    });
  });

  getData().then(objects => {
      const navbar = new navPills(objects.navPills);
      const tab = new tabPanes(objects.navPills)
      
     
      /* console.log(setArray)
      console.log(objects.navPills) */
      domID('showNav').innerHTML += navbar.showNav();
      domID('showTab').innerHTML += tab.renderTab();
      console.log(setArray)
      setArray.forEach((atribute, index) => {
          let part = new showPart(objects.tabPanes, atribute)
          domID(atribute).innerHTML = part.renderTab();
          
          /* new Character(setArray).show(selectID('contain')[index], selectAll('.showButton')) */
      });
      
      new Character(setArray).show(selectAll('.showButton'), selectAll('.contain div'))
      
      /* select() */

  })
  
})
/* selectAll('.showButton').forEach(button => {
  button.onclick = function(){
    let id = this.parentNode.parentNode.parentNode.id;
    let 
    let myCharacter = new Character()

  }
}) */
