let shoppingList = new Vue({
    el: '#shopping-list',
    data: {
        state: 'default',
        header: 'shopping list app',
        newItem: '',
        highPriority: false,
        items: [
            {
                id:1,
                exist: true,                
                label: '10 party hats',
                purchased: false,
                highPriority: false,
            },
            {   
                id:2,
                exist: true,
                label: '2 board games',
                purchased: true,
                highPriority: false,
            },
            {
                id:3,
                exist: true,
                label: '20 cups',
                purchased: false,
                highPriority: true,
            }
        ]
    },
    computed: {
        reversedItems() {
            return this.items.slice(0).reverse();
            //return [...this.items].reverse()
        },
        characterCount() {
            return this.newItem.length
        }
    },
    methods: {
        del: function(item) {
            item.exist = false
        },
        saveItem: function() {
            if(this.newItem == '') return;
            this.items.push({
                id:this.items.length+1,
                exist:true,
                label: this.newItem,
                purchased: false,
                highPriority:this.highPriority
            });
            this.newItem = '';
            this.highPriority = false
            this.$refs.cursor.focus();
        },
        changeState: function(newState) {              
            this.state = newState;
            this.newItem = '';
            this.highPriority = false        
        },
        togglePurchased: function(item) {
            item.purchased = !item.purchased;
        }
    }
});