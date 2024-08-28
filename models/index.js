import { domID, selectAll } from './DOM.js';
import { getData } from '../service/fetch.js';
import setArray, { NavPills, TabPanes, ShowPart, Character } from './method.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const objects = await getData();
    const navbar = new NavPills(objects.navPills);
    const tab = new TabPanes(objects.navPills);

    domID('showNav').innerHTML = navbar.showNav();
    domID('showTab').innerHTML = tab.renderTab();

    setArray.forEach((attribute) => {
      const part = new ShowPart(objects.tabPanes, attribute);
      domID(attribute).innerHTML = part.renderTab();
    });

    const character = new Character(setArray);
    character.show(selectAll('.showButton'), selectAll('.contain div'));
  } catch (error) {
    console.error("Error loading data:", error);
  }
});