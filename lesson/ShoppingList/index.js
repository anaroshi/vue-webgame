let shoppingList = new Vue({
    el: '#shopping-list',
    data: {
        state: 'default',
        header: 'shopping list app',
        newItem: '',
        items: [
            {
                label: '10 party hats',
                purchased: false,
                highPriority: false,
            },
            {
                label: '2 board games',
                purchased: true,
                highPriority: false,
            },
            {
                label: '20 cups',
                purchased: false,
                highPriority: true,
            }
        ]
    },
    computed: {
        reversedItems() {
            return this.items.slice(0).reverse();
        }
    },
    methods: {
        saveItem: function() {
            if(this.newItem == '') return;
            this.items.push({
                label: this.newItem,
                purchased: false,
            });
            this.newItem = '';
            this.$refs.cursor.focus();
        },
        changeState: function(newState) {              
            console.log(newState);
            this.state = newState;
            this.newItem = '';            
        },
        togglePurchased: function(item) {
            item.purchased = !item.purchased;
        }
    }
});