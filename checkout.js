
/**
 * The imaginary inventory 
 */
const Items = [
    { id: 'ipd', name: 'Super Ipad', price: 549.99 },
    { id: 'mbp', name: 'Macbook Pro', price: 1399.99 },
    { id: 'atv', name: 'Apple TV', price: 109.50 },
    { id: 'vga', name: 'VGA adpater', price: 30.00 }
];




/**
 * All the pricing rules 
 */
const PricingRules = {
    // for the apple tv
    'atv': {
        discountedPrice: (order) => {
            const atvOrder = order.filter(item => {
                   return item.SKU.id === 'atv' 
            })[0];
            let payQty = atvOrder.qty - Math.floor(atvOrder.qty / 3);
            return payQty * atvOrder.SKU.price;
        }
    },
    // for the super ipad
    'ipd': {
        discountedPrice: (order) => {
            const ipdOrder = order.filter(item => {
                return item.SKU.id === 'ipd' 
            })[0];
            let discPrice = ipdOrder.SKU.price
            if (ipdOrder.qty > 4) {
                discPrice = 499.99;
            }
            return ipdOrder.qty * discPrice;
        }
    },
    // for vga adaptor
    'vga': {
        discountedPrice: (order) => {
            const vgaOrder = order.filter(item => {
                return item.SKU.id === 'vga' 
            })[0];
            const ipdOrder = order.filter(item => {
                return item.SKU.id === 'ipd' 
            })[0];
            const ipdorderQty = !!ipdOrder ? ipdOrder.qty : 0;
            let payQty = vgaOrder.qty  - ipdorderQty  // get free vga for every ipd
            return payQty * vgaOrder.SKU.price;
        }
    },
    //for macbook bro
    'mbp': {
        discountedPrice: (order) => {
            const mbpOrder = order.filter(item => {
                return item.SKU.id === 'mbp' 
            })[0];
            return mbpOrder.qty * mbpOrder.SKU.price;
        }
    }
}


// product
class SKU {
    constructor(id, name, price) {
        Object.assign(this, { id, name, price });
    }
}


// order
class OrderItem {
    constructor(SKU, qty = 1) {
        Object.assign(this, { SKU, qty });
        this.discount = 0;
        this.totalPrice = () => (this.price * this.qty) - this.discount;
        this.skuType = SKU.id;
    }
}

class Checkout {
    constructor() {
        this.Orders = []
    }

    scan(item) {
        let skuItem = Items.filter(sku => {
            return sku.id === item;
        })[0];
        let orderItem = new OrderItem(skuItem, 1)
        let isExistingItem = this.Orders.some(sku =>{
            return sku.SKU.id === item
        });
        if(!isExistingItem) {
            this.Orders.push(orderItem);
        } else {
            let index = this.Orders.findIndex( element => {
                return element.SKU.id === item
            });
            this.Orders[index].qty += 1;
        }
        if(item === 'mvp') {
            this.scan('vga');
        }
    };

    total() {
        const returnTotal = this.Orders.reduce((total, item) =>{
             return total + PricingRules[item.SKU.id].discountedPrice(this.Orders)
        }, 0);
        return returnTotal;
    }
}


/**
 * Just testing with console logs
 */
let scan = new Checkout();
scan.scan('atv');
scan.scan('atv');
scan.scan('atv');
scan.scan('vga');
console.log(scan.total());
scan = new Checkout();
scan.scan('atv');
scan.scan('ipd');
scan.scan('ipd');
scan.scan('atv');
scan.scan('ipd');
scan.scan('ipd');
scan.scan('ipd');
console.log(scan.total());
scan = new Checkout();
scan.scan('mbp');
scan.scan('vga');
scan.scan('ipd');
console.log(scan.total());