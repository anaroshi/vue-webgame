let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});

app.message = 'I have changed the data!';

let app2 = new Vue({
    el: '#app-2',
    data: {
        message: '이 페이지는 ' + new Date() + '에 로드 되었습니다.'
    }
});

let app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});
app3.seen = false;

let app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            {text:'JavaScript 배우기', key:'1'},
            {text:'Vue 배우기', key:'2'},
            {text:'무언가 멋진것을 만들기', key:'3'}
        ]
    }
});
app4.todos.push({text:'New Item'});
console.log(app4.todos);

let app5 = new Vue({
    el: '#app-5',
    data: {
        message: '안녕하세요! Vue.js!'
    },
    methods: {
        reversMessage: function() {
            this.message = this.message.split('').reverse().join('')
        }
    }
});

let app6 = new Vue({
    el: '#app-6',
    data: {
        message: '안녕하세요 Vue!'
    }
});

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
})
Vue.component('todo-item1', {
    template: '<li>This is a todo-item1</li>'
})
Vue.component('todo-item2', {
    template: '<li>This is a todo-item2</li>'
})
let app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            {id:0, text:'Vegetables'},
            {id:1, text:'Cheese'},
            {id:2, text:'Whatever else humans are supposed to eat'}
        ]
    }
});

let app8 = new Vue({
    el: '#app-8',
    data: {
        message: '안녕하세요'
    },
    computed: {
        reverseMessage: function() {
            return this.message.split('').reverse().join('')
        }
    }
});
// app8.message = '나른한 봄날';
// console.log(app8.reversMessage);

let watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: '질문을 하기 전까지는 대답할 수 없습니다.'
    },
    watch: {
        // 질문이 변경될 때 마다 이 기능이 실행됩니다.
        question: function (newQuestion) {
            this.answer = '입력을 기다리는 중....'
            this.debouncedGetAnswer()
        }
    },
    created: function() {
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
        getAnswer: function() {
                if(this.question.indexOf('?') === -1) {
                this.answer = '질문에는 일반적으로 물음표가 포함 됩니다. ;-)'
                return
            }
            this.answer = '생각중...'
            var vm = this
            axios.get('https://yesno.wtf/api')
                .then(function (response) {
                    vm.answer = _.capitalize(response.data.answer)
                })
                .catch(function (error) {
                    vm.answer = '에러! API 요청에 오류가 있습니다.' + error
                })
        }
    }
});