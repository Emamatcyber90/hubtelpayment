

const Invoice = require("./Invoice");
const Store = require("./Store");
const Actions = require("./Actions");

class Request
{
    /**
     * @var Invoice
     */
    // public $invoice;

    /**
     * @var Store
     */
    // public $store;

    /**
     * @var Actions
     */
    // public $actions;

    /**
     * @var mixed
     */
    // public $custom_data;

    constructor()
    {
        this.invoice = new Invoice();
        this.store = new Store();
        this.actions = new Actions();
    }
}

module.exports = Request