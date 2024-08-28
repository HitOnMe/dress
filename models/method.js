
let setArray = [];
let partObject = {
  'topclothes': 'bikinitop',
  'botclothes' : 'bikinibottom',
  'shoes' : 'feet',
  'handbags': 'handbag',
  'necklaces' : 'necklace',
  'hairstyle' : 'hairstyle',
  'background' : 'background'
}
export default setArray;
class setPart {
  constructor(id, type, name, desc, imgSrc_jpg, imgSrc_png){
    this.id = id,
    this.type = type,
    this.name = name,
    this.desc = desc,
    this.imgSrc_jpg = imgSrc_jpg,
    this.imgSrc_png = imgSrc_png
  }
  render(){
    let myID = this.id.replace(/_/g, "");
    let myType = this.type == 'topclothes' |  this.type == 'botclothes' ?  'clothes' : this.type;
    return ` <img
                src="./assets/images/${myType}/${myID}_show.jpg"
                class="card-img-top"
                alt=${this.desc}
                type = ${this.type}
                    />`
  }
}

class tabPane extends setPart {
  constructor(id, type, name, desc, imgSrc_jpg, imgSrc_png){
    super(id, type, name, desc, imgSrc_jpg, imgSrc_png);
  };
  showSet(){
    
    return `<div class="card col-3" id = ${this.id} type=${partObject[this.type]}>
                    ${this.render()}
                    <div class="card-body">
                      <h5 class="card-title text-center">${this.name}</h5>
                      <div class="row">
                        <button href="#" class="col-12 showButton">Thử đồ</button>
                      </div>
                    </div>
                  </div>`
  }
}
class navPill {
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
        <button class="nav-link ${isActive}" id="home-tab" data-toggle="tab" data-target="#${this.type}" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
          ${this.showName}
        </button>
      </li>`;
  }
}


export class navPills {
    constructor(objects){
      this.objects = objects
    }
    showNav(){
      let contentHTML = '';
      this.objects.forEach(object =>{
        let navbar = new navPill(object.tabName, object.showName, object.type);
        contentHTML+=navbar.render()
      })
      
      return `${contentHTML}`
    }
}



export class tabPanes{
  constructor(objects){
    this.objects = objects;
  }
  renderTab(){
    let contentHTML = '';
    this.objects.forEach(object =>{
      
        const thisShow  = object.type == 'topclothes' ? 'active show' : '';
      let content = `
              <div
                class="tab-pane row fade ${thisShow}"
                id = ${object.type}
                role="tabpanel"
                aria-labelledby="nav-home-tab"
                tabindex="0"
              >
                </div>`;
          contentHTML += content;
    });
  
    
    return `<div class="tab-content" id="nav-tabContent">
              ${contentHTML}</div>`
  }
}

export class showPart{
  constructor(objects, part){
    this.part = part
    this.objects = objects.filter(object => object.type == this.part)
  }
  renderTab(){
    let contentHTML = '';
    this.objects.forEach(object =>{
      let tabBar = new tabPane(object.id, object.type, object.name, object.desc, object.imgSrc_jpg);
      contentHTML+=tabBar.showSet()
    })
    
    return contentHTML
  }
}

class getPart {
  constructor(type, button){
    this.type = type;
    this.button = button
  }
  getClothes(){
      let showDiv = this.button.parentNode.parentNode.parentNode;
      let myID = showDiv.id.replace(/_/, '');
      let myType = this.type == 'topclothes' ||  this.type == 'botclothes' ?  'clothes' : this.type;
      let file = myType == 'background' ? 'jpg' : 'png'
      return `url('./assets/images/${myType}/${myID}.${file}')`
  }
}
export class Character {
  constructor(...clothes){
    this.hairstyle=clothes[0],
    this.necklace = clothes[1],
    this.bikinitop = clothes[2],
    this.bikinibottom = clothes[3],
    this.handbag = clothes[4],
    this.feet = clothes[5],
    this.background = clothes[6];
  }
  show(buttons, ids){
    buttons.forEach(button => {
      button.addEventListener('click', () => {
      let myType = button.parentNode.parentNode.parentNode.getAttribute('type')
      let choosePart = Array.from(ids).filter(id => id.classList[0] == myType)[0];
      choosePart.style.background = new getPart(Object.keys(partObject).find(key => partObject[key] == myType), button).getClothes();
      choosePart.style.backgroundSize = 'cover';
      }
      )
    })
  
  }
 
}