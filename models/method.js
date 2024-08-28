let setArray = [];
let partObject = {
  'topclothes': 'bikinitop',
  'botclothes': 'bikinibottom',
  'shoes': 'feet',
  'handbags': 'handbag',
  'necklaces': 'necklace',
  'hairstyle': 'hairstyle',
  'background': 'background'
};

export default setArray;

class SetPart {
  constructor(id, type, name, desc, imgSrc_jpg, imgSrc_png) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.desc = desc;
    this.imgSrc_jpg = imgSrc_jpg;
    this.imgSrc_png = imgSrc_png;
  }

  render() {
    let myID = this.id.replace(/_/g, "");
    let myType = (this.type === 'topclothes' || this.type === 'botclothes') ? 'clothes' : this.type;
    return `
      <img src="../assets/images/${myType}/${myID}_show.jpg"
           class="card-img-top"
           alt="${this.desc}"
           type="${this.type}" />`;
  }
}

class TabPane extends SetPart {
  showSet() {
    return `
      <div class="card col-3" id="${this.id}" type="${partObject[this.type]}">
        ${this.render()}
        <div class="card-body">
          <h5 class="card-title text-center">${this.name}</h5>
          <div class="row">
            <button class="col-12 showButton">Thử đồ</button>
          </div>
        </div>
      </div>`;
  }
}

class NavPill {
  constructor(tabName, showName, type) {
    this.tabName = tabName;
    this.showName = showName;
    this.type = type;
    setArray.push(this.type);
  }

  render() {
    const isActive = this.type === 'topclothes' ? 'active' : '';
    return `
      <li class="nav-item col" role="presentation">
        <button class="nav-link ${isActive}" id="home-tab" data-toggle="tab" 
          data-target="#${this.type}" type="button" role="tab">
          ${this.showName}
        </button>
      </li>`;
  }
}

export class NavPills {
  constructor(objects) {
    this.objects = objects;
  }

  showNav() {
    return this.objects.map(object => {
      const navbar = new NavPill(object.tabName, object.showName, object.type);
      return navbar.render();
    }).join('');
  }
}

export class TabPanes {
  constructor(objects) {
    this.objects = objects;
  }

  renderTab() {
    return `
      <div class="tab-content" id="nav-tabContent">
        ${this.objects.map(object => {
          const thisShow = object.type === 'topclothes' ? 'active show' : '';
          return `
            <div class="tab-pane row fade ${thisShow}" id="${object.type}" 
              role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0"></div>`;
        }).join('')}
      </div>`;
  }
}

export class ShowPart {
  constructor(objects, part) {
    this.part = part;
    this.objects = objects.filter(object => object.type === this.part);
  }

  renderTab() {
    return this.objects.map(object => {
      const tabBar = new TabPane(object.id, object.type, object.name, object.desc, object.imgSrc_jpg);
      return tabBar.showSet();
    }).join('');
  }
}

class GetPart {
  constructor(type, button) {
    this.type = type;
    this.button = button;
  }

  getClothes() {
    const showDiv = this.button.closest('.card');
    const myID = showDiv.id.replace(/_/, '');
    const myType = (this.type === 'topclothes' || this.type === 'botclothes') ? 'clothes' : this.type;
    const file = myType === 'background' ? 'jpg' : 'png';
    return `url('./assets/images/${myType}/${myID}.${file}')`;
  }
}

export class Character {
  constructor(...clothes) {
    [
      this.hairstyle,
      this.necklace,
      this.bikinitop,
      this.bikinibottom,
      this.handbag,
      this.feet,
      this.background
    ] = clothes;
  }

  show(buttons, ids) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const myType = button.closest('.card').getAttribute('type');
        const choosePart = Array.from(ids).find(id => id.classList.contains(myType));
        choosePart.style.background = new GetPart(Object.keys(partObject).find(key => partObject[key] === myType), button).getClothes();
        choosePart.style.backgroundSize = 'cover';
      });
    });
  }
}
