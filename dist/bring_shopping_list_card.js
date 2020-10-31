const LitElement = Object.getPrototypeOf(
  customElements.get("hui-masonry-view")
);

const html = LitElement.prototype.html;

class BringShoppingList extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }
  constructor() {
    super();
    this.config = {};
  }

  renderStyle() {
    return html`
    <style>
    </style>
    `
  }

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this.config.entity];

    return html`
      ${this.renderStyle()}
      <ha-card .header="${this.config.name}">        
        <div class="card-content">
          ${stateObj.attributes.Purchase.map(item => this.getItemTemplate(item, this.config.purchaseColor))}
        </div>
        ${this.config.showRecent ? html`
          <div class="card-content">
            ${stateObj.attributes.Recently.map(item => this.getItemTemplate(item, this.config.recentlyColor))}
          </div>
        ` : ""}        
      </ha-card>
    `;
  }

  getItemTemplate(item, color) {
    return html`
    <paper-button
    style="display: inline-block;
                    background-color: ${color};
                    color: #f4f4f4;
                    margin: 2px;
                    padding: 10px 5px;
                    height: ${this.config.itemHeight}px;
                    width: ${this.config.itemWidth}px;
                    cursor: pointer;
                    text-align: center;
                    border-radius: 2px;
                    box-shadow: 2px 2px 5px grey;
                    "
          .key="${item.key}"
          @click="${this.handleActionClick}"              
        >
        <div style="width: auto; height: ${this.config.itemHeight / 2}px">
          <img  style="max-width: 100%;
                      max-height: 100%;" 
                src="https://web.getbring.com/assets/images/items/${item.image}.png">
        </div>
        <label style="display: block;
                      text-align: center;
                      color: #FFF;
                      font-size: 0.8em;
                      cursor: pointer;"
        >${item.name}</label>
        <label style="display: block;
                      text-align: center;
                      color: #FFF;
                      font-size: 0.8em;
                      cursor: pointer;"
        >${item.specification || html`&nbsp;`}</label>  
    </paper-button>
    `
  }

  handleActionClick(e) {
    const theme = e.currentTarget.key;
    this.hass.callService(
      "bring_shopping_list",
      "swap_item",
      {
        entityId: this.config.entity,
        key: theme
      }
    );
  }

  getCardSize() {
    return 9;
  }

  setConfig(config) {
    if (!config.entity)
      throw new Error('Please define an entity');

    if (this.lastChild) this.removeChild(this.lastChild);
    this.config.entity = config.entity;
    this.config.name = config.name;
    this.config.showRecent = config.show_recents === true ? true : false;

    this.config.purchaseColor = '#ee524f';
    this.config.recentlyColor = '#4faba2';

    this.config.itemWidth = 90;
    this.config.itemHeight = 63;

    if (typeof config.purchase_color !== 'undefined' && config.purchase_color !== null)
      this.config.purchaseColor = config.purchase_color;

    if (typeof config.recently_color !== 'undefined' && config.recently_color !== null)
      this.config.recentlyColor = config.recently_color;

    if (typeof config.item_width !== 'undefined' && config.item_width !== null)
      this.config.itemWidth = config.item_width;

    if (typeof config.item_height !== 'undefined' && config.item_height !== null)
      this.config.itemHeight = config.item_height;

  }
}

customElements.define('bring-shopping-list-card', BringShoppingList);

console.info(
  `%c BRING-SHOPPING-LIST   \n%c     Version 0.0.1     `,
  "color: orange; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: dimgray"
);
